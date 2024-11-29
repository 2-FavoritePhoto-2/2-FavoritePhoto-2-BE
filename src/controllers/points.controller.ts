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
			const { randomPoints } = await this.service.drawRandomPoints(userId);

			// 랜덤 포인트 뽑기 성공
			res.status(HttpStatus.SUCCESS).json({ randomPoints });
		} catch (error) {
			if (error.message === '1시간 이내에 이미 뽑았습니다.') {
				return res.status(HttpStatus.BAD_REQUEST).json({ message: error.message });
			}

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
