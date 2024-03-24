import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import WorkoutForm from "@/components/ExerciseForm";
import { editExercise, deleteExercise } from "@/app/lib/actions";
import DeleteButton from "@/components/Deletebutton";
import { getUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import prisma from "@/app/lib/prisma";

interface User {
	user: any | null;
	session: any | null;
	username: any | null;
}

interface MuscleGroup {
	name: string;
}

interface ExerciseMuscleGroup {
	muscleGroup: MuscleGroup;
}

interface Exercise {
	id: number;
	name: string;
	description: string;
	equipment: string;
	videoLink: string;
	exerciseType: string;
	ExerciseMuscleGroup: ExerciseMuscleGroup[];
}

interface ProcessedExercise {
	id: number;
	name: string;
	description: string;
	equipment: string;
	videoLink: string;
	exerciseType: string;
	muscleGroups: string[];
}

async function getExercises() {
	const exercises = await prisma.exercises.findMany({
		include: {
			ExerciseMuscleGroup: {
				include: {
					muscleGroup: true,
				},
			},
		},
	});
	return exercises.map((exercise: Exercise): ProcessedExercise => {
		const muscleGroups = exercise.ExerciseMuscleGroup.map(
			(eg) => eg.muscleGroup.name
		);
		return {
			id: exercise.id,
			name: exercise.name,
			description: exercise.description,
			equipment: exercise.equipment,
			videoLink: exercise.videoLink,
			exerciseType: exercise.exerciseType,
			muscleGroups: exercise.ExerciseMuscleGroup.map(
				(emg) => emg.muscleGroup.name
			),
		};
	});
}

export default async function Page() {
	const result = (await getUser()) as User;
	const user = result;
	if (!user) {
		return redirect("/login");
	}
	const { username } = user;

	if (!username) {
		return redirect("/login");
	}
	const { email } = username;
	// console.log(`Object: ${username.username}`);
	let exercises = await getExercises();
	console.log(`Exercises in main: ${Object.values(exercises)}`);
	let isLoggedIn = true;

	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} />
			<h1 className='text-center m-2 text-bold'>
				Welcome back what shall we do next? {email}!
			</h1>

			<div className='flex justify-center'>
				<button className='m-2'>
					<Link
						href='/dashboard/logworkout'
						className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus-outline-none text-white font-bold py-2 px-4 rounded'>
						Log Workout
					</Link>
				</button>
				<button className='m-2'>
					<Link
						href='/dashboard/addworkout'
						className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus-outline-none text-white font-bold py-2 px-4 rounded'>
						Add workout
					</Link>
				</button>
			</div>
			<div className='display-inline m-2 p3'>
				{exercises &&
					exercises.map((exercise: ProcessedExercise) => {
						return (
							<div key={exercise.id} className='flex m-2 p-2 text-center'>
								<h2>Name: {exercise.name}</h2>
								<p>
									<strong>Description: </strong>
									{exercise.description}
								</p>
								<p>
									<strong>Muscle Groups: </strong>
									{exercise.muscleGroups.join(", ")}
								</p>
								<p>
									<strong>Exercise Type: </strong>
									{exercise.exerciseType === "REGULAR"
										? "Strength / Cardio "
										: "Physio"}
								</p>
								<DeleteButton id={exercise.id} />
								<div>
									<Link
										href={`/dashboard/${exercise.id}/editworkout`}
										className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus-outline-none text-white font-bold py-2 px-4 rounded'>
										Edit
									</Link>
								</div>
							</div>
						);
					})}
				{!exercises && (
					<p>
						You do not have any exercises, Add a Work to start getting stronger
					</p>
				)}
			</div>
			<Footer />
		</>
	);
}
