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

export default async function WorkoutDone() {
	const user = (await getUser()) as User;
	let isLoggedIn = false;
	if (user) {
		isLoggedIn = true;
	} else {
		redirect("/login");
	}
	return (
		<>
			<Nav isLoggedIn={isLoggedIn} />
			<div className=' justify-center bg-indigo-300 m-2 p-2 rounded shadow'>
				<h1 className='text-4xl'>Success! Your workout has been logged</h1>
				<p>
					You should be so proud of yourself, lets look at what you have
					accomplished
				</p>
				<p>Workout Summary: </p>
				<p>Number of exercises: </p>
				<p>Total time: </p>
				<p>Personal recores: </p>
				<p>Total Distance: </p>
				<p>Total weight lifted: </p>
				<p>
					This is approximately the size of a baby elephant or something like
					that
				</p>
				<p>Look at all of the muscles you worked - 3D goes below</p>
				<div className='gap-5'>
					<select>
						<option value='happy'>🤩</option>
						<option value='happy'>🙂</option>
						<option value='happy'>😐</option>
						<option value='happy'>😩</option>
						<option value='happy'>🔥</option>
						<option value='happy'>🤢</option>
					</select>
				</div>
				<Button>
					<Link href='/dashboard'>Back to Dashboard</Link>
				</Button>
			</div>
			<Footer />
		</>
	);
}
