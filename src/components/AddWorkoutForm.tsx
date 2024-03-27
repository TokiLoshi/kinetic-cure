"use client";
import { useState, useRef, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

interface formErrors {
	name?: [];
	duration?: [];
	athleteId?: [];
	dateCompleted?: [];
	notes?: [];
	exercises?: [];
	reps?: [];
	sets?: [];
	distance?: [];
	weight?: [];
	restTime?: [];
}

interface formState {
	errors: formErrors;
}

interface Exercises {
	exerciseId: number;
	reps: number;
	sets: number;
	weight: number;
	distance: number;
	restTime: number;
	pr: boolean;
}

interface WorkoutFormProps {
	formAction: any;
	initialData: {
		name: string;
		duration: number;
		athleteId: string;
		dateCompleted: string;
		notes: string;
		exercises: Exercises[];
	};
}

export default function WorkoutForm({
	formAction,
	initialData,
}): WorkoutFormProps {
	const [formState, action] = useFormState<formState>(formAction, {
		errors: {},
	});
	return (
		<>
			<form action={action}>
				<h1>Lets log a workout!</h1>
				<div className="w-full max-w-md">
					<div className="md: flex md:items-center mb-6">
						<label htmlFor="name" className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
							Workout Name
						</label>
					</div>
				</div>
				<div className="md:2-2/3">
					<input 
					name="name"
					className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
					type="text"
					id="name"
					required
					placeholder="Workout Name"
					/>
					{formState.errors?.name && (
						<p className="text-red-500 text-xs italic">{formState.errors.name}</p>
					)}
				</div>
				<div className="md:flex md:items-center mb-6">
					<div className="md:w-1/3">
						<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
							Duration
						</label>
					</div>
				</div>
				<div className="md:w-2/3">
				<input 
				name="duration"
				className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
				placeholder="...Minutes"
				type="number"
				id="duration"
				required
				/>
				{formState.errors?.duration && (
				<p className="text-red-500 text-xs italic">
					{formState.errors.duration}
				</p>)}
				</div>
				<div className="md:flex md:items-center mb-6">
					<input
					type="hidden"
					name="athleteId"
					value={initialData.athleteId}
					/>
					<div className="md:w-2/3">
						<input
						name="dateCompleted"
						className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
						type="date"
						id="dateCompleted"
						required
						/>
						{formState.errors?.dateCompleted && (
							<p className="text-red-500 text-xs italic">
								{formState.errors.dateCompleted}
							</p>
						)}
					</div>
						<div className="md:flex md:items-center mb-6">
							<div className="md:w-1/3">
								<label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
									Notes
								</label>
							</div>
							<div className="md:w-2/3">
								<textarea
									name="notes"
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									placeholder="Notes"
									id="notes"
									required
								/>
								{formState.errors?.notes && (
									<p className="text-red-500 text-xs italic">
										{formState.errors.notes}
									</p>
								)}
								
				</div>


					// Date Completed 
					// Notes Text Area 
					// Continous Add Exercise
					// Exercise Sets
					// Exercise Distance
					// Exercise Reps
					// Exercise Weight
					// Rest Time 
					// PR 
				</div>
			</form>
		</>
	);
}
