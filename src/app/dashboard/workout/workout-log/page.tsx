import { sql } from "@vercel/postgres";
import Navbar from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { getUser } from "@/app/lib/auth";
import { addWorkout } from "@/app/lib/workoutActions";
import { redirect } from "next/navigation";
import WorkoutForm from "@/components/AddWorkoutForm";
import prisma from "@/app/lib/prisma";

interface UserLogin {
	user: UserDetails | null;
	session: any | null;
	username: any | null;
	id: any | null;
	authorId: any | null;
}

interface UserDetails {
	id: string;
	username: string;
	email: string;
	name?: string;
	dateJoined: string;
	distanceMetric: string;
	weightMetric: string;
	totalWorkouts: number;
}

interface Exercise {
	id: number;
	name: string;
	description: string;
	equipment: string;
	videoLink: string;
	exerciseType: string;
}

interface initialData {
	athleteId: string;
}

async function getExercises(user: UserDetails) {
	const userId = user.id;
	const exercises = await prisma.exercises.findMany({
		where: {
			authorId: userId,
		},
	});
}

export default async function Page() {
	const user = (await getUser()) as UserLogin;
	console.log("User: ", user);

	let isLoggedIn = false;
	if (!user || user.user === null) {
		redirect("/login");
	}
	console.log(`User in addworkout page: ${JSON.stringify(user)}`);
	console.log(`Unpack user: ${user?.username?.email || "no email"}`);
	if (user?.username) {
		isLoggedIn = true;
	}
	const authorId = user.id as string;
	const username = user.username.email || "";
	const possibleExercises = await getExercises(authorId);
	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} />
			<div className='flex justify-center m-2'>
				<h1 className='m-2'>This is the log workout page</h1>
			</div>
			<p className='text-center'>Logging of {username} workouts will go here</p>
			<WorkoutForm
				formAction={addWorkout}
				initialData={{
					id: "",
					name: "",
					duration: 0,
					athleteId: authorId,
					dateCompleted: "",
					notes: "",
					exercises: [],
				}}
				possibleExercises={possibleExercises}
			/>
			<Footer />
		</>
	);
}
