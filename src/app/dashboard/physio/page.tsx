// import { validateRequest } from "@/app/lib/auth";
// import { redirect } from "next/navigation";
// import Navbar from "@/components/DesktopNavigation";
// import Footer from "@/components/Footer";
// import { FormState } from "@/app/actions/index";
// import { PhysioForm } from "@/components/PhysioForm";

// export default async function PhysioPage() {
//   let isLoggedIn = false;
//   const { user } = await validateRequest();

//   if (user === null){
//     console.log("User is not logged in and shouldn't have access")
//     redirect("/login")
//   }

//   const onFormAction = async (prevState: FormState, formData: FormData) => {
//     "use server"
//     // Call whatever server action here
//     console.log("Preparing to use the server action")
//   }
//   return (
//     <>
//     <Navbar isLoggedIn={isLoggedIn} />
//     <div className="container relative flex pt-20 flex-col items-centered justify-center lg:px-3">
//       <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[p350px">
//         <div className="flex flex-col items-center space-y-2 text-center bg-indigo-300 rounded py-10 shadow">
//           <PhysioForm onFormAction={onFormAction} />
//         </div>
//       </div>
//     </div>
//     <div className="min-h-80">Spacer div</div>
//     <Footer />
//     </>
//   )

// }

export default async function Physio() {
	console.log("Broken physio page is here");
	return <div>Broken physio page</div>;
}
