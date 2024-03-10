"use server";
import { redirect } from "next/navigation";
import { z } from "zod";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export type State = {
	errors?: {
		email?: string[];
		password?: string[];
		confirmPassword?: string[];
	};
	message?: string | null;
};

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	console.log(`In authenticate function`);
	console.log(`FormData: ${formData.get("email")}`);
	console.log(`Password: ${formData.get("password")}`);

	return "awesome something happened";
}

// Validate fields on sign up
export async function validateSignUp(state: State, formData: FormData) {
	const SignUpSchema = z.object({
		email: z.string().email("Please enter a valid email"),
		password: z.string().min(8, "Password should be at least 8 characters"),
		confirmPassword: z.string(),
	});

	console.log(`In validate sign up`);
	console.log(`Email: ${formData.get("email")}`);
	console.log(`Password: ${formData.get("password")}`);
	console.log(`Confirmation: ${formData.get("confirmPassword")}`);
	const parsedData = SignUpSchema.safeParse({
		email: formData.get("email"),
		password: formData.get("password"),
		confirmPassword: formData.get("confirmPassword"),
	});
	console.log(`Parsed data: ${parsedData.success}`);

	if (!parsedData.success) {
		return {
			errors: parsedData.error.flatten().fieldErrors,
			message: "Validation failed",
		};
	}
	const data = parsedData.data;
	const dateJoined = new Date().toISOString();
	const workouts = [""];
	const ptExercises = [""];
	const personalRecords = [""];
	const distanceMetric = "kilometers";
	const weightMetric = "kilograms";
	const totalWorkouts = 0;
	const ptWorkouts = [""];

	const Exercises = [""];
	console.log(`Email: ${data.email}`);
	console.log(`Password: ${data.password}`);
	const { email, password } = parsedData.data;
	try {
		const newUser = await prisma.user.create({
			data: {
				email,
				dateJoined,
				distanceMetric,
				weightMetric,
				totalWorkouts,
			},
		});
		console.log(`New User: ${newUser}`);
	} catch (error) {
		console.log(`Error with prisma: ${error}`);
		return {
			errors: {
				email: "Email is already taken",
			},
		};
	}
	redirect("/login");
}
