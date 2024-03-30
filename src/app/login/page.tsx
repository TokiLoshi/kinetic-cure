import Link from "next/link";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { generateId } from "lucia";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import { Form } from "@/app/lib/form";
import type { DatabaseUser } from "@/app/lib/definitions";
import type { ActionResult } from "@/app/lib/form";
import Navbar from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import prisma from "@/app/lib/prisma";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default async function Page() {
	const { user } = await validateRequest();
	console.log(`USER EXISTS: ${user}`);
	let isLoggedIn = false;
	if (user !== null) {
		isLoggedIn = true;
		return redirect("/");
	}

	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} />
			<div className='container relative flex pt-20 flex-col items-center justify-center lg:px-20 md:px-30 lg:w-max-400'>
				<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[p350px]'>
					<div className='flex flex-col items-center space-y-2 text-center bg-indigo-300 rounded py-10 shadow'>
						<h1 className='font-bold text-2x text-slate-900'>Log in</h1>
						<Form action={login}>
							<Label htmlFor='email'>Email</Label>
							<Input
								name='email'
								id='email'
								type='text'
								placeholder='Email'
								autoComplete='email'
								required
							/>
							<Label htmlFor='password' className='mb-2'>
								Password
							</Label>
							<Input
								name='password'
								id='password'
								type='password'
								placeholder='Secret password'
								autoComplete='new-password'
								required
							/>
							<LoginButton />
						</Form>
					</div>
				</div>
			</div>
			<div className='flex justify-center mt-2'>
				<Link href='/signup' className='m-2 text-center text-slate-500'>
					Need an account? Register{" "}
					<span className='underline'>here &rarr;</span>
				</Link>
			</div>
			<Footer />
		</>
	);
}

function LoginButton() {
	return (
		<Button type='submit' className='shadow mt-2'>
			Login
		</Button>
	);
}

async function login(_: any, formData: FormData): Promise<ActionResult> {
	"use server";
	const username = formData.get("email");
	console.log(`Username: ${username}`);
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[a-z0-9_-]+$/.test(username)
	) {
		return {
			error: "Invalid username",
		};
	}
	const password = formData.get("password");
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return {
			error: "Invalid password",
		};
	}

	const existingUser = await prisma.user.findFirst({
		where: {
			username: username,
		},
	});
	if (!existingUser) {
		return {
			error: "Incorrect username or password",
		};
	}

	const validPassword = await new Argon2id().verify(
		existingUser.password,
		password
	);
	if (!validPassword) {
		return {
			error: "Incorrect username or password",
		};
	}

	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	console.log("User logged in");
	console.log(`Cookies: ${sessionCookie}`);
	return redirect("/dashboard");
}
