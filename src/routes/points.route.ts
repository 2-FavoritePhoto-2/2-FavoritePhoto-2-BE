import express from 'express';
import { pointsController } from '../containers/points.container.js';
import { verifyAccessToken } from '../utils/verifyAuth.js';

export const pointRouter = express.Router();

// 랜덤 상자 뽑기
pointRouter.post('/box', verifyAccessToken, pointsController.drawRandomBox);

// 유저 마지막 뽑기 시간 조회
pointRouter.get('/last-draw-time', verifyAccessToken, pointsController.getLastDrawTime);
