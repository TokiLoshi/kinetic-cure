import Link from "next/link";
import { validateRequest } from "@/app/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/DesktopNavigation";
import Footer from "@/components/Footer";
import { login } from "@/app/actions";
import { LoginForm } from "@/components/SignInForm";
import { FormState } from "@/app/actions/index";

export default async function Page() {
	let isLoggedIn = false;
	const { user } = await validateRequest();

	if (user !== null) {
		console.log(`USER session EXISTS: ${user}`);
		isLoggedIn = true;
		return redirect("/dashboard");
	}
	console.log("User is not logged in");

	const onFormAction = async (prevState: FormState, formData: FormData) => {
		"use server";
		const loginResult = await login(prevState, formData);
		console.log("User login: ", loginResult);
		return loginResult;
	};

	return (
		<>
			<Navbar isLoggedIn={isLoggedIn} />
			<div className='mx-auto mx-w-xl'>
				<LoginForm onFormAction={onFormAction} />
			</div>
			<div className='flex justify-center mt-2'>
				<Link href='/signup' className='m-2 text-center text-slate-500'>
					Need an account? Register{" "}
					<span className='underline'>here &rarr;</span>
				</Link>
			</div>
			<Footer />
		</>
	);
}
