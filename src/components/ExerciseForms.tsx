"use client";
import { useState, useRef, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

type MuscleGroup =
	| "Biceps"
	| "Calves"
	| "Chest"
	| "Core"
	| "Delts"
	| "Glutes"
	| "Hamstrings"
	| "Hips"
	| "Lats"
	| "Lower Back"
	| "Mid Back"
	| "Obliques"
	| "Upper Back"
	| "Shoulders"
	| "Traps"
	| "Triceps"
	| "Quads";

type MuscleGroupsState = {
	[key in MuscleGroup]?: boolean;
};

type MuscleGroupCheckboxesProps = {
	onMuscleGroupsChange: (muscleGroup: MuscleGroup, isSelected: boolean) => void;
};

const muscleGroups: MuscleGroup[] = [
	"Biceps",
	"Calves",
	"Chest",
	"Core",
	"Delts",
	"Glutes",
	"Hamstrings",
	"Hips",
	"Lats",
	"Lower Back",
	"Mid Back",
	"Obliques",
	"Upper Back",
	"Shoulders",
	"Traps",
	"Triceps",
	"Quads",
];

const MuscleGroupCheckboxes: React.FC<MuscleGroupCheckboxesProps> = ({
	onMuscleGroupsChange,
}) => {
	const [selectedMuscleGroups, setSelectedMuscleGroups] =
		useState<MuscleGroupsState>({});

	const handleCheckboxChange = (muscleGroup: MuscleGroup) => {
		console.log(`In handleCheckboxChange and muscleGroup is: ${muscleGroup}`);
		const isSelected = !selectedMuscleGroups[muscleGroup];
		setSelectedMuscleGroups((prev) => {
			const newState: MuscleGroupsState = {
				...prev,
				[muscleGroup]: isSelected,
			};
			onMuscleGroupsChange(muscleGroup, isSelected);
			console.log(
				`In MuscleGroupCheckboxes and updating new state: ${newState}`
			);
			return newState;
		});
	};
	return (
		<div className='muscle-group-checkboxes'>
			{muscleGroups.map((muscleGroup) => (
				<label key={muscleGroup}>
					<input
						className='p-2'
						type='checkbox'
						checked={selectedMuscleGroups[muscleGroup] || false}
						onChange={() => handleCheckboxChange(muscleGroup)}
						value={muscleGroup}
					/>
					{muscleGroup}
				</label>
			))}
		</div>
	);
};

interface formErrors {
	name?: [];
	description?: [];
	muscleGroups?: [];
	equipment?: [];
	videoLink?: [];
	exerciseType?: [];
}

interface formState {
	errors: formErrors;
}

interface WorkoutFormProps {
	formAction: any;
	initialData: {
		name: string;
		description: string;
		muscleGroups: string[];
		equipment: string;
		videoLink: string;
		exerciseType: string;
	};
}

export default function WorkoutForm({
	formAction,
	initialData,
}: WorkoutFormProps) {
	const [formState, action] = useFormState<formState>(formAction, {
		errors: {},
	});
	const [selectedMuscleGroups, setSelectedMuscleGroups] =
		useState<MuscleGroupsState>({});
	const serializedMuscleGroups = JSON.stringify(
		Object.entries(selectedMuscleGroups)
			.filter(([_, isSelected]) => isSelected)
			.map(([muscleGroup]) => muscleGroup)
	);
	const [exerciseType, setExerciseType] = useState("");

	const updateType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setExerciseType(e.target.value);
		console.log(`Exercise Type: ${exerciseType}`);
	};

	const handleMuscleGroupsChange = (
		muscleGroup: MuscleGroup,
		isSelected: boolean
	) => {
		setSelectedMuscleGroups((prevSelectedMuscleGroups) => ({
			...prevSelectedMuscleGroups,
			[muscleGroup]: isSelected,
		}));
	};

	// QUESTION:
	// Is this even necessary? Why do I have this?
	useEffect(() => {}, [selectedMuscleGroups]);

	console.log(`Here's what we'll pass to the server: ${selectedMuscleGroups}`);
	console.log(`Form Action: ${formAction}`);
	return (
		<>
			<form action={action}>
				<h1 className='flex justify-center m-2 text-gray-500 font-bold'>
					Add Exercise
				</h1>
				<div className='w-full max-w-md'>
					<div className='md:flex md:items-center mb-6'>
						<div className='md:w-1/3'>
							<label
								htmlFor='name'
								className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
								Exercise Name
							</label>
						</div>
					</div>
					<div className='md:w-2/3'>
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
							<p className='text-red-500 text-xs italic'>
								{formState.errors.description}
							</p>
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
						<div className='md:w-2/3'></div>
						<MuscleGroupCheckboxes
							onMuscleGroupsChange={handleMuscleGroupsChange}
						/>
						<input
							type='hidden'
							name='muscleGroups'
							value={serializedMuscleGroups}
							readOnly
						/>
						{formState.errors?.muscleGroups && (
							<p className='text-red-500 text-xs italic'>
								{formState.errors?.muscleGroups}
							</p>
						)}
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
								<p className='text-red-500 text-xs italic'>
									{formState.errors?.equipment}
								</p>
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
					<div>
						<div className='md:flex md:items-center mb-6'>
							<div className='md:w-1/3'>
								<label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4'>
									Exercise Type
								</label>
							</div>
						</div>
						<div className='md:w-2/3'>
							<select name='selectedExercise' onChange={updateType}>
								<option value='' disabled>
									Pick one
								</option>
								<option value='REGULAR'>Strength / Cardio</option>
								<option value='PT'>Physio</option>
							</select>
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
