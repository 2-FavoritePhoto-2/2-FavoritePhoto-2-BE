export class UserService {
	data: any;
	constructor(userRepository) {
		this.data = userRepository;
	}

	getUserProfile = async id => {
		const profile = await this.data.getUserId(id);

		return { nickname: profile.nickname, point: profile.point };
	};

	getUserPhotoCards = async ({ userId, page, pageSize, orderBy, filter }) => {
		const cards = await this.data.getUserPhotoCards(userId, page, pageSize, orderBy, filter);

		return cards;
	};
}
