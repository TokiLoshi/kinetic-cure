import { sql } from "@vercel/postgres";
import Link from "next/link";
import { useRouter } from "next/navigation";
import WorkoutForm from "@/components/workoutForm";
import { addExercise } from "@/app/lib/actions";
import { string } from "zod";

export default function Page() {
	return (
		<>
			<div className='flex justify-center m-2'>
				<WorkoutForm
					formAction={addExercise}
					initialData={{
						name: "",
						description: "",
						muscleGroups: [],
						equipment: "",
						videoLink: "",
						exerciseType: "",
					}}
				/>
			</div>
		</>
	);
}
