import { useState } from "react";
import { useForm } from "react-hook-form";

export const useUserOrderFeedback = () => {
  const [orderFeedback, setOrderFeedback] = useState("");
  const [orderRating, setOrderRating] = useState(0);
  const [productFeedback, setProductFeedback] = useState<{
    [id: number]: { rating: number; feedback: string };
  }>({});
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      orderRating: 0,
      orderFeedback: "",
      productFeedback: {},
    },
  });
  return {
    orderFeedback,
    setOrderFeedback,
    orderRating,
    setOrderRating,
    productFeedback,
    setProductFeedback,
    handleSubmit,
    reset,
    control,
    errors,
    register,
  };
};
