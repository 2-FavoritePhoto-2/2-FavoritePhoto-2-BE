import { boolean } from 'superstruct';

export class NotificationRepository {
	data: any;
	constructor(client) {
		this.data = client.Notification;
	}

	create = async data => {
		return await this.data.create({
			data,
		});
	};

	get = async (where, orderBy) => {
		return await this.data.findMany({
			where,
			orderBy,
		});
	};

	// 요청시 무조건 읽음 처리
	update = async id => {
		return await this.data.update({
			where: { id },
			data: {
				isRead: Boolean(true),
			},
		});
	};
}
