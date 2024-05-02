import { getUser } from "@/app/lib/auth";
import Nav from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
	user: any | null;
	session: any | null;
	username?: any | null | undefined;
	email?: any | null | undefined;
	name?: any | null | undefined;
	dateJoined?: any | null | undefined;
	distanceMetric?: any | null | undefined;
	weightMetric?: any | null | undefined;
	totalWorkouts?: any | null | undefined;
}

export default async function UserPreferences() {
	const result = (await getUser()) as User;
	const user = result;
	console.log("User: ", user);
	console.log("Unpack user: ", user?.user);
	let isLoggedIn = false;
	console.log("Getting user preferences");
	if (user) {
		isLoggedIn = true;
	} else {
		redirect("/login");
	}
	const { username } = user;
	const { email } = username;
	console.log("Email: ", email);
	const dateJoined = username.dateJoined.toString();
	console.log("Date joined: ", dateJoined);
	const name = username.name;
	const totalWorkouts = username.totalWorkouts;
	console.log("Total workouts: ", totalWorkouts);
	const distanceMetric = username.distanceMetric;
	const weightMetric = username.weightMetric;
	console.log("Distance metric: ", distanceMetric);
	console.log("Weight metric: ", weightMetric);

	return (
		<>
			<Nav isLoggedIn={isLoggedIn} />
			<h1 className='text-center text-4xl'>User settings</h1>
			<div className='flex justify-center bg-slate-500 m-2'>
				<h1 className='text-pretty'>Here are your preferences:</h1>
				<div className='justify-center m-2'>
					{/* TODO: Need to update this for the user or allow them to customize */}
					<Avatar>
						<AvatarImage src='https://github.com/shadcn.png' />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>

					<p>Email: {email} </p>
					<p>Date Joined: {dateJoined} </p>
					{name && <p>Name: </p>}
					<p>Distance Metric: {distanceMetric}</p>
					<p> Weigh Metric: {weightMetric} </p>
					<p>Total Workouts: {totalWorkouts}</p>
				</div>
			</div>
			<Footer />
		</>
	);
}
