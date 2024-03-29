"use client";
import { useState } from "react";
import Link from "next/link";
import SignOutButton from "./LogoutButton";

import { useEffect } from "react";
import Beaker from "../../public/nav/icons/beaker";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import SignButton from "./LogoutButton";

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
			<nav className='flex items-center justify-between bg-zinc-900 p-6'>
				<div className='flex items-center flex-shrink-0 text-white mr-6'>
					<Beaker />

					<span className='font-semibold text-3xl tracking-tight ml-2 text-indigo-300 hover:text-indigo-400'>
						{" "}
						<Link href='/'>Kinetic Cure</Link>
					</span>
				</div>
				<div className='block lg:hidden'></div>
				{/* {isMenuOpen && ( */}
				<Sheet>
					<SheetTrigger asChild>
						{/* HeroIcons https://heroicons.com/ */}
						<Button
							variant='outline'
							className='flex items-center px-3 py-2 border rounded text-lilac-300 bg-indigo-500 border-indigo-400 hover:text-indigo-900 hover:border-indigo-500 hover:bg-indigo-600 lg:hidden'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1.5'
								stroke='white'
								className='w-6 h-6'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
								/>
							</svg>
						</Button>
					</SheetTrigger>
					<SheetContent>
						<SheetHeader>
							<SheetTitle>Main Menu</SheetTitle>
							<SheetDescription>Lets get Started</SheetDescription>
						</SheetHeader>
						{isLoggedIn && (
							<>
								<div>
									<div className='grid gap-4 py-4'>
										<div className='grid grid-cols-12 items-center gap-4'>
											<Link href='/dashboard'>Dashboard</Link>
										</div>
									</div>
								</div>
								<div>
									<div className='grid gap-4 py-8'>
										<div className='grid grid-cols-12  gap-4'>
											<Link href='/dashboard/addworkout'>Add Workout</Link>
										</div>
									</div>
								</div>
								<div className='grid gap-4 py-4'>
									<div className='grid grid-cols-8 items-center gap-4'>
										<Link href='/dashboard/logworkout'>Log Workout</Link>
									</div>
								</div>
								<div className='grid gap-4 py-4'>
									<div className='grid grid-cols-8 items-center gap-4'>
										<SignButton />
									</div>
								</div>
							</>
						)}
						{!isLoggedIn && (
							<>
								<div className='grid gap-4 py-4'>
									<div className='grid grid-cols-4 items-center gap-4'>
										<Link href='/signup'>Sign up</Link>
									</div>
									<div className='grid grid-cols-4 items-center gap-4'>
										<Link href='/login'>Log in</Link>
									</div>
								</div>
							</>
						)}
						<SheetFooter>
							<SheetClose asChild>
								<Button type='submit' variant='ghost'>
									Close
								</Button>
							</SheetClose>
						</SheetFooter>
					</SheetContent>
				</Sheet>
				{/* )} */}
				<div className='text-sm lg:flex-grow'>
					<div
						className={`${isMenuOpen ? "block" : "hidden"}
						w-full block flex-grow lg:flex lg:items-center lg:w-auto
						`}>
						{isLoggedIn && (
							<>
								<div className='flex items-center'>
									<Link
										className='m-2 text-white text-xl hover:text-indigo-300'
										href='/dashboard'>
										Dashboard
									</Link>
									<Link
										className='m-2 text-white text-xl hover:text-indigo-300'
										href='/dashboard/addworkout'>
										Add Workout
									</Link>
									<Link
										className='m-2 text-white text-xl hover:text-indigo-300'
										href='/dashboard/logworkout'>
										Log Workout
									</Link>
									<div className='ml-auto'>
										<SignOutButton />
									</div>
								</div>
							</>
						)}
						{!isLoggedIn && (
							<>
								<Link
									className='text-white text-xl m-2 hover:text-indigo-300'
									href='/login'>
									Login
								</Link>
								<Link
									className='m-2 text-white text-xl hover:text-indigo-300'
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
