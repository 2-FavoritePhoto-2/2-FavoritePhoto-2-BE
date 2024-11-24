import express from 'express';
import { exchangeController } from '../containers/exchange.container.js';

export const exchangeRouter = express.Router();

exchangeRouter.post('/:shopId/exchange', exchangeController.createExchange);
exchangeRouter.post('/exchange/:exchangeId/accept', exchangeController.acceptExchange);
exchangeRouter.delete('/exchange/:exchangeId/refuse', exchangeController.refuseExchange);
exchangeRouter.delete('/exchange/:exchangeId/cancel', exchangeController.cancelExchange);
