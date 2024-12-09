import { assert } from 'superstruct';
import HttpStatus from '../utils/httpStatus.js';
import { ExchangeStruct } from '../utils/structs.js';

export class ExchangeController {
  service: any;
  constructor(exchangeService) {
    this.service = exchangeService;
  }

  createExchange = async (req, res) => {
    const { shopId } = req.params;
    const { buyerCardId, description } = req.body;
    const { userId } = req.auth;

    const data = { buyerCardId, description };
    assert(data, ExchangeStruct);

    const newExchange = await this.service.createExchange({
      shopId,
      buyerId: userId,
      buyerCardId,
      description,
    });
    return res.status(HttpStatus.CREATED).json(newExchange);
  };

  acceptExchange = async (req, res) => {
    const { exchangeId } = req.params;
    const { userId: sellerId } = req.auth;

    const approvedExchange = await this.service.acceptExchange(exchangeId, sellerId);
    return res.status(HttpStatus.SUCCESS).json(approvedExchange);
  };

  refuseExchange = async (req, res) => {
    const { exchangeId } = req.params;
    const { userId: sellerId } = req.auth;

    const deletedExchange = await this.service.refuseExchange(exchangeId, sellerId);
    return res.status(HttpStatus.NO_CONTENT).json({ message: '교환 제안을 거절했습니다.', data: deletedExchange });
  };

  cancelExchange = async (req, res) => {
    const { exchangeId } = req.params;
    const { userId: buyerId } = req.auth;

    const deletedExchange = await this.service.cancelExchange(exchangeId, buyerId);

    return res.status(HttpStatus.NO_CONTENT).json({ message: '교환 제안을 취소했습니다.', data: deletedExchange });
  };
}
