import { prismaClient as prisma } from '../src/connection/connection';
import { CARDS, SHOPS, USERS } from '../mock/mock';

async function main() {
	await Promise.all([prisma.user.deleteMany(), prisma.card.deleteMany(), prisma.shop.deleteMany()]);

	await Promise.all([
		prisma.user.createMany({
			data: USERS,
			skipDuplicates: true,
		}),
		prisma.card.createMany({
			data: CARDS,
			skipDuplicates: true,
		}),
		prisma.shop.createMany({
			data: SHOPS,
			skipDuplicates: true,
		}),
	]);
}

main()
	.catch(async e => {
		console.log(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
