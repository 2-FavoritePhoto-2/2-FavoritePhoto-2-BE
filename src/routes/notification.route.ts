import express from 'express';
import { notificationController } from '../containers/notification.container.js';
import { verifyAccessToken } from '../middlewares/verifyAuth.js';
import asyncHandler from '../middlewares/asyncHandler.js';

export const notificationRouter = express.Router();

notificationRouter.get('/', verifyAccessToken, asyncHandler(notificationController.getNotification));
notificationRouter.patch('/:id', verifyAccessToken, asyncHandler(notificationController.updateNotification));
