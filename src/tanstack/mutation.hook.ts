// import { insertCategory } from "@/supabase/api/admin.category.insert";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// export const useInsertCategory = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: insertCategory,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["categories"] });
//     },
//   });
// };
