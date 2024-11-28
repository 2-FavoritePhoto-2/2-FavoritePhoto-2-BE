import HttpStatus from '../utils/httpStatus.js';

export class UserController {
	service: any;
	constructor(userService) {
		this.service = userService;
	}

	// GET /user/profile
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
		const { page = 1, pageSize = 10, orderBy = 'priceLowest', keyword = '', grade, type } = req.query;
		const userId = req.auth.userId;

		try {
			const card = await this.service.getUserPhotoCards({
				userId,
				page,
				pageSize,
				orderBy,
				keyword: decodeURIComponent(keyword).trim(),
				grade,
				type,
			});
			res.status(HttpStatus.SUCCESS).json(card);
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
		}
	};

	// GET /user/cards/:cardId
	getPhotoCardDetails = async (req, res) => {
		const userId = req.auth.userId;
		const { cardId } = req.params;

		try {
			const cardDetails = await this.service.getPhotoCardDetails(userId, cardId);
			res.status(HttpStatus.SUCCESS).json(cardDetails);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
		}
	};

	// GET /user/exchanges/:shopId
	getExchangesByShopId = async (req, res) => {
		const userId = req.auth.userId;
		const { shopId } = req.params;

		try {
			const exchanges = await this.service.getExchangesByShopId(shopId, userId);
			res.status(HttpStatus.SUCCESS).json(exchanges);
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
		}
	};
}
