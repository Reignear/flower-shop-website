import { insertOrder } from "@/supabase/api/user.order.insert";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    // onError: (error) => {
    //   console.error("Error inserting order:", error);
    // },
  });
};

 