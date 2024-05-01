import Nav from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { getUser } from "@/app/lib/auth";

interface User {
	user: any | null;
	session: any | null;
}

export default async function EditWorkout() {
	const user = (await getUser()) as User;
	let isLogledIn = false;
	if (user) {
		isLogledIn = true;
	} else {
		console.log("user isn't logged in");
	}
	return (
		<>
			<div>
				<h1>Eidt workout</h1>
			</div>
		</>
	);
}
