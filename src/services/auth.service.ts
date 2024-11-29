import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createPointLog } from '../containers/points.container.js';

export class AuthService {
	data: any;
	constructor(authRepository) {
		this.data = authRepository;
	}

	hashingPassword = async password => {
		return await bcrypt.hash(password, 10);
	};

	createUser = async user => {
		const existedUser = await this.data.findByEmail(user.email);

		if (existedUser) {
			throw new Error('이미 존재하는 이메일입니다.');
		}

		const hashedPassword = await this.hashingPassword(user.password);
		const newUser = await this.data.create({
			...user,
			password: hashedPassword,
		});

		await createPointLog(newUser.id, 50, 'INITIAL_POINT');

		return;
	};

	filterSensitiveData = user => {
		const { password, refreshToken, ...rest } = user;
		return rest;
	};

	getUser = async (email, password) => {
		const user = await this.data.findByEmail(email);

		if (!user) {
			throw new Error('존재하지 않는 이메일입니다.');
		}

		await this.verifyPassword(password, user.password);
		return this.filterSensitiveData(user);
	};

	verifyPassword = async (inputPassword, userPassword) => {
		const isMatch = await bcrypt.compare(inputPassword, userPassword);

		if (!isMatch) {
			throw new Error('비밀번호가 일치하지 않습니다.');
		}
	};

	updateUser = async (id, data) => {
		return await this.data.update(id, data);
	};

	createToken = async (user, type?) => {
		const payload = { userId: user.id };
		const options = { expiresIn: type === 'refresh' ? '2w' : '24h' }; // FIXME 개발 중 편의를 위해 액세스토큰 만료시간 1시간->24시간으로 연장

		return jwt.sign(payload, process.env.JWT_SECRET, options);
	};

	refreshToken = async (userId, refreshToken) => {
		const user = await this.data.findById(userId);

		if (!user || user.refreshToken !== refreshToken) {
			throw new Error('인증이 완료되지 않았습니다');
		}

		const accessToken = await this.createToken(user);
		const newRefreshToken = await this.createToken(user, 'refresh');
		return { accessToken, newRefreshToken };
	};
}
