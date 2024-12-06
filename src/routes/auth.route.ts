import express from 'express';
import { authController } from '../containers/auth.container.js';
import { verifyRefreshToken } from '../middleware/verifyAuth.js';
import asyncHandler from '../middleware/asyncHandler.js';

export const authRouter = express.Router();

authRouter.post('/signup', asyncHandler(authController.createUser));
authRouter.post('/login', asyncHandler(authController.getUser));
authRouter.post('/token/refresh', verifyRefreshToken, asyncHandler(authController.getNewToken));
