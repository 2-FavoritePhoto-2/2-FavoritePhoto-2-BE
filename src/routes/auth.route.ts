import express from 'express';
import { authController } from '../containers/auth.container.js';
import { verifyRefreshToken } from '../middlewares/verifyAuth.js';
import asyncHandler from '../middlewares/asyncHandler.js';

export const authRouter = express.Router();

authRouter.post('/signup', asyncHandler(authController.createUser));
authRouter.post('/login', asyncHandler(authController.getUser));
authRouter.post('/token/refresh', verifyRefreshToken, asyncHandler(authController.getNewToken));
