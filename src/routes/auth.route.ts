import express from 'express';
import { authController } from '../containers/auth.container.js';
import { verifyRefreshToken } from '../utils/verifyAuth.js';

export const authRouter = express.Router();

authRouter.post('/signup', authController.createUser);
authRouter.get('/login', authController.getUser);
authRouter.post('/token/refresh', verifyRefreshToken, authController.getNewToken);
