import Nav from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { getUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface User {
	user: any | null;
	session: any | null;
}

export default async function WorkoutHub() {
	const user = (await getUser()) as User;
	let isLoggedIn = false;
	if (user) {
		let isLoggedIn = true;
	} else {
		redirect("/login");
	}
	return (
		<>
			<Nav isLoggedIn={isLoggedIn} />
			<h1 className='text-center text-4xl'>Main Workout Page</h1>
			<div className='flex items-center gap-5'>
				<Button>
					<Link href={`/dashboard/workout/workout-add`}>Add a workout</Link>
				</Button>
				<Button className='ml-5'>
					<Link href={`/dashboard/workout/workout-edit`}>Edit a workout</Link>
				</Button>
				<Button className='ml-5'>
					<Link href={`/dashboard/workout/workout-log`}>Log Workout</Link>
				</Button>
			</div>
			<Footer></Footer>
		</>
	);
}
