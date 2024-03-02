import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Kinetic Cure",
};

export default function Page() {
	console.log("This is the home page");
	return (
		<>
			<h1 className='flex justify-center m-2 '>
				Welcome to Kinetic Cure on Next.js
			</h1>
			<div className='flex justify-center m-2'>
				<Link href='/about' className='m-2'>
					About
				</Link>
				<Link className='m-2' href='/login'>
					Login
				</Link>
				<Link className='m-2' href='/signup'>
					Sign up
				</Link>
				<Link className='m-2' href='/dashboard/logworkout'>
					Log Workout
				</Link>
				<Link className='m-2' href='/dashboard'>
					Dashboard
				</Link>
			</div>
		</>
	);
}
