import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import WorkoutForm from "@/components/workoutForm";
import { editExercise, deleteExercise } from "@/app/lib/actions";
import DeleteButton from "@/components/deletebutton";

const prisma = new PrismaClient();

async function getExercises() {
	const exercises = await prisma.exercises.findMany();
	return await Promise.all(
		exercises.map(async (exercise) => {
			const muscleGroups = await prisma.exerciseMuscleGroup.findMany({
				where: { exerciseId: exercise.id },
				include: { muscleGroup: true },
			});
			return {
				...exercise,
				muscleGroups: muscleGroups.map((mg) => mg.muscleGroup.name),
			};
		})
	);
}

async function getServerSideProps() {
	const exercisesWithMuscleGroups = await getExercises();
	return {
		props: {
			exercisesWithMuscleGroups,
		},
	};
	// [isHidden, setIsHidden] = useState(true);
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
			<div className='display-inline m-2 p3'>
				{exercises.map((exercise) => {
					return (
						<div key={exercise.id} className='flex m-2 p-2 text-center'>
							<h2>Name: {exercise.name}</h2>
							<p>
								<strong>Description: </strong>
								{exercise.description}
							</p>
							<p>
								<strong>Muscle Groups: </strong>
								{exercise.muscleGroups}
							</p>
							<DeleteButton id={exercise.id} />
							<div>
								<Link
									href={`/dashboard/editworkout/${exercise.id}`}
									className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus-outline-none text-white font-bold py-2 px-4 rounded'>
									Edit
								</Link>
							</div>
						</div>
					);
				})}
			</div>
			<Footer />
		</>
	);
}
