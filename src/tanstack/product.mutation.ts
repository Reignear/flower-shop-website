import { insertProduct } from "@/supabase/api/admin.product.insert";
import { deleteProduct } from "@/supabase/api/admin.product.delete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProduct } from "@/supabase/api/admin.product.update";
import { updateProductStatus } from "@/supabase/api/admin.product.status.update";

export const useInsertProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    // onError: (error) => {
    //   console.error("Error inserting product:", error);
    // },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    // onError: (error) => {
    //   console.error("Error deleting product:", error);
    // },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    // onError: (error) => {
    //   console.error("Error updating product:", error);
    // },
  });
};

export const useUpdateProductStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProductStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    // onError: (error) => {
    //   console.error("Error updating product:", error);
    // },
  });
};
