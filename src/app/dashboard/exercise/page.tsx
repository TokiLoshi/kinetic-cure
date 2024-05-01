import Nav from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { getUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";

interface User {
	user: any | null;
	session: any | null;
}

export default async function Exercise() {
	const user = (await getUser()) as User;
	let isLoggedIn = false;
	if (user) {
		isLoggedIn = true;
	} else {
		return "/login";
	}
	return (
		<>
			<Nav isLoggedIn={isLoggedIn} />
			<div>
				<h1 className='text-center text-4xl'>Main Exercise Page</h1>
			</div>
			<Footer />
		</>
	);
}
