"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { signIn } from "../../../auth";
import { AuthError } from "next-auth";

import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export async function authenticate(
	prevState: string | undefined,
	formData: FormData
) {
	console.log(`In authenticate function`);
	console.log(`FormData: ${formData.get("email")}`);
	console.log(`Password: ${formData.get("password")}`);
	console.log(`Prev state: ${prevState}`);
	try {
		await signIn("credentials", formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return "Invalid credentials";
				default:
					return "Something went wrong";
			}
		}
		throw error;
	}
}

const SignUpSchema = z
	.object({
		email: z.string().email("Please enter a valid email"),
		password: z
			.string()
			.min(8, "Password should be at least more characters. Please try again"),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

interface SignUpFormState {
	errors: {
		email?: string[];
		password?: string[];
		confirmPassword?: string[];
	};
}

// Validate fields on sign up
export async function validateSignUp(
	formState: SignUpFormState,
	formData: FormData
): Promise<SignUpFormState> {
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
		const errors = parsedData.error.flatten().fieldErrors;
		return { errors };
	}

	const data = parsedData.data;
	const dateJoined = new Date().toISOString();
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
	} catch (error: unknown) {
		console.log("Here's the issue from prisma: ", error);
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				errors: {
					email: ["This email already exists. Did you forget your password?"],
				},
			};
		}
		console.error("Something else went wrong", error);
		return {
			errors: {
				email: [
					"We appear to be having some difficulty. Please reach out to the dev to fix this bug.",
				],
			},
		};
		throw new Error("Failed to create a new user.");
	}
	redirect("/login");
}

export async function addExercise(
	prevState: string | undefined,
	formData: FormData
) {
	const exerciseSchema = z.object({
		name: z.string({ invalid_type_error: "Please create a name" }),
		description: z.string({ invalid_type_error: "Please add a description" }),
		videoLink: z.string({
			invalid_type_error: "Please enter correct url format",
		}),
	});
	const validatedFields = exerciseSchema.safeParse({
		name: formData.get("name"),
		description: formData.get("description"),
		videoLink: formData.get("videoLink"),
	});
	console.log(validatedFields.success);
	console.log(validatedFields);
}