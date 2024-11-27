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
}
