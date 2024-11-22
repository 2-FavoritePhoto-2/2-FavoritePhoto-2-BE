import { Grades } from '@prisma/client';

interface Filter {
	type: 'grade' | 'type' | 'keyword';
	value: string | string[];
}

export class UserRepository {
	data: any;
	cardData: any;
	constructor(client) {
		this.data = client.User;
		this.cardData = client.Card;
	}

	// GET Id
	getUserId = async (id: string) => {
		const profile = await this.data.findUnique({
			where: { id },
		});

		return profile;
	};

	// GET 유저 포토카드 전체 조회
	getUserPhotoCards = async (userId: string, page, pageSize, orderBy, filter?: Filter) => {
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

		let where: {
			ownerId?: string;
			grade?: Grades;
			type?: { has: string[] };
			name?: { contains: string; mode: 'insensitive' };
		} = { ownerId: userId };

		if (filter) {
			if (filter.type === 'grade') {
				where.grade = filter.value as Grades;
			} else if (filter.type === 'type') {
				where.type = { has: filter.value as string[] };
			} else if (filter.type === 'keyword') {
				where.name = { contains: filter.value as string, mode: 'insensitive' };
			}
		}

		const cards = await this.cardData.findMany({
			where,
			...sortOption,
			skip: (page - 1) * pageSize,
			take: Number(pageSize),
		});

		const totalCount = await this.cardData.count({ where });

		return { totalCount, cards };
	};
}
