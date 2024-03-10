"use client";
import { useFormState, useFormStatus } from "react-dom";
import { validateSignUp } from "@/app/lib/actions";
import { useState, FormEvent } from "react";

export default function SignUpForm() {
	const initialState = { message: null, errors: {} };
	const [error, dispatch] = useFormState(validateSignUp, initialState);
	const [errorState, setError] = useState(" ");

	return (
		<>
			<form action={dispatch}>
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
								placeholder='email'
								autoComplete='email'
								required
							/>
							{errorState && (
								<p className='text-red-500 text-xs italic'>{errorState}</p>
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
								placeholder='password'
								autoComplete='new-password'
								required
							/>
							{errorState && (
								<p className='text-red-500 text-xs italic'>{errorState}</p>
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
								placeholder='confirm password'
								autoComplete='new-password'
								required
							/>
							{errorState && (
								<p className='text-red-500 text-xs italic'>{errorState}</p>
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
								id='agree'
								required
								// checked={formState.agree}
							/>
							<span className='text-sm'>
								I understand this is a hobby project
							</span>
						</label>
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
		</>
	);
}
