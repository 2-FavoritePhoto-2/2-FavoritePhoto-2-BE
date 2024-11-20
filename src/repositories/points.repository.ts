export class PointsRepository {
	data: any;
	constructor(client) {
		this.data = client.User;
	}

	// 랜덤 포인트 획득
	addPoints = async (userId, points) => {
		try {
			await this.data.update({
				where: { id: userId },
				data: {
					point: {
						increment: points,
					},
				},
			});
		} catch (error) {
			console.error('Error in addPoints:', error); // 오류 출력
			throw error;
		}
	};

	// 마지막 뽑기 시간 조회
	getLastDrawTime = async userId => {
		try {
			const user = await this.data.findUnique({
				where: { id: userId },
				select: { updatedAt: true },
			});
			return user ? user.updatedAt : null;
		} catch (error) {
			console.error('Error in getLastDrawTime:', error); // 오류 출력
			throw error;
		}
	};
}
