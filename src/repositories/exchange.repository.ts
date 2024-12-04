import { sendNotification } from '../containers/notification.container.js';

export class ExchangeRepository {
  prisma: any;
  constructor(client) {
    this.prisma = client;
  }

  createExchange = async data => {
    const { shopId, buyerId, buyerCardId, description } = data;
    const sellerCardInfo = await this.prisma.Shop.findUnique({ where: { id: shopId }, include: { card: true } });
    const { sellerId, cardId: sellerCardId } = sellerCardInfo;
    const newExchange = await this.prisma.Exchange.create({
      data: {
        shopId,
        sellerId,
        buyerId,
        sellerCardId,
        buyerCardId,
        description,
      },
    });

    const buyer = await this.getNickname(buyerId);
    const sellerCardGrade = sellerCardInfo.card.grade;
    const sellerCardName = sellerCardInfo.card.name;

    console.log('send: ', newExchange, sellerId, buyer, sellerCardGrade, sellerCardName);
    return { newExchange, sellerId, buyer, sellerCardGrade, sellerCardName };
  };

  findExchangeById = async exchangeId => {
    return await this.prisma.Exchange.findUnique({
      where: { id: exchangeId },
      include: { shop: true, seller: true, buyer: true, sellerCard: true },
    });
  };

  findCardById = async cardId => {
    return await this.prisma.Card.findUnique({ where: { id: cardId } });
  };

  findShopQuantityById = async shopId => {
    return await this.prisma.Shop.findUnique({
      where: { id: shopId },
      select: { remainingQuantity: true },
    });
  };

  decrementShopQuantity = async shopId => {
    return await this.prisma.Shop.update({
      where: { id: shopId },
      data: { remainingQuantity: { decrement: 1 } },
    });
  };

  decrementCardQuantity = async buyerCardId => {
    return await this.prisma.Card.update({
      where: { id: buyerCardId },
      data: { quantity: { decrement: 1 } },
    });
  };

  incrementCardQuantity = async buyerCardId => {
    return await this.prisma.Card.update({
      where: { id: buyerCardId },
      data: { quantity: { increment: 1 } },
    });
  };

  createUserCard = async (userId, cardInfo) => {
    return await this.prisma.Card.create({
      data: {
        name: cardInfo.name,
        grade: cardInfo.grade,
        type: cardInfo.type,
        description: cardInfo.description,
        image: cardInfo.image,
        price: cardInfo.price,
        ownerId: userId,
        quantity: 1,
      },
    });
  };

  updateShopAvailability = async shopId => {
    return await this.prisma.Shop.update({
      where: { id: shopId },
      data: {
        available: false,
      },
    });
  };

  updateExchangeComplete = async exchangeId => {
    return await this.prisma.Exchange.update({
      where: { id: exchangeId },
      data: { complete: true },
    });
  };

  // 교환 제안 거절
  refuseExchange = async exchangeId => {
    const deletedExchange = await this.prisma.Exchange.delete({ where: { id: exchangeId } });
    return deletedExchange;
  };

  // 교환 제안 취소
  cancelExchange = async exchangeId => {
    const deletedExchange = await this.prisma.Exchange.delete({ where: { id: exchangeId } });
    return deletedExchange;
  };

  getNickname = async id => {
    return await this.prisma.user.findUnique({
      where: { id },
      select: { nickname: true },
    });
  };
}
