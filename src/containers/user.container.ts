import { prismaClient } from '../connection/connection.js';
import { UserRepository } from '../repositories/user.repository.js';
import { UserService } from '../services/user.service.js';
import { UserController } from '../controllers/user.controller.js';

const userRepository = new UserRepository(prismaClient);
const userService = new UserService(userRepository);
export const userController = new UserController(userService);
