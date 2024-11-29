import { Grades } from '@prisma/client';

export class UserRepository {
  data: any;
  exchangeData: any;
  prisma: any;
  constructor(client) {
    this.data = client.User;
    this.exchangeData = client.Exchange;
    this.prisma = client;
  }

  // GET Id
  getUserId = async (userId: string) => {
    const profile = await this.data.findUnique({
      where: { id: userId },
    });

    return profile;
  };

  // GET 유저 포토카드 전체 조회
  getUserPhotoCards = async (skip, take, sortOption, where) => {
    // 관계 필드 myCards를 활용하여 데이터 조회
    const userWithCards = await this.prisma.card.findMany({
      where,
      orderBy: sortOption,
      skip,
      take,
    });

    if (!userWithCards) {
      throw new Error('User not found');
    }

    // 전체 개수는 _count 필드에서 가져옴
    const totalCount = await this.prisma.card.count({ where });

    return { totalCount, card: userWithCards };
  };

  getPhotoCardDetails = async (userId: string, cardId: string) => {
    const cardDetails = await this.data.findUnique({
      where: { id: userId },
      select: {
        myCards: {
          where: { id: cardId },
          select: {
            name: true,
            price: true,
            grade: true,
            type: true,
            description: true,
            image: true,
            quantity: true,
          },
        },
      },
    });

    if (!cardDetails || cardDetails.myCards.length === 0) {
      throw new Error('해당 포토 카드를 찾을 수 없습니다.');
    }

    return cardDetails.myCards[0];
  };

  getExchangesByShopId = async (shopId: string, userId: string) => {
    const exchanges = await this.exchangeData.findMany({
      where: { shopId },
      include: {
        buyer: true,
        buyerCard: {
          include: {
            owner: true, // 카드 소유자 정보 포함
          },
        },
        sellerCard: {
          include: {
            owner: true, // 판매자 카드 소유자 정보 포함
          },
        },
      },
    });

    if (!exchanges || exchanges.length === 0) {
      return [];
    }

    // 판매자 ID를 첫 번째 교환에서 확인
    const sellerId = exchanges[0]?.sellerId;

    if (sellerId === userId) {
      // 판매자 관점
      return exchanges.map(exchange => ({
        id: exchange.id,
        buyerId: exchange.buyerId,
        buyerCard: {
          name: exchange.buyerCard?.name,
          grade: exchange.buyerCard?.grade,
          type: exchange.buyerCard?.type,
          description: exchange.description,
          image: exchange.buyerCard?.image,
          price: exchange.buyerCard?.price,
          buyerNickname: exchange.buyer?.nickname,
        },
      }));
    } else {
      // 구매자 관점
      const userExchanges = exchanges.filter(exchange => exchange.buyerId === userId);

      if (userExchanges.length === 0) {
        return [];
      }
      return userExchanges.map(exchange => ({
        id: exchange.id,
        description: exchange.description,
        buyerCard: {
          name: exchange.buyerCard?.name,
          grade: exchange.buyerCard?.grade,
          type: exchange.buyerCard?.type,
          description: exchange.description,
          image: exchange.buyerCard?.image,
          price: exchange.buyerCard?.price,
          buyerNickname: exchange.buyer?.nickname,
        },
      }));
    }
  };

  getMyShopCards = async (userId, keyword, grade, type, available) => {
    const where = {
      AND: [
        { sellerId: userId },
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
      ],
    };

    const list = await this.prisma.shop.findMany({
      where,
      include: { seller: true, card: true },
    });

    const listData = list.map(l => ({
      mode: 'shop',
      nickname: l.seller?.nickname,
      cardName: l.card?.name,
      grade: l.card?.grade,
      type: l.card?.type,
      description: l.card?.description,
      image: l.card?.image,
      price: l.price,
      quantity: l.remainingQuantity,
      createdAt: l.createdAt,
    }));

    return listData;
  };

  getMyExchangeCards = async (userId, keyword, grade, type, available) => {
    const where = {
      AND: [
        { buyerId: userId },
        keyword
          ? {
              buyerCard: {
                name: { contains: keyword, mode: 'insensitive' },
              },
            }
          : {},
        grade ? { buyerCard: { grade: Grades[grade] } } : {},
        type ? { buyerCard: { type: { has: type } } } : {},
        available !== undefined ? { complete: !available } : {},
      ],
    };

    const list = await this.prisma.exchange.findMany({
      where,
      include: { buyer: true, buyerCard: true },
    });

    const listData = list.map(l => ({
      mode: 'exchange',
      nickname: l.buyer?.nickname,
      cardName: l.buyerCard?.name,
      grade: l.buyerCard?.grade,
      type: l.buyerCard?.type,
      description: l.buyerCard?.description,
      image: l.buyerCard?.image,
      price: l.buyerCard?.price,
      quantity: 1,
      createdAt: l.createdAt,
    }));

    return listData;
  };
}
