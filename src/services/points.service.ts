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

    // 랜덤 포인트 (예: 1 ~ 20)
    const randomPoints = Math.floor(Math.random() * 20) + 1;

    await prismaClient.$transaction(async () => {
      // 유저 포인트 갱신
      await this.repository.updateUserPoints(userId, randomPoints);

      // 포인트 로그 생성
      await this.repository.createPointLog(userId, randomPoints, 'RANDOM_REWARD');
    });

    return { randomPoints };
  };

  // 마지막 뽑기 시간 조회
  getLastDrawTime = async userId => {
    const lastDrawTime = await this.repository.getLastDrawTime(userId);
    return lastDrawTime;
  };

  // 포인트 로그 조회
  getPointLogs = async (userId, { startDate, endDate, action, page, limit, order }) => {
    const filters = this.prepareFilters({ startDate, endDate, action });

    const pagination = this.preparePagination(page, limit);

    const sorting = this.prepareSorting(order);

    const logs = await this.repository.getPointLogsByUserId(userId, filters, pagination, sorting);
    return logs;
  };

  // UTC 변환 함수 (한국 시간 -> UTC)
  convertToUTC = dateString => {
    const localDate = new Date(dateString + 'T00:00:00+09:00'); // 'T00:00:00+09:00'으로 한국 시간 명시
    const utcDate = new Date(localDate.getTime() - 9 * 60 * 60 * 1000); // 9시간 빼기
    return utcDate;
  };

  // 필터링 로직
  prepareFilters = ({ startDate, endDate, action }) => {
    const filters: { createdAt?: { gte?: Date; lte?: Date }; action?: string } = {};

    if (startDate) {
      filters.createdAt = { ...filters.createdAt, gte: this.convertToUTC(startDate) };
    }
    if (endDate) {
      filters.createdAt = { ...filters.createdAt, lte: this.convertToUTC(endDate) };
    }
    if (action) {
      filters.action = action;
    }
    return filters;
  };

  // 페이지네이션 로직
  preparePagination = (page, limit) => {
    const skip = (page - 1) * limit;
    const take = Number(limit);
    return { skip, take };
  };

  // 정렬 방식 로직
  prepareSorting = order => {
    return {
      createdAt: order === 'desc' ? 'desc' : 'asc',
    };
  };
}
