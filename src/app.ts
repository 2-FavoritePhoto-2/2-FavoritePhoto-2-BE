import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import YAML from 'yamljs';
import { exampleRouter } from './routes/example.route.js';
import { pointRouter } from './routes/points.route.js';
import { StructError } from 'superstruct';
import { userRouter } from './routes/user.route.js';
import { authRouter } from './routes/auth.route.js';
import { shopRouter } from './routes/shop.route.js';
import { exchangeRouter } from './routes/exchange.route.js';
import ErrorHandler from './utils/errors.js';
import { notificationRouter } from './routes/notification.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
// CORS 설정: 모든 Origin 허용하고, Credential 활성화
app.use(
  cors({
    origin: (origin: any, callback: (error: null, allow: boolean) => void) => {
      callback(null, true);
    },
    credentials: true,
  }),
);

// swagger
const specs = YAML.load(path.join(path.dirname(fileURLToPath(import.meta.url)), './swagger/swagger.yaml'));
app.use('/api', swaggerUI.serve, swaggerUI.setup(specs));
app.use(express.json());
app.use(cookieParser());

// Routes: 각 엔드포인트는 라우터로 연결
app.use('/examples', exampleRouter);
app.use('/points', pointRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/shop', shopRouter);
app.use('/cards', exchangeRouter);
app.use('/notifications', notificationRouter);

app.use((err, req, res, next) => {
  ErrorHandler.handle(err, req, res, next);
});

app.listen(process.env.PORT || 3000, () => console.log('Server On💡'));
