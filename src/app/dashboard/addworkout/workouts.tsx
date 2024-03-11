import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { name, description, muscleGroups, videoLink, equipment } = req.body;

		const authorId = 1;
		const author = "admin@test.com";
		console.log("We got to the api route");
		console.log(
			`Name: ${name}, description: ${description}, muscleGroups: ${muscleGroups}, videoLink ${videoLink} equipemt ${equipment}`
		);
	}
}
