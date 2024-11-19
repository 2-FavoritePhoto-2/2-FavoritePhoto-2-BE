export class ShopService {
	data: any;
	constructor(shopRepository) {
		this.data = shopRepository;
	}

	getShopList = async ({ offset, limit, orderBy, keyword, filter }) => {
		const list = await this.data.getShopList(offset, limit, orderBy, keyword, filter);

		return list;
	};

	createShop = async data => {
		const newShop = await this.data.createShop(data);

		return newShop;
	};
}
