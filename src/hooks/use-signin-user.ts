import { signInFormValidationUser } from "@/validation/validation-signin-user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SignInFormData } from "@/utils/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignInUser = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormValidationUser),
  });
  return {
    loading,
    setLoading,
    register,
    handleSubmit,
    errors,
    navigate,
  };
};
