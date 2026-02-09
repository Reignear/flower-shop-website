import { deleteCategory } from "@/supabase/api/admin.category.delete";
import { insertCategory } from "@/supabase/api/admin.category.insert";
import { updateCategory } from "@/supabase/api/admin.category.update";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: insertCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("Error inserting category:", error);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("Error inserting category:", error);
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      console.error("Error deleting category:", error);
    },
  });
};
