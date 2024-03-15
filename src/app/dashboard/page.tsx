import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

async function getData() {
	const prisma = new PrismaClient();
	const res = await prisma.user.findUnique({
		where: {
			id: 21,
		},
	});
	console.log(`Res: ${res?.name}`);
}

export default async function Page() {
	const data = await getData();
	console.log("data: ", data);

	return (
		<>
			<NavBar />
			<h1 className='text-center m-2 text-bold'>
				Welcome back username, what shall we do next?
			</h1>

			<div className='flex justify-center'>
				<button className='m-2'>
					<Link
						className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus-outline-none text-white font-bold py-2 px-4 rounded'
						href='/dashboard/logworkout'>
						Log Workout
					</Link>
				</button>
				<button className='m-2'>
					<Link
						className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus-outline-none text-white font-bold py-2 px-4 rounded'
						href='/dashboard/addworkout'>
						Add Workout
					</Link>
				</button>
			</div>
			<Footer />
		</>
	);
}
