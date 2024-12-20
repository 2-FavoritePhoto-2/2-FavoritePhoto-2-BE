import { Grades } from '@prisma/client';

export class ShopRepository {
  data: any;
  prisma: any;
  constructor(client) {
    this.data = client.Shop;
    this.prisma = client;
  }

  // GET all
  getShopList = async (skip, take, sortOption, where) => {
    const list = await this.data.findMany({
      where,
      ...sortOption,
      skip,
      take,
      include: { seller: true, card: true },
    });

    const totalCount = await this.data.count({ where });

    return { totalCount, list };
  };

  // POST
  createShop = async data => {
    const newShop = await this.data.create({ data });

    return newShop;
  };

  // GET by shopId
  getShopById = async id => {
    const shop = await this.data.findUnique({
      where: { id },
      include: { seller: true, card: true },
    });

    return shop;
  };

  // PATCH by shopId
  updateShop = async (id, data) => {
    const shop = await this.data.update({ where: { id }, data });

    return shop;
  };

  // DELETE by shopId
  deleteShop = async id => {
    const shop = await this.data.delete({ where: { id } });

    return shop;
  };

  // POST purchase by shopId
  purchase = async data => {
    const purchase = await this.prisma.purchase.create({
      data,
    });

    return purchase;
  };

  updateUser = async (buyerId, totalPrice) => {
    const shop = await this.prisma.user.update({
      where: { id: buyerId },
      data: {
        point: {
          increment: totalPrice,
        },
      },
    });

    return shop;
  };

  updateCardQuantity = async (id, quantity) => {
    const card = await this.prisma.card.update({
      where: { id },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });

    return card;
  };

  createPurchasedCard = async cards => {
    const newCard = await this.prisma.card.createMany({
      data: cards,
    });

    return newCard;
  };

  getNickname = async id => {
    const nickname = await this.prisma.user.findUnique({
      where: { id },
      select: { nickname: true },
    });

    return nickname;
  };

  getCardQuantity = async id => {
    const card = await this.prisma.card.findUnique({
      where: { id },
      select: { quantity: true },
    });

    return card;
  };
}
