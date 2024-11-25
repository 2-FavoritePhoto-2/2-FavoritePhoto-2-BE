import { Grades } from '@prisma/client';

interface Filter {
	type: 'grade' | 'type' | 'keyword';
	value: string | string[];
}

export class UserRepository {
	data: any;
	constructor(client) {
		this.data = client.User;
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
}
