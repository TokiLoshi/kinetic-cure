"use client";
import { useState, useRef, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
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
		<>
			<div className='grid grid-cols-2 gap-4 m-2'>
				{muscleGroups.map((muscleGroup) => (
					<Label className='flex items-center space-x-2' key={muscleGroup}>
						<Checkbox
							className='mr-2'
							checked={selectedMuscleGroups[muscleGroup] || false}
							onCheckedChange={() => handleCheckboxChange(muscleGroup)}
							value={muscleGroup}
						/>
						{muscleGroup}
					</Label>
				))}
			</div>
		</>
		// </div>
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
	const [fruit, setFruit] = useState("");

	// const updateType = (e: React.ChangeEvent<HTMLSelectElement>) => {
	// 	setExerciseType(e.target.value);
	// };
	const updateType = (newValue: string) => {
		setExerciseType(newValue);
	};

	const updateFruit = (newValue: string) => {
		setFruit(newValue);
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

	return (
		<>
			<div className='container relative flex pt-20 flex-col items-center justify-center lg:px-3'>
				<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[p350px]'>
					<div className='flex flex-col items-center space-y-2 text-center bg-indigo-300 rounded py-10 shadow'>
						<h1 className='font-bold text-2x text-slate-900'>Add Exercise</h1>
						<div className='grid-gap-6'>
							<form action={action}>
								<div className='grid-gap-2'>
									<div className='grid gap-1 py-2'>
										<Label htmlFor='name'>Name</Label>
										<Input
											name='name'
											type='text'
											id='name'
											required
											placeholder='Exercise Name'
										/>
										{formState.errors?.name && (
											<p className='text-red-500 text-xs italic'>
												{formState.errors.name}
											</p>
										)}
									</div>
								</div>
								<div className='grid-gap-2'>
									<div className='grid gap-1 py-2'>
										<Label htmlFor='description'>Description</Label>
										<Textarea
											name='description'
											// className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500'
											placeholder='Description'
											id='description'
											required
										/>
										{formState.errors.description && (
											<p className='text-red-500 text-xs italic'>
												{formState.errors.description}
											</p>
										)}
									</div>
								</div>
								<div className='grid-gap-2'>
									<div className='grid gap-1 py-2'>
										<Label>MuscleGroups</Label>
										<MuscleGroupCheckboxes
											onMuscleGroupsChange={handleMuscleGroupsChange}
										/>
										<Input
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
								</div>
								<div className='grid-gap-2'>
									<div className='grid gap-1 py-2'>
										<Label>Equipment</Label>
										<Input
											name='equipment'
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
								<div className='grid-gap-2'>
									<div className='grid gap-1 py-2'>
										<Label>Video Link</Label>
										<Input
											name='videoLink'
											placeholder='Video Link'
											type='text'
											id='videoLink'
										/>
									</div>
								</div>
								<div className='grid-gap-2'>
									<div className='grid gap-1 py-2'>
										<Select
											name='selectedExercise'
											onValueChange={updateType}
											value={exerciseType}>
											<SelectTrigger className='w-[280px]'>
												<SelectValue placeholder='Select Exercise Type' />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Fruit</SelectLabel>
													<SelectItem value='REGULAR'>
														Strength / Cardio
													</SelectItem>
													<SelectItem value='PT'>Physio</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className='md:flex md:items-center mt-2'>
									<Button type='submit' id='signupButton' className='w-full'>
										Add Exercise
									</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
