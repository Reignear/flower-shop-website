import React from "react";
import { useForm } from "react-hook-form";

export const useOrderPreview = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return {
    register,
    handleSubmit,
    errors,
    watch,
    date,
    setDate,
    control
  };
};
