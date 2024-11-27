export class PointsService {
	repository: any;

	constructor(pointsRepository) {
		this.repository = pointsRepository;
	}

	// 랜덤 포인트 뽑기
	drawRandomPoints = async userId => {
		const lastDrawTime = await this.repository.getLastDrawTime(userId);
		const now = new Date();

		if (lastDrawTime) {
			const elapsedTime = now.getTime() - lastDrawTime.getTime();
			if (elapsedTime < 3600000) {
				// 1시간 이내라면 뽑을 수 없음을 반환
				return { canDraw: false };
			}
		}

		// 랜덤 포인트 (예: 10 ~ 20)
		const randomPoints = Math.floor(Math.random() * 20) + 1;

		// 포인트 적립
		await this.repository.handleRandomPointDraw(userId, randomPoints);

		return { randomPoints };
	};

	// 마지막 뽑기 시간 조회
	getLastDrawTime = async userId => {
		const lastDrawTime = await this.repository.getLastDrawTime(userId);
		return lastDrawTime;
	};
}
