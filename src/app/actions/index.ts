import { lucia } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { Argon2id } from "oslo/password";
import { Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { generateId } from "lucia";
import { redirect } from "next/navigation";

import { z } from "zod";

export interface FormState {
	messsage?: string;
	success: boolean | null;
	error: string | null;
	loading: boolean | null;
}

const signUpSchema = z
	.object({
		email: z.string().email("Invalid email"),
		password: z.string().min(8, "Passwords must be at least 8 characters"),
		confirmPassword: z
			.string()
			.min(8, "Password confirmation must be at least 8 characters"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match up",
	});

export async function signup(
	prevState: FormState,
	formData: FormData
): Promise<FormState> {
	const username = formData.get("email");
	console.log(`Username: ${username}, ${typeof username}`);
	// username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
	// keep in mind some database (e.g. mysql) are case insensitive
	console.log("checking username length and checking if it's a mail");
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
			success: null,
			error: "Invalid username",
			loading: false,
		};
	}
	console.log("username check passed, now onto the password");
	const password = formData.get("password");
	if (
		typeof password !== "string" ||
		password.length < 6 ||
		password.length > 255
	) {
		return {
			success: false,
			error: "Passwords must be a minimum of 8 characters",
			loading: false,
		};
	}
	console.log(
		"Password check was ok, now checking the confirmation and password match"
	);
	const passwordConfirmation = formData.get("passwordConfirmation");
	console.log(
		`Password: ${password} and confirmationpassword: ${passwordConfirmation} are type ${typeof password} and ${typeof passwordConfirmation} and are they equal? ${
			password === passwordConfirmation
		}`
	);
	if (password !== passwordConfirmation) {
		return {
			success: false,
			error: "Passwords do not match",
			loading: false,
		};
	}
	console.log();

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
				success: false,
				error: "This email has been taken, did you mean to login instead?",
				loading: false,
			};
		} else {
			console.log(`Error: ${e}`);
			return {
				success: false,
				error: "An unknown error occurred",
				loading: false,
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
	redirect("/");
}

export const loginSchema = z.object({
	email: z.string().email("Invalid email"),
	password: z.string().min(8, "Passwords must be at least 8 characters"),
});

export async function login(
	prevState: FormState,
	formData: FormData
): Promise<FormState> {
	// Get the fields from the form data
	console.log("we got to the server actions");
	const email = formData.get("email");
	const password = formData.get("password");
	console.log("email and password: ", email, password);
	// Validate the data
	console.log("testing the email");
	if (
		typeof email !== "string" ||
		email.length < 3 ||
		email.length > 31 ||
		!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
		// !/^[a-z0-9_-]+$/.test(email)
	) {
		return {
			success: false,
			error: "Invalid username",
			loading: false,
		};
	}
	console.log("passed the first check looking at password");
	if (
		typeof password !== "string" ||
		password.length < 8 ||
		password.length > 255
	) {
		return {
			success: false,
			error: "Invalid password",
			loading: false,
		};
	}
	console.log("passed the second check now checking");
	// TODO: uncomment this line
	// Delete all the users that dont have emails
	// const parsed = loginSchema.safeParse({ email, password });
	// if (!parsed.success) {
	// 	return {
	// 		success: false,
	// 		error: "Invalid data",
	// 		loading: false,
	// 	};
	// }
	// Check if there is an existing user
	const existingUser = await prisma.user.findFirst({
		where: {
			username: email,
		},
	});
	// If no existing user return error message
	if (!existingUser) {
		return {
			success: false,
			error: "Incorrect username or password",
			loading: false,
		};
	}
	// Validate password
	const validPassword = await new Argon2id().verify(
		existingUser.password,
		password
	);
	if (!validPassword) {
		return {
			success: false,
			error: "Incorrect username or password",
			loading: false,
		};
	}
	// Create a session
	const session = await lucia.createSession(existingUser.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);
	console.log("User logged in");
	console.log("Cookies: ", sessionCookie);
	redirect("/dashboard");
	return {
		success: true,
		error: "",
		loading: false,
	};
}
