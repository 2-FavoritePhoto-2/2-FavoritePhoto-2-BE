import { prismaClient } from '../connection/connection.js';

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
			// 1시간 이내라면 뽑을 수 없으므로 에러 던짐
			const elapsedTime = now.getTime() - lastDrawTime.getTime();
			if (elapsedTime < 3600000) {
				throw new Error('1시간 이내에 이미 뽑았습니다.');
			}
		}

		// 랜덤 포인트 (예: 10 ~ 20)
		const randomPoints = Math.floor(Math.random() * 20) + 1;

		await prismaClient.$transaction(async () => {
			// 유저 포인트 갱신
			await this.repository.updateUserPoints(userId, randomPoints);

			// 포인트 로그 생성
			await this.repository.createPointLog(userId, randomPoints, 'RANDOM_REWARD');
		});

		return { canDraw: true, randomPoints };
	};

	// 마지막 뽑기 시간 조회
	getLastDrawTime = async userId => {
		const lastDrawTime = await this.repository.getLastDrawTime(userId);
		return lastDrawTime;
	};
}
