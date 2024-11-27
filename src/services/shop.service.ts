import { prismaClient } from '../connection/connection.js';

export class ShopService {
	data: any;
	constructor(shopRepository) {
		this.data = shopRepository;
	}

	getShopList = async ({ page, pageSize, orderBy, keyword, filter, exclude }) => {
		const shops = await this.data.getShopList(page, pageSize, orderBy, keyword, filter, exclude);

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

	createPurchase = async (shopId: string, buyerId: string, quantity: number, totalPrice: number) => {
		const newPurchase = await prismaClient.$transaction(async () => {
			const shop = await this.data.getShopById(shopId);

			if (!shop || shop.remainingQuantity < quantity) {
				throw new Error('구매 가능한 수량이 부족합니다!');
			}

			const usePoints = await this.data.updateUser(buyerId, totalPrice);

			const purchase = await this.data.purchase({
				quantity,
				totalPrice,
				buyerId,
				shopId,
			});

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

			return purchase;
		});

		return newPurchase;
	};
}
