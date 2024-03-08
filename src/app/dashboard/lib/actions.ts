"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// export default async function updateExercises(
// 	id: string,
// 	formData: FormData
// ) {
// console.log('running a server action')
// const { name } = formData.get('name')
// console.log(`Name: ${name}`)
// 	}
