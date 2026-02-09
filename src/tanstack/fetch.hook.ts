import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "@/supabase/api/fetch.category.ts";
import { fetchProduct } from "@/supabase/api/fetch.product";
import { fetchProductById } from "@/supabase/api/fetch.product.id";

export const useCategory = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategory,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useProduct = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProduct(),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useProductID = (productId: number) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: () => fetchProductById(productId),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
