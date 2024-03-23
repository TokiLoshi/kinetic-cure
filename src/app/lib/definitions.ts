import { EnumType } from "typescript";

export type DatabaseUser = {
	id?: string;
	email?: string;
	password?: string;
	name?: string;
	dateJoined?: string | Date;
	distanceMetric?: string;
	weightMetric?: string;
	totalWorkouts?: number;
};

export type Session = {
	id?: string;
	userId: string;
	expiresAt: string | Date;
};

export type Workouts = {
	id?: number;
	athleteId?: string;
	dateCompleted?: string | Date;
	notes?: string;
	personalRecord?: Boolean;
	distance?: number;
	reps?: number;
	sets?: number;
};

export type Exercises = {
	id?: number;
	name?: string;
	description?: string;
	equipment?: string;
	videoLink?: string;
	exerciseType: EnumType;
};

export type ExerciseType = "REGULAR" | "PT";

export type PersonalRecords = {
	id?: number;
	reps?: number;
	distance?: number;
	weight?: number;
};

export type MuscleGroup = {
	id?: number;
	name?: string;
};
