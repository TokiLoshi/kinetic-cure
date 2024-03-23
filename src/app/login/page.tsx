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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const prisma = new PrismaClient();

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
			<h1 className='flex justify-center m-2 text-gray-500 font-bold'>Login</h1>
			<div className='flex justify-center m-2'>
				<Form action={login}>
					<div className='w-full max-w-sm'>
						<div className='md:flex md:items-center mb-6'>
							<div className='md:w-1/3'>
								<label
									htmlFor='email'
									className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
									Email
								</label>
							</div>
							<div className='md:w-2/3'>
								<input
									name='email'
									className='bg-gray-200 p-3 appearance-none border-2 border-gray-200 rounded w-full py-2 px4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
									id='email'
									type='text'
									placeholder='Email'
									autoComplete='email'
									required
								/>
							</div>
						</div>
					</div>
					<div className='md:flex md:items-center mb-6'>
						<div className='md:w-1/3'>
							<label
								htmlFor='password'
								className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
								Password
							</label>
						</div>
						<div className='md:w-2/3'>
							<input
								name='password'
								id='password'
								type='password'
								className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
								placeholder='Secret password'
								autoComplete='new-password'
								required
							/>
						</div>
					</div>
					<div className='md:flex md:items-center'>
						<div className='md:w-1/3'></div>
						<div className='md:w-2/3'>
							<LoginButton />
						</div>
					</div>
				</Form>
			</div>
			<div className='flex justify-center'>
				<Link href='/signup' className='m-2 text-center text-slate-500'>
					Need an account? Register <span className='underline'>here</span>
				</Link>
			</div>
			<Footer />
		</>
	);
}

function LoginButton() {
	return (
		<button
			type='submit'
			className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
			Login
		</button>
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
