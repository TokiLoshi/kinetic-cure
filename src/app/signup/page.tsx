"use client";
import { useRef, useState } from "react";
import Link from "next/link";

interface SignupFormState {
	email: string;
	password: string;
	confirmPassword: string;
	agree: boolean;
}

interface FormErrors {
	email?: string;
	password?: string;
	confirmPassword?: string;
	agree?: string;
}

export default function Page() {
	console.log("This is the signup page");
	const formRef = useRef<HTMLFormElement>(null);
	const [formState, setFormState] = useState<SignupFormState>({
		email: "",
		password: "",
		confirmPassword: "",
		agree: false,
	});
	// Object to handle form errors
	const [error, setError] = useState<FormErrors>({});

	// Handle form changes and update dynamically
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, name, value, checked, type } = event.target;
		console.log(event.target);
		setFormState((previousState) => ({
			...previousState,
			[id]: type === "checkbox" ? checked : value,
		}));
	};

	// Handle form submission with client side validation
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form submitted");
		console.log(formState);
		const { email, password, confirmPassword, agree } = formState;

		// Object to handle form errors
		let newErrors: FormErrors = {};
		if (password !== confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match";
			console.log("passwords do not match", newErrors);
		}
		if (!agree) {
			newErrors.agree = "Please agree to continue";
		}
		if (!email) {
			newErrors.email = "Email is required";
		}
		if (!password) {
			newErrors.password = "Password is required";
		}
		if (password.length < 8) {
			newErrors.password = "Password must be at least 8 characters";
		}
		console.log("New errors: ", newErrors);
		if (Object.keys(newErrors).length > 0) {
			setError(newErrors);
			console.log("error", error);
			return;
		}
		console.log("All good, submit the form!");
	};
	return (
		<>
			<div className='flex justify-center m-2'>
				<form ref={formRef} onSubmit={handleSubmit}>
					<h1 className='flex justify-center m-2 text-gray-500 font-bold'>
						Sign up
					</h1>
					<div className='w-full max-w-sm'>
						<div className='md:flex md:items-center mb-6'>
							<div className='md:w-1/3'>
								<label
									htmlFor='email'
									className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
									Email:
								</label>
							</div>
							<div className='md:w-2/3'>
								<input
									name='email'
									className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
									type='email'
									id='email'
									onChange={handleChange}
									autoComplete='email'
									required
									value={formState.email}
								/>
								{error.email && (
									<p className='text-red-500 text-xs italic'>{error.email}</p>
								)}
							</div>
						</div>
						<div className='md:flex md:items-center mb-6'>
							<div className='md:w-1/3'>
								<label
									className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
									htmlFor='password'>
									Password
								</label>
							</div>
							<div className='md:w-2/3'>
								<input
									name='password'
									className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
									type='password'
									id='password'
									onChange={handleChange}
									autoComplete='new-password'
									required
									value={formState.password}
								/>
								{error.password && (
									<p className='text-red-500 text-xs italic'>
										{error.password}
									</p>
								)}
							</div>
						</div>
						<div className='md:flex md:items-center mb-6'>
							<div className='md:w-1/3'>
								<label
									className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'
									htmlFor='password'>
									Password Confirmation
								</label>
							</div>
							<div className='md:w-2/3'>
								<input
									name='confirmPassword'
									className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
									type='password'
									id='confirmPassword'
									onChange={handleChange}
									autoComplete='new-password'
									required
									value={formState.confirmPassword}
								/>
								{error.confirmPassword && (
									<p className='text-red-500 text-xs italic'>
										{error.confirmPassword}
									</p>
								)}
							</div>
						</div>
						<div className='md:flex md:items-center mb-6'>
							<div className='md:w-1/3'></div>
							<label
								className='md:w-2/3 block text-gray-500 font-bold'
								htmlFor='agree'>
								<input
									name='agree'
									className='mr-2 leading-tight'
									type='checkbox'
									onChange={handleChange}
									id='agree'
									required
									checked={formState.agree}
								/>
								<span className='text-sm'>
									I understand this is a hobby project
								</span>
							</label>
							{error.agree && (
								<p className='text-red-500 text-xs italic'>{error.agree}</p>
							)}
						</div>
						<div className='md:flex md:items-center'>
							<div className='md:w-1/3'></div>
							<div className='md:w-2/3'>
								<button
									className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus-outline-none text-white font-bold py-2 px-4 rounded'
									type='submit'
									id='signupButton'>
									Sign up
								</button>
							</div>
						</div>
					</div>
				</form>
			</div>
			<div className='mt-8 text-center '>
				<p className='text-center text-gray-500 text-xs'>
					Already have an account?{" "}
					<Link
						className='text-center text-gray-500 text-xs hover:text-indigo-500'
						href='/login'>
						Login here.
					</Link>
				</p>
			</div>
		</>
	);
}
