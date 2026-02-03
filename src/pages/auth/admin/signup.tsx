// import { Button } from "@/components/ui/button";
// import {
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   Card,
//   CardContent,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Link } from "react-router-dom";
// import { SignUpAdmin } from "@/supabase/auth/admin-signup";
// import { LoaderCircle } from "lucide-react";
// import { useSignUpAdmin } from "@/hooks/use-signup-admin";
// import type { SignUpFormData } from "@/utils/types";

// export default function SignUp() {
//   const { loading, setLoading, navigate, register, handleSubmit, errors } =
//     useSignUpAdmin();

//   const submitForm = async (data: SignUpFormData) => {
//     try {
//       setLoading(true);
//       await SignUpAdmin(data);
//       navigate("/admin/signin");
//     } catch (error) {
//       console.error("Error during admin sign up:", error);
//       setLoading(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-4">
//       <div className="w-full max-w-lg min-w-md space-y-6">
//         <div className="flex flex-col items-center gap-4">
//           <h1 className="text-3xl font-bold tracking-tight ">
//             CELESTIAL BLOOM
//           </h1>
//         </div>

//         <Card className="border-gray-200 shadow-sm">
//           <CardHeader className="space-y-2">
//             <CardTitle className="text-2xl">Sign Up</CardTitle>
//             <CardDescription>
//               Enter your information to access dashboard
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form className="space-y-4" onSubmit={handleSubmit(submitForm)}>
//               <p className="text-gray-600 text-sm mb-2">Personal Information</p>
//               <div className="grid grid-cols-2 gap-2">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="firstName"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     First Name
//                   </label>
//                   <Input {...register("firstName")} />
//                   {errors.firstName && (
//                     <p className="text-red-500 text-xs">
//                       {errors.firstName.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="middleName"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Middle Name
//                   </label>
//                   <Input {...register("middleName")} />
//                   {errors.middleName && (
//                     <p className="text-red-500 text-xs">
//                       {errors.middleName.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="lastName"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Last Name
//                   </label>
//                   <Input {...register("lastName")} />
//                   {errors.lastName && (
//                     <p className="text-red-500 text-xs">
//                       {errors.lastName.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="birthdate"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Birthdate
//                   </label>
//                   <Input type="date" {...register("birthdate")} />
//                   {errors.birthdate && (
//                     <p className="text-red-500 text-xs">
//                       {errors.birthdate.message}
//                     </p>
//                   )}
//                 </div>
//               </div>
//               <p className="text-gray-600 text-sm mb-2">Account Information</p>
//               <div className="space-y-2">
//                 <label
//                   htmlFor="email"
//                   className="text-sm font-medium text-gray-700"
//                 >
//                   Email Address
//                 </label>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   className="border-gray-200"
//                   {...register("email")}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-xs">{errors.email.message}</p>
//                 )}
//               </div>
//               <div className="grid grid-cols-2 gap-2">
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="password"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Password
//                   </label>
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="••••••••"
//                     className="border-gray-200"
//                     {...register("password")}
//                   />
//                   {errors.password && (
//                     <p className="text-red-500 text-xs">
//                       {errors.password.message}
//                     </p>
//                   )}
//                 </div>
//                 <div className="space-y-2">
//                   <label
//                     htmlFor="password"
//                     className="text-sm font-medium text-gray-700"
//                   >
//                     Confirm Password
//                   </label>
//                   <Input
//                     id="password"
//                     type="password"
//                     placeholder="••••••••"
//                     className="border-gray-200"
//                     {...register("confirmPassword")}
//                   />
//                   {errors.confirmPassword && (
//                     <p className="text-red-500 text-xs">
//                       {errors.confirmPassword.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-black hover:bg-gray-800 text-white rounded-full "
//               >
//                 Sign Up {loading && <LoaderCircle className="animate-spin" />}
//               </Button>
//             </form>

//             <div className="mt-6 space-y-3 border-t border-gray-200 pt-6">
//               <p className="text-center text-sm text-gray-600">
//                 Already have an account?{" "}
//                 <Link
//                   to="/admin/signin"
//                   className="text-black font-semibold hover:text-gray-700"
//                 >
//                   Sign In
//                 </Link>
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
