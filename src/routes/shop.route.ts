import express from 'express';
import { shopController } from '../containers/shop.container.js';
import { verifyAccessToken, verifySeller } from '../utils/verifyAuth.js';

export const shopRouter = express.Router();

shopRouter.get('/cards', shopController.getShopList);
shopRouter.post('/cards', verifyAccessToken, shopController.createShop);
shopRouter.get('/cards/:shopId', shopController.getShopById);
shopRouter.patch('/cards/:shopId', verifyAccessToken, verifySeller, shopController.updateShop);
shopRouter.delete('/cards/:shopId', verifyAccessToken, verifySeller, shopController.deleteShop);
