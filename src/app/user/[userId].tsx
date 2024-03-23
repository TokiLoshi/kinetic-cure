import { PrismaClient, Prisma } from "@prisma/client";
import type { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function loader({ params }: { params: { userId: string } }) {
	const { userId } = params;
	const userWithWorkouts = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		include: {
			Workouts: true,
		},
	});
	console.log(`User with workouts: ${userWithWorkouts}`);

	if (!userWithWorkouts) {
		return new Response(JSON.stringify({ error: "User not found" }), {
			status: 404,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
	return new Response(JSON.stringify(userWithWorkouts), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
