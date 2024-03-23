import { Metadata } from "next";
import Link from "next/link";
import { lucia, validateRequest } from "@/app/lib/auth";
import { cookies, headers } from "next/headers";
import { Form } from "@/app/lib/form";
import type { ActionResult } from "@/app/lib/form";
import { redirect } from "next/navigation";
import { getUser } from "@/app/lib/auth";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
	title: "Kinetic Cure",
};

interface User {
	user: any | null;
	session: any | null;
	username: any | null;
}

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
			<NavBar isLoggedIn={isLoggedIn} />
			<div className='flex justify-center m-2'>
				<h1 className='flex justify-center m-2 '>
					Welcome to Kinetic Cure on Next.js
				</h1>
				<h1>Hi, {user}! Let us get started</h1>
			</div>
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
