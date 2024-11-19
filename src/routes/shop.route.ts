import express from 'express';
import { shopController } from '../containers/shop.container.js';

export const shopRouter = express.Router();

// shop 전체 리스트 가져오기
shopRouter.get('/cards', shopController.getShopList);
shopRouter.post('/cards', shopController.createShop);
