import { prismaClient } from '../connection/connection.js';
import { ExampleData } from '../data/example.data.js';
import { ExampleService } from '../services/example.service.js';
import { ExampleController } from '../controllers/example.controller.js';

// Data, Service, Controller를 모두 연결 -> controller로 export
const exampleData = new ExampleData(prismaClient);
const exampleService = new ExampleService(exampleData);
export const exampleController = new ExampleController(exampleService);
