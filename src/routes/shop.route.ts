import express from 'express';
import { shopController } from '../containers/shop.container.js';
import { verifyAccessToken, verifySeller } from '../utils/verifyAuth.js';

export const shopRouter = express.Router();

shopRouter.get('/', shopController.getShopList);
shopRouter.post('/', verifyAccessToken, shopController.createShop);
shopRouter.get('/:shopId', shopController.getShopById);
shopRouter.patch('/:shopId', verifyAccessToken, verifySeller, shopController.updateShop);
shopRouter.delete('/:shopId', verifyAccessToken, verifySeller, shopController.deleteShop);
shopRouter.post('/:shopId/purchase', verifyAccessToken, shopController.createPurchase);
