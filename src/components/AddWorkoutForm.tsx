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

// export default function WorkoutForm({
// 	formAction,
// 	initialData,
// }): WorkoutFormProps {
// 	const [formState, action] = useFormState<formState>(formAction, {
// 		errors: {},
// 	});

// 	return (
// 		<>
// 			<form action={action}>
// 				<h1>Lets log a workout!</h1>
// 			</form>
// 		</>
// 	);
// }
