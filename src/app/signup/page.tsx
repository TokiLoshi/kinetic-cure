"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import SignUpForm from "@/components/signUpForm";

export default function Page() {
	console.log("This is the signup page");
	return (
		<>
			<NavBar />
			<SignUpForm />
			<div className='mt-8 text-center '>
				<p className='text-center text-gray-500 text-xs'>
					Already have an account?{" "}
					<Link
						className='text-center text-gray-500 text-xs hover:text-indigo-500'
						href='/login'>
						Login here.
					</Link>
				</p>
			</div>
			<Footer />
		</>
	);
}
