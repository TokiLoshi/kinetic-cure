const paths = {
	homePath() {
		return "/";
	},
	aboutPath() {
		return "/about";
	},
	dashboardPath() {
		return "/dashboard";
	},
	exerciseMainPath() {
		return "/dashboard/exercise";
	},
	workoutMainPath() {
		return "/dashboard/workout";
	},
	workoutCreate() {
		return "/dashboard/workout/workout-add";
	},
	workoutEdit(id: number) {
		return `/dashboard/${id}/workout-edit`;
	},
	exerciseCreate() {
		return "dashboard/workout/workout-create";
	},
	exerciseEdit(id: string) {
		return `dashboard/${id}/exercise-edit`;
	},
	forgotPasswordPath() {
		return "/forgot-password";
	},
	loginPath() {
		return "/login";
	},
	signupPath() {
		return "/signup";
	},
	signoutPath() {
		return "/signout";
	},
	updatePasswordPath() {
		return "/update-password";
	},
	userPreferencesPath() {
		return "/user-preferences";
	},
};
