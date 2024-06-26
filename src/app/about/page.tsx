import Navbar from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { getUser } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";

interface User {
	user: any | null;
	session: any | null;
}
export default async function Page() {
	const user = (await getUser()) as User;
	console.log(`User in about page: ${JSON.stringify(user)}`);
	console.log(`Unpack user: ${user?.user}`);
	let isLoggedIn = false;
	if (user) {
		isLoggedIn = true;
	}

	console.log(`Is the user logged in? ${isLoggedIn}`);

	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} />
			<div className='flex justify-center m-2'>
				<h1 className='flex justify-center m-2'>About Page will go here</h1>
			</div>
			<Footer />
		</>
	);
}
