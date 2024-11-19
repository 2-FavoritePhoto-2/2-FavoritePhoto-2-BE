import { Grades } from '@prisma/client';

export class ShopRepository {
	data: any;
	constructor(client) {
		this.data = client.Shop;
	}

	// GET all
	getShopList = async (offset: number, limit: number, orderBy: string, keyword: string, filter: string) => {
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

	// totalCount
	getCount = async () => {
		const count = await this.data.count();

		return count;
	};

	// POST
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

	// GET by shopId
	getShopById = async shopId => {
		const shop = await this.data.findUnique({
			where: { id: shopId },
		});

		return shop;
	};

	// PATCH by shopId
	updateShop = async (id, data) => {
		const shop = await this.data.update({ where: { id }, data });

		return shop;
	};

	// DELETE by shopId
	deleteShop = async id => {
		const shop = await this.data.delete({ where: { id } });

		return shop;
	};

	// POST purchase by shopId
}
