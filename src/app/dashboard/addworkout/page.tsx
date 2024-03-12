import { sql } from "@vercel/postgres";
import Link from "next/link";
import { useRouter } from "next/navigation";
import WorkoutForm from "@/components/workoutForm";
import { addExercise } from "@/app/lib/actions";

export default function Page() {
	const updateExercises = async (formData: FormData) => {
		"use server";
		console.log("running a server action");
		console.log(`Form Data: ${formData}`);
	};

	return (
		<>
			<div className='flex justify-center m-2'>
				<WorkoutForm formAction={addExercise} initialData={{name: "", description: "", muscleGroups: "", equipment: "", videoLink: ""}}/>
			</div>
		</>
	);
}
