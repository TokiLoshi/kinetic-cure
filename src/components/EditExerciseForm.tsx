"use client";
import { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";

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
	selectedMuscleGroups: MuscleGroupsState;
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
	selectedMuscleGroups,
}) => {
	const handleCheckboxChange = (muscleGroup: MuscleGroup) => {
		console.log(`In handleCheckboxChange and muscleGroup is: ${muscleGroup}`);
		const isSelected = !selectedMuscleGroups[muscleGroup];
		console.log(`isSelected is: ${isSelected}`);
		// setSelectedMuscleGroups({
		// 	...selectedMuscleGroups,
		// 	[muscleGroup]: isSelected,
		// });
		onMuscleGroupsChange(muscleGroup, isSelected);
	};

	return (
		<div>
			{muscleGroups.map((muscleGroup) => {
				return (
					<div key={muscleGroup}>
						<label>
							<input
								type='checkbox'
								checked={!!selectedMuscleGroups[muscleGroup]}
								onChange={() => handleCheckboxChange(muscleGroup)}
							/>
							{muscleGroup}
						</label>
					</div>
				);
			})}
		</div>
	);
};

interface formErrors {
	name?: string;
	description?: string;
	equipment?: string;
	videoLink?: string;
	exerciseType?: string;
	muscleGroups?: string;
}

interface formState {
	errors: formErrors;
}

interface ExerciseFormProps {
	id: number;
	name: string;
	description: string;
	equipment: string;
	videoLink: string;
	exerciseType: string;
	ExerciseMuscleGroup: Array<{
		muscleGroup: {
			name: string;
		};
	}>;
}

export default function EditExerciseForm({
	formAction,
	exercise,
}: {
	exercise: ExerciseFormProps;
	formAction: any;
}) {
	// Need to still pass the action to the form
	const [formState, action] = useFormState<formState>(formAction, {
		errors: {},
	});

	// Track state for selected MuscleGroups
	const [selectedMuscleGroups, setSelectedMuscleGroups] =
		useState<MuscleGroupsState>(
			exercise.ExerciseMuscleGroup.reduce((acc, eg) => {
				acc[eg.muscleGroup.name as MuscleGroup] = true;
				return acc;
			}, {} as MuscleGroupsState)
		);
	console.log(
		`Starting state for selectedMuscleGroups: ${Object.entries(
			selectedMuscleGroups
		)}`
	);

	// Track state for Exercise Type
	const [exerciseType, setExerciseType] = useState<string>(
		exercise.exerciseType
	);

	// Track what's going on with the form we're going to pass back

	const serializedMuscleGroups = JSON.stringify(
		Object.entries(selectedMuscleGroups)
			.filter(([_, isSelected]) => isSelected)
			.map(([muscleGroup]) => muscleGroup)
	);
	console.log(`Serialized Muscle Groups: ${serializedMuscleGroups}`);

	const updateType = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setExerciseType(e.target.value);
	};

	const handleMuscleGroupsChange = (
		muscleGroup: MuscleGroup,
		isSelected: boolean
	) => {
		setSelectedMuscleGroups((prevSelectedMuscleGroups) => ({
			...prevSelectedMuscleGroups,
			[muscleGroup]: isSelected,
		}));
		console.log(
			`In handleMuscleGroupsChange and muscleGroup is: ${muscleGroup}`
		);
	};

	useEffect(() => {}, [selectedMuscleGroups]);

	return (
		<>
			<form action={action}>
				<input type='hidden' name='id' value={exercise.id} readOnly />
				<h1 className='flex justify-center m-2 text-gray-50 font-bold'>
					Edit Exercise
				</h1>
				<div className='w-full max-w-md'>
					<div className='md:flex md:items-center mb-6'>
						<div className='md:w-1/3'>
							<label
								htmlFor='name'
								className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-5'>
								Exercise Name
							</label>
						</div>
					</div>
					<div className='md:2-2/3'>
						<input
							name='name'
							className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-purple-500'
							type='text'
							id='name'
							required
							defaultValue={exercise.name}
							placeholder={exercise.name}
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
						<textarea
							name='description'
							className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full w-300 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
							placeholder={exercise.description}
							id='description'
							required
							defaultValue={exercise.description}
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
						<div className='md:2-3/4'></div>
						<MuscleGroupCheckboxes
							selectedMuscleGroups={selectedMuscleGroups}
							onMuscleGroupsChange={handleMuscleGroupsChange}
						/>
						<input
							type='hidden'
							name='muscleGroups'
							value={serializedMuscleGroups}
							readOnly
						/>
						{formState.errors.muscleGroups && (
							<p className='text-red-500 text-xs italic'>
								{formState.errors.muscleGroups}
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
								placeholder='PROPS EQUIPMENT VALUE GOES HERE'
								type='text'
								id='equipment'
								required
								defaultValue={exercise.equipment}
							/>
							{formState.errors.equipment && (
								<p className='text-red-500 text-xs italic'>
									{formState.errors.equipment}
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
								placeholder='PROPS VIDEO LINK GOES HERE'
								type='text'
								id='videoLink'
								required
								defaultValue={exercise.videoLink}
							/>
							{formState.errors.videoLink && (
								<p className='text-red-500 text-xs italic'>
									{formState.errors.videoLink}
								</p>
							)}
						</div>
					</div>
					<div className='md:w-2/3'>
						<select
							name='selectedExercise'
							onChange={updateType}
							defaultValue={exercise.exerciseType}>
							<option value='' disabled>
								Pick one
							</option>
							<option value='REGULAR'>Strength / Cardio</option>
							<option value='PT'>Physio</option>
						</select>
					</div>
				</div>
				<div className='md:flex md:items-center mt-2'>
					<div className='md:w-1/3'></div>
					<div className='md:w-2/3'>
						<button
							className='shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
							type='submit'>
							Submit Edits
						</button>
					</div>
				</div>
			</form>
		</>
	);
}
