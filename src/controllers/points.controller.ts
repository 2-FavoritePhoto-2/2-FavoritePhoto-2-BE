import HttpStatus from '../utils/httpStatus.js';

export class PointsController {
  service: any;
  constructor(pointsService) {
    this.service = pointsService;
  }

  // 랜덤 포인트 획득
  drawRandomBox = async (req, res) => {
    const { userId } = req.auth;
    const { randomPoints } = await this.service.drawRandomPoints(userId);

    // 랜덤 포인트 뽑기 성공
    res.status(HttpStatus.SUCCESS).json({ randomPoints });
  };

  // 마지막 뽑은 시간 조회
  getLastDrawTime = async (req, res) => {
    const { userId } = req.auth;
    const lastDrawTime = await this.service.getLastDrawTime(userId);
    res.status(HttpStatus.SUCCESS).json({ lastDrawTime });
  };

  // 포인트 로그 조회
  getPointLogs = async (req, res) => {
    const { userId } = req.auth;
    const { startDate, endDate, action, page = 1, limit = 10, order = 'desc' } = req.query;

    // Service로 전달할 데이터 준비
    const logs = await this.service.getPointLogs(userId, {
      startDate,
      endDate,
      action,
      page,
      limit,
      order,
    });

    return res.status(HttpStatus.SUCCESS).json(logs);
  };
}
