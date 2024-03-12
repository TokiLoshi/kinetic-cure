"use client";
import { useState, useRef } from "react";
import { useFormState, useFormStatus } from 'react-dom'

interface formErrors {
	name?: [];
	description?: [];
	muscleGroups?: [];
	equipment?: [];
	videoLink?: [];
}

interface formState {
	errors: formErrors;
}

interface WorkoutFormProps {
	formAction: any;
	initialData: {
		name: string;
		description: string;
		muscleGroups: string;
		equipment: string;
		videoLink: string;
	}
}

export default function workoutForm({ formAction, initialData}: WorkoutFormProps) {
	const [formState, action ] = useFormState<formState>(formAction, {
		errors : {},
	});
	return (
		<>
			<form action={action}>
				<h1 className='flex justify-center m-2 text-gray-500 font-bold'>
					Add a workout
				</h1>
				<div className='w-full max-w-md'>
					<div className='md:flex md:items-center mb-6'>
						<div className='md:w-1/3'>
							<label
								htmlFor='name'
								className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
								Workout Name
							</label>
						</div>
					</div>
					<div className='md:w-2/3'>
						<input
							name='name'
							className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
							type='text'
							id='name'
							required
							placeholder='Workout Name'
						/>
						{formState.errors?.name && (
							<p className='text-red-500 text-xs italic'>{formState.errors.name}</p>
						)}
					</div>

					<div className='md:flex md:items-center mb-6'>
						<div className='md:w-1/3'>
							<label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
								Description
							</label>
						</div>
					</div>
					<div className='md:w-2/3'>
						<input
							name='description'
							className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
							placeholder='Description'
							type='text'
							id='description'
							required
						/>
						{formState.errors.description && (
							<p className='text-red-500 text-xs italic'>{formState.errors.description}</p>
						)}
					</div>
					<div>
						<div className='md:flex md:items-center mb-6'>
							<div className='md:w-1/3'>
								<label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
									MuscleGroups
								</label>
							</div>
						</div>
						<div className='md:w-2/3'>
							<input
								name='muscleGroups'
								className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
								placeholder='Muscle Groups'
								type='text'
								id='muscle-groups'
								required
							/>
							{formState.errors?.muscleGroups && (
								<p className='text-red-500 text-xs italic'>
									{formState.errors?.muscleGroups}
								</p>
							)}
						</div>
					</div>
					<div>
						<div className='md:flex md:items-center mb-6'>
							<div className='md:w-1/3'>
								<label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
									Equipment
								</label>
							</div>
						</div>
						<div className='md:w-2/3'>
							<input
								name='equipment'
								className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
								placeholder='equipment'
								type='text'
								id='equipment'
								required
							/>
							{formState.errors?.equipment && (
								<p className='text-red-500 text-xs italic'>{formState.errors?.equipment}</p>
							)}
						</div>
					</div>
					<div>
						<div className='md:flex md:items-center mb-6'>
							<div className='md:w-1/3'>
								<label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
									Video Link
								</label>
							</div>
						</div>
						<div className='md:w-2/3'>
							<input
								name='videoLink'
								className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
								placeholder='Video Link'
								type='text'
								id='videoLink'
							/>
						</div>
					</div>
				</div>
				<div className='md:flex md:items-center mt-2'>
					<div className='md:w-1/3'></div>
					<div className='md:w-2/3'>
						<button
							className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus-outline-none text-white font-bold py-2 px-4 rounded'
							type='submit'
							id='signupButton'>
							Add Workout
						</button>
					</div>
				</div>
			</form>
		</>
	);
}