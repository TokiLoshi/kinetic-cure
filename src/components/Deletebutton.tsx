"use client";
import { useState } from "react";
import { deleteExercise } from "@/app/lib/actions";
import { usePathname } from "next/navigation";

type Props = { id: number };

export default function DeleteButton({ id }: Props) {
	const pathName = usePathname();
	return (
		<button
			className='shadow bg-red-500 hover:bg-red-400 focus:shadow-outline focus-outline-none text-white font-bold py-2 px-4 rounded'
			onClick={() => deleteExercise(id, pathName === "/" ? false : true)}>
			Delete
		</button>
	);
}
