import { insertCategory } from "@/supabase/api/category.insert";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: insertCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// export const useUpdateProduct = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn:
//     })
// }
