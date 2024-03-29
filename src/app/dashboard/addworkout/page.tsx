import { sql } from "@vercel/postgres";
import Link from "next/link";
import { useRouter } from "next/navigation";
import WorkoutForm from "@/components/AddExerciseForm";
import { addExercise } from "@/app/lib/actions";
import { string } from "zod";
import Navbar from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { getUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";

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
	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} />
			<div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
				<WorkoutForm
					formAction={addExercise}
					initialData={{
						name: "",
						description: "",
						muscleGroups: [],
						equipment: "",
						videoLink: "",
						exerciseType: "",
					}}
				/>
			</div>
			<Footer />
		</>
	);
}
