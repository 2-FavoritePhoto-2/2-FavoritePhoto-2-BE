import { Grades } from '@prisma/client';

export class ShopRepository {
	data: any;
	constructor(client) {
		this.data = client.Shop;
	}

	// GET all
	getShopList = async ({ offset, limit, orderBy, keyword, filter }) => {
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
			...(keyword
				? {
						card: { name: { contains: keyword, mode: 'insensitive' } },
					}
				: undefined),
		};

		const shops = await this.data.findMany({
			...where,
			...sortOption,
			offset,
			limit,
			include: { seller: true, card: true },
		});

		return shops;
	};

	// GET by shopId
	createShop = async data => {
		const { grade, ...rest } = data;

		const newShop = await this.data.create({
			data: {
				grade: grade as Grades,
				...rest,
			},
		});

		return newShop;
	};

	// POST by shopId

	// PATCH by shopId

	// DELETE by shopId

	// POST purchase by shopId
}
