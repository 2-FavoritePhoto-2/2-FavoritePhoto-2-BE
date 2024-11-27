import { Grades } from '@prisma/client';

interface Filter {
	type: 'grade' | 'type' | 'keyword';
	value: string | string[];
}

export class UserRepository {
	data: any;
	shopId: any;
	constructor(client) {
		this.data = client.User;
		this.shopId = client.Shop;
	}

	// GET Id
	getUserId = async (userId: string) => {
		const profile = await this.data.findUnique({
			where: { id: userId },
		});

		return profile;
	};

	// GET 유저 포토카드 전체 조회
	getUserPhotoCards = async (userId: string, page, pageSize, orderBy, filter?: Filter) => {
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

		// 관계 필드 myCards를 활용하여 데이터 조회
		const userWithCards = await this.data.findUnique({
			where: { id: userId },
			select: {
				myCards: {
					where: filter
						? {
								...(filter.type === 'grade' && { grade: filter.value as Grades }),
								...(filter.type === 'type' && { type: { has: filter.value as string[] } }),
								...(filter.type === 'keyword' && { name: { contains: filter.value as string, mode: 'insensitive' } }),
							}
						: undefined,
					orderBy: sortOption,
					skip: (page - 1) * pageSize,
					take: Number(pageSize),
				},
				_count: {
					select: {
						myCards: true,
					},
				},
			},
		});

		if (!userWithCards) {
			throw new Error('User not found');
		}

		// 전체 개수는 _count 필드에서 가져옴
		const totalCount = userWithCards._count.myCards;

		return { totalCount, card: userWithCards.myCards };
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
		const shopDetails = await this.shopId.findUnique({
			where: { id: shopId },
			include: {
				Exchange: {
					include: {
						buyer: true,
						buyerCard: {
							include: {
								owner: true, // 카드 소유자 정보 포함
							},
						},
					},
				},
			},
		});

		if (!shopDetails) {
			throw new Error('Shop not found');
		}

		const exchanges = shopDetails.Exchange;

		if (shopDetails.sellerId === userId) {
			// 판매자 관점
			return exchanges.map(exchange => ({
				buyerId: exchange.buyerId,
				buyerNickname: exchange.buyer?.nickname,
				buyerCard: {
					name: exchange.buyerCard?.name,
					grade: exchange.buyerCard?.grade,
					type: exchange.buyerCard?.type,
					description: exchange.buyerCard?.description,
					image: exchange.buyerCard?.image,
					price: exchange.buyerCard?.price, // 카드 가격
					ownerNickname: exchange.buyerCard?.owner?.nickname, // 카드 소유자 닉네임
				},
			}));
		} else {
			// 구매자 관점
			const userExchanges = exchanges.filter(exchange => exchange.buyerId === userId);

			if (userExchanges.length === 0) {
				throw new Error('Exchange request not found for the user');
			}

			// 요청한 모든 교환을 배열로 반환
			return userExchanges.map(exchange => ({
				buyerId: exchange.buyerId,
				buyerCard: {
					name: exchange.buyerCard?.name,
					grade: exchange.buyerCard?.grade,
					type: exchange.buyerCard?.type,
					description: exchange.buyerCard?.description,
					image: exchange.buyerCard?.image,
					price: exchange.buyerCard?.price, // 카드 가격
					ownerNickname: exchange.buyerCard?.owner?.nickname, // 카드 소유자 닉네임
				},
			}));
		}
	};
}
