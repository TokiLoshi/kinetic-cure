import { Metadata } from "next";
import Link from "next/link";
import NavBar from "@/components/navbar";

export const metadata: Metadata = {
	title: "Kinetic Cure",
};

export default function Page() {
	console.log("This is the home page");
	return (
		<>
			<NavBar />
			<div className='flex justify-center m-2'>
				<h1 className='flex justify-center m-2 '>
					Welcome to Kinetic Cure on Next.js
				</h1>
			</div>
		</>
	);
}
