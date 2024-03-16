import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import WorkoutForm from "@/components/workoutForm";
import { editExercise, deleteExercise } from "@/app/lib/actions";

const prisma = new PrismaClient();

async function getExercises() {
	const result = await prisma.exercises.findMany();
	console.log(result);
	const exercise = result[0];
	const muscleGroup = await getMuscleGroups(exercise.id);
	const exerciseMuscleGroups = { exercise: result, muscleGroup };
	return exerciseMuscleGroups;
}

async function getMuscleGroups(exerciseId: number | undefined = undefined) {
	const muscleGroups = await prisma.exerciseMuscleGroup.findMany({
		where: {
			exerciseId: exerciseId,
		},
	});
	return muscleGroups;
}

export default async function Page() {
	const exercises = await getExercises();
	console.log(`Exercises in main: ${exercises}`);
	return (
		<>
			<NavBar />
			<h1 className='text-center m-2 text-bold'>
				Welcome back username, what shall we do next?
			</h1>

			<div className='flex justify-center'>
				<button className='m-2'>
					<Link
						className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus-outline-none text-white font-bold py-2 px-4 rounded'
						href='/dashboard/logworkout'>
						Log Workout
					</Link>
				</button>
				<button className='m-2'>
					<Link
						className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus-outline-none text-white font-bold py-2 px-4 rounded'
						href='/dashboard/addworkout'>
						Add Workout
					</Link>
				</button>
			</div>
			<div>
				{exercises.exercise.map((item) => {
					return (
						<div key={item.id} className='flex m-2 p-2 text-center'>
							<h2>{item.name}</h2>
							<p>{item.description}</p>
							<WorkoutForm
								formAction={editExercise}
								initialData={{
									name: item.name,
									description: item.description,
									muscleGroups: exercises.muscleGroup,
									equipment: item.equipment,
									videoLink: item.videoLink,
									exerciseType: item.exerciseType,
								}}
							/>
							<form
								formAction={deleteExercise}
								initialData={{
									name: exercise.name,
									description: exercise.description,
									muscleGroups: exercise.muscleGroups,
									equipment: exercise.equipment,
									videoLink: exercise.videoLink,
									exerciseType: exercise.exerciseType,
								}}>
								<button>Delete</button>
							</form>
						</div>
					);
				})}
			</div>
			<Footer />
		</>
	);
}
