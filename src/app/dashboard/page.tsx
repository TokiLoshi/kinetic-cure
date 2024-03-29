import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import WorkoutForm from "@/components/AddExerciseForm";
import { editExercise, deleteExercise } from "@/app/lib/actions";
import DeleteButton from "@/components/DeleteExerciseForm";
import { getUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import prisma from "@/app/lib/prisma";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

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
	console.log("Exercises in main: ", exercises);
	let isLoggedIn = true;

	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} />
			<h1 className='text-center m-2 text-bold text-xl'>
				Welcome back! What shall we do next? {email}!
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
							<>
								<Card
									key={exercise.id}
									className='bg-indigo-500 text-white m-5'>
									<CardHeader>
										<CardTitle>{exercise.name}</CardTitle>
										<CardDescription className='text-white'>
											<span className='text-xl text-muted'>Decription: </span>
											{exercise.description}
										</CardDescription>
									</CardHeader>
									<CardContent>
										<p>
											<span className='text-xl text-muted'>
												Muscle Groups:{" "}
											</span>
											{exercise.muscleGroups.join(",")}
										</p>
										<p>
											<span className='text-xl'>Exercise Type: </span>
											{exercise.exerciseType === "REGULAR"
												? "Strength / Cardio "
												: "Physio"}
										</p>
										<p>
											<span className='text-xl'>Equipment: </span>
											{exercise.equipment}
										</p>
										<p>
											<span className='text-xl'>Instructional Link: </span>
											{exercise.videoLink}
										</p>
									</CardContent>
									<CardFooter>
										<DeleteButton id={exercise.id} />
										<div className='m-2'>
											<Link
												href={`/dashboard/${exercise.id}/editworkout`}
												className='shadow bg-slate-800 hover:bg-slate-900 focus:shadow-outline focus-outline-none text-white font-bold py-2.5 px-5 rounded'>
												Edit
											</Link>
										</div>
									</CardFooter>
								</Card>
							</>
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
