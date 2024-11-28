import express from 'express';
import { userController } from '../containers/user.container.js';
import { verifyAccessToken } from '../utils/verifyAuth.js';
import asyncHandler from '../utils/asyncHandler.js';
import upload from '../utils/upload.js';

export const userRouter = express.Router();

// 유저 프로필 가져오기
userRouter.get('/profile', verifyAccessToken, asyncHandler(userController.getUserProfile));

// 유저 포토 카드 전체 조회
userRouter.get('/cards', verifyAccessToken, asyncHandler(userController.getUserPhotoCards));

// 유저 포토 카드 상세 조회
userRouter.get('/cards/:cardId', verifyAccessToken, asyncHandler(userController.getPhotoCardDetails));

// 거래 제안 목록 조회
userRouter.get('/exchanges/:shopId', verifyAccessToken, asyncHandler(userController.getExchangesByShopId));

// 유저 포토 카드 등록
userRouter.post('/cards', verifyAccessToken, upload.single('image'), asyncHandler(userController.createPhotoCard));
