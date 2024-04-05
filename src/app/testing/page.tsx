import Navbar from "@/components/DesktopNavigation";
import { RegistrationForm } from "../RegistrationForm";
import { z } from "zod";
import { schema } from "../registrationSchema";

export default function Page() {
	const isLoggedIn = true;

	// Server Action for Form Data
	const onDataAction = async (data: z.infer<typeof schema>) => {
		"use server";
		console.log(data);
		const parsed = schema.safeParse(data);
		if (parsed.success) {
			console.log("User registered successfully");
			return {
				message: "User regisered",
				user: parsed.data,
			};
		} else {
			return {
				message: "Invalid data",
				issues: parsed.error.issues.map((issue) => issue.message),
			};
		}
	};

	// Form Data Action
	const onFormAction = async (
		prevState: {
			message: string;
			user?: z.infer<typeof schema>;
			issues?: string[];
		},
		formData: FormData
	) => {
		"use server";
		const data = Object.fromEntries(formData);
		const parsed = schema.safeParse(data);
		if (parsed.success) {
			console.log("User registered successfully");
			return { message: "User registered successfully", user: parsed.data };
		} else {
			return {
				message: "Invalid data",
				issues: parsed.error.issues.map((issue) => issue.message),
			};
		}
	};
	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} />
			<h1 className='text-center mt-2'>Let&apos;s finally learn forms</h1>
			<div className='mx-auto max-w-xl'>
				{/* Example of Server Action */}
				{/* <RegistrationForm onDataAction={onDataAction} /> */}
				<RegistrationForm
					onDataAction={onDataAction}
					onFormAction={onFormAction}
				/>
			</div>
		</>
	);
}
