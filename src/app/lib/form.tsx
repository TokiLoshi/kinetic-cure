"use client";

import { useFormState } from "react-dom";

export function Form({
	children,
	action,
}: {
	children: React.ReactNode;
	action: (prevState: any, formData: FormData) => Promise<ActionResult>;
}) {
	const [state, formAction] = useFormState(action, {
		error: null,
	});
	return (
		<form action={formAction} className=' justify-center'>
			{children}
			<p className='text-red-500 text-xs italic text-center m-2 p-2'>
				{state.error}
			</p>
		</form>
	);
}

export interface ActionResult {
	error: string | null;
}
