import { prismaClient as prisma } from '../src/connection/connection';
import { CARDS, SHOPS, USERS } from '../mock/mock';

async function main() {
	await prisma.user.deleteMany();
	await prisma.card.deleteMany();
	await prisma.shop.deleteMany();

	await prisma.user.createMany({
		data: USERS,
		skipDuplicates: true,
	});

	await prisma.card.createMany({
		data: CARDS,
		skipDuplicates: true,
	});

	await prisma.shop.createMany({
		data: SHOPS,
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
