import { getUser } from "@/app/lib/auth";
import Nav from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

interface User {
	user: any | null;
	session: any | null;
}

export default async function UpdatePassword() {
	const user = (await getUser()) as User;
	console.log("User wants to update their password", user);
	let isLoggedIn = false;
	if (user) {
		isLoggedIn = true;
	}
	// Only loggedin users should be able to change passwords
	else {
		redirect("/login");
	}

	return (
		<>
			<Nav isLoggedIn={isLoggedIn} />
			<div className='m-2 flex justify-center'>
				<h1>Time to update your password</h1>
				<div className='justify-center m-2'>
					<form>
						<h1>Future form to go here</h1>
						<label htmlFor='newPassword'>Update Time</label>
						<input
							type='text'
							id='newPassword'
							name='newPassword'
							placeholder='test placeholder'
							className='p-2'
						/>
						<div className='m-2'>
							<Button>Click to update</Button>
						</div>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
}
