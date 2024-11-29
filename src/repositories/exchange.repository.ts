import { sendNotification } from '../containers/notification.container.js';

export class ExchangeRepository {
  data: any;
  prisma: any; // prismaClient를 여기서 관리
  constructor(client) {
    this.data = client.Exchange;
    this.prisma = client;
  }

  getNickname = async id => {
    const nickname = await this.prisma.user.findUnique({
      where: { id },
      select: { nickname: true },
    });

    return nickname;
  };

  createExchange = async data => {
    const { shopId, buyerId, buyerCardId, description } = data;
    const sellerCardInfo = await this.prisma.Shop.findUnique({ where: { id: shopId }, include: { card: true } });
    const { sellerId, cardId: sellerCardId } = sellerCardInfo;
    const newExchange = await this.data.create({
      data: {
        shopId,
        sellerId,
        buyerId,
        sellerCardId,
        buyerCardId,
        description,
      },
    });

    // 교환 신청 알림 to 판매자
    const buyer = await this.getNickname(buyerId);
    const alertSeller = await sendNotification({
      type: 'EXCHANGE',
      recipientId: sellerId,
      content: `${buyer.nickname}님이 [${sellerCardInfo.card.grade}|${sellerCardInfo.card.name}]의 포토카드 교환을 제안했습니다.`,
    });
    if (!alertSeller) {
      throw new Error('교환 알림이 전달되지 않았습니다.');
    }
    console.log(alertSeller);

    return newExchange;
  };

  acceptExchange = async exchangeId => {
    const exchange = await this.data.findUnique({
      where: { id: exchangeId },
      include: { shop: true, seller: true, buyer: true },
    });

    const { shopId, sellerId, buyerId, sellerCardId, buyerCardId } = exchange;

    const approvedExchange = await this.prisma.$transaction(async prisma => {
      // shop에서 quantity 1 감소
      await prisma.Shop.update({
        where: { id: shopId },
        data: {
          remainingQuantity: { decrement: 1 },
          available: exchange.shop.remainingQuantity > 1, // 잔여수량 0일 경우 매진
        },
      });

      // buyerCard quantity 1 감소
      await prisma.Card.update({
        where: { id: buyerCardId },
        data: { quantity: { decrement: 1 } },
      });

      // sellerId로 card생성
      const buyerCardInfo = await prisma.Card.findUnique({ where: { id: buyerCardId } });

      await prisma.Card.create({
        data: {
          uploaderId: buyerCardInfo.uploaderId,
          name: buyerCardInfo.name,
          grade: buyerCardInfo.grade,
          type: buyerCardInfo.type,
          description: buyerCardInfo.description,
          image: buyerCardInfo.image,
          price: buyerCardInfo.price,
          ownerId: sellerId,
          quantity: 1,
        },
      });

      // buyerId로 card생성
      const sellerCardInfo = await prisma.Card.findUnique({ where: { id: sellerCardId } });

      await prisma.Card.create({
        data: {
          uploaderId: sellerCardInfo.uploaderId,
          name: sellerCardInfo.name,
          grade: sellerCardInfo.grade,
          type: sellerCardInfo.type,
          description: sellerCardInfo.description,
          image: sellerCardInfo.image,
          price: sellerCardInfo.price,
          ownerId: buyerId,
          quantity: 1,
        },
      });

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
        if (!alertSeller) {
          throw new Error('교환 알림이 전달되지 않았습니다.');
        }
      }

      //교환 제안 승인 상태로 업데이트
      return await prisma.Exchange.update({
        where: { id: exchangeId },
        data: { complete: true },
      });
    });
    return approvedExchange;
  };

  // 교환 제안 거절
  refuseExchange = async exchangeId => {
    const deletedExchange = await this.data.delete({ where: { id: exchangeId } });
    return deletedExchange;
  };

  // 교환 제안 취소
  cancelExchange = async exchangeId => {
    const deletedExchange = await this.data.delete({ where: { id: exchangeId } });
    return deletedExchange;
  };

  findExchangeById = async exchangeId => {
    return await this.data.findUnique({ where: { id: exchangeId }, include: { seller: true, sellerCard: true } });
  };
}
