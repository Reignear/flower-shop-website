import { deleteCart } from "@/supabase/api/user.cart.delete";
import { insertCart } from "@/supabase/api/user.cart.insert";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Error inserting cart item:", error);
    },
  });
};

export const useUpdateCart = () => {};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
