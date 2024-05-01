"use client";
import { deleteExercise } from "@/app/lib/actions";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

type Props = { id: number };
interface DeleteButtonProps {
	id: number;
	onDelete: (id: number) => Promise<{ errors: { id: string[] } }>;
}

export default function DeleteButton({ id }: DeleteButtonProps) {
	const pathName = usePathname();
	console.log("pathname: ", pathName);
	console.log("Trying to delete exercise: ", id);
	return (
		<Button className='shadow' onClick={() => deleteExercise(id)}>
			Delete
		</Button>
	);
}
