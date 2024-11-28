import HttpStatus from '../utils/httpStatus.js';

export class NotificationController {
	service: any;
	constructor(notificationService) {
		this.service = notificationService;
	}

	getNotification = async (req, res) => {
		const { userId } = req.auth;

		const notification = await this.service.getNotification(userId, req.body);
		res.status(HttpStatus.SUCCESS).json(notification);
	};

	updateNotification = async (req, res) => {
		const { id } = req.params;

		const notification = await this.service.updateNotification(id);
		res.status(HttpStatus.SUCCESS).json(notification);
	};
}
