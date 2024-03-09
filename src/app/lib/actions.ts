"use server";
import { redirect } from "next/navigation";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type ExerciseState = {
	errors?: {
		name?: string;
		description?: string;
		muscleGroups?: string[];
		videoLink?: string;
		equipment: string | null;
	};
	message?: string | null;
};

export async function validateExercise(
	prevState: ExerciseState,
	formData: FormData
) {
	const exerciseFields = formData;
	console.log(exerciseFields);
	redirect("/");
}

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	console.log(`In authenticate function`);
	console.log(`FormData: ${formData.get("email")}`);
	console.log(`Password: ${formData.get("password")}`);

	return "awesome something happened";
}
