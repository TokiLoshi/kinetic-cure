"user server";
import { z } from "zod";
import { getUser, lucia, validateRequest } from "@/app/lib/auth";
import { ActionResult } from "@/app/lib/form";
import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";

// Define the schema for a workout
const WorkoutSchema = z.object({
	name: z.string({ invalid_type_error: "Please enter a name" }),
	duration: z.number({ invalid_type_error: "Please enter a duration" }),
	athleteId: z.string({
		invalid_type_error: "Please log in to create a workout",
	}),
	dateCompleted: z.date(),
	notes: z.string({ invalid_type_error: "Please enter some notes" }),
	exercises: z.array(
		z.object({
			exerciseId: z.number().positive(),
			reps: z.number().positive(),
			distance: z.number().positive(),
			sets: z.number().positive(),
			weight: z.number().positive(),
			restTime: z.number().positive(),
			pr: z.boolean(),
		})
	),
});
// Exercises in the workout - this is  a relational table

interface WorkoutFormState {
	errors: {
		name?: string[];
		duration?: string[];
		dateCompleted?: string[];
		notes?: string[];
		exercises?: string[];
	};
}

interface User {
	id: string;
	username: {
		email: string;
		username: string | null;
		password: string;
		name: string;
		dateJoined: string;
		distanceMetric: string;
		weightMetric: string;
		totalWorkouts: number;
	};
}

interface Exercises {
	exerciseId: number;
	reps: number;
	sets: number;
	weight: number;
	distance: number;
	restTime: number;
	pr: boolean;
}

export async function updatePersonalRecords(
	exercises: Exercises[],
	authorId: string
) {
	// Check for existing PRs
	const existingPrRecords = await prisma.personalRecords.findMany({
		where: {
			athleteId: authorId,
		},
	});
	for (const exercise of exercises) {
		const matchingRecord = existingPrRecords.find((record) => {
			record.exerciseId === exercise.exerciseId;
		});

		if (!matchingRecord) {
			exercise.pr = true;
		}

		if (matchingRecord) {
			exercise.pr =
				exercise.reps > matchingRecord.reps ||
				exercise.sets > matchingRecord.sets ||
				exercise.weight > matchingRecord.weight ||
				exercise.distance > matchingRecord.distance;
		} else {
			exercise.pr = true;
		}
	}
}

// Add a workout
export async function addWorkout(
	formState: WorkoutFormState,
	formData: FormData
): Promise<WorkoutFormState> {
	// Get the data from the form
	console.log(`Trying to add a workout`);
	console.log(`Name: ${formData.get("name")}`);
	console.log(`Duration: ${formData.get("duration")}`);
	console.log(`Date Completed: ${formData.get("dateCompleted")}`);
	console.log(`Notes: ${formData.get("notes")}`);
	console.log(`Distance: ${formData.get("distance")}`);
	console.log(`Reps: ${formData.get("reps")}`);
	console.log(`Sets: ${formData.get("sets")}`);

	// Check that the user is logged in
	const userResult = (await getUser()) as User;
	if (!userResult || !userResult.id) {
		return {
			errors: {
				name: ["you must be logged in to record a workout"],
			},
		};
	}
	console.log("User id: ", userResult.id);

	// Get the User Id and their preferrences
	const authorId = userResult.id;
	const userDistanceMetric = userResult.username.distanceMetric;
	const userWeightMetric = userResult.username.weightMetric;
	console.log("Author id: ", authorId);
	console.log("Distance Metric: ", userDistanceMetric);
	console.log("Weight Metric: ", userWeightMetric);

	if (formData.get("exercises") === null) {
		return {
			errors: {
				exercises: ["Please add an exercise to the workout"],
			},
		};
	}
	const exerciseData = formData.get("exercises")?.toString() || "";
	const parsedExerciseData = JSON.parse(exerciseData);
	console.log("Exercise data: ", parsedExerciseData);

	// Validate that the data is there and the correct type
	const validatedFields = WorkoutSchema.safeParse({
		name: formData.get("name"),
		duration: formData.get("duration"),
		dateCompleted: formData.get("dateCompleted"),
		notes: formData.get("notes"),
		exercises: parsedExerciseData,
	});

	if (!validatedFields.success) {
		const errors = validatedFields.error.flatten().fieldErrors;
		return { errors };
	}
	console.log("Validated fields: ", validatedFields.data);

	// If the user's preferences are not in km and kgs we need to convert
	const { name, duration, dateCompleted, notes, exercises } =
		validatedFields.data;

	console.log("Destructured data: ", name, duration, dateCompleted, notes);

	// Distances are stored in the database as km and kg
	// Modifiers will help us convert the data
	let distanceModifier = 1;
	if (userDistanceMetric !== "km") {
		distanceModifier = 1.60934;
	}

	let weightModifier = 1;
	if (userWeightMetric !== "km") {
		weightModifier = 0.4536;
	}

	// update the distances and weights
	for (let exercise of exercises) {
		exercise.distance = exercise.distance * distanceModifier;
		exercise.weight = exercise.weight * weightModifier;
	}

	try {
		const transaction = await prisma.$transaction(async (tx) => {
			const workout = await tx.workouts.create({
				data: {
					name,
					duration,
					athleteId: authorId,
					dateCompleted,
					notes,
				},
			});

			await updatePersonalRecords(exercises, authorId);

			for (const exercise of exercises) {
				await tx.workoutExerciseGroup.create({
					data: {
						workout: { connect: { id: workout.id } },
						...exercise,
					},
				});
			}

			return workout;
		});
	} catch (error) {
		console.error(error);
		return {
			errors: {
				name: ["There was an error creating the workout"],
			},
		};
	}
	console.log("Workout added");
	return redirect("/dashboard");
}

// Edit a workout
// Get the data from the form
// Check that the user is logged in
// Check that the user is the owner of the workout
// Validate that the data is there and the correct type
// Update the workout in the database
// Update the other tables that are related to the workout

// Delete a workout
// Get the id of the workout
// Check that the user is logged in
// Check that this belongs to the user
// Delete the workout from the database
// Log a workout
