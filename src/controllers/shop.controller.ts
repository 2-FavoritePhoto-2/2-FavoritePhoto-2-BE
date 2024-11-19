import HttpStatus from '../utils/httpStatus.js';

export class ShopController {
	service: any;
	constructor(shopService) {
		this.service = shopService;
	}

	getShopList = async (req, res) => {
		const { offset = 1, limit = 10, orderBy = 'priceLowest', keyword = '', filter = '' } = req.query;

		try {
			const shops = await this.service.getShopList({
				offset,
				limit,
				orderBy,
				keyword: decodeURIComponent(keyword).trim(),
				filter,
			});
			res.status(HttpStatus.SUCCESS).json(shops);
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
		}
	};

	createShop = async (req, res) => {
		const newShop = await this.service.createShop(req.body);

		res.status(HttpStatus.CREATED).json(newShop);
	};
}
