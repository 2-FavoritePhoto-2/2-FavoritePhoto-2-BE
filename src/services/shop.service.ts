import { Grades } from '@prisma/client';
import { prismaClient } from '../connection/connection.js';
import { sendNotification } from '../containers/notification.container.js';
import { createPointLog } from '../containers/points.container.js';

export class ShopService {
  data: any;
  constructor(shopRepository) {
    this.data = shopRepository;
  }

  getShopList = async ({ page, pageSize, orderBy, keyword, grade, type, available, exclude, by }) => {
    const skip = (page - 1) * pageSize;
    const take = Number(pageSize);

    let sortOption;
    switch (orderBy) {
      case 'oldest':
        sortOption = { orderBy: { createdAt: 'asc' } };
        break;
      case 'newest':
        sortOption = { orderBy: { createdAt: 'desc' } };
        break;
      case 'priceHighest':
        sortOption = { orderBy: { price: 'desc' } };
        break;
      case 'priceLowest':
      default:
        sortOption = { orderBy: { price: 'asc' } };
    }

    const where = {
      AND: [
        keyword
          ? {
              card: {
                name: { contains: keyword, mode: 'insensitive' },
              },
            }
          : {},
        grade ? { card: { grade: Grades[grade] } } : {},
        type ? { card: { type: { has: type } } } : {},
        available !== undefined ? { available: available } : {},
        exclude ? { id: { not: exclude } } : {},
        by ? { sellerId: { equals: by } } : {},
      ],
    };

    const shops = await this.data.getShopList(skip, take, sortOption, where);

    return shops;
  };

  createShop = async data => {
    const { quantity, cardId, ...rest } = data;
    const newShop = await this.data.createShop({
      totalQuantity: quantity,
      remainingQuantity: quantity,
      cardId,
      ...rest,
    });

    const card = await this.data.getCard(cardId);
    if (!card || card?.quantity < quantity) {
      throw new Error('판매 가능한 수량이 부족합니다!');
    }
    await this.data.updateCard(cardId, -quantity);

    return newShop;
  };

  getShopById = async id => {
    const shop = await this.data.getShopById(id);

    return shop;
  };

  updateShop = async (id, data) => {
    const { totalQuantity, remainingQuantity } = data;
    const shopData = await this.data.getShopById(id);
    const previousTotalQuantity = shopData.totalQuantity;
    const myCardQuantity = shopData.card.quantity;
    const updateCardQuantity = previousTotalQuantity - totalQuantity;

    // 내 카드 수량과 비교
    if (remainingQuantity <= 0 || remainingQuantity > myCardQuantity) {
      throw new Error('판매 가능한 수량이 부족합니다!');
    }

    const card = await this.data.updateCard(shopData.card.id, updateCardQuantity);
    const shop = await this.data.updateShop(id, data);

    return shop;
  };

  deleteShop = async id => {
    const shop = await this.data.deleteShop(id);

    return shop;
  };

  createPurchase = async (shopId: string, buyerId: string, quantity: number, totalPrice: number) => {
    const newPurchase = await prismaClient.$transaction(async () => {
      const shop = await this.data.getShopById(shopId);

      if (!shop || shop.remainingQuantity < quantity) {
        throw new Error('구매 가능한 수량이 부족합니다!');
      }

      const buyerPoints = await this.data.updateUser(buyerId, -totalPrice);
      const sellerPoints = await this.data.updateUser(shop.sellerId, totalPrice);

      if (!buyerPoints) {
        throw new Error('구매 포인트가 부족합니다!');
      }

      const purchase = await this.data.purchase({
        quantity,
        totalPrice,
        buyerId,
        shopId,
      });

      await createPointLog(buyerId, -totalPrice, 'PURCHASE', { purchaseId: purchase.id });

      await createPointLog(shop.sellerId, totalPrice, 'SALE', { purchaseId: purchase.id });

      const updatedQuantity = shop.remainingQuantity - quantity;
      await this.data.updateShop(shopId, { remainingQuantity: updatedQuantity, available: updatedQuantity > 0 });

      const newCardData = {
        ownerId: buyerId,
        name: shop.card?.name,
        price: shop.card?.price,
        grade: shop.card?.grade,
        type: shop.card?.type,
        description: shop.card?.description,
        image: shop.card?.image,
        quantity,
      };
      await this.data.createPurchasedCard(newCardData);

      // 구매 완료 알림 to 구매자
      const alertBuyer = await sendNotification({
        type: 'BUY',
        recipientId: buyerId,
        content: `[${shop.card?.grade}|${shop.card?.name}] ${quantity}장을 성공적으로 구매했습니다.`,
      });
      // 구매 완료 알림 to 판매자
      const buyer = await this.data.getNickname(buyerId);
      const alertSeller = await sendNotification({
        type: 'SELL',
        recipientId: shop.sellerId,
        content: `${buyer.nickname}님이 [${shop.card?.grade}|${shop.card?.name}] ${quantity}장 구매했습니다.`,
      });
      if (!alertBuyer || !alertSeller) {
        throw new Error('구매 알림이 전달되지 않았습니다.');
      }
      // 판매 품절 알림 to 판매자
      if (shop.remainingQuantity === quantity) {
        const alertSeller = await sendNotification({
          type: 'SHOP',
          recipientId: shop.sellerId,
          content: `[${shop.card?.grade}|${shop.card?.name}]이 품절되었습니다.`,
        });
        if (!alertSeller) {
          throw new Error('품절 알림이 전달되지 않았습니다.');
        }
      }

      return purchase;
    });

    return newPurchase;
  };
}
