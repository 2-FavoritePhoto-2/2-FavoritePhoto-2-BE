// import { User } form '@prisma/client'

export class UserRepository {
	data: any;
	constructor(client) {
		this.data = client.User;
	}

	// GET Id
	getUserId = async (id: string) => {
		const profile = await this.data.findUnique({
			where: { id },
		});

		return profile;
	};

	// GET Nickname
	getUserNickname = async (nickname: string) => {
		const profile = await this.data.findUnique({
			where: { nickname },
		});
		return profile;
	};

	// GET Point
	getUserPoint = async (point: number) => {
		const profile = await this.data.findUnique({
			where: { point },
		});
		return profile;
	};
}
