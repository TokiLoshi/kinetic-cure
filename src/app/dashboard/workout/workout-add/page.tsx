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

export default async function Page() {
	console.log("I really hope this works");
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
			<div className='flex justify-center'>
				<h1 className='text-4xl'>Add a workout</h1>
				<Button>
					<Link href='/dashboard/workout'>Go Back to Dashboard</Link>
				</Button>
			</div>
			<Footer />
		</>
	);
}
