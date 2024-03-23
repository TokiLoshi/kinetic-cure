"use client";
import { useState } from "react";
import Link from "next/link";
import SignOutButton from "@/components/logout-button";

import { useEffect } from "react";

type NavbarProps = {
	isLoggedIn: boolean;
};

export default function Navbar({ isLoggedIn }: NavbarProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	console.log(`User in navbar: ${isLoggedIn}`);
	let loggedState = { isLoggedIn };
	console.log(`Logged state: ${loggedState.isLoggedIn}`);
	return (
		<>
			<nav className='flex items-center justify-between flex-wrap bg-zinc-800 p-6'>
				<div className='flex items-center flex-shrink-0 text-white mr-6'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth='1.5'
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5'
						/>
					</svg>

					<span className='font-semibold text-xl tracking-tight ml-2'>
						{" "}
						<Link href='/'>Kinetic Cure</Link>
					</span>
				</div>
				<div className='block lg:hidden'>
					<button
						className='flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white'
						onClick={() => setIsMenuOpen(!isMenuOpen)}>
						{/* HeroIcons https://heroicons.com/ */}
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							className='w-6 h-6'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
							/>
						</svg>
					</button>
				</div>
				<div
					className={`${isMenuOpen ? "block" : "hidden"}
						w-full block flex-grow lg:flex lg:items-center lg:w-auto
						`}>
					<div className='text-sm lg:flex-grow'>
						<Link href='/about' className='m-2 text-white hover:text-lime-300'>
							About
						</Link>
						{isLoggedIn && (
							<>
								<SignOutButton />
								<Link
									className='m-2 text-white hover:text-lime-300'
									href='/dashboard'>
									Dashboard
								</Link>
							</>
						)}
						{!isLoggedIn && (
							<>
								<Link
									className='text-white m-2 hover:text-lime-300'
									href='/login'>
									Login
								</Link>
								<Link
									className='m-2 text-white hover:text-lime-300'
									href='/signup'>
									Sign up
								</Link>
							</>
						)}
					</div>
				</div>
			</nav>
		</>
	);
}
