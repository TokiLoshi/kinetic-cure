import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getUser } from "@/app/lib/auth";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Kinetic Cure",
	description: "Workout and pt tracker",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>{children}</body>
		</html>
	);
}
