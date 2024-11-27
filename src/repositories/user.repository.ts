export class UserRepository {
	data: any;
	prisma: any;
	constructor(client) {
		this.data = client.User;
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
}
