import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { getUser } from "@/app/lib/auth";

interface User {
	user: any | null;
	session: any | null;
}

export default async function Page() {
	const user = (await getUser()) as User;
	console.log(`User in about page: ${JSON.stringify(user)}`);
	console.log(`Unpack user: ${user?.user}`);
	let isLoggedIn = false;
	if (user?.user) {
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
