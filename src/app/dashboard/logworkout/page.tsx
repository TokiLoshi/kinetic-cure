import { sql } from "@vercel/postgres";
import Navbar from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { getUser } from "@/app/lib/auth";
import { addWorkout } from "@/app/lib/workoutActions";
import { redirect } from "next/navigation";
import WorkoutForm from "@/components/AddWorkoutForm";

interface User {
	user: any | null;
	session: any | null;
	username: any | null;
}

export default async function Page() {
	const user = (await getUser()) as User;
	console.log(`User in addworkout page: ${JSON.stringify(user)}`);
	console.log(`Unpack user: ${user?.username?.email}`);
	let isLoggedIn = false;
	if (!user) {
		redirect("/login");
	}
	if (user?.username) {
		isLoggedIn = true;
	}
	const username = user?.username?.email;
	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} />
			<div className='flex justify-center m-2'>
				<h1 className='m-2'>This is the log workout page</h1>
			</div>
			<p className='text-center'>Logging of {username} workouts will go here</p>
			<WorkoutForm formAction={addWorkout} initialData={{
				name: "",
				duration: 0,
				athleteId: user?.id,
				dateCompleted: new Date(),
				notes: "",
				exercises: [],
			}}/>
			<Footer />
		</>
	);
}
