import { deleteFeedbackOrder } from "@/supabase/api/admin.feedback.order.delete";
import { updateFeedbackOrderStatus } from "@/supabase/api/admin.feedback.order.status.update";
import { deleteFeedbackProduct } from "@/supabase/api/admin.feedback.product.delete";
import { updateFeedbackProductStatus } from "@/supabase/api/admin.feedback.product.status.update";
import { insertFeedback } from "@/supabase/api/user.feedback.insert";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["feedbackProduct"] });
    },
  });
};

export const useUpdateFeedbackOrderStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFeedbackOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbackOrder"] });
    },
  });
};

export const useUpdateFeedbackProductStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFeedbackProductStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbackProduct"] });
    },
  });
};

export const useDeleteFeedbackOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFeedbackOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbackOrder"] });
    },
  });
};

export const useDeleteFeedbackProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFeedbackProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedbackProduct"] });
    },
  });
};
