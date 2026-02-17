import { useForm } from "react-hook-form";

export const useOrderPreview = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  return {
    register,
    handleSubmit,
    errors,
    watch,
    control
  };
};
