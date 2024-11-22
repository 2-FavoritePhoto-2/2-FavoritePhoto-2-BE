export class ExchangeService {
	data: any;
	constructor(exchangeRepository) {
		this.data = exchangeRepository;
	}

	createExchange = async data => {
		const newExchange = await this.data.createExchange(data);

		return newExchange;
	};

	acceptExchange = async exchangeId => {
		const approvedExchange = await this.data.acceptExchange(exchangeId);
		return approvedExchange;
	};
}
