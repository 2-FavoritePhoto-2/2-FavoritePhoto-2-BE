export class AuthRepository {
	data: any;
	prisma: any;
	constructor(client) {
		this.data = client.User;
		this.prisma = client;
	}

	findByEmail = async email => {
		return await this.data.findUnique({
			where: {
				email,
			},
		});
	};

	findById = async id => {
		return await this.data.findUnique({
			where: {
				id,
			},
		});
	};

	create = async user => {
		return this.data.create({
			data: {
				nickname: user.nickname,
				email: user.email,
				password: user.password,
			},
		});
	};

	update = async (id, data) => {
		return this.data.update({
			where: {
				id,
			},
			data,
		});
	};

	createPointLog = async (userId, amount, action, metaData = null) => {
		return this.prisma.pointLog.create({
			data: {
				userId,
				amount,
				action,
				metaData,
			},
		});
	};
}
