"use client";
import { toast } from "sonner";

interface ActionResult {
	error: string | null;
	success: string | null;
	loading: boolean | null;
}

export default function Toast({ error, success, loading }: ActionResult) {
	if (error) {
		return toast.error(`Error: ${error}`);
	} else if (success) {
		return toast.success(`Success: ${success}`);
	} else if (loading) {
		return toast.info(`Loading: ${loading}`);
	}
}
