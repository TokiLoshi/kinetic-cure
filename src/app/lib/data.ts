import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { unstable_noStore as noStore } from "next/cache";

const prisma = new PrismaClient();

export async function fetchExercises() {
	noStore();
	try {
		console.log("Fetching exercise data ");
		const data = await prisma.exercises.findMany();
		console.log(`Data for exercises fetched: ${data}`);
		return data;
	} catch (error) {
		console.warn(`Database Error: ${error}`);
		throw new Error("failed to fetch exercise data");
	}
}
