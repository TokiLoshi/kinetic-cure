import { redirect } from "next/navigation";

// Create a workout
export async function createWorkout() {
	// Check user id
	// Check workout name
	// Check workout has exercises
	// List out the variables
	// Check the db to ensure it doesn't already exist
	// Check validity of fields
	// Save to database
	// Revalidate
	// Redirect
}

// Edit a workout
export async function editWorkout() {
	// Check user id
	// check exercise id
	// Check user has authority to edit the exercise
	// Validate the fields
	// Update the fields
	// Save to the database
	// revalidate data
	// Redirect
}

// View a workout
export async function viewWorkout() {
	// Check user id
	// Create object with default workouts
	// Get workouts for user from database
	// Send as object to client
	// revalidate data
	// get user preferences
	// update distance to user distanceMetric for display
	// update weights to user weightMetrics for display
	// redirect
}

// Log a workout
export async function logworkout() {
	// get user id/
	// get workout id
	// validate fields
	// Check for prs
	// Save to database
	// revalidate data
	// redirect
}

// Delete workoutCreateWorkout
export async function deleteCreatedWorkout() {
	// get user id
	// get esercise id/
	// Check that user has the authority to delete the exercise
	// Deslete associated stuff from the database
	// Delete the exercise
	// revalidate data
	// redirect to dashboard
}

// Delete a logged workout
export async function deleteLoggedWorkout() {
	// check user id
	// check workout id
	// ensure that the user compelted the workout
	// delete associated PRs and reps etc
	// Delete workut
	// revalidate
	// redirect
}
