"use client";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";

export default function LoginForm() {
	const [errorMessage, dispatch] = useFormState(authenticate, undefined);

	return (
		<>
			<form action={dispatch}>
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
								className='bg-gray-200 p-3 appearance-none border-2 border-gray-200 rounded w-full py-2 px4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
								id='email'
								type='email'
								placeholder='Email'
								autoComplete='email'
								required
							/>
							{errorMessage && (
								<p className='text-red-500 text-xs italic'>{errorMessage}</p>
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
							placeholder='Secret password'
							autoComplete='new-password'
							required
						/>
						{errorMessage && (
							<p className='text-red-500 text-xs italic'>{errorMessage}</p>
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
		</>
	);
}
