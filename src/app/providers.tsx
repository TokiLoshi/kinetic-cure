"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ProvidersProps {
	children: ReactNode;
}

// Providers components wrapss the sessionPorvider to manage user sessions
export default function Providers({ children }: ProvidersProps) {
	return <SessionProvider>{children}</SessionProvider>;
}
