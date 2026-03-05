

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/supabase/api/user.profile.update";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};