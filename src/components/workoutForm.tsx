"use client";
import { useState, useRef } from "react";
import { useFormState, useFormStatus } from 'react-dom'
import { validateExercise } from '@/app/lib/actions'


export default function workoutForm( {}) {
	const initialState = { message: null, errors, {}}
	const [errorMessage, dispatch] = useFormState(validateExercise, undefined)

	// const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	console.log(event.target.value);
	// 	const { name, value } = event.target;
	// 	setFormState((previousState) => ({
	// 		...previousState,
	// 		[name]: value,
	// 	}));
	// };
	const formRef = useRef();
	return (
		<>
			<form method='POST'>
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
							onChange={handleChange}
							required
							value={formState.name}
							placeholder='Workout Name'
						/>
						{error.name && (
							<p className='text-red-500 text-xs italic'>{error.name}</p>
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
							onChange={handleChange}
							value={formState.description}
							required
						/>
						{error.description && (
							<p className='text-red-500 text-xs italic'>{error.description}</p>
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
								onChange={handleChange}
								value={formState.muscleGroups}
								required
							/>
							{error.muscleGroups && (
								<p className='text-red-500 text-xs italic'>
									{error.muscleGroups}
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
								onChange={handleChange}
								required
								value={formState.equipment}
							/>
							{error.equipment && (
								<p className='text-red-500 text-xs italic'>{error.equipment}</p>
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
								onChange={handleChange}
								value={formState.videoLink}
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

	// const handleSubmint = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	console.log("Trying to submit");
	// 	e.preventDefault();
	// 	console.log("Form submitted");
	// 	console.log(formState);
	// 	const { name, description, muscleGroups, videoLink, equipment } = formState;
	// 	let newErrors: FormErrors = {};
	// 	if (!name) {
	// 		newErrors.name = "Name is required";
	// 	}
	// 	if (!description) {
	// 		newErrors.description = "Description is required";
	// 	}
	// 	if (!muscleGroups) {
	// 		newErrors.muscleGroups = "Muscle Groups are required";
	// 	}
	// 	if (!equipment) {
	// 		newErrors.equipment = "Equipment is required";
	// 	}
	// 	if (Object.keys(newErrors).length > 0) {
	// 		setError(newErrors);
	// 		console.log("error", error);
	// 		return;
	// 	}
	// 	console.log("All good, submit the form!");
	// 	try {
	// 		const response = await fetch("/workouts", {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify(formState),
	// 		});
	// 		if (!response.ok) {
	// 			throw new Error("Network response was not ok");
	// 		}
	// 		const result = await response.json();
	// 		// Handle success
	// 		console.log(result);
	// 	} catch (error) {
	// 		console.error("Error:", error);
	// 	}