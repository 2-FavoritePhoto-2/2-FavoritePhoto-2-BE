export class PointsService {
	repository: any;

	constructor(pointsRepository) {
		this.repository = pointsRepository;
	}

	// 랜덤 포인트 뽑기
	drawRandomPoints = async userId => {
		const now = new Date();
		const lastDrawTime = await this.repository.getLastDrawTime(userId);

		// 1시간 이내에 뽑기를 했으면 남은 시간 계산
		if (lastDrawTime && now.getTime() - lastDrawTime.getTime() < 3600000) {
			// 남은 시간 계산 (밀리초 -> 시간, 분, 초로 변환)
			const remainingTime = new Date(3600000 - (now.getTime() - lastDrawTime.getTime()));
			const minutes = remainingTime.getUTCMinutes();
			const seconds = remainingTime.getUTCSeconds();

			// 남은 시간을 반환
			return { remainingTime: `${minutes}분 ${seconds}초` };
		}

		// 랜덤 포인트 (예: 10 ~ 100)
		const randomPoints = Math.floor(Math.random() * 20) + 1;

		// 포인트 적립
		await this.repository.addPoints(userId, randomPoints);

		return { randomPoints };
	};

	// 마지막 뽑기 시간 조회
	getLastDrawTime = async userId => {
		return await this.repository.getLastDrawTime(userId);
	};
}
