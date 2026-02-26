import { insertFeedback } from "@/supabase/api/user.feedback.insert";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    //  onError: (error) => {
    //   console.error("Error inserting feedback:", error);
    // },
  });
};
