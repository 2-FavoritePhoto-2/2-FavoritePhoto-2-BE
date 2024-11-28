// service 계층은 핵심적인 비즈니스 로직을 수행하고 요구사항을 구현하는 역할
// 데이터가 필요할 때 data 계층에 요청하는 controller와 data 사이의 중개 역할

import { ExampleData } from '../repositories/example.repository.js';

export class ExampleService {
	data: any;
	// data와 연결
	constructor(exampleData: ExampleData) {
		this.data = exampleData;
	}

	// 비즈니스 로직, 데이터를 가공 -> controller
	getCount = async ({ parameter }) => {
		const count = await this.data.count({ parameter });

		return count;
	};
}
