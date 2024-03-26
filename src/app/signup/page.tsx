import Link from "next/link";
import { Argon2id } from "oslo/password";
import { cookies } from "next/headers";
import { lucia } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import { generateId } from "lucia";
import { PrismaClient, Prisma } from "@prisma/client";
import { PrismaClientUnknownRequestError } from "@prisma/client/runtime/library";
import type { ActionResult } from "@/app/lib/form";
import { Form } from "@/app/lib/form";
import { validateRequest } from "@/app/lib/auth";
import Navbar from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { z } from "zod";

const prisma = new PrismaClient();

export default async function Page() {
	const { user } = await validateRequest();
	if (user) {
		redirect("/");
	}
	let isLoggedIn = true;
	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} />
			<h1 className='flex justify-center m-2 text-gray-500 font-bold'>
				Sign up
			</h1>
			<div className='flex justify-center m-2'>
				<Form action={signup}>
					<div className='w-full max-w-sm'>
						<div className='md:flex md:items-center mb-6'>
							<div className='md:w-1/3'>
								<label
									htmlFor='email'
									className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
									Email:
								</label>
							</div>
							<div className='md:w-2/3'>
								<input
									name='email'
									className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
									type='text'
									id='email'
									placeholder='email'
									autoComplete='email'
									required
								/>
							</div>
						</div>
						<div className='md:flex md:items-center mb-6'>
							<div className='md:w-1/3'>
								<label
									className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
									htmlFor='password'>
									Password
								</label>
							</div>
							<div className='md:w-2/3'>
								<input
									name='password'
									className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
									type='password'
									id='password'
									placeholder='password'
									autoComplete='new-password'
									required
								/>
							</div>
						</div>
						<div className='md:flex md:items-center mb-6'>
							<div className='md:w-1/3'>
								<label
									className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
									htmlFor='password'>
									Password Confirmation
								</label>
							</div>
							<div className='md:w-2/3'>
								<input
									name='confirmPassword'
									className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
									type='password'
									id='confirmPassword'
									placeholder='confirm password'
									autoComplete='new-password'
									required
								/>
							</div>
						</div>
						<div className='md:flex md:items-center'>
							<div className='md:w-1/3'></div>
							<div className='md:w-2/3'>
								<button
									className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus-outline-none text-white font-bold py-2 px-4 rounded'
									type='submit'
									id='signupButton'>
									Sign up
								</button>
							</div>
						</div>
					</div>
				</Form>
			</div>
			<Footer />
		</>
	);
}

// const SignUpSchema = z
// 	.object({
// 		email: z.string().email("Please enter a valid email address"),
// 		password: z.string().min(8, "Password must be at least 8 characters"),
// 		confirmPassword: z.string(),
// 	})
// 	.refine((data) => data.password === data.confirmPassword, {
// 		message: "Passwords do not match",
// 		path: ["confirmPassword"],
// 	});

// interface SignUpFormState {
// 	errors: {
// 		email?: string[];
// 		password?: string[];
// 		confirmPassword?: string[];
// 	};
// }

async function signup(_: any, formData: FormData): Promise<ActionResult> {
	"use server";
	const username = formData.get("email");
	console.log(`Username: ${username}, ${typeof username}`);
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		// !/^[a-z0-9_-]+$/.test(username)
		!/^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/.test(username) === false
	) {
		console.log(
			`type ${typeof username} length ${
				JSON.stringify(username).length
			}, regex check ${!/^[a-z0-9_-]+$/.test(JSON.stringify(username))}`
		);
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
	const passwordConfirmation = formData.get("confirmPassword");
	if (password !== passwordConfirmation) {
		return {
			error: "Passwords do not match",
		};
	}

	const hashedPassword = await new Argon2id().hash(password);
	const userId = generateId(15);
	const dateJoined = new Date().toISOString();
	const distanceMetric = "kilometers";
	const weightMetric = "kilograms";
	const totalWorkouts = 0;
	const ptWorkouts = [""];
	const Exercises = [""];
	const personalRecords = 0;

	// TODO: check if username is already used

	try {
		await prisma.user.create({
			data: {
				id: userId,
				email: username,
				username,
				password: hashedPassword,
				dateJoined,
				distanceMetric,
				weightMetric,
				totalWorkouts,
			},
		});
	} catch (e) {
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			return {
				error: "This email has been taken, did you mean to login instead?",
			};
		} else {
			console.log(`Error: ${e}`);
			return {
				error: "An unknown error occurred",
			};
		}
	}

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	return redirect("/");
}

// // Validate fields on sign up
// export async function validateSignUp(
// 	formState: SignUpFormState,
// 	formData: FormData
// ): Promise<SignUpFormState> {

// 	const parsedData = SignUpSchema.safeParse({
// 		email: formData.get("email"),
// 		password: formData.get("password"),
// 		confirmPassword: formData.get("confirmPassword"),
// 	});

// 	if (!parsedData.success) {
// 		const errors = parsedData.error.flatten().fieldErrors;
// 		return { errors };
// 	}

// 	const data = parsedData.data;
// 	const dateJoined = new Date().toISOString();
// 	const distanceMetric = "kilometers";
// 	const weightMetric = "kilograms";
// 	const totalWorkouts = 0;
// 	const ptWorkouts = [""];
// 	const Exercises = [""];
// 	const personalRecords = 0;
// 	const { email, password } = parsedData.data;
// 	const salt = await bcrypt.genSalt(10);
// 	const hashedPassword = await bcrypt.hash(password, salt);
// 	const updatedAt = new Date();

// 	try {
// 		const newUser = await prisma.user.create({
// 			data: {
// 				email,
// 				password: hashedPassword,
// 				dateJoined,
// 				distanceMetric,
// 				weightMetric,
// 				totalWorkouts,
// 			},
// 		});
// 	} catch (error: unknown) {
// 		if (error instanceof Prisma.PrismaClientKnownRequestError) {
// 			return {
// 				errors: {
// 					email: ["This email already exists. Did you forget your password?"],
// 				},
// 			};
// 		}
// 		return {
// 			errors: {
// 				email: [
// 					"We appear to be having some difficulty. Please reach out to the dev to fix this bug.",
// 				],
// 			},
// 		};
// 		throw new Error("Failed to create a new user.");
// 	}
// 	redirect("/login");
// }
