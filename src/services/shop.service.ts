import { Grades } from '@prisma/client';

export class ShopService {
	data: any;
	constructor(shopRepository) {
		this.data = shopRepository;
	}

	getShopList = async ({ page, pageSize, orderBy, keyword, grade, type, available, exclude }) => {
		const skip = (page - 1) * pageSize;
		const take = Number(pageSize);

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

		const where = {
			AND: [
				keyword
					? {
							card: {
								OR: [
									{ name: { contains: keyword, mode: 'insensitive' } },
									{ description: { contains: keyword, mode: 'insensitive' } },
								],
							},
						}
					: {},
				grade ? { card: { grade: Grades[grade] } } : {},
				type ? { card: { type: { has: type } } } : {},
				available !== undefined ? { available: available } : {},
				exclude ? { id: { not: exclude } } : {},
			],
		};

		const shops = await this.data.getShopList(skip, take, sortOption, where);

		return shops;
	};

	createShop = async data => {
		const newShop = await this.data.createShop(data);

		return newShop;
	};

	getShopById = async id => {
		const shop = await this.data.getShopById(id);

		return shop;
	};

	updateShop = async (id, data) => {
		const shop = await this.data.updateShop(id, data);

		return shop;
	};

	deleteShop = async id => {
		const shop = await this.data.deleteShop(id);

		return shop;
	};
}
