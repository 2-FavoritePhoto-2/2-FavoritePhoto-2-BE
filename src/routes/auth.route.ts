import express from 'express';
import { authController } from '../containers/auth.container.js';
import { verifyRefreshToken } from '../utils/verifyAuth.js';
import asyncHandler from 'express-async-handler';

export const authRouter = express.Router();

authRouter.post('/signup', asyncHandler(authController.createUser));
authRouter.post('/login', asyncHandler(authController.getUser));
authRouter.post('/token/refresh', verifyRefreshToken, asyncHandler(authController.getNewToken));
