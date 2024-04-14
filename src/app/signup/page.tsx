import { validateRequest } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { signup } from "@/app/actions";
import { SignUpForm } from "@/components/SignUpForm";
import { FormState } from "@/app/actions/index";

export default async function SignInPage() {
	let isLoggedIn = false;
	const { user } = await validateRequest();

	if (user !== null) {
		console.log(`USER session EXISTS: ${user}`);
		redirect("/dashboard");
	}
	console.log("User is not logged in and they want to sign up");

	const onFormAction = async (prevState: FormState, formData: FormData) => {
		"use server";
		const signupResult = await signup(prevState, formData);
		console.log("User signup: ", signupResult);
		return signupResult;
	};
	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} />
			<div className='container relative flex pt-20 flex-col items-center justify-center lg:px-3'>
				<div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[p350px]'>
					<div className='flex flex-col items-center space-y-2 text-center bg-indigo-300 rounded py-10 shadow'>
						<h1 className='flex justify-center m-2 text-slate-900 font-bold'>
							Sign up
						</h1>
						<div>
							<SignUpForm onFormAction={onFormAction} />
						</div>
					</div>
				</div>
			</div>
			<div className="min-h-80"></div>
			<Footer />
		</>
	);
}
