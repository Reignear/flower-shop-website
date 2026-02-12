import {
  insertGcash,
  insertPayPal,
  insertBankTransfer,
  insertCOD,
} from "@/supabase/api/admin.billing.method.insert";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export const useInsertGcash = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertGcash,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billingMethod"] });
    },
    onError: (error) => {
      console.error("Error inserting gcash billing method", error);
    },
  });
};

export const useInsertPayPal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertPayPal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billingMethod"] });
    },
    onError: (error) => {
      console.error("Error inserting paypal billing method", error);
    },
  });
};

export const useInsertBankTransfer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertBankTransfer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billingMethod"] });
    },
    onError: (error) => {
      console.error("Error inserting bank transfer billing method:", error);
    },
  });
};
export const useInsertCOD = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertCOD,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["billingMethod"] });
    },
    onError: (error) => {
      console.error("Error inserting cod billing method", error);
    },
  });
};
