import express from 'express';
import { pointsController } from '../containers/points.container.js';

export const pointRouter = express.Router();

// 랜덤 상자 뽑기
pointRouter.post('/box', pointsController.drawRandomBox);

// 유저 마지막 뽑기 시간 조회
pointRouter.get('/last-draw-time', pointsController.getLastDrawTime);
