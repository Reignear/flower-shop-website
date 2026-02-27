import { useForm } from "react-hook-form";

export const useAdminOrderPendingView = () => {
  const { register, handleSubmit } = useForm<{ remarks: string }>();
  return {
    register,
    handleSubmit,
  };
};
