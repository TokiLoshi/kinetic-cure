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
		// 	try {
		// 		// Add more validation here
		// 		const exercise = await prisma.exercises.create({
		// 			data: {
		// 				name,
		// 				description,
		// 				videoLink,
		// 				author: {
		// 					connect: {
		// 						id: authorId,
		// 					},
		// 				},
		// 				muscleGroups: {
		// 					connect: {
		// 						id: muscleGroups[0],
		// 					},
		// 				},
		// 			},
		// 		});
		// 		res.status(200).json(exercise);
		// 	} catch (error) {
		// 		console.error(error);
		// 		res.status(500).json({ error: "Error creating workout" });
		// 	}
		// } else {
		// 	res.setHeader("Allow", ["POST"]);
		// 	res.status(405).end(`Method ${req.method} Not Allowed`);
		// }
	}
}
