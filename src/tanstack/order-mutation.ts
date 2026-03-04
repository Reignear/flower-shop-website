import { insertOrder } from "@/supabase/api/user.order.insert";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "@/supabase/api/admin.order.update";
import { updateUserOrder } from "@/supabase/api/user.order.update";

export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};

// Admin update order status mutation
export const useAdminUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderByStatus"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orderById"] });
    },
  });
};

// User update order status mutation
export const useUserUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateUserOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orderByStatus"] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["orderById"] });
    },
  });
};
