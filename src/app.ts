import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import ErrorHandler from './middlewares/errorHandler.js';
import { appRouter } from './routes/index.route.js';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'https://pikapick-photo.kro.kr/',
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use('/api', appRouter);

app.use(ErrorHandler);

app.listen(process.env.PORT || 3000, () => console.log('Server On💡'));
