import { sendNotification } from '../containers/notification.container.js';

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

    // 교환 취소 알림 to 교환제시자
    const alertBuyer = await sendNotification({
      type: 'EXCHANGE',
      recipientId: exchange.buyerId,
      content: `${exchange.seller.nickname}님과의 [${exchange.sellerCard.grade}|${exchange.sellerCard.name}] 포토카드 교환이 거절되었습니다.`,
    });
    if (!alertBuyer) {
      throw new Error('거절 알림이 전달되지 않았습니다.');
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

    // 교환 취소 알림 to 판매자
    const buyer = await this.data.getNickname(buyerId);
    const alertSeller = await sendNotification({
      type: 'EXCHANGE',
      recipientId: exchange.sellerId,
      content: `${buyer.nickname}님이 [${exchange.sellerCard.grade}|${exchange.sellerCard.name}]의 포토카드 교환 신청을 취소했습니다.`,
    });
    if (!alertSeller) {
      throw new Error('취소 알림이 전달되지 않았습니다.');
    }

    return await this.data.cancelExchange(exchangeId);
  };
}
