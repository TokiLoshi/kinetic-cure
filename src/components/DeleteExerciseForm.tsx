"use client";
import { useState } from "react";
import { deleteExercise } from "@/app/lib/actions";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

type Props = { id: number };

export default function DeleteButton({ id }: Props) {
	const pathName = usePathname();
	return (
		<Button
			className='shadow'
			onClick={() => deleteExercise(id, pathName === "/" ? false : true)}>
			Delete
		</Button>
	);
}
