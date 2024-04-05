"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { schema } from "./registrationSchema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useFormState } from "react-dom";

// Method 3 using Server Actions
export const RegistrationForm = ({
	onDataAction,
	onFormAction,
}: {
	onDataAction: (data: z.infer<typeof schema>) => Promise<{
		message: string;
		user?: z.infer<typeof schema>;
		issues?: string[];
	}>;
	onFormAction: (
		prevState: {
			message: string;
			user?: z.infer<typeof schema>;
			issues?: string[];
		},
		data: FormData
	) => Promise<{
		message: string;
		user?: z.infer<typeof schema>;
		issues?: string[];
	}>;
}) => {
	const [state, formAction] = useFormState(onFormAction, {
		message: "",
	});
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			first: "",
			last: "",
			email: "",
		},
	});

	const formRef = useRef<HTMLFormElement>(null);
	const onSubmit = async (data: z.infer<typeof schema>) => {
		// Method 1 using the POST Hanlder Json
		// fetch("/api/register", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(data),
		// })
		// 	.then((response) => response.json())
		// 	.then((data) => console.log(data));
		// Method 2 using the POST Handler FormData
		// 	const formData = new FormData();
		// 	formData.append("first", data.first);
		// 	formData.append("last", data.last);
		// 	formData.append("email", data.email);
		// 	fetch("/api/registerForm", {
		// 		method: "POST",
		// 		body: formData,
		// 	})
		// 		.then((response) => response.json())
		// 		.then((data) => console.log(data));
		// console.log(await onDataAction(data));
		// const formData = new FormData();
		// formData.append("first", data.first);
		// formData.append("last", data.last);
		// formData.append("email", data.email);
		// console.log(await onFormAction(formData));
	};

	return (
		<Form {...form}>
			<div>{state?.message}</div>
			<form
				ref={formRef}
				action={formAction}
				onSubmit={form.handleSubmit(() => formRef?.current?.submit())}
				className='space-y-8'>
				<div className='flex gap-2'>
					<FormField
						control={form.control}
						name='first'
						render={({ field }) => (
							<FormItem>
								<FormLabel>FirstName</FormLabel>
								<FormControl>
									<Input placeholder='' {...field} />
								</FormControl>
								<FormDescription>Your First Name</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='last'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder='' {...field} />
								</FormControl>
								<FormDescription>Your last name</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder='' {...field} />
							</FormControl>
							<FormDescription> Your email address. </FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type='submit'>Submit</Button>
			</form>
		</Form>
	);
	// return (
	//   <Form {...form}>
	//     <form className="space-y-8">
	//       <FormField
	//         control={form.control}
	//         name="email"
	//         render={({ field }) => (
	//           <FormItem>
	//             <FormLabel>Email</FormLabel>
	//             <FormControl>
	//               <Input placeholder="" {...field} />
	//             </FormControl>
	//             <FormDescription>Your email address.</FormDescription>
	//             <FormMessage /> *
	//           </FormItem>
	//         )}
	//       />
	//       <Button type="submit">Submit</Button>
	//     </form>
	//   </Form>
	// );
};
