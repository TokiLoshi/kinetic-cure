import { sql } from "@vercel/postgres";

async function logWorkout({
	params,
}: {
	params: { user: string };
}): Promise<JSX.Element> {
	const { rows } =
		await sql`SELECT * FROM workouts WHERE user = ${params.user}`;
	return (
		<div>
			{rows.map((row) => {
				return (
					<div key={row.id}>
						{row.id} - {row.user}
					</div>
				);
			})}
		</div>
	);
}

export default function Page() {
	return <h1 className='m-2'>This is the log workout page</h1>;
}
