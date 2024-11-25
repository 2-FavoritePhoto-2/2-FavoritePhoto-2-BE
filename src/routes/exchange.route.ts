import express from 'express';
import { exchangeController } from '../containers/exchange.container.js';
import { verifyAccessToken } from '../utils/verifyAuth.js';

export const exchangeRouter = express.Router();

exchangeRouter.post('/:shopId/exchange', verifyAccessToken, exchangeController.createExchange);
exchangeRouter.post('/exchange/:exchangeId/accept', verifyAccessToken, exchangeController.acceptExchange);
exchangeRouter.delete('/exchange/:exchangeId/refuse', verifyAccessToken, exchangeController.refuseExchange);
exchangeRouter.delete('/exchange/:exchangeId/cancel', verifyAccessToken, exchangeController.cancelExchange);
