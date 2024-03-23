// import { validateRequest } from "./lib/auth";
// import {
// 	createContext,
// 	ReactNode,
// 	useContext,
// 	useEffect,
// 	useState,
// } from "react";

// interface User {
// 	id: string;
// }

// interface AuthContextType {
// 	user: User | null;
// 	isAuthenticated: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
// 	const [user, setUser] = useState<User | null>(null);
// 	const isAuthenticated = !!user;

// 	useEffect(() => {
// 		validateRequest().then((result) => {
// 			console.log("Result: ", result);
// 			if (result.user !== null) {
// 				setUser(result.user);
// 			}
// 		});
// 	}, []);

// 	return (
// 		<AuthContext.Provider value={{ user, isAuthenticated }}>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };

// export const useAuth = () => {
// 	const context = useContext(AuthContext);
// 	if (context === undefined) {
// 		throw new Error("useAuth must be used within an AuthProvider");
// 	}
// };
// import { getUser } from "@/app/lib/auth";

// export default async function AuthContext(): boolean {
// 	const result = await getUser();
// 	let isLoggedIn = false;
// 	let user = "there";
// 	const { username } = result;
// 	if (!username) {
// 		console.log(`User is not logged in`);
// 		isLoggedIn = false;
// 	}
// 	if (username) {
// 		const { email } = username;
// 		console.log(`Layout and trying to pass ${username}`);
// 		user = email;
// 	}
// 	return isLoggedIn;
// }

// export async function getAuthState() {
// 	try {
// 		const result = await getUser();
// 		const { username } = result;
// 		if (username) {
// 			const { email } = username;
// 			console.log(`AuthContext is logged in: ${email}`);
// 			return { isLoggedIn: true, user: email };
// 		}
// 	} catch (error) {
// 		console.error("Error fetching user: ", error);
// 	}
// 	console.log(`AuthContext is not logged in`);
// 	return { isLoggedIn: false, user: null };
// }
