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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import GraphComponent from "@/components/graphs";
import ToDos from "@/components/ToDoList";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import DatePicker from "@/components/DatePicker";
import dynamic from "next/dynamic";

interface quotes {
	id: string;
	quote: string;
}

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

// TODO:
// Finish this to pull motivational quotes from json file
const randomQuote = () => {
	console.log("Getting randomQuote");
	const randomNumber = Math.random() * 10;
	console.log("random number");
};

const ThreeDModel = dynamic(() => import("@/components/modelviewer"), {
	ssr: false,
});

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

export default async function Dashboard() {
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

	console.log("Exercises length: ", exercises.length);

	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} />
			<div className='flex items-center justify-center gap-5 m-3'>
				{/* TODO: Need to update this for the user or allow them to customize */}
				<Avatar>
					<AvatarImage src='https://github.com/shadcn.png' />
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<p className='text-pretty'>{email}</p>
			</div>
			<h1 className='text-center m-2 text-bold text-xl'>
				What shall we do next?!
			</h1>
			<p className='text-center mb-2'>
				<span className='text-pretty'>Motivational Quote</span> goes here
			</p>
			<div className='flex justify-center gap-10'>
				<Button className='gap-2'>
					<Link href='/dashboard/workout/workout-log'>Log Workout</Link>
				</Button>
				<Button>
					<Link href='/dashboard/exercise/exercise-add'>Add Exercise</Link>
				</Button>
			</div>
			<div className='flex justify-center'>
				<ToDos />
			</div>
			<div className='display-inline m-2 p3'>
				{exercises &&
					exercises.map((exercise: ProcessedExercise) => {
						return (
							<>
								<Card
									key={exercise.id}
									className='bg-indigo-300 text-white m-5 shadow border-t-2 border-indigo-400'>
									<CardHeader>
										<CardTitle>{exercise.name}</CardTitle>
										<CardDescription
											className='text-white'
											key={`${exercise.id}-description`}>
											<span className='text-xl text-muted'>Decription: </span>
											{exercise.description}
										</CardDescription>
									</CardHeader>
									<CardContent key={`${exercise.id}-content`}>
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
											<a
												href={`${
													exercise.videoLink.startsWith("http://") ||
													exercise.videoLink.startsWith("https://")
														? exercise.videoLink
														: `https://${exercise.videoLink}`
												}`}
												className=' hover:text-blue-800'
												rel='noopener noreferrer'
												target='_blank'>
												{exercise.videoLink}{" "}
											</a>
										</p>
									</CardContent>
									<CardFooter key={`${exercise.id}-footer`}>
										<DeleteButton id={exercise.id} onDelete={deleteExercise} />
										<Button className='ml-5'>
											<Link href={`/dashboard/${exercise.id}/exercise-edit`}>
												Edit
											</Link>
										</Button>
									</CardFooter>
								</Card>
							</>
						);
					})}
				{exercises.length < 1 && (
					<div className='text-center text-xl bg-indigo-400 w-25 py-10 rounded border-indigo-600  text-white shadow mt-10'>
						<p>You currently do not have any exercises.</p>
						<Button className='mt-2 text-indigo-500 text-md' variant='outline'>
							Add exercises &rarr;
						</Button>
					</div>
				)}
				<DatePicker />
				<div className='model-container'>
					<h1 className='text-center'>Placeholder for 3D model</h1>
					<ThreeDModel />
				</div>
			</div>
			<div className='py-24 mb-5'>
				<h1 className='text-4xl text-center text-indigo-500'>
					Graph Placeholder
				</h1>
				<GraphComponent label='ok' />
				<div className='mb-10'>Spacer</div>
			</div>
			<Footer />
		</>
	);
}
