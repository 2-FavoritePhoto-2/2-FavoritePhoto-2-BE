import HttpStatus from '../utils/httpStatus.js';

export class PointsController {
	service: any;
	constructor(pointsService) {
		this.service = pointsService;
	}

	// 랜덤 포인트 획득
	drawRandomBox = async (req, res) => {
		try {
			const { userId } = req.auth;
			const { canDraw, randomPoints } = await this.service.drawRandomPoints(userId);

			if (!canDraw) {
				// 1시간 이내라면 뽑을 수 없음을 응답
				return res.status(400).json({ message: '1시간 이내에 이미 뽑았습니다.' });
			}

			// 랜덤 포인트 뽑기 성공
			res.status(HttpStatus.SUCCESS).json({ randomPoints });
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ error: error.message });
		}
	};

	// 마지막 뽑은 시간 조회
	getLastDrawTime = async (req, res) => {
		try {
			const { userId } = req.auth;
			const lastDrawTime = await this.service.getLastDrawTime(userId);
			res.status(HttpStatus.SUCCESS).json({ lastDrawTime });
		} catch (error) {
			res.status(HttpStatus.SERVER_ERROR).json({ error: '시간 조회에 실패했습니다.' });
		}
	};
}
