import { useForm } from "react-hook-form";

export const useAdminOrderPendingView = () => {
  const { register, handleSubmit } = useForm<{reason: string}>();
  return {
    register,
    handleSubmit,
  };
};
