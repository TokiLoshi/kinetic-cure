import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export default function AddWorkoutLayout({ children }) {
	return (
		<>
			<NavBar />
			<section>{children}</section>
			<Footer />
		</>
	);
}
