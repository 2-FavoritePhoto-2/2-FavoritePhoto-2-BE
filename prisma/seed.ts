import { PrismaClient } from '@prisma/client';
import { USER } from '../mock/mock';

const prisma = new PrismaClient();

async function main() {
	await prisma.user.deleteMany();

	await prisma.user.createMany({
		data: USER,
		skipDuplicates: true,
	});
}

main()
	.catch(async e => {
		console.log(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
