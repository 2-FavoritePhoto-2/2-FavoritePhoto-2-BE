import { prismaClient } from '../connection/connection.js';
import { PointsRepository } from '../repositories/points.repository.js';
import { PointsService } from '../services/points.service.js';
import { PointsController } from '../controllers/points.controller.js';

const pointsRepository = new PointsRepository(prismaClient);
const pointsService = new PointsService(pointsRepository);
export const pointsController = new PointsController(pointsService);

export const createPointLog = async (userId, amount, action, metaData: object | null = null) => {
	return await pointsRepository.createPointLog(userId, amount, action, metaData);
};
