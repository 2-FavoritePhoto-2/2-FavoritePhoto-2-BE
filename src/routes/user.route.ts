import express from 'express';
import { userController } from '../containers/user.container.js';

export const userRouter = express.Router();

userRouter.get('/profile/:id', userController.getUserProfile);
