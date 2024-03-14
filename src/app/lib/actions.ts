"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { signIn } from "../../../auth";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
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
	const personalRecords = 0;
	console.log(`Email: ${data.email}`);
	console.log(`Password: ${data.password}`);
	const { email, password } = parsedData.data;

	try {
		const newUser = await prisma.user.create({
			data: {
				email,
				password,
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

const ExerciseSchema = z.object({
	name: z.string({ invalid_type_error: "Please create a name" }),
	description: z.string({ invalid_type_error: "Please add a description" }),
	equipment: z.string({ invalid_type_error: "Please add equipment" }),
	videoLink: z.string({
		invalid_type_error: "Please enter correct url format",
	}),
	// glutes: z.boolean(),
	// hamstrings: z.boolean(),
	// quads: z.boolean(),
	// hips: z.boolean(),
	// core: z.boolean(),
	// chest: z.boolean(),
	// shoulders: z.boolean(),
	// midback: z.boolean(),
	// upperback: z.boolean(),
	// lowerback: z.boolean(),
	// obliques: z.boolean(),
	// triceps: z.boolean(),
	// biceps: z.boolean(),
	// delts: z.boolean(),
	// lats: z.boolean(),
	// traps: z.boolean(),
});

interface ExerciseFormState {
	errors: {
		name?: string[];
		description?: string[];
		muscleGroups?: string[];
		equipment?: string[];
		videoLink?: string[];
		exerciseType?: string[];
	};
}

export async function addExercise(
	formState: ExerciseFormState,
	formData: FormData
): Promise<ExerciseFormState> {
	console.log(`Adding in an exercise, formData`);
	console.log(`Name: ${formData.get("name")}`);
	console.log(`Description: ${formData.get("description")}`);
	console.log(`Equipment: ${formData.get("equipment")}`);
	console.log(`Video link: ${formData.get("videoLink")}`);
	console.log(`Exercise Type: ${formData.get("selectedExercise")}`);

	const muscleGroupsData = formData.get("muscleGroups");
	console.log(
		"Muscle data from the form: ",
		muscleGroupsData,
		typeof muscleGroupsData
	);
	let selectedMuscleGroups: string[] = [];
	if (typeof muscleGroupsData === "string" && muscleGroupsData) {
		try {
			selectedMuscleGroups = JSON.parse(muscleGroupsData);
			console.log("Post parsing: ", selectedMuscleGroups);
		} catch (error) {
			console.warn("Error - failed to deserialize muscle data", error);
		}
	}
	if (muscleGroupsData === null) {
		return {
			errors: {
				muscleGroups: ["Please select at least one muscle group"],
			},
		};
	}

	const validatedFields = ExerciseSchema.safeParse({
		name: formData.get("name"),
		description: formData.get("description"),
		equipment: formData.get("equipment"),
		videoLink: formData.get("videoLink"),
	});
	console.log(validatedFields.success);
	console.log(validatedFields);

	if (!validatedFields.success) {
		const errors = validatedFields.error.flatten().fieldErrors;
		return { errors };
	}
	const { name, description, equipment, videoLink } = validatedFields.data;
	const authorId = 20;
	return {
		errors: {
			muscleGroups: ["something went wrong"],
		},
	};

	try {
		const newExercise = await prisma.exercises.create({
			data: {
				name,
				author: {
					connect: {
						id: authorId,
					},
				},
				description,
				equipment,
				videoLink,
				muscleGroups: {
					connect: muscleGroupsData,
				},
			},
		});
	} catch (error: unknown) {
		console.log(error);
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				errors: {
					name: ["This exercise already exists. Please try again."],
				},
			};
		}
	}
	redirect("/dashboard");
}
