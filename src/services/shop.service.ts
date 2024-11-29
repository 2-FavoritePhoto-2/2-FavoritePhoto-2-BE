import { Grades } from '@prisma/client';
import { prismaClient } from '../connection/connection.js';
import { sendNotification } from '../containers/notification.container.js';
import { createPointLog } from '../containers/points.container.js';

export class ShopService {
	data: any;
	constructor(shopRepository) {
		this.data = shopRepository;
	}

	getShopList = async ({ page, pageSize, orderBy, keyword, grade, type, available, exclude, by }) => {
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
								name: { contains: keyword, mode: 'insensitive' },
							},
						}
					: {},
				grade ? { card: { grade: Grades[grade] } } : {},
				type ? { card: { type: { has: type } } } : {},
				available !== undefined ? { available: available } : {},
				exclude ? { id: { not: exclude } } : {},
				by ? { sellerId: { equals: by } } : {},
			],
		};

		const shops = await this.data.getShopList(skip, take, sortOption, where);

		return shops;
	};

	createShop = async data => {
		const { quantity, ...rest } = data;
		const newShop = await this.data.createShop({
			totalQuantity: quantity,
			remainingQuantity: quantity,
			...rest,
		});

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

	createPurchase = async (shopId: string, buyerId: string, quantity: number, totalPrice: number) => {
		const newPurchase = await prismaClient.$transaction(async () => {
			const shop = await this.data.getShopById(shopId);

			if (!shop || shop.remainingQuantity < quantity) {
				throw new Error('구매 가능한 수량이 부족합니다!');
			}

			const buyerPoints = await this.data.updateUser(buyerId, totalPrice);
			const sellerPoints = await this.data.updateUser(shop.sellerId, -totalPrice);

			if (!buyerPoints) {
				throw new Error('구매 포인트가 부족합니다!');
			}

			const purchase = await this.data.purchase({
				quantity,
				totalPrice,
				buyerId,
				shopId,
			});

			await createPointLog(buyerId, -totalPrice, 'PURCHASE', { purchaseId: purchase.id });

			await createPointLog(shop.sellerId, totalPrice, 'SALE', { purchaseId: purchase.id });

			const updatedQuantity = shop.remainingQuantity - quantity;
			await this.data.updateShop(shopId, { remainingQuantity: updatedQuantity, available: updatedQuantity > 0 });

			const newCardData = {
				uploaderId: shop.card?.uploaderId,
				ownerId: buyerId,
				name: shop.card?.name,
				price: shop.card?.price,
				grade: shop.card?.grade,
				type: shop.card?.type,
				description: shop.card?.description,
				image: shop.card?.image,
				quantity,
			};
			await this.data.createPurchasedCard(newCardData);

			// 구매 완료 알림 to 구매자
			await sendNotification({
				type: 'BUY',
				recipientId: buyerId,
				content: `[${shop.card?.grade}|${shop.card?.name}] ${quantity}장을 성공적으로 구매했습니다.`,
			});

			return purchase;
		});

		return newPurchase;
	};
}
