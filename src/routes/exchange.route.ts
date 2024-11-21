import express from 'express';
import { exchangeController } from '../containers/exchange.container.js';

export const exchangeRouter = express.Router();

exchangeRouter.post('/:shopId/exchange', exchangeController.createExchange);
