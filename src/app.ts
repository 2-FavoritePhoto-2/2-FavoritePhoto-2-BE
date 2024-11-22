import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { exampleRouter } from './routes/example.route.js';
import { pointRouter } from './routes/points.route.js';
import { StructError } from 'superstruct';
import { userRouter } from './routes/user.route.js';
import { authRouter } from './routes/auth.route.js';
import { shopRouter } from './routes/shop.route.js';
import ErrorHandler from './utils/errors.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes: 각 엔드포인트는 라우터로 연결
app.use('/examples', exampleRouter);
app.use('/points', pointRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/shop', shopRouter);

app.use((err, req, res, next) => {
	ErrorHandler.handle(err, req, res, next);
});

app.listen(process.env.PORT || 3000, () => console.log('Server On💡'));
