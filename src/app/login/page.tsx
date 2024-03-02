"use client";
import { useRef, useState } from "react";
import Link from "next/link";

interface LoginFormState {
	email: string;
	password: string;
}

interface FormErrors {
	email?: string;
	password?: string;
}

export default function Page() {
	console.log("This is the login page");
	const formRef = useRef<HTMLFormElement>(null);
	const [formState, setFormState] = useState<LoginFormState>({
		email: "",
		password: "",
	});
	const [error, setError] = useState<FormErrors>({});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target;
		setFormState((previousState) => ({
			...previousState,
			[id]: value,
		}));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const { email, password } = formState;
		console.log("Form submitted", formState);
	};

	return (
		<>
			<div className='flex justify-center m-2'>
				<form ref={formRef} onSubmit={handleSubmit}>
					<h1 className='flex justify-center m-2 text-gray-500 font-bold'>
						Login
					</h1>
					<div className='w-full max-w-sm'>
						<div className='md:flex md:items-center mb-6'>
							<div className='md:w-1/3'>
								<label
									htmlFor='email'
									className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
									Email
								</label>
							</div>
							<div className='md:w-2/3'>
								<input
									name='email'
									className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
									id='email'
									type='email'
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
					</div>
					<div className='md:flex md:items-center mb-6'>
						<div className='md:w-1/3'>
							<label
								htmlFor='password'
								className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
								Password
							</label>
						</div>
						<div className='md:w-2/3'>
							<input
								name='password'
								id='password'
								type='password'
								className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
								onChange={handleChange}
								autoComplete='new-password'
								required
								value={formState.password}
							/>
							{error.password && (
								<p className='text-red-500 text-xs italic'>{error.password}</p>
							)}
						</div>
					</div>
					<div className='md:flex md:items-center'>
						<div className='md:w-1/3'></div>
						<div className='md:w-2/3'>
							<button
								type='submit'
								className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'>
								Login
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
