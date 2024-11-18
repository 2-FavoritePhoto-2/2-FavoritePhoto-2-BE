// data 계층은 데이터베이스와 관련된 작업을 하는 데이터 액세스 역할

export class ExampleData {
	data: any;
	// Schema의 model과 연결
	constructor(client: any) {
		this.data = client.User;
	}

	// 데이터베이스와 연결 -> 데이터를 service로 전달
	count = async ({ parameter }) => {
		const count: number = await this.data.count();

		return count;
	};
}
