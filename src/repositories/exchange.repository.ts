export class ExchangeRepository {
	data: any;
	constructor(client) {
		this.data = client.Exchange;
	}
	createExchange = async (shopId, sellerId, buyerId, sellerCardId, buyerCardId, description) => {
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
}
