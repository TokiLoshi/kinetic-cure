"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { AuthError } from "next-auth";
import bcrypt from "bcrypt";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { lucia, validateRequest } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { ActionResult } from "@/app/lib/form";
import prisma from "@/app/lib/prisma";

export async function logout(): Promise<ActionResult> {
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized",
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect("/login");
}

// export async function authenticate(
// 	prevState: string | undefined,
// 	formData: FormData
// ) {
// 	console.log(`In authenticate function`);
// 	console.log(`FormData: ${formData.get("email")}`);
// 	console.log(`Password: ${formData.get("password")}`);
// 	const email = formData.get("email");
// 	const password = formData.get("password");

// 	const credentials = { email, password };

// 	try {
// 		console.log("Parsing in credentials");
// 		await signIn("credentials", {
// 			redirect: false,
// 			email,
// 			password,
// 		});
// 	} catch (error) {
// 		if (error instanceof AuthError) {
// 			switch (error.type) {
// 				case "CredentialsSignin":
// 					return "Invalid credentials";
// 				default:
// 					return "Something went wrong";
// 			}
// 		}
// 		throw error;
// 	}
// }

// const SignUpSchema = z
// 	.object({
// 		email: z.string().email("Please enter a valid email"),
// 		password: z
// 			.string()
// 			.min(8, "Password should be at least more characters. Please try again"),
// 		confirmPassword: z.string(),
// 	})
// 	.refine((data) => data.password === data.confirmPassword, {
// 		message: "Passwords do not match",
// 		path: ["confirmPassword"],
// 	});

// interface SignUpFormState {
// 	errors: {
// 		email?: string[];
// 		password?: string[];
// 		confirmPassword?: string[];
// 	};
// }

// // Validate fields on sign up
// export async function validateSignUp(
// 	formState: SignUpFormState,
// 	formData: FormData
// ): Promise<SignUpFormState> {
// 	console.log(`In validate sign up`);
// 	console.log(`Email: ${formData.get("email")}`);
// 	console.log(`Password: ${formData.get("password")}`);
// 	console.log(`Confirmation: ${formData.get("confirmPassword")}`);

// 	const parsedData = SignUpSchema.safeParse({
// 		email: formData.get("email"),
// 		password: formData.get("password"),
// 		confirmPassword: formData.get("confirmPassword"),
// 	});
// 	console.log(`Parsed data: ${parsedData.success}`);

// 	if (!parsedData.success) {
// 		const errors = parsedData.error.flatten().fieldErrors;
// 		return { errors };
// 	}

// 	const data = parsedData.data;
// 	const dateJoined = new Date().toISOString();
// 	const distanceMetric = "kilometers";
// 	const weightMetric = "kilograms";
// 	const totalWorkouts = 0;
// 	const ptWorkouts = [""];
// 	const Exercises = [""];
// 	const personalRecords = 0;
// 	console.log(`Email: ${data.email}`);
// 	console.log(`Password: ${data.password}`);
// 	const { email, password } = parsedData.data;
// 	const salt = await bcrypt.genSalt(10);
// 	const hashedPassword = await bcrypt.hash(password, salt);
// 	const updatedAt = new Date();

// 	try {
// 		const newUser = await prisma.user.create({
// 			data: {
// 				email,
// 				password: hashedPassword,
// 				dateJoined,
// 				distanceMetric,
// 				weightMetric,
// 				totalWorkouts,
// 			},
// 		});
// 		console.log(`New User: ${newUser}`);
// 	} catch (error: unknown) {
// 		console.log("Here's the issue from prisma: ", error);
// 		if (error instanceof Prisma.PrismaClientKnownRequestError) {
// 			return {
// 				errors: {
// 					email: ["This email already exists. Did you forget your password?"],
// 				},
// 			};
// 		}
// 		console.error("Something else went wrong", error);
// 		return {
// 			errors: {
// 				email: [
// 					"We appear to be having some difficulty. Please reach out to the dev to fix this bug.",
// 				],
// 			},
// 		};
// 		throw new Error("Failed to create a new user.");
// 	}
// 	redirect("/login");
// }

enum ExerciseTypeEnum {
	REGULAR = "REGULAR",
	PT = "PT",
}

const ExerciseSchema = z.object({
	name: z.string({ invalid_type_error: "Please create a name" }),
	description: z.string({ invalid_type_error: "Please add a description" }),
	equipment: z.string({ invalid_type_error: "Please add equipment" }),
	videoLink: z.string({
		invalid_type_error: "Please enter correct url format",
	}),
	muscleGroups: z.array(
		z.string({ invalid_type_error: "Please select a valid muscle group" })
	),
	exerciseType: z.nativeEnum(ExerciseTypeEnum),
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
	// Checking what we got back from the form
	console.log(`Adding in an exercise, ${formData}`);
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

	// Creating an empty muscle group
	let selectedMuscleGroups: string[] = [];
	if (typeof muscleGroupsData === "string" && muscleGroupsData) {
		try {
			selectedMuscleGroups = JSON.parse(muscleGroupsData);
			console.log("Post parsing: ", selectedMuscleGroups);
		} catch (error) {
			console.warn("Error - failed to deserialize muscle data", error);
		}
	}
	console.log(
		`Selected MuscleGroups: ${selectedMuscleGroups} length: ${
			selectedMuscleGroups.length
		} type: ${typeof selectedMuscleGroups}`
	);

	// Check that we got a muscle group back otherwise return an error
	if (selectedMuscleGroups.length === 0) {
		console.log("No muscle Groups");
		return {
			errors: {
				muscleGroups: ["Please select at least one muscle group"],
			},
		};
	}

	// Validate the data
	const exerciseTypeClientValue = formData.get("selectedExercise");

	console.log(`ExerciseTypeClientValue: ${exerciseTypeClientValue}`);

	const validatedFields = ExerciseSchema.safeParse({
		name: formData.get("name"),
		description: formData.get("description"),
		equipment: formData.get("equipment"),
		videoLink: formData.get("videoLink"),
		muscleGroups: selectedMuscleGroups,
		exerciseType: exerciseTypeClientValue,
	});
	console.log(validatedFields.success);

	console.log(validatedFields);

	// Return errors for invalid data
	if (!validatedFields.success) {
		const errors = validatedFields.error.flatten().fieldErrors;
		return { errors };
	}
	// Get ids associated with the muscle group names
	const muscleGroupIds = await Promise.all(
		selectedMuscleGroups.map(async (groupName) => {
			const muscleGroup = await prisma.muscleGroup.findUnique({
				where: { name: groupName },
			});
			return muscleGroup ? muscleGroup.id : null;
		})
	);

	const {
		name,
		description,
		equipment,
		videoLink,
		muscleGroups,
		exerciseType,
	} = validatedFields.data;
	const authorId = "21";

	// Check the correct exercise type is being passed on
	if (!exerciseType) {
		errors: {
			selectedExercise: ["Invalid exercise type provided"];
		}
	}

	// Create a new exercise and muscle group join table
	try {
		const newExercise = await prisma.exercises.create({
			data: {
				name,
				author: {
					connect: { id: authorId },
				},
				description,
				equipment,
				videoLink,
				exerciseType,
				ExerciseMuscleGroup: {
					create: muscleGroupIds
						.filter((id): id is number => id !== null)
						.map((muscleGroupId) => ({
							muscleGroup: {
								connect: { id: muscleGroupId },
							},
						})),
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

const ExerciseEditSchema = z.object({
	id: z.number({ invalid_type_error: "id must be a number" }),
	name: z.string({ invalid_type_error: "Please enter a valid name" }),
	description: z.string({
		invalid_type_error: "Please enter a valid description",
	}),
	equipment: z.string({ invalid_type_error: "Please select valid equipment" }),
	videoLink: z.string({
		invalid_type_error: "Please enter a valid url format",
	}),
	muscleGroups: z.array(
		z.string({ invalid_type_error: "Please select a valid muscle group" })
	),
	exerciseType: z.nativeEnum(ExerciseTypeEnum),
});

export async function editExercise(
	formState: ExerciseFormState,
	formData: FormData
): Promise<ExerciseFormState> {
	console.log(`Editing an exercise, ${formData}`);
	console.log(`Id: ${formData.get("id")}`);
	console.log(`Name: ${formData.get("name")}`);
	console.log(`Description: ${formData.get("description")}`);
	console.log(`Equipment: ${formData.get("equipment")}`);
	console.log(`Video Link: ${formData.get("videoLink")}`);
	console.log(`Exercise Type: ${formData.get("selectedExercise")}`);

	const muscleGroupsData = formData.get("muscleGroups");
	console.log(
		`Muscle group data from the form: ${muscleGroupsData}, type: ${muscleGroupsData}`
	);
	let selectedMuscleGroups: string[] = [];
	if (typeof muscleGroupsData === "string" && muscleGroupsData) {
		try {
			selectedMuscleGroups = JSON.parse(muscleGroupsData);
			console.log(`Post parsing: ${selectedMuscleGroups}`);
		} catch (error) {
			console.warn(`Error - failed to deserialize muscle groups: ${error}`);
		}
	}
	console.log(
		`Length of selected muscle groups: ${selectedMuscleGroups} is ${selectedMuscleGroups.length}`
	);
	if (selectedMuscleGroups.length === 0) {
		return {
			errors: {
				muscleGroups: ["Please select at least one muscle group"],
			},
		};
	}
	const exerciseTypeClientValue = formData.get("selectedExercise");
	let formExerciseId = formData.get("id");
	if (formExerciseId === null) {
		return {
			errors: {
				name: ["exercise doesn't exist"],
			},
		};
	}
	const idString = formExerciseId as string;
	const idNumber = parseInt(idString, 10);
	console.log(`About to validate all is good, to check we have the following: 
	${idNumber} type of ${typeof idNumber}
	${formData.get("name")} which is type ${typeof formData.get("name")}
	${formData.get("description")} which is type of ${typeof formData.get(
		"description"
	)}
	${formData.get("videoLink")} which is ${typeof formData.get("videoLink")}
	${selectedMuscleGroups} type of ${selectedMuscleGroups}
	${exerciseTypeClientValue} type of ${exerciseTypeClientValue}
	`);
	const validatedFields = ExerciseEditSchema.safeParse({
		id: idNumber,
		name: formData.get("name"),
		description: formData.get("description"),
		equipment: formData.get("equipment"),
		videoLink: formData.get("videoLink"),
		muscleGroups: selectedMuscleGroups,
		exerciseType: exerciseTypeClientValue,
	});
	console.log(validatedFields.success);
	console.log(validatedFields);

	if (!validatedFields.success) {
		const errors = validatedFields.error.flatten().fieldErrors;
		console.log(errors);
		return { errors };
	}

	const muscleGroupIds = await Promise.all(
		selectedMuscleGroups.map(async (groupName) => {
			const muscleGroup = await prisma.muscleGroup.findUnique({
				where: { name: groupName },
			});
			return muscleGroup ? muscleGroup.id : null;
		})
	);

	const {
		id,
		name,
		description,
		equipment,
		videoLink,
		muscleGroups,
		exerciseType,
	} = validatedFields.data;
	const authorId = 21;
	if (!exerciseType) {
		errors: {
			selectedExercise: ["Invalid exercise type provided"];
		}
	}

	const exerciseId = await prisma.exercises.findUnique({
		where: {
			name: name,
		},
	});

	console.log(`Exercise Id from Prisma: ${exerciseId}`);

	try {
		const editedExercise = await prisma.exercises.update({
			where: {
				id: id,
			},
			data: {
				name,
				description,
				equipment,
				videoLink,
				exerciseType,
				muscleGroups: {
					connect: muscleGroupIds
						.filter((id): id is number => id !== null)
						.map((id) => ({ id })),
				},
			},
		});
	} catch (error: unknown) {
		console.warn(error);
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				errors: {
					name: ["You do not have permission to edit this Exercise"],
				},
			};
		}
	}
	redirect("/dashboard");
}

const deleteSchema = z.object({
	id: z.number({ invalid_type_error: "Incorrect Id" }),
});

interface deleteExerciseFormState {
	errors: {
		id: string[];
	};
}

export async function deleteExercise(id: number, inViewRoute = false) {
	console.log(`id we got back: ${id} we're about to delete the PRS`);
	if (!id) {
		return {
			errors: {
				id: ["something went wrong"],
			},
		};
	}

	await prisma.personalRecords.deleteMany({
		where: {
			exerciseId: id,
		},
	});
	console.log("Prs deleted, on to the exercise");

	const deletedExercise = await prisma.exercises.delete({
		where: {
			id: +id,
		},
	});
	if (!deletedExercise) {
		return {
			errors: {
				id: ["something went wrong"],
			},
		};
	}
	console.log(`Deleted Exercise`);
	if (inViewRoute) {
		redirect("/dashboard/addworkout");
	} else {
		redirect("/dashboard");
	}
}
