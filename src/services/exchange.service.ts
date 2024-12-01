import { prismaClient } from '../connection/connection.js';

export class ExchangeService {
  data: any;
  constructor(exchangeRepository) {
    this.data = exchangeRepository;
  }

  createExchange = async data => {
    const newExchange = await prismaClient.$transaction(async () => {
      const buyerCardInfo = await this.data.findCardById(data.buyerCardId);
      if (!buyerCardInfo) {
        throw new Error('구매자의 카드 정보를 찾을 수 없습니다.');
      }
      if (buyerCardInfo.quantity < 1) {
        throw new Error('구매자 카드의 수량이 부족합니다.');
      }

      // buyerCard quantity 1 감소
      await this.data.decrementCardQuantity(data.buyerCardId);

      return await this.data.createExchange(data);
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

      // 교환 제안 취소
      return await this.data.cancelExchange(exchangeId);
    });

    return canceledExchange;
  };
}
