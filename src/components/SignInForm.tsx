"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { FormState } from "@/app/actions/index";

// Method adopted from ProNext.js by Jack Herrington https://www.pronextjs.dev/tutorials/forms-management-with-next-js-app-router
export const LoginForm = ({
	onFormAction,
}: {
	onFormAction: (prevState: FormState, data: FormData) => Promise<FormState>;
}) => {
	const [state, formAction] = useFormState(onFormAction, {
		error: null,
		success: null,
		loading: null,
	});
	const formRef = useRef<HTMLFormElement>(null);
	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
	});
	return (
		<>
			<Form {...form}>
				<form
					ref={formRef}
					onSubmit={form.handleSubmit(() => formRef.current?.submit())}
					action={formAction}
					className='space-y-8'>
					<div className='space-y-8'>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input placeholder='' {...field} />
									</FormControl>
									<FormDescription>Your Email</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input placeholder='' {...field} />
									</FormControl>
									<FormDescription>Your Password</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type='submit'>Login</Button>
				</form>
				{state?.error && <div>{state.error}</div>}
			</Form>
		</>
	);
};
