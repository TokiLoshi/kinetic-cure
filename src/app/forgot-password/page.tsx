import { getUser } from "@/app/lib/auth";
import Nav from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

interface User {
	user: any | null;
	session: any | null;
}

export default async function ForgotPassword() {
	const user = (await getUser()) as User;
	console.log(`User in about page: ${JSON.stringify(user)}`);
	console.log(`Unpack user: ${user?.user}`);
	let isLoggedIn = false;
	if (user) {
		isLoggedIn = true;
	}

	console.log("forgot password page");
	return (
		<>
			<Nav isLoggedIn={isLoggedIn} />
			<div
				className='flex justify-center m-2
      '>
				<h1>Ooopsie I forgot my password</h1>
				<div className='justify-center m-2'>
					<form>
						<h1>forgot password form to go here</h1>
						<div className='m-2'>
							<input type='text' placeholder='hello world' className='m-2' />
						</div>
						<Button>Click me</Button>
					</form>
				</div>
			</div>
			<Footer />
		</>
	);
}
