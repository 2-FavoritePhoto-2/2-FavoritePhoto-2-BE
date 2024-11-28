import HttpStatus from '../utils/httpStatus.js';

export class AuthController {
	service: any;
	constructor(authService) {
		this.service = authService;
	}

	createUser = async (req, res, next) => {
		const user = await this.service.createUser(req.body);
		return res.status(HttpStatus.CREATED).json(user);
	};

	getUser = async (req, res, next) => {
		const { email, password } = req.body;

		const user = await this.service.getUser(email, password);
		const accessToken = await this.service.createToken(user);
		const refreshToken = await this.service.createToken(user, 'refresh');
		await this.service.updateUser(user.id, { refreshToken });

		res.cookie('refreshToken', refreshToken, {
			path: '/token/refresh',
			httpOnly: true,
			sameSite: 'none',
			secure: true,
			maxAge: 14 * 24 * 60 * 60 * 1000, // 14일
		});

		return res.json({ accessToken });
	};

	getNewToken = async (req, res, next) => {
		const { refreshToken } = req.cookies;
		const { userId } = req.auth;
		const { accessToken, newRefreshToken } = await this.service.refreshToken(userId, refreshToken);
		await this.service.updateUser(userId, { refreshToken: newRefreshToken });

		res.cookie('refreshToken', newRefreshToken, {
			path: '/token/refresh',
			httpOnly: true,
			sameSite: 'none',
			secure: true,
			maxAge: 14 * 24 * 60 * 60 * 1000, // 14일
		});

		return res.json({ accessToken });
	};
}
