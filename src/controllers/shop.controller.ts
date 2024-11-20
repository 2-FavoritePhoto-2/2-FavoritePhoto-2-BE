import HttpStatus from '../utils/httpStatus.js';

export class ShopController {
	service: any;
	constructor(shopService) {
		this.service = shopService;
	}

	getShopList = async (req, res) => {
		const { page = 1, pageSize = 10, orderBy = 'priceLowest', keyword = '', filter } = req.query;

		try {
			const shops = await this.service.getShopList({
				page,
				pageSize,
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
		try {
			const newShop = await this.service.createShop(req.body);
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

		try {
			const shop = await this.service.getShopById(shopId);
			if (!shop) {
				throw new Error('해당 판매 정보를 찾을 수 없습니다');
			}
			res.status(HttpStatus.SUCCESS).json(shop);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
		}
	};

	updateShop = async (req, res) => {
		const { shopId } = req.params;

		try {
			const shop = await this.service.updateShop(shopId, req.body);
			if (!shop) {
				return res.status(HttpStatus.NOT_FOUND).json({ error: '해당 판매 정보를 찾을 수 없습니다' });
			}
			res.status(HttpStatus.SUCCESS).json(shop);
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
		}
	};

	deleteShop = async (req, res) => {
		const { shopId } = req.params;

		try {
			const shop = await this.service.deleteShop(shopId);
			if (!shop) {
				return res.status(HttpStatus.NOT_FOUND).json({ message: '해당 판매 정보를 찾을 수 없습니다' });
			}
			res.status(HttpStatus.NO_CONTENT).json(shop);
		} catch (error) {
			res.status(HttpStatus.BAD_REQUEST).json({ error: error.message });
		}
	};
}
