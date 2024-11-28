export class ExchangeService {
	data: any;
	constructor(exchangeRepository) {
		this.data = exchangeRepository;
	}

	createExchange = async data => {
		const newExchange = await this.data.createExchange(data);

		return newExchange;
	};

	acceptExchange = async (exchangeId, sellerId) => {
		const exchange = await this.data.findExchangeById(exchangeId);

		if (!exchange) {
			throw new Error('교환 제안이 존재하지 않습니다.');
		}

		if (exchange.sellerId !== sellerId) {
			throw new Error('교환 제안을 승인할 권한이 없습니다.');
		}

		const approvedExchange = await this.data.acceptExchange(exchangeId);
		return approvedExchange;
	};

	refuseExchange = async (exchangeId, sellerId) => {
		const exchange = await this.data.findExchangeById(exchangeId);

		if (!exchange) {
			throw new Error('교환 제안이 존재하지 않습니다.');
		}

		if (exchange.sellerId !== sellerId) {
			throw new Error('교환 제안을 거절할 권한이 없습니다.');
		}

		return await this.data.refuseExchange(exchangeId);
	};

	cancelExchange = async (exchangeId, buyerId) => {
		const exchange = await this.data.findExchangeById(exchangeId);

		if (!exchange) {
			throw new Error('교환 제안이 존재하지 않습니다.');
		}

		if (exchange.buyerId !== buyerId) {
			throw new Error('교환 제안을 취소할 권한이 없습니다.');
		}
		return await this.data.cancelExchange(exchangeId);
	};
}
