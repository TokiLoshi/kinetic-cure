import { sql } from "@vercel/postgres";
import Navbar from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { getUser } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { PrismaClient } from "@prisma/client";

interface User {
	user: any | null;
	session: any | null;
	username: any | null;
}

async function logWorkout({
	params,
}: {
	params: { user: string };
}): Promise<JSX.Element> {
	const { rows } =
		await sql`SELECT * FROM workouts WHERE user = ${params.user}`;
	return (
		<div>
			{rows.map((row) => {
				return (
					<div key={row.id}>
						{row.id} - {row.user}
					</div>
				);
			})}
		</div>
	);
}

export default async function Page() {
	const user = (await getUser()) as User;
	console.log(`User in addworkout page: ${JSON.stringify(user)}`);
	console.log(`Unpack user: ${user?.username?.email}`);
	let isLoggedIn = false;
	if (!user) {
		redirect("/login");
	}
	if (user?.username) {
		isLoggedIn = true;
	}
	const username = user?.username?.email;
	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} />
			<div className='flex justify-center m-2'>
				<h1 className='m-2'>This is the log workout page</h1>
			</div>
			<p className='text-center'>Logging of {username} workouts will go here</p>
			<Footer />
		</>
	);
}
