import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpFormValidationUser } from "@/validation/validation-signup-user";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SignUpFormDataUser } from "@/utils/types";

export const useSignUpUser = () => {
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormDataUser>({
    resolver: zodResolver(signUpFormValidationUser),
  });

  return {
    loading,
    setLoading,
    navigate,
    register,
    handleSubmit,
    errors,
    signUpError,
    setSignUpError,
  };
};
