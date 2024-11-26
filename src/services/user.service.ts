export class UserService {
	data: any;
	constructor(userRepository) {
		this.data = userRepository;
	}

	getUserProfile = async userId => {
		const profile = await this.data.getUserId(userId);

		return { nickname: profile.nickname, point: profile.point };
	};

	getUserPhotoCards = async ({ userId, page, pageSize, orderBy, filter }) => {
		const card = await this.data.getUserPhotoCards(userId, page, pageSize, orderBy, filter);

		return card;
	};
}
