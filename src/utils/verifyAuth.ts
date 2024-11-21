import { expressjwt } from 'express-jwt';
import { shopRepository } from '../containers/shop.container.js';

// 로그인 인증된 사용자 확인
const isAccessTokenVerified = expressjwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
});

export const verifyAccessToken = (req, res, next) => {
	isAccessTokenVerified(req, res, next);
};

// 토큰 재발급시 유효한 refreshToken 확인
const isRefreshTokenVerified = expressjwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
	getToken: req => req.cookies.refreshToken,
});

export const verifyRefreshToken = (req, res, next) => {
	isRefreshTokenVerified(req, res, next);
};

// shop 수정, 삭제 인가
export const verifySeller = async (req, res, next) => {
	const { shopId } = req.params;
	try {
		const shop = await shopRepository.getShopById(shopId);

		if (!shop) {
			throw new Error('해당 판매 정보를 찾을 수 없습니다');
		}

		if (shop.sellerId !== req.auth.userId) {
			throw new Error('해당 판매에 접근 권한이 없습니다');
		}

		return next();
	} catch (error) {
		return next(error);
	}
};
