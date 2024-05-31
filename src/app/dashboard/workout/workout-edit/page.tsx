import Nav from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { getUser } from "@/app/lib/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface User {
	user: any | null;
	session: any | null;
}

export default async function EditWorkout() {
	const user = (await getUser()) as User;
	let isLoggedIn = false;
	if (user) {
		isLoggedIn = true;
	} else {
		console.log("user isn't logged in");
	}
	return (
		<>
			<Nav isLoggedIn={isLoggedIn} />
			<div className='m-2'>
				<h1 className='text-4xl'>Edit Workout</h1>
				<Button>
					<Link href={`/dashboard/workout`}>Go back</Link>
				</Button>
			</div>
		</>
	);
}
