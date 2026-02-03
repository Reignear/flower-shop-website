import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "@/supabase/api/category.select.ts";
import { fetchProduct } from "@/supabase/api/product.select";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProduct(),
    staleTime: 5 * 60 * 1000,
  });
};
