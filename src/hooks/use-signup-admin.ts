// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { signUpFormValidationAdmin } from "@/validation/validation-signup-admin";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import type { SignUpFormData } from "@/utils/types";

// export const useSignUpAdmin = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<SignUpFormData>({
//     resolver: zodResolver(signUpFormValidationAdmin),
//   });

//   return {
//     loading,
//     setLoading,
//     navigate,
//     register,
//     handleSubmit,
//     errors,
//   };
// };
