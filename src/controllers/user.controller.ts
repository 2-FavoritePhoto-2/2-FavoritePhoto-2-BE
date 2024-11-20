import HttpStatus from '../utils/httpStatus.js';

export class UserController {
	service: any;
	constructor(userService) {
		this.service = userService;
	}

	// GET /user/profile/:id
	getUserProfile = async (req, res) => {
		try {
			const { id } = req.params; // 요청 경로에서 ID 가져오기
			const profile = await this.service.getUserProfile(id);
			if (!id) {
				throw new Error('해당 유저 정보를 찾을 수 없습니다.');
			}
			res.status(HttpStatus.SUCCESS).json(profile);
		} catch (error) {
			res.status(HttpStatus.NOT_FOUND).json({ error: error.message });
		}
	};
}
