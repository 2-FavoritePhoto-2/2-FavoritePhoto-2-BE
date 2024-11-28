import express from 'express';
import { userController } from '../containers/user.container.js';
import { verifyAccessToken } from '../utils/verifyAuth.js';

export const userRouter = express.Router();

// 유저 프로필 가져오기
userRouter.get('/profile', verifyAccessToken, userController.getUserProfile);

// 유저 포토 카드 전체 조회
userRouter.get('/cards', verifyAccessToken, userController.getUserPhotoCards);

// 유저 포토 카드 상세 조회
userRouter.get('/cards/:cardId', verifyAccessToken, userController.getPhotoCardDetails);

// 거래 제안 목록 조회
userRouter.get('/exchanges/:shopId', verifyAccessToken, userController.getExchangesByShopId);
