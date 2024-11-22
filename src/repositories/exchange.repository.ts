export class ExchangeRepository {
	data: any;
	prisma: any; // prismaClient를 여기서 관리
	constructor(client) {
		this.data = client.Exchange;
		this.prisma = client;
	}
	createExchange = async data => {
		const { shopId, sellerId, buyerId, sellerCardId, buyerCardId, description } = data;
		try {
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
		} catch (error) {
			throw new Error('교환 제안 생성 실패');
		}
	};

	acceptExchange = async exchangeId => {
		const exchange = await this.data.findUnique({ where: { id: exchangeId } });
		if (!exchange) {
			throw new Error('교환 제안이 존재하지 않습니다.');
		}

		const { shopId, sellerId, buyerId, sellerCardId, buyerCardId } = exchange;

		try {
			const approvedExchange = await this.prisma.$transaction(async prisma => {
				// shop에서 quantity 1 감소
				await prisma.Shop.update({
					where: { id: shopId },
					data: { quantity: { decrement: 1 } },
				});

				// buyerCard quantity 1 감소
				await prisma.Card.update({
					where: { id: buyerCardId },
					data: { remainingQuantity: { decrement: 1 } },
				});

				// sellerId로 card생성
				const buyerCardInfo = await prisma.Card.findUnique({ where: { id: buyerCardId } });
				if (!buyerCardInfo) {
					throw new Error('구매자 카드 정보가 없습니다.');
				}

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
						totalQuantity: 1,
						remainingQuantity: 1,
					},
				});

				// buyerId로 card생성
				const sellerCardInfo = await prisma.Card.findUnique({ where: { id: sellerCardId } });
				if (!sellerCardInfo) {
					throw new Error('구매자 카드 정보가 없습니다.');
				}

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
						totalQuantity: 1,
						remainingQuantity: 1,
					},
				});

				//교환 제안 승인 상태로 업데이트
				return await prisma.Exchange.update({
					where: { id: exchangeId },
					data: { complete: true },
				});
			});
			return approvedExchange;
		} catch (error) {
			console.error('트랜잭션 에러:', error.message);
			throw new Error('교환 작업 중 문제가 발생했습니다.');
		}
	};
}
