import { prismaClient } from '../connection/connection.js';
import { ExchangeRepository } from '../repositories/exchange.repository.js';
import { ExchangeService } from '../services/exchange.service.js';
import { ExchangeController } from '../controllers/exchange.controller.js';

const exchangeRepository = new ExchangeRepository(prismaClient);
const exchangeService = new ExchangeService(exchangeRepository);
export const exchangeController = new ExchangeController(exchangeService);
