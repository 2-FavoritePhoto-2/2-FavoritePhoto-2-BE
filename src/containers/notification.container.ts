import { prismaClient } from '../connection/connection.js';
import { NotificationController } from '../controllers/notification.controller.js';
import { NotificationRepository } from '../repositories/notification.repository.js';
import { NotificationService } from '../services/notification.service.js';

const notificationRepository = new NotificationRepository(prismaClient);
const notificationService = new NotificationService(notificationRepository);
export const notificationController = new NotificationController(notificationService);

export const sendNotification = async data => {
	return await notificationService.createNotification(data);
};
