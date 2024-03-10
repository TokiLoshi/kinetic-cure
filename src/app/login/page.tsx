"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
import LoginForm from "@/components/loginForm";

export default function Page() {
	console.log("This is the login page");
	return (
		<>
			<Navbar />
			<div className='flex justify-center m-2'>
				<LoginForm />
			</div>
			<div className='mt-8 text-center'>
				<p className='text-center text-gray-500 text-xs'>
					Dont have an account yet?{" "}
					<Link
						className='text-center text-gray-500 text-xs hover:text-indigo-500'
						href='/signup'>
						Create one here.
					</Link>
				</p>
			</div>
			<Footer />
		</>
	);
}
