import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import type { User } from "@/app/lib/defnitions";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getUser(email: string): Promise<User | null> {
	try {
		console.log(`In getUser function with ${email}`);
		const user = await prisma.user.findUnique({
			where: {
				email,
			},
		});
		console.log(`User returned from await: ${JSON.stringify(user)}`);
		return user;
	} catch (error) {
		console.error("Fialed to fetch user: ", error);
		throw new Error("failed to fetch user");
		return null;
	}
}

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = z
					.object({
						email: z.string().email(),
						password: z.string().min(6),
					})
					.safeParse(credentials);
				console.log(
					`Parsed credentials: ${parsedCredentials.success} or ${parsedCredentials}`
				);
				if (parsedCredentials.success) {
					console.log("In parsed credentials");
					const { email, password } = parsedCredentials.data;
					console.log(`Email: ${email}, password: ${password}`);
					const user = await getUser(email);
					console.log(`User: ${user}`);
					if (!user) {
						console.log(`Couldn't find a user: ${user}`);
						return null;
					}
					// const passwordsMatch = await bcrypt.compare(password, user.password);
					// if (passwordsMatch) return user;
					return user;
				}
				console.log("Invalid credentials");
				return null;
			},
		}),
	],
});
