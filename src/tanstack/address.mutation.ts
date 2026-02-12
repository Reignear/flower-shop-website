import { useMutation, useQueryClient } from "@tanstack/react-query";
import { insertAddress } from "@/supabase/api/user.address.insert";

export const useInsertAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
    onError: (error) => {
      console.error("Error inserting address:", error);
    },
  });
};
