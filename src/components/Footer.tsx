import Link from "next/link";
import { Github } from "lucide-react";

export default function footer() {
	const calculateCopyright = new Date().getFullYear();
	console.log("New date: ", calculateCopyright);
	return (
		<>
			<footer className='fixed inset-x-0 bottom-0 bg-slate-900 border-x-8 p-6'>
				<div className='flex justify-center gap-5 items-center'>
					<p className='space-x-0'>&copy; {calculateCopyright} </p>
					<Link href='https://github.com/TokiLoshi' target='_blank'>
						<Github className='text-white' size={24} />
					</Link>
					<p className='text-white'>Coded with curiosity</p>
				</div>
			</footer>
		</>
	);
}
