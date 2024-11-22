import express from 'express';
import asyncHandler from 'express-async-handler';
import { shopController } from '../containers/shop.container.js';
import { verifyAccessToken, verifySeller } from '../utils/verifyAuth.js';

export const shopRouter = express.Router();

shopRouter.get('/', asyncHandler(shopController.getShopList));
shopRouter.post('/', verifyAccessToken, asyncHandler(shopController.createShop));
shopRouter.get('/:shopId', asyncHandler(shopController.getShopById));
shopRouter.patch('/:shopId', verifyAccessToken, verifySeller, asyncHandler(shopController.updateShop));
shopRouter.delete('/:shopId', verifyAccessToken, verifySeller, asyncHandler(shopController.deleteShop));
