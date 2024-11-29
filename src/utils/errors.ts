import { Prisma } from '@prisma/client';
import HttpStatus from './httpStatus.js';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

export default class ErrorHandler {
	static handle(error: any, req: Request, res: Response, next: NextFunction) {
		console.error(error);

		// Multer file size error (파일 크기 초과 에러)
		if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
			return res.status(HttpStatus.BAD_REQUEST).json({
				message: '파일 크기는 5MB를 초과할 수 없습니다.',
			});
		}

		// 400 에러
		if (error.name === 'TypeError' || error.name === 'ValidationError' || error instanceof Prisma.PrismaClientValidationError) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				message: error.message || 'Bad Request',
			});
		}

		// 401 에러
		if (error.name === 'UnauthorizedError') {
			return res.status(HttpStatus.UNAUTHORIZED).json({
				message: error.message || 'Unauthorized access',
			});
		}

		// 403 에러
		if (error.name === 'ForbiddenError') {
			return res.status(HttpStatus.FORBIDDEN).json({
				message: error.message || 'Access forbidden',
			});
		}

		// 404 에러
		if (
			error.name === 'CastError' ||
			error.name === 'StructError' ||
			(error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025')
		) {
			return res.status(HttpStatus.NOT_FOUND).json({
				message: error.message || 'Resource not found',
			});
		}

		// 500 에러
		return res.status(HttpStatus.SERVER_ERROR).json({
			path: req.path,
			method: req.method,
			message: error.message || 'Internal Server Error',
			date: new Date(),
		});
	}
}
