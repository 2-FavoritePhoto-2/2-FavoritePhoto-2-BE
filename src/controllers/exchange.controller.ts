import HttpStatus from '../utils/httpStatus.js';

export class ExchangeController {
	service: any;
	constructor(exchangeService) {
		this.service = exchangeService;
	}

	createExchange = async (req, res) => {
		const { shopId } = req.params;
		const { sellerId, buyerId, sellerCardId, buyerCardId, description } = req.body;

		try {
			const newExchange = await this.service.createExchange({
				shopId,
				sellerId,
				buyerId,
				sellerCardId,
				buyerCardId,
				description,
			});
			return res.status(HttpStatus.CREATED).json(newExchange);
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ message: '교환 제안 생성에 실패했습니다.', error: error.message });
		}
	};

	acceptExchange = async (req, res) => {
		const { exchangeId } = req.params;

		try {
			const approvedExchange = await this.service.acceptExchange(exchangeId);
			return res.status(HttpStatus.SUCCESS).json(approvedExchange);
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ message: error.message || '서버 오류가 발생했습니다.', details: error.stack });
		}
	};
}
