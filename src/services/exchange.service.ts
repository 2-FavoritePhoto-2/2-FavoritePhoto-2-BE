import { prismaClient } from '../connection/connection.js';
import { sendNotification } from '../containers/notification.container.js';

export class ExchangeService {
  data: any;
  constructor(exchangeRepository) {
    this.data = exchangeRepository;
  }

  createExchange = async data => {
    const newExchange = await prismaClient.$transaction(async () => {
      const shop = await this.data.findShopQuantityById(data.shopId);

      if (!shop || shop.remainingQuantity < 1) {
        throw new Error('상점에 남은 수량이 없습니다.');
      }

      const sellerCardInfo = await this.data.getSellerCardInfo(data.shopId);
      const sellerId = sellerCardInfo.sellerId;
      if (sellerId === data.buyerId) {
        throw new Error('판매자는 자신의 상품에 교환 요청을 할 수 없습니다.');
      }

      const buyerCardInfo = await this.data.findCardById(data.buyerCardId);
      if (!buyerCardInfo) {
        throw new Error('구매자의 카드 정보를 찾을 수 없습니다.');
      }
      if (buyerCardInfo.ownerId !== data.buyerId) {
        throw new Error('해당 카드는 구매자의 소유가 아닙니다.');
      }
      if (buyerCardInfo.quantity < 1) {
        throw new Error('구매자 카드의 수량이 부족합니다.');
      }

      // buyerCard quantity 1 감소
      await this.data.decrementCardQuantity(data.buyerCardId);

      const createdExchange = await this.data.createExchange(data);

      const buyer = await this.data.getNickname(data.buyerId);
      const sellerCardGrade = sellerCardInfo.card.grade;
      const sellerCardName = sellerCardInfo.card.name;

      // 교환 신청 알림 to 판매자
      const alertSeller = await sendNotification({
        type: 'EXCHANGE',
        recipientId: sellerId,
        content: `${buyer.nickname}님이 [${sellerCardGrade}|${sellerCardName}]의 포토카드 교환을 제안했습니다.`,
      });
      console.log(alertSeller);
      if (!alertSeller) {
        throw new Error('교환 알림이 전달되지 않았습니다.');
      }

      return createdExchange;
    });
    return newExchange;
  };

  acceptExchange = async (exchangeId, sellerId) => {
    const approvedExchange = await prismaClient.$transaction(async () => {
      const exchange = await this.data.findExchangeById(exchangeId);

      if (!exchange) {
        throw new Error('교환 제안이 존재하지 않습니다.');
      }

      if (exchange.complete) {
        throw new Error('이미 승인된 교환 제안입니다.');
      }

      if (exchange.sellerId !== sellerId) {
        throw new Error('교환 제안을 승인할 권한이 없습니다.');
      }

      const { shopId, buyerId, sellerCardId, buyerCardId } = exchange;

      const shop = await this.data.findShopQuantityById(shopId);

      if (!shop || shop.remainingQuantity < 1) {
        throw new Error('상점에 남은 수량이 없습니다.');
      }

      const buyerCardInfo = await this.data.findCardById(buyerCardId);
      if (!buyerCardInfo) {
        throw new Error('구매자의 카드 정보를 찾을 수 없습니다.');
      }

      const sellerCardInfo = await this.data.findCardById(sellerCardId);
      if (!sellerCardInfo) {
        throw new Error('판매자의 카드 정보를 찾을 수 없습니다.');
      }

      // shop에서 quantity 1 감소
      await this.data.decrementShopQuantity(shopId);

      // 교환 후 shop에서 quantity가 0이면 available false로 업데이트
      const updatedShop = await this.data.findShopQuantityById(shopId);
      if (updatedShop.remainingQuantity === 0) {
        await this.data.updateShopAvailability(shopId);
      }

      // sellerId로 카드 생성
      await this.data.createUserCard(sellerId, buyerCardInfo);

      // buyerId로 카드 생성
      await this.data.createUserCard(buyerId, sellerCardInfo);

      // 교환 완료 알림 to 교환제시자
      const alertBuyer = await sendNotification({
        type: 'EXCHANGE',
        recipientId: buyerId,
        content: `${exchange.seller.nickname}님과의 [${buyerCardInfo.grade}|${buyerCardInfo.name}] 포토카드 교환이 성사되었습니다.`,
      });
      // 교환 완료 알림 to 판매자
      const alertSeller = await sendNotification({
        type: 'EXCHANGE',
        recipientId: exchange.sellerId,
        content: `${exchange.buyer.nickname}님과의 [${sellerCardInfo.grade}|${sellerCardInfo.name}] 포토카드 교환이 성사되었습니다.`,
      });
      console.log('교환완료:', alertBuyer, '교환완료', alertSeller);
      if (!alertBuyer || !alertSeller) {
        throw new Error('교환 알림이 전달되지 않았습니다.');
      }
      // 판매 품절 알림 to 판매자
      if (exchange.shop.remainingQuantity === 1) {
        const alertSeller = await sendNotification({
          type: 'SHOP',
          recipientId: sellerId,
          content: `[${sellerCardInfo.grade}|${sellerCardInfo.name}]이 품절되었습니다.`,
        });
        console.log('판매품절:', alertSeller);
        if (!alertSeller) {
          throw new Error('교환 알림이 전달되지 않았습니다.');
        }
      }

      // 교환 상태 true로 업데이트
      return await this.data.updateExchangeComplete(exchangeId);
    });

    return approvedExchange;
  };

  refuseExchange = async (exchangeId, sellerId) => {
    const refusedExchange = await prismaClient.$transaction(async () => {
      const exchange = await this.data.findExchangeById(exchangeId);

      if (!exchange) {
        throw new Error('교환 제안이 존재하지 않습니다.');
      }

      if (exchange.complete) {
        throw new Error('이미 승인된 교환 제안입니다.');
      }

      if (exchange.sellerId !== sellerId) {
        throw new Error('교환 제안을 거절할 권한이 없습니다.');
      }

      const { buyerCardId } = exchange;

      // 구매자의 카드 수량 복원
      await this.data.incrementCardQuantity(buyerCardId);

      // 교환 거절 알림 to 교환제시자
      const alertBuyer = await sendNotification({
        type: 'EXCHANGE',
        recipientId: exchange.buyerId,
        content: `${exchange.seller.nickname}님과의 [${exchange.sellerCard.grade}|${exchange.sellerCard.name}] 포토카드 교환이 거절되었습니다.`,
      });
      console.log(alertBuyer);
      if (!alertBuyer) {
        throw new Error('거절 알림이 전달되지 않았습니다.');
      }

      // 교환 제안 삭제
      return await this.data.refuseExchange(exchangeId);
    });

    return refusedExchange;
  };

  cancelExchange = async (exchangeId, buyerId) => {
    const canceledExchange = await prismaClient.$transaction(async () => {
      const exchange = await this.data.findExchangeById(exchangeId);

      if (!exchange) {
        throw new Error('교환 제안이 존재하지 않습니다.');
      }

      if (exchange.complete) {
        throw new Error('이미 승인된 교환 제안입니다.');
      }

      if (exchange.buyerId !== buyerId) {
        throw new Error('교환 제안을 취소할 권한이 없습니다.');
      }

      const { buyerCardId } = exchange;

      // 구매자의 카드 수량 복원
      await this.data.incrementCardQuantity(buyerCardId);

      // 교환 취소 알림 to 판매자
      const buyer = await this.data.getNickname(buyerId);
      const alertSeller = await sendNotification({
        type: 'EXCHANGE',
        recipientId: exchange.sellerId,
        content: `${buyer.nickname}님이 [${exchange.sellerCard.grade}|${exchange.sellerCard.name}]의 포토카드 교환 신청을 취소했습니다.`,
      });
      console.log(alertSeller);
      if (!alertSeller) {
        throw new Error('취소 알림이 전달되지 않았습니다.');
      }
      // 교환 제안 취소
      return await this.data.cancelExchange(exchangeId);
    });

    return canceledExchange;
  };
}
