import { Grades } from '@prisma/client';

export class UserService {
	data: any;
	constructor(userRepository) {
		this.data = userRepository;
	}

	getUserProfile = async userId => {
		const profile = await this.data.getUserId(userId);

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
				OR: [{ name: { contains: keyword, mode: 'insensitive' } }, { description: { contains: keyword, mode: 'insensitive' } }],
			}),
			...(grade && { grade: Grades[grade] }),
			...(type && { type: { has: type } }),
		};

		const card = await this.data.getUserPhotoCards(skip, take, sortOption, where);

		return card;
	};

	getPhotoCardDetails = async (userId, cardId) => {
		const cardDetails = await this.data.getPhotoCardDetails(userId, cardId);
		return cardDetails;
	};

	getExchangesByShopId = async (shopId: string, userId: string) => {
		const exchanges = await this.data.getExchangesByShopId(shopId, userId);
		return exchanges;
	};

	getMyCardsOnSale = async ({ userId, page, pageSize, keyword, grade, type, available, mode }) => {
		// 전체 데이터 가져오기
		const myShopCards = await this.data.getMyShopCards(userId, keyword, grade, type, available);
		const myExchangeCards = await this.data.getMyExchangeCards(userId, keyword, grade, type, available);

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
