import express from 'express';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pointRouter } from './points.route.js';
import { userRouter } from './user.route.js';
import { authRouter } from './auth.route.js';
import { shopRouter } from './shop.route.js';
import { exchangeRouter } from './exchange.route.js';
import { notificationRouter } from './notification.route.js';

export const appRouter = express.Router();

// Routes: 각 엔드포인트는 라우터로 연결
appRouter.use('/points', pointRouter);
appRouter.use('/user', userRouter);
appRouter.use('/auth', authRouter);
appRouter.use('/shop', shopRouter);
appRouter.use('/cards', exchangeRouter);
appRouter.use('/notifications', notificationRouter);

// swagger
const specs = YAML.load(path.join(path.dirname(fileURLToPath(import.meta.url)), '../swagger/swagger.yaml'));
appRouter.use('/docs', swaggerUI.serve, swaggerUI.setup(specs));
