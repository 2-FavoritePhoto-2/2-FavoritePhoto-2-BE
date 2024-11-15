// 프레젠테이션 계층: 가장 먼저 클라이언트의 request을 만나고, 라우터와 연결하는 역할

import { Request, Response } from 'express';
import { ExampleService } from '../services/example.service.js';
import HttpStatus from '../utils/httpStatus.js';

export class ExampleController {
	service: any;
	// service와 연걸
	constructor(exampleService: ExampleService) {
		this.service = exampleService;
	}

	// api 통신(클라이언트-요청/응답) & 요청 유효성 검사(superstruct, validation)
	getCount = async (req: Request, res: Response) => {
		const orderBy = req.query.orderBy || 'recent';
		const page = Number(req.query.page) || 1;
		const pageSize = Number(req.query.pageSize) || 10;
		const keyword = req.query.keyword || '';

		const resBody = await this.service.getCount({
			orderBy,
			page,
			pageSize,
			keyword,
		});

		// 응답 status를 지정하고 body를 전달
		res.status(HttpStatus.SUCCESS).json(resBody);
	};
}
