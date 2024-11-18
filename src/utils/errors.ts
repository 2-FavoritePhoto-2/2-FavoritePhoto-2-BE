import HttpStatus from './httpStatus.js';

class TypeError extends Error {
	statusCode: number;
	constructor(message: string) {
		super(message);
		this.name = 'TypeError';
		this.statusCode = HttpStatus.BAD_REQUEST;
	}
}

class ValidationError extends Error {
	statusCode: number;
	constructor(message: string) {
		super(message);
		this.name = 'ValidationError';
		this.statusCode = HttpStatus.BAD_REQUEST;
	}
}

class CastError extends Error {
	statusCode: number;
	constructor(message: string) {
		super(message);
		this.name = 'CastError';
		this.statusCode = HttpStatus.NOT_FOUND;
	}
}

class CustomAuthorizationError extends Error {
	constructor(message: string = 'Unauthorized access') {
		super(message);
		this.name = 'CustomAuthorizationError';
	}
}

class DatabaseConnectionError extends Error {
	constructor(message: string = 'Database connection failed') {
		super(message);
		this.name = 'DatabaseConnectionError';
	}
}

export { TypeError, ValidationError, CastError, CustomAuthorizationError, DatabaseConnectionError };
