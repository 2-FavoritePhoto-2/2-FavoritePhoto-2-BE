import { prismaClient } from '../connection/connection.js';
import { ShopRepository } from '../repositories/shop.repository.js';
import { ShopService } from '../services/shop.service.js';
import { ShopController } from '../controllers/shop.controller.js';

export const shopRepository = new ShopRepository(prismaClient);
const shopService = new ShopService(shopRepository);
export const shopController = new ShopController(shopService);
