export class NotificationService {
	data: any;
	constructor(notificationRepository) {
		this.data = notificationRepository;
	}

	createNotification = async data => {
		return await this.data.create(data);
	};

	getNotification = async userId => {
		const where = { recipientId: userId };
		const orderBy = { createdAt: 'asc' };

		return await this.data.get(where, orderBy);
	};

	updateNotification = async id => {
		return await this.data.update(id);
	};
}
