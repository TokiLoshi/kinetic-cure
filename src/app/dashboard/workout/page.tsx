import Nav from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { getUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";

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

			<Footer></Footer>
		</>
	);
}
