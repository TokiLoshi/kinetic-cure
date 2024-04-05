"use client";
import { useFormState } from "react-dom";
import Toast from "@/components/Toast";

export function Form({
	children,
	action,
}: {
	children: React.ReactNode;
	action: (prevState: any, formData: FormData) => Promise<ActionResult>;
}) {
	console.log("Children: ", children);
	const [state, formAction] = useFormState(action, {
		error: null,
		loading: null,
		success: null,
	});
	console.log("State in form: ", state);
	return (
		<>
			{state.error && (
				<Toast
					error={state.error}
					success={state.success}
					loading={state.loading}
				/>
			)}
			<p>{state.error}</p>
			<form action={formAction} className=' justify-center'>
				{children}
			</form>
		</>
	);
}

export interface ActionResult {
	error: string | null;
	success: string | null;
	loading: boolean | null;
}
