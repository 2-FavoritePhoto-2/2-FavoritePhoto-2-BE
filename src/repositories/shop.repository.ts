import { Grades } from '@prisma/client';

interface Filter {
	type: 'grade' | 'type' | 'available';
	value: string | string[] | boolean;
}

export class ShopRepository {
	data: any;
	prisma: any;
	constructor(client) {
		this.data = client.Shop;
		this.prisma = client;
	}

	// GET all
	getShopList = async (page, pageSize, orderBy, keyword?, filter?: Filter, exclude?) => {
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
			id?: { not: string };
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

		if (exclude) {
			where.id = { not: exclude };
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
			include: { seller: true, card: true },
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
	purchase = async data => {
		const purchase = await this.prisma.purchase.create({
			data,
		});

		return purchase;
	};

	updateUser = async (userId: string, totalPrice: number, action: 'decrement' | 'increment') => {
		const updateData: { point: { decrement?: number; increment?: number } } = { point: {} };

		// 차감 혹은 적립
		if (action === 'decrement') {
			updateData.point = { decrement: totalPrice }; // 포인트 차감
		} else if (action === 'increment') {
			updateData.point = { increment: totalPrice }; // 포인트 적립
		}

		// 사용자 정보 업데이트
		const user = await this.prisma.user.update({
			where: { id: userId },
			data: updateData,
		});

		return user;
	};

	createPurchasedCard = async cards => {
		const newCard = await this.prisma.card.createMany({
			data: cards,
		});

		return newCard;
	};

	createPointLog = async ({ userId, amount, action, metaData }) => {
		const pointLog = await this.prisma.pointLog.create({
			data: {
				userId,
				amount,
				action,
				metaData,
			},
		});
		return pointLog;
	};
}
