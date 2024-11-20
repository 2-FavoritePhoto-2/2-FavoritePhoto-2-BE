export class PointsController {
	service: any;
	constructor(pointsService) {
		this.service = pointsService;
	}

	// 랜덤 포인트 획득
	drawRandomBox = async (req, res) => {
		try {
			const { userId } = req.body;
			const { randomPoints, remainingTime } = await this.service.drawRandomPoints(userId);

			if (remainingTime) {
				// 1시간 이내에 이미 뽑았으면 남은 시간과 함께 응답
				return res.status(200).json({ message: '1시간 이내에 이미 뽑았습니다.', remainingTime });
			}

			// 랜덤 포인트 뽑기 성공
			res.status(200).json({ randomPoints });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	};

	// 마지막 뽑은 시간 조회
	getLastDrawTime = async (req, res) => {
		try {
			const { userId } = req.query;
			const lastDrawTime = await this.service.getLastDrawTime(userId);
			res.status(200).json({ lastDrawTime });
		} catch (error) {
			res.status(500).json({ error: '시간 조회에 실패했습니다.' });
		}
	};
}
