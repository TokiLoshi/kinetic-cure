import { Form } from "@/app/lib/form";

import { ActionResult } from "@/app/lib/form";
import { logout } from "@/app/lib/actions";

export default function SignButton() {
	console.log("Waiting to signout");
	return (
		<Form action={logout}>
			<button className='m-2 text-white hover:text-lime-300'>SignOut </button>
		</Form>
	);
}
