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

type Exercises = {
	exerciseId: number;
	name: string;
	reps: number;
	sets: number;
	weight: number;
	distance: number;
	restTime: number;
	pr: boolean;
};

interface WorkoutFormProps {
	formAction: any;
	initialData: {
		id: string;
		name: string;
		duration: number;
		athleteId: string;
		dateCompleted: string;
		notes: string;
		exercises: Exercises[];
	};
}

export default function WorkoutForm({
	initialData,
	formAction,
	possibleExercise,
}: {
	WorkoutFormProps: WorkoutFormProps;
	possibleExercise: Exercises;
}) {
	const [formState, action] = useFormState<formState>(formAction, {
		errors: {},
	});
	const [exerciseData, setExerciseData] = useState<Exercises[]>([]);

	const handleAddExercise = () => {
		setExerciseData([
			...exerciseData,
			{
				exerciseId: 0,
				name: "",
				reps: 0,
				sets: 0,
				weight: 0,
				distance: 0,
				restTime: 0,
				pr: false,
			},
		]);
	};

	const handleInputChange = (event: any, index: number) => {
		const updatedData: Exercises = [...exerciseData];
		updatedData[index][event.target.name] = event.target.value;
		setExerciseData(updatedData);
	};

	return (
		<>
			<div className='text-center'>
				<form action={action}>
					<h1>Lets log a workout!</h1>
					<div className='w-full max-w-md'>
						<div className='md: flex md:items-center mb-6'>
							<label
								htmlFor='name'
								className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
								Workout Name
							</label>
						</div>
					</div>
					<div className='md:2-2/3'>
						<input
							name='name'
							className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
							type='text'
							id='name'
							required
							placeholder='Workout Name'
						/>
						{formState.errors?.name && (
							<p className='text-red-500 text-xs italic'>
								{formState.errors.name}
							</p>
						)}
					</div>
					<div className='md:flex md:items-center mb-6'>
						<div className='md:w-1/3'>
							<label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
								Duration
							</label>
						</div>
					</div>
					<div className='md:w-2/3'>
						<input
							name='duration'
							className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
							placeholder='...Minutes'
							type='number'
							id='duration'
							required
						/>
						{formState.errors?.duration && (
							<p className='text-red-500 text-xs italic'>
								{formState.errors.duration}
							</p>
						)}
					</div>
					<div className='md:flex md:items-center mb-6'>
						<input
							type='hidden'
							name='athleteId'
							value={initialData.athleteId}
						/>
					</div>
					<div className='md:w-2/3'>
						<input
							name='dateCompleted'
							className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
							type='date'
							id='dateCompleted'
							required
						/>
						{formState.errors?.dateCompleted && (
							<p className='text-red-500 text-xs italic'>
								{formState.errors.dateCompleted}
							</p>
						)}
					</div>
					<div className='md:flex md:items-center mb-6'>
						<div className='md:w-1/3'>
							<label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
								Notes
							</label>
						</div>
						<div className='md:w-2/3'>
							<textarea
								name='notes'
								className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
								placeholder='Notes'
								id='notes'
								required
							/>
							{formState.errors?.notes && (
								<p className='text-red-500 text-xs italic'>
									{formState.errors.notes}
								</p>
							)}
						</div>
						{exerciseData.map((exercise, index) => (
							<div key={index}>
								<select
									value={exercise.name}
									onChange={(e) => handleInputChange(e, index)}>
									<option value=''>Select Exercise</option>
									<option value='run'>Run</option>
									<option value='ride'>Ride</option>
									<option value='row'>Row</option>
									<option value='hike'>Hike</option>
									<option value='walk'>Walk</option>
								</select>
								{exercise.name === "run" ||
								exercise.name === "ride" ||
								exercise.name === "row" ? (
									<input
										type='number'
										name='distance'
										value={exercise.distance}
										onChange={(e) => handleInputChange(e, index)}
									/>
								) : (
									<>
										<input
											type='number'
											name='reps'
											value={exercise.reps}
											onChange={(e) => handleInputChange(e, index)}
										/>
										<input
											type='number'
											name='sets'
											value={exercise.sets}
											onChange={(e) => handleInputChange(e, index)}
										/>
										<input
											type='number'
											name='weight'
											value={exercise.weight}
											onChange={(e) => handleInputChange(e, index)}
										/>
										<input
											type='number'
											name='restTime'
											value={exercise.restTime}
											onChange={(e) => handleInputChange(e, index)}
										/>
									</>
								)}
								<input
									type='checkbox'
									name='pr'
									checked={exercise.pr}
									onChange={(e) => handleInputChange(e, index)}
								/>
								Did you get a PR?
								<button onClick={() => handleAddExercise}>Add Exercise</button>
								<button onClick={() => handleAddExercise}>
									Remove Exercise
								</button>
							</div>
						))}
					</div>
				</form>
			</div>
		</>
	);
}
