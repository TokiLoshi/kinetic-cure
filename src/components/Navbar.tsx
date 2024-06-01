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
			<nav className='flex items-center justify-between flex-wrap bg-slate-950 p-6'>
				<div className='flex items-center flex-shrink-0 text-white mr-6'>
					This is navbar.tsx
					<Beaker />
					sadfadsf
					<span className='font-semibold text-xl tracking-tight ml-2 text-indigo-500'>
						{" "}
						Kinetic Muscle
						<Link href='/'>Cure Logo</Link>
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
					{isMenuOpen && (
						<Sheet>
							<SheetTrigger asChild>
								<Button variant='outline'>Open</Button>
							</SheetTrigger>
							<SheetContent>
								<SheetHeader>
									<SheetTitle>Edit Profile</SheetTitle>
									<SheetDescription>
										Make changes to your profile here
									</SheetDescription>
								</SheetHeader>
								<div className='grid gap-4 py-4'>
									<div className='grid grid-cols-4 items-center gap-4'>
										<label htmlFor='name' className='text-right'>
											Name
										</label>
										<input id='name' value='pedro' className='col-span-3' />
									</div>
									<div className='grid grid-cols-4 items-center gap-4'>
										<label htmlFor='username' className='text-right'>
											Username
										</label>
										<input
											id='username'
											value='@peduarte'
											className='col-span-3'
										/>
									</div>
								</div>
								<SheetFooter>
									<SheetClose asChild>
										<Button type='submit'>Save Changes</Button>
									</SheetClose>
								</SheetFooter>
							</SheetContent>
						</Sheet>
					)}
				</div>
				<div
					className={`${isMenuOpen ? "block" : "hidden"}
						w-full block flex-grow lg:flex lg:items-center lg:w-auto
						`}>
					<div className='text-sm lg:flex-grow'>
						<Link href='/about' className='m-2 text-white hover:text-lime-300'>
							About Page blah balah blah
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
								<Link
									className='m-2 text-white hover:text-lime-300'
									href='/signup'>
									Sign up Blah
								</Link>
							</>
						)}
					</div>
				</div>
			</nav>
		</>
	);
}
