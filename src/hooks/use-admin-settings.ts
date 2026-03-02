import type { SignUpFormData } from "@/utils/types";
import { signUpFormValidationAdmin } from "@/validation/validation-signup-admin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useAdminSettings = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormValidationAdmin),
  });
  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    setIsLoading,
    navigate,
    reset,
  };
};
