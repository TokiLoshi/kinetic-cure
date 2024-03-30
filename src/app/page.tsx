import { Metadata } from "next";
import Link from "next/link";
import { lucia, validateRequest } from "@/app/lib/auth";
import { cookies, headers } from "next/headers";
import { Form } from "@/app/lib/form";
import type { ActionResult } from "@/app/lib/form";
import { redirect } from "next/navigation";
import { getUser } from "@/app/lib/auth";
import Footer from "@/components/Footer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BoxesIcon, LineChartIcon, MedalIcon } from "lucide-react";
import Navbar from "@/components/DesktopNavigation";

export const metadata: Metadata = {
	title: "Kinetic Cure",
};

interface User {
	user: any | null;
	session: any | null;
	username: any | null;
}

const features = [
	{
		name: "All your workouts in one place",
		description:
			"Add your physio, strength and cardio workouts without needing multiple apps",
		icon: BoxesIcon,
	},
	{
		name: "Build consistent habits",
		description: "Track your progress and stay motivated",
		icon: LineChartIcon,
	},
	{
		name: "Stay on top of your health",
		description: "Set your goals and keep yourself accountable",
		icon: MedalIcon,
	},
];

export default async function Page() {
	const result = (await getUser()) as User;
	console.log(`Home page and ${JSON.stringify(result)}`);
	let isLoggedIn = false;
	let user = "there";
	if (result.user !== null) {
		const { username } = result;
		const { email } = username;
		console.log(`Username: ${username.email}`);
		console.log(`Home page has a user`);
		user = email;
		isLoggedIn = true;
	}

	console.log(`Is logged in: ${isLoggedIn}`);
	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} />
			<MaxWidthWrapper>
				<div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
					<h1 className='text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
						Welcome to{" "}
						<span className='text-indigo-400 hover:text-indigo-600'>
							Kinetic Cure{" "}
						</span>
					</h1>
					<p className='mt-6 text-lg max-w-prose text-muted-foreground'>
						Hi, {user}! Kinetic Cure is your one stop app to track workouts and
						physio exercises to set you up for strength and success. Ready to
						Get started?
					</p>
					<Link
						href={isLoggedIn ? "/dashboard" : "/login"}
						className={cn("mt-2", buttonVariants())}>
						{isLoggedIn ? "Go to your dashboard" : "Login"}
					</Link>
					<Button className='mt-2' variant='ghost'>
						Your future is looking strong &rarr;
					</Button>
				</div>
				<section className='border border-indigo-200 rounded bg-gray-50 border-radius-50'>
					<MaxWidthWrapper className='py-20'>
						<div className='grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm-gap-x-8 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0'>
							{features.map((feature) => (
								<div
									key={feature.name}
									className='text-center md:flex md:items-start md:text-left lg:block lg:text-center'>
									<div className='md:flex-shrink-0 flex justify-center'>
										<div className='h-16 w-16 flex items-center justify-center rounded-full bg-indigo-300 hover:bg-indigo-500'>
											{<feature.icon className='w-1/3 h-1/3' />}
										</div>
									</div>
									<div className='mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6'>
										<h3 className='text-base font-medium text-gray-900'>
											{feature.name}
										</h3>
										<p className='mt-3 text-sm text-muted-foreground'>
											{feature.description}
										</p>
									</div>
								</div>
							))}
						</div>
					</MaxWidthWrapper>
				</section>
			</MaxWidthWrapper>
			<div className='py-20'></div>
			<Footer />
		</>
	);
}

const getLogin = async () => {
	const { user } = await validateRequest();

	console.log(`User function called: ${user}`);
};

async function logout(): Promise<ActionResult> {
	"use server";
	const { session } = await validateRequest();
	if (!session) {
		return {
			error: "Unauthorized",
		};
	}

	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect("/login");
}
