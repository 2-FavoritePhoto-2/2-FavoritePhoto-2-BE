import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import ErrorHandler from './middleware/errorHandler.js';
import { appRouter } from './routes/index.route.js';

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

app.use(express.json());
app.use(cookieParser());
app.use('/api', appRouter);

app.use(ErrorHandler);

app.listen(process.env.PORT || 3000, () => console.log('Server On💡'));
