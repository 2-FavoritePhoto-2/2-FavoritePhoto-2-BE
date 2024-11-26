export class ExchangeRepository {
	data: any;
	prisma: any; // prismaClient를 여기서 관리
	constructor(client) {
		this.data = client.Exchange;
		this.prisma = client;
	}
	createExchange = async data => {
		const { shopId, buyerId, buyerCardId, description } = data;
		const sellerCardInfo = await this.prisma.Shop.findUnique({ where: { id: shopId } });
		const { sellerId, cardId: sellerCardId } = sellerCardInfo;
		const newExchange = await this.data.create({
			data: {
				shopId,
				sellerId,
				buyerId,
				sellerCardId,
				buyerCardId,
				description,
			},
		});
		return newExchange;
	};

	acceptExchange = async exchangeId => {
		const exchange = await this.data.findUnique({ where: { id: exchangeId } });

		const { shopId, sellerId, buyerId, sellerCardId, buyerCardId } = exchange;

		const approvedExchange = await this.prisma.$transaction(async prisma => {
			// shop에서 quantity 1 감소
			await prisma.Shop.update({
				where: { id: shopId },
				data: { remainingQuantity: { decrement: 1 } },
			});

			// buyerCard quantity 1 감소
			await prisma.Card.update({
				where: { id: buyerCardId },
				data: { quantity: { decrement: 1 } },
			});

			// sellerId로 card생성
			const buyerCardInfo = await prisma.Card.findUnique({ where: { id: buyerCardId } });

			await prisma.Card.create({
				data: {
					uploaderId: buyerCardInfo.uploaderId,
					name: buyerCardInfo.name,
					grade: buyerCardInfo.grade,
					type: buyerCardInfo.type,
					description: buyerCardInfo.description,
					image: buyerCardInfo.image,
					price: buyerCardInfo.price,
					ownerId: sellerId,
					quantity: 1,
				},
			});

			// buyerId로 card생성
			const sellerCardInfo = await prisma.Card.findUnique({ where: { id: sellerCardId } });

			await prisma.Card.create({
				data: {
					uploaderId: sellerCardInfo.uploaderId,
					name: sellerCardInfo.name,
					grade: sellerCardInfo.grade,
					type: sellerCardInfo.type,
					description: sellerCardInfo.description,
					image: sellerCardInfo.image,
					price: sellerCardInfo.price,
					ownerId: buyerId,
					quantity: 1,
				},
			});

			//교환 제안 승인 상태로 업데이트
			return await prisma.Exchange.update({
				where: { id: exchangeId },
				data: { complete: true },
			});
		});
		return approvedExchange;
	};

	// 교환 제안 거절
	refuseExchange = async exchangeId => {
		const deletedExchange = await this.data.delete({ where: { id: exchangeId } });
		return deletedExchange;
	};

	// 교환 제안 취소
	cancelExchange = async exchangeId => {
		const deletedExchange = await this.data.delete({ where: { id: exchangeId } });
		return deletedExchange;
	};

	findExchangeById = async exchangeId => {
		return await this.data.findUnique({ where: { id: exchangeId } });
	};
}
