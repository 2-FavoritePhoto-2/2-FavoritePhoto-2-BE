import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { exampleRouter } from './routes/example.route.js';
import { pointRouter } from './routes/points.route.js';
import { Prisma } from '@prisma/client';
import { CastError, CustomAuthorizationError, DatabaseConnectionError, ValidationError } from './utils/errors.js';
import { StructError } from 'superstruct';
import { shopRouter } from './routes/shop.route.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes: 각 엔드포인트는 라우터로 연결
app.use('/examples', exampleRouter);
app.use('/points', pointRouter);
app.use('/shop', shopRouter);
// ****** 여기에 엔드포인트 추가하세요

function errorHandler(err: { message: string; code: string }, req: Request, res: Response, next: NextFunction) {
	console.error(err);
	if (err instanceof Prisma.PrismaClientValidationError || err instanceof TypeError || err instanceof ValidationError) {
		res.status(400).send({ message: err.message });
	} else if (
		err instanceof StructError ||
		(err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') ||
		err instanceof CastError
	) {
		res.sendStatus(404);
	} else if (err instanceof CustomAuthorizationError) {
		// 사용자 정의 에러에 대한 응답
		res.status(403).send({ message: 'Access denied: You do not have permission to perform this action.' });
	} else if (err instanceof DatabaseConnectionError) {
		res.status(503).send({ message: 'Service unavailable: Could not connect to the database.' });
	} else {
		res.status(500).send({ message: err.message });
	}
}

app.use(errorHandler);

app.listen(process.env.PORT || 3000, () => console.log('Server On💡'));
