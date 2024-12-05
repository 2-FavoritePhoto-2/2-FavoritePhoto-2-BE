import { Grades } from '@prisma/client';
import { AppError } from '../utils/errors.js';

export class UserService {
  data: any;
  constructor(userRepository) {
    this.data = userRepository;
  }

  getUserProfile = async userId => {
    const profile = await this.data.getUserId(userId);

    if (!profile) {
      throw new AppError('해당 유저 정보를 찾을 수 없습니다.', 404);
    }

    return { nickname: profile.nickname, point: profile.point };
  };

  getUserPhotoCards = async ({ userId, page, pageSize, orderBy, keyword, grade, type }) => {
    const skip = (page - 1) * pageSize;
    const take = Number(pageSize);

    let sortOption;
    switch (orderBy) {
      case 'oldest':
        sortOption = { createdAt: 'asc' };
        break;
      case 'newest':
        sortOption = { createdAt: 'desc' };
        break;
      case 'priceHighest':
        sortOption = { price: 'desc' };
        break;
      case 'priceLowest':
      default:
        sortOption = { price: 'asc' };
    }

    const where = {
      ownerId: userId,
      ...(keyword && {
        name: { contains: keyword, mode: 'insensitive' },
      }),
      ...(grade && { grade: Grades[grade] }),
      ...(type && { type: { has: type } }),
    };

    const card = await this.data.getUserPhotoCards(skip, take, sortOption, where);

    if (!card || card.totalCount === 0) {
      throw new AppError('포토카드가 없습니다.', 404);
    }

    return card;
  };

  getPhotoCardDetails = async (userId, cardId) => {
    const cardDetails = await this.data.getPhotoCardDetails(userId, cardId);

    if (!cardDetails) {
      throw new AppError('해당 포토 카드를 찾을 수 없습니다.', 404);
    }

    return cardDetails;
  };

  getExchangesByShopId = async (shopId: string, userId: string) => {
    const exchanges = await this.data.getExchangesByShopId(shopId, userId);

    if (!exchanges || exchanges.length === 0) {
      throw new AppError('교환 내역이 없습니다.', 404);
    }

    return exchanges;
  };

  createPhotoCard = async ({ ownerId, name, grade, type, price, quantity, image, description }) => {
    if (!name || !grade || !type || !price || !quantity || !image || !description) {
      throw new AppError('모든 필드를 입력해야 합니다.', 400);
    }

    const newCard = await this.data.createPhotoCard({
      ownerId,
      name,
      price,
      grade,
      quantity,
      type,
      description,
      image,
    });

    if (!newCard) {
      throw new AppError('포토카드 생성에 실패했습니다.', 500);
    }

    return newCard;
  };

  getMyCardsOnSale = async ({ userId, page, pageSize, keyword, grade, type, available, mode }) => {
    // 전체 데이터 가져오기
    const myShopCards = await this.data.getMyShopCards(userId, keyword, grade, type, available);
    const myExchangeCards = await this.data.getMyExchangeCards(userId, keyword, grade, type, available);

    if (!myShopCards.length && !myExchangeCards.length) {
      throw new AppError('판매 또는 교환 중인 카드가 없습니다.', 404);
    }

    // 데이터 합치기 (mode: shop/exchange 필터링)
    let myCards;
    if (mode === 'shop') {
      myCards = [...myShopCards];
    } else if (mode === 'exchange') {
      myCards = [...myExchangeCards];
    } else {
      myCards = [...myShopCards, ...myExchangeCards];
    }
    // 기본 최신순 정렬
    myCards.sort((a, b) => b.createdAt - a.createdAt);
    // 페이지네이션
    const start = (page - 1) * pageSize;
    const paginatedCards = myCards.slice(start, start + pageSize);

    return {
      totalCount: myCards.length,
      card: paginatedCards,
    };
  };
}
