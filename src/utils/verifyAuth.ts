import { expressjwt } from 'express-jwt';

const verifyAccessToken = expressjwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
});

const verifyRefreshToken = expressjwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
	getToken: req => req.cookies.refreshToken,
});

export const isRefreshTokenVerified = (req, res, next) => {
	verifyRefreshToken(req, res, next);
};
