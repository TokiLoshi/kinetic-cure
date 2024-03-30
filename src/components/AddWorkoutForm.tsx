"use client";
import { useState, useRef, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

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
			<div className='container relative flex pt-20 flex-col items-center justify-center lg:px-3'>
				<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[p350px]'>
					<div className='flex flex-col items-center space-y-2 text-center bg-indigo-300 rounded py-10 shadow'>
						<h1>Lets log a workout!</h1>
						<form action={action}>
							<Label htmlFor='name'>Workout Name</Label>
							<Input
								name='name'
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
							<Label>Duration</Label>
							<Input
								name='duration'
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
							<Input
								type='hidden'
								name='athleteId'
								value={initialData.athleteId}
							/>
							<Label>Date Completed</Label>
							<Input
								name='dateCompleted'
								type='date'
								id='dateCompleted'
								required
							/>
							{formState.errors?.dateCompleted && (
								<p className='text-red-500 text-xs italic'>
									{formState.errors.dateCompleted}
								</p>
							)}
							<Label>Notes</Label>
							<Textarea name='notes' placeholder='Notes' id='notes' required />
							{formState.errors?.notes && (
								<p className='text-red-500 text-xs italic'>
									{formState.errors.notes}
								</p>
							)}
							<div>
								{exerciseData.map((exercise, index) => (
									<div key={index}>
										hi hi
										<Label>Add Exercises</Label>
										<Select
											name='exercise'
											value={exercise.name}
											onValueChange={(e) => handleInputChange(e, index)}>
											<SelectTrigger className='w-[280px]'>
												<SelectValue placeholder='Select Exercise' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Exercise</SelectLabel>
													<SelectItem value='run'>Run</SelectItem>
													<SelectItem value='ride'>Ride</SelectItem>
													<SelectItem value='row'>Row</SelectItem>
													<SelectItem value='hike'>Hike</SelectItem>
													<SelectItem value='walk'>Walk</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
										{exercise.name === "run" ||
										exercise.name === "ride" ||
										exercise.name === "row" ? (
											<Input
												type='number'
												name='distance'
												value={exercise.distance}
												onChange={(e) => handleInputChange(e, index)}
											/>
										) : (
											<>
												<Input
													type='number'
													name='reps'
													value={exercise.reps}
													onChange={(e) => handleInputChange(e, index)}
												/>
												<Input
													type='number'
													name='sets'
													value={exercise.sets}
													onChange={(e) => handleInputChange(e, index)}
												/>
												<Input
													type='number'
													name='weight'
													value={exercise.weight}
													onChange={(e) => handleInputChange(e, index)}
												/>
												<Input
													type='number'
													name='restTime'
													value={exercise.restTime}
													onChange={(e) => handleInputChange(e, index)}
												/>
											</>
										)}
										<Input
											type='checkbox'
											name='pr'
											checked={exercise.pr}
											onChange={(e) => handleInputChange(e, index)}
										/>
										Did you get a PR?
										<Button onClick={() => handleAddExercise}>
											Add Exercise
										</Button>
										<Button onClick={() => handleAddExercise}>
											Remove Exercise
										</Button>
									</div>
								))}
							</div>
							<Button>Log workout</Button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}
