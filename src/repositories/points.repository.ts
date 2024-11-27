import { PointAction } from '@prisma/client';

export class PointsRepository {
	data: any;
	prisma: any;
	constructor(client) {
		this.data = client.User;
		this.prisma = client;
	}
	// 랜덤 포인트 적립 및 모든 동작 처리
	handleRandomPointDraw = async (userId, points) => {
		return await this.prisma.$transaction(async prisma => {
			// 1. 유저 포인트 업데이트 및 뽑은 시간 갱신
			const updatedUser = await prisma.User.update({
				where: { id: userId },
				data: {
					point: {
						increment: points,
					},
					lastDrawTime: new Date(),
				},
			});

			// 2. 포인트 로그 추가
			await prisma.PointLog.create({
				data: {
					amount: points,
					action: 'RANDOM_REWARD' as PointAction,
					userId: userId,
				},
			});

			return updatedUser;
		});
	};

	// 마지막 뽑기 시간 조회
	getLastDrawTime = async userId => {
		const user = await this.data.findUnique({
			where: { id: userId },
			select: { lastDrawTime: true },
		});
		return user.lastDrawTime;
	};
}
