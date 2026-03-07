import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "@/supabase/api/user.profile.update";
import { insertAddress } from "@/supabase/api/user.address.insert";
import { deleteUserAddress } from "@/supabase/api/user.address.delete";
import { updateUserAddress } from "@/supabase/api/user.address.update";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useInsertAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });
};

export const useDeleteAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });
};

export const useUpdateAddress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });
};
