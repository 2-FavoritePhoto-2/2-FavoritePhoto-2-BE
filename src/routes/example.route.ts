// route 계층은 controller를 router로 연결하는 역할

import express, { NextFunction, Request, Response } from 'express';
import { exampleController } from '../containers/example.container.js';

// export 추가하기
export const exampleRouter = express.Router();

// 공용 validation 실행 후 next 함수 연결
function validation(req: Request, res: Response, next: NextFunction) {
	const page = req.query.page;
	const pageSize = req.query.pageSize;
	const limit = req.query.limit;

	if (page && isNaN(Number(page))) throw new TypeError('page should be an integer');
	if (pageSize && isNaN(Number(pageSize))) throw new TypeError('pageSize should be an integer');
	if (limit && isNaN(Number(limit))) throw new TypeError('limit should be an integer');

	next();
}

exampleRouter.use(validation);

// 라우터 + 메소드
exampleRouter.get('/', exampleController.getCount);
