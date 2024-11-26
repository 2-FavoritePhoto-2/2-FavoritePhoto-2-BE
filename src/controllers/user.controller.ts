import HttpStatus from '../utils/httpStatus.js';

export class UserController {
	service: any;
	constructor(userService) {
		this.service = userService;
	}

	// GET /user/profile/:id
	getUserProfile = async (req, res) => {
		try {
			const userId = req.auth.userId;
			const profile = await this.service.getUserProfile(userId);
			if (!userId) {
				throw new Error('해당 유저 정보를 찾을 수 없습니다.');
			}
			res.status(HttpStatus.SUCCESS).json(profile);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
		}
	};

	// GET /user/cards
	getUserPhotoCards = async (req, res) => {
		const { page = 1, pageSize = 10, orderBy = 'priceLowest', filter } = req.query;
		const userId = req.auth.userId;

		try {
			const card = await this.service.getUserPhotoCards({
				userId,
				page,
				pageSize,
				orderBy,
				filter,
			});
			res.status(HttpStatus.SUCCESS).json(card);
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
		}
	};
}
