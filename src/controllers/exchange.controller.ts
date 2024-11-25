import HttpStatus from '../utils/httpStatus.js';

export class ExchangeController {
	service: any;
	constructor(exchangeService) {
		this.service = exchangeService;
	}

	createExchange = async (req, res) => {
		const { shopId } = req.params;
		const { buyerCardId, description } = req.body;
		const { userId } = req.auth;

		try {
			const newExchange = await this.service.createExchange({
				shopId,
				buyerId: userId,
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
		const { userId: sellerId } = req.auth;

		try {
			const approvedExchange = await this.service.acceptExchange(exchangeId, sellerId);
			return res.status(HttpStatus.SUCCESS).json(approvedExchange);
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ message: error.message || '서버 오류가 발생했습니다.', details: error.stack });
		}
	};

	refuseExchange = async (req, res) => {
		const { exchangeId } = req.params;
		const { userId: sellerId } = req.auth;

		try {
			const deletedExchange = await this.service.refuseExchange(exchangeId, sellerId);
			return res.status(HttpStatus.NO_CONTENT).json({ message: '교환 제안을 거절했습니다.', data: deletedExchange });
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ message: '교환 제안을 거절할 수 없습니다.', error: error.message });
		}
	};

	cancelExchange = async (req, res) => {
		const { exchangeId } = req.params;
		const { userId: buyerId } = req.auth;

		try {
			const deletedExchange = await this.service.cancelExchange(exchangeId, buyerId);

			return res.status(HttpStatus.NO_CONTENT).json({ message: '교환 제안을 취소했습니다.', data: deletedExchange });
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ message: '교환 제안을 취소할 수 없습니다.', error: error.message });
		}
	};
}
