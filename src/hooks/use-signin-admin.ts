import { signInFormValidationAdmin } from "@/validation/validation-signin-admin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SignInFormData } from "@/utils/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useSignInAdmin = () => {
  const [signinError, setSignInError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInFormValidationAdmin),
  });
  return {
    loading,
    setLoading,
    register,
    handleSubmit,
    errors,
    navigate,
    signinError,
    setSignInError
  };
};
