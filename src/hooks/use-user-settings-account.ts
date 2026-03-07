import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const useUserSettingsAccount = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm();
  const [confirmText, setConfirmText] = useState("");
  return {
    handleSubmit,
    confirmText,
    setConfirmText,
    navigate,
  };
};
