export class PointsRepository {
	prisma: any;
	constructor(client) {
		this.prisma = client;
	}

	// 유저 포인트 업데이트
	updateUserPoints = async (userId, points) => {
		return await this.prisma.User.update({
			where: { id: userId },
			data: {
				point: { increment: points },
				lastDrawTime: new Date(),
			},
		});
	};

	// 포인트 로그 추가
	createPointLog = async (userId, amount, action, metaData = null) => {
		return await this.prisma.pointLog.create({
			data: {
				userId,
				amount,
				action,
				metaData,
			},
		});
	};

	// 마지막 뽑기 시간 조회
	getLastDrawTime = async userId => {
		const user = await this.prisma.User.findUnique({
			where: { id: userId },
			select: { lastDrawTime: true },
		});
		return user?.lastDrawTime;
	};
}
