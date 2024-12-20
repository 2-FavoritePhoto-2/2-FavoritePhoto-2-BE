import jwt from 'jsonwebtoken';
import { createPointLog } from '../containers/points.container.js';
import { AppError } from '../utils/errors.js';
import HttpStatus from '../utils/httpStatus.js';
import { HashingPassword, ComparePassword } from '../utils/bcrypt.js';

export class AuthService {
  data: any;
  constructor(authRepository) {
    this.data = authRepository;
  }

  createUser = async user => {
    const isUniqueEmail = await this.data.findByEmail(user.email);

    if (isUniqueEmail) {
      throw new AppError('이미 존재하는 이메일입니다.', HttpStatus.BAD_REQUEST);
    }

    const isUniqueNickname = await this.data.findByNickname(user.nickname);

    if (isUniqueNickname) {
      throw new AppError('이미 존재하는 닉네임입니다.', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await HashingPassword(user.password);
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
      throw new AppError('존재하지 않는 이메일입니다.', HttpStatus.BAD_REQUEST);
    }

    await this.verifyPassword(password, user.password);
    return this.filterSensitiveData(user);
  };

  verifyPassword = async (inputPassword, userPassword) => {
    const isMatch = await ComparePassword(inputPassword, userPassword);

    if (!isMatch) {
      throw new AppError('비밀번호가 일치하지 않습니다.', HttpStatus.BAD_REQUEST);
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
      throw new AppError('인증이 완료되지 않았습니다.', HttpStatus.BAD_REQUEST);
    }

    const accessToken = await this.createToken(user);
    const newRefreshToken = await this.createToken(user, 'refresh');
    return { accessToken, newRefreshToken };
  };
}
