import { verifyRequestOrigin } from "lucia";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { lucia, validateRequest, getUser } from "@/app/lib/auth";

console.log(`middleware middleware`);

interface User {
	user: any | null;
	session: any | null;
	username: any | null;
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
	console.log(`The middleware is being used`);
	const currentUser = await validateRequest();
	if (currentUser && !request.nextUrl.pathname.startsWith("/dashboard")) {
		console.log("User wants to go to the dashboard");
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}
	if (!currentUser && request.nextUrl.pathname.startsWith("/dashboard")) {
		console.log("User is not logged in but is tryeing to go to the dashboard");
		return NextResponse.redirect(new URL("/login", request.url));
	}
	if (request.method === "GET") {
		console.log(`Get method in middleware`);
		return NextResponse.next();
	}
	const originHeader = request.headers.get("Origin");
	const hostHeader = request.headers.get("Host");
	if (
		!originHeader ||
		!hostHeader ||
		!verifyRequestOrigin(originHeader, [hostHeader])
	) {
		return new NextResponse(null, {
			status: 403,
		});
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/about/:path*", "/dashboard/:path*"],
};
