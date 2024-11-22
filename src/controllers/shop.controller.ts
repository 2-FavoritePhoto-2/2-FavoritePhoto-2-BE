import HttpStatus from '../utils/httpStatus.js';

export class ShopController {
	service: any;
	constructor(shopService) {
		this.service = shopService;
	}

	getShopList = async (req, res) => {
		const { page = 1, pageSize = 10, orderBy = 'priceLowest', keyword = '', filter, exclude = '' } = req.query;

		const shops = await this.service.getShopList({
			page,
			pageSize,
			orderBy,
			keyword: decodeURIComponent(keyword).trim(),
			filter,
			exclude,
		});
		res.status(HttpStatus.SUCCESS).json(shops);
	};

	createShop = async (req, res) => {
		try {
			const { userId } = req.auth;
			const newShop = await this.service.createShop({ ...req.body, sellerId: userId });
			if (!newShop) {
				throw new Error('판매 등록에 실패했습니다');
			}
			res.status(HttpStatus.CREATED).json(newShop);
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
		}
	};

	getShopById = async (req, res) => {
		const { shopId } = req.params;

		const shop = await this.service.getShopById(shopId);
		if (!shop) {
			throw new Error('해당 판매 정보를 찾을 수 없습니다');
		}
		res.status(HttpStatus.SUCCESS).json(shop);
	};

	updateShop = async (req, res) => {
		const { shopId } = req.params;

		const { userId } = req.auth;
		const shop = await this.service.updateShop(shopId, { ...req.body, sellerId: userId });
		if (!shop) {
			return res.status(HttpStatus.NOT_FOUND).json({ error: '해당 판매 정보를 찾을 수 없습니다' });
		}
		res.status(HttpStatus.SUCCESS).json(shop);
	};

	deleteShop = async (req, res) => {
		const { shopId } = req.params;

		const shop = await this.service.deleteShop(shopId);
		if (!shop) {
			return res.status(HttpStatus.NOT_FOUND).json({ message: '해당 판매 정보를 찾을 수 없습니다' });
		}
		res.status(HttpStatus.NO_CONTENT).json(shop);
	};
}
