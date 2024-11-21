import { prismaClient } from '../connection/connection.js';
import { AuthRepository } from '../repositories/auth.repository.js';
import { AuthService } from '../services/auth.service.js';
import { AuthController } from '../controllers/auth.controller.js';

const authRepository = new AuthRepository(prismaClient);
const authService = new AuthService(authRepository);
export const authController = new AuthController(authService);
