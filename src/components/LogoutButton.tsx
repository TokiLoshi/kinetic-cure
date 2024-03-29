import { Form } from "@/app/lib/form";

import { ActionResult } from "@/app/lib/form";
import { logout } from "@/app/lib/actions";
import { Button } from "./ui/button";

export default function SignButton() {
	console.log("Waiting to signout");
	return (
		<Form action={logout}>
			<Button variant='secondary' className='m-2 '>
				Sign Out
			</Button>
		</Form>
	);
}
