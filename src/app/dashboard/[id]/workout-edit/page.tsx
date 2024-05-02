import { PrismaClient } from "@prisma/client";
import { editExercise } from "@/app/lib/actions";
import EditExerciseForm from "@/components/EditExerciseForm";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import prisma from "@/app/lib/prisma";
import { getUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";

// Make checks - users shouldn't be able to edit exercises
// that they didn't create

interface Exercise {
	id: number;
	name: string;
	description: string;
	equipment: string;
	videoLink: string;
	exerciseType: string;
	ExerciseMuscleGroup: Array<{
		muscleGroup: {
			name: string;
		};
	}>;
}

// get the exercise data from Prisma (pass id up from params)
async function getExercise(id: string): Promise<Exercise | null> {
	console.log(`Using server to search for an id: ${id} ${typeof +id}`);
	const exercise = await prisma.exercises.findFirst({
		where: {
			id: +id,
		},
		include: {
			ExerciseMuscleGroup: {
				include: {
					muscleGroup: true,
				},
			},
		},
	});
	if (!exercise) {
		return null;
	}
	const exerciseWithMuscleGroups = {
		...exercise,
		muscleGroups: exercise.ExerciseMuscleGroup.map(
			(eg: { muscleGroup: { name: string } }) => eg.muscleGroup.name
		),
	};
	console.log(
		`Exercise with muscle groups: ${Object.entries(exerciseWithMuscleGroups)}`
	);
	return exerciseWithMuscleGroups;
}

// define the formData types

// aync function
export default async function Page({ params }: { params: { id: string } }) {
	const user = await getUser();
	if (!user) {
		return redirect("/login");
	}
	const isLoggedIn = true;

	console.log(`User wants to edit a page for a workout with id: ${params.id}`);
	// get the exercise id from the params
	const exercise_id = params.id;
	const exerciseData = await getExercise(exercise_id);
	if (!exerciseData) {
		console.log(`No exercise data found for id: ${exercise_id}`);
		return null;
	}
	console.log(`Exercise Data: ${JSON.stringify(exerciseData, null, 2)}`);
	const parsedExerciseData = JSON.stringify(exerciseData);
	const {
		name,
		description,
		equipment,
		videoLink,
		exerciseType,
		ExerciseMuscleGroup,
	} = exerciseData;
	const muscleGroupNames = ExerciseMuscleGroup.map(
		(muscle) => muscle.muscleGroup.name
	);

	// console.log(`Exercise Name: ${name}`);
	// console.log(`Exercise Description: ${description}`);
	// console.log(`Exercise Equipment: ${equipment}`);
	// console.log(`Exercise Video Link: ${videoLink}`);
	// console.log(`Exercise Type: ${exerciseType}`);
	// console.log(`Exercise Muscle Groups: ${muscleGroupNames}`);

	// get the exercise data from Prisma
	// create values for each of the form fields
	// Update the form State with the new values
	// pass everything back to the form data that needs to be updated and validated
	// Add in error messaging for if something goes wrong
	return (
		<>
			<NavBar isLoggedIn={isLoggedIn} />
			<div className='flex justify-center m-26'>
				<h1>User wants to edit a page for a workout {exercise_id} </h1>;
				<div
					className='flex flex-col justify-center m-26'
					style={{ paddingBottom: "100px" }}>
					<EditExerciseForm exercise={exerciseData} formAction={editExercise} />
				</div>
			</div>
			<Footer />
		</>
	);
}
