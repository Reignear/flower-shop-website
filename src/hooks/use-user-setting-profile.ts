import { useForm } from "react-hook-form";

export const useUserSettingProfile = () => {
  const { register, handleSubmit } = useForm();
  return {
    register,
    handleSubmit,
  };
};
