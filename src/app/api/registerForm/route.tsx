import { NextRequest, NextResponse } from "next/server";
import { schema } from "@/app/registrationSchema";

export async function POST(req: NextRequest) {
	const formData = await req.formData();
	const data = Object.fromEntries(formData);

	const parsed = schema.safeParse(data);
	if (parsed.success) {
		return NextResponse.json({ message: "User registered successfully" });
	} else {
		return NextResponse.json({ message: "Invalid data" }, { status: 400 });
	}
}
