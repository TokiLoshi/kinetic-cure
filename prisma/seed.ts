// prisma/test/seed.js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	const newUser = await prisma.user.create({
		data: {
			email: "hello@prisma.io",
			name: "Alice",
			dateJoined: new Date(),
			distanceMetric: "miles",
			weightMetric: "kg",
			totalWorkouts: 0,
		},
	});
	console.log("created new user:", newUser);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
