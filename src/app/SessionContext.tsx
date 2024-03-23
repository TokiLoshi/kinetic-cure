// https://github.com/Mriganka5137/lucia-mongoose/blob/main/providers/SessionProvider.tsx
// "use client";
// import { Session, User } from "lucia";
// import { createContext, useContext, useState, useEffect } from "react";
// import { getUser } from "@/app/lib/auth";

// interface SessionProviderProps {
// 	user: User | null;
// 	session: Session | null;
// }

// const SessionContext = createContext<SessionProviderProps | null>(null);

// export const SessionProvider = ({
// 	children,
// 	value,
// }: {
// 	children: React.ReactNode;
// 	value: SessionProviderProps;
// }) => {
// 	return (
// 		<SessionContext.Provider value={value}>{children}</SessionContext.Provider>
// 	);
// };

// export const useSession = () => {
// 	const sessionContext = useContext(SessionContext);
// 	if (!sessionContext) {
// 		throw new Error("useSession must be used within a SessionProvider");
// 	}
// 	return sessionContext;
// };

// const AuthContext = createContext<boolean | null>(null);

// export function useAuth() {
// 	return useContext(AuthContext);
// }

// export function AuthProvider({ children }) {
// 	const [isLoggedIn, setIsLoggedIn] = useState(false);
// 	useEffect(() => {
// 		async function getUser() {
// 			const result = await getUser();
// 			if (!result.username) {
// 				setIsLoggedIn(false);
// 			} else {
// 				setIsLoggedIn(true);
// 			}
// 		}
// 	}, []);
// 	return (
// 		<AuthContext.Provider value={isLoggedIn}>{children}</AuthContext.Provider>
// 	);
// }
