import express from 'express';
import { exchangeController } from '../containers/exchange.container.js';
import { verifyAccessToken } from '../utils/verifyAuth.js';
import asyncHandler from '../utils/asyncHandler.js';

export const exchangeRouter = express.Router();

exchangeRouter.post('/:shopId/exchange', verifyAccessToken, asyncHandler(exchangeController.createExchange));
exchangeRouter.post('/exchange/:exchangeId/accept', verifyAccessToken, asyncHandler(exchangeController.acceptExchange));
exchangeRouter.delete('/exchange/:exchangeId/refuse', verifyAccessToken, asyncHandler(exchangeController.refuseExchange));
exchangeRouter.delete('/exchange/:exchangeId/cancel', verifyAccessToken, asyncHandler(exchangeController.cancelExchange));
