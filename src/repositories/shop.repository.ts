import { Grades } from '@prisma/client';

interface Filter {
	type: 'grade' | 'type' | 'available';
	value: string | string[] | boolean;
}

export class ShopRepository {
	data: any;
	constructor(client) {
		this.data = client.Shop;
	}

	// GET all
	getShopList = async (page, pageSize, orderBy, keyword, filter?: Filter) => {
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

		let where: {
			card?: {
				name?: { contains: string; mode: 'insensitive' };
				grade?: string;
				type?: { has: string[] };
			};
			available?: boolean;
		} = {};

		if (keyword) {
			where.card = { ...where.card, name: { contains: keyword, mode: 'insensitive' } };
		}

		if (filter) {
			if (filter.type === 'grade') {
				where.card = { ...where.card, grade: filter.value as Grades };
			} else if (filter.type === 'type') {
				where.card = { ...where.card, type: { has: filter.value as string[] } };
			} else if (filter.type === 'available') {
				where.available = filter.value as boolean;
			}
		}

		const list = await this.data.findMany({
			where,
			...sortOption,
			skip: (page - 1) * pageSize,
			take: Number(pageSize),
			include: { seller: true, card: true },
		});

		const totalCount = await this.data.count({ where });

		return { totalCount, list };
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
	getShopById = async id => {
		const shop = await this.data.findUnique({
			where: { id },
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
	createPurchase = async ({ id, data }) => {
		const purchase = await this.data.update({
			where: { id },
			data: {
				purchases: {
					create: {
						...data,
					},
				},
			},
			include: {
				purchases: true,
			},
		});

		return purchase;
	};
}
