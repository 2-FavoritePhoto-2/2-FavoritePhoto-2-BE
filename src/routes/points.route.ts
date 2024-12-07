import express from 'express';
import { pointsController } from '../containers/points.container.js';
import { verifyAccessToken } from '../middlewares/verifyAuth.js';
import asyncHandler from '../middlewares/asyncHandler.js';

export const pointRouter = express.Router();

// 랜덤 상자 뽑기
pointRouter.post('/box', verifyAccessToken, asyncHandler(pointsController.drawRandomBox));

// 유저 마지막 뽑기 시간 조회
pointRouter.get('/last-draw-time', verifyAccessToken, asyncHandler(pointsController.getLastDrawTime));

//포인트 로그 조회
pointRouter.get('/logs', verifyAccessToken, asyncHandler(pointsController.getPointLogs));
