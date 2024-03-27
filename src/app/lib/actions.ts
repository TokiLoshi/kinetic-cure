"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { PrismaClient, Prisma } from "@prisma/client";
import {
	PrismaClientUnknownRequestError,
	PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import { lucia, validateRequest } from "@/app/lib/auth";
import { cookies } from "next/headers";
import { ActionResult } from "@/app/lib/form";
import { getUser } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

// Log a user out
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

enum ExerciseTypeEnum {
	REGULAR = "REGULAR",
	PT = "PT",
}

// Define an exercise
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

interface User {
	id: string;
	username: {
		email: string;
		username: string | null;
		password: string;
		name: string | null;
		dateJoined: string;
		distanceMetric: string;
		weightMetric: string;
		totalWorkouts: number;
	};
}

// Add an exercise
export async function addExercise(
	formState: ExerciseFormState,
	formData: FormData
): Promise<ExerciseFormState> {
	const muscleGroupsData = formData.get("muscleGroups");

	// Creating an empty muscle group
	let selectedMuscleGroups: string[] = [];

	if (typeof muscleGroupsData === "string" && muscleGroupsData) {
		try {
			selectedMuscleGroups = JSON.parse(muscleGroupsData);
		} catch (error) {
			console.warn("Error - failed to deserialize muscle data", error);
		}
	}

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

	const validatedFields = ExerciseSchema.safeParse({
		name: formData.get("name"),
		description: formData.get("description"),
		equipment: formData.get("equipment"),
		videoLink: formData.get("videoLink"),
		muscleGroups: selectedMuscleGroups,
		exerciseType: exerciseTypeClientValue,
	});

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

	const userResult = (await getUser()) as User;

	if (!userResult || !userResult.id) {
		return {
			errors: {
				name: ["you must be logged in to record an exercise"],
			},
		};
	}

	const authorId: string = userResult.id;

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
		if (error instanceof PrismaClientKnownRequestError) {
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
	const muscleGroupsData = formData.get("muscleGroups");
	let selectedMuscleGroups: string[] = [];
	if (typeof muscleGroupsData === "string" && muscleGroupsData) {
		try {
			selectedMuscleGroups = JSON.parse(muscleGroupsData);
		} catch (error) {
			console.warn(`Error - failed to deserialize muscle groups: ${error}`);
		}
	}
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

	const validatedFields = ExerciseEditSchema.safeParse({
		id: idNumber,
		name: formData.get("name"),
		description: formData.get("description"),
		equipment: formData.get("equipment"),
		videoLink: formData.get("videoLink"),
		muscleGroups: selectedMuscleGroups,
		exerciseType: exerciseTypeClientValue,
	});
	console.log("Was validation successful?", validatedFields.success);
	console.log("Validated fields: ", validatedFields);

	if (!validatedFields.success) {
		const errors = validatedFields.error.flatten().fieldErrors;
		return { errors };
	}

	const muscleGroupQuery = await prisma.muscleGroup.findMany({
		where: {
			OR: selectedMuscleGroups.map((name) => ({ name })),
		},
	});

	const musclegroupIds = muscleGroupQuery.map((group) => group.id);

	const {
		id,
		name,
		description,
		equipment,
		videoLink,
		muscleGroups,
		exerciseType,
	} = validatedFields.data;

	// Ensure User is logged in
	const userResult = (await getUser()) as User;
	if (!userResult || !userResult.id) {
		return {
			errors: {
				name: ["you don't have permission to edit this exercise"],
			},
		};
	}

	if (!exerciseType) {
		console.log(`Exercise type missing`);
		errors: {
			selectedExercise: ["Invalid exercise type provided"];
		}
	}

	const exerciseId = await prisma.exercises.findUnique({
		where: {
			id: id,
		},
	});

	// Ensure only authors can edit exercises
	const authorUserId = exerciseId?.authorId;
	if (userResult.id !== authorUserId) {
		return {
			errors: {
				name: ["you are not authorised to edit this exercise"],
			},
		};
	}

	try {
		const updatedExercise = await prisma.$transaction(async (prisma) => {
			const exerciseUpdate = await prisma.exercises.update({
				where: { id: id },
				data: {
					name,
					description,
					equipment,
					videoLink,
					exerciseType,
				},
			});
			const muscleGroupUpdate = await prisma.exerciseMuscleGroup.deleteMany({
				where: { exerciseId: id },
			});
			await prisma.exerciseMuscleGroup.createMany({
				data: musclegroupIds.map((muscleGroupId) => ({
					exerciseId: id,
					muscleGroupId: muscleGroupId,
				})),
				skipDuplicates: true,
			});
			return exerciseUpdate;
		});
		console.log(updatedExercise);
	} catch (error: unknown) {
		console.warn("Something went wrong with prisma", error);
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				errors: {
					name: ["You do not have permission to edit this Exercise"],
				},
			};
		}
	}

	const updatedExercise = await prisma.exercises.findUnique({
		where: { id: id },
		include: { muscleGroups: true },
	});
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
		redirect("/dashboard");
	} else {
		redirect("/dashboard");
	}
}
