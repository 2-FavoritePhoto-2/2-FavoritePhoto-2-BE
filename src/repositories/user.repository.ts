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
			},
		});

		if (!exchanges || exchanges.length === 0) {
			throw new Error('No exchanges found for this shop');
		}

		// 판매자 ID를 따로 확인하기 위해 첫 번째 교환에서 참조
		const sellerId = exchanges[0]?.sellerId;

		if (sellerId === userId) {
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
