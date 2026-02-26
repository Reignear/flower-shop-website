import { useQuery } from "@tanstack/react-query";
import { fetchCategory } from "@/supabase/api/fetch.category.ts";
import { fetchProduct } from "@/supabase/api/fetch.product";
import { fetchProductById } from "@/supabase/api/fetch.product.id";
import { fetchCart } from "@/supabase/api/fetch.cart";
import { fetchUserAddress } from "@/supabase/api/fetch.user.address";
import { fetchBillingMethod } from "@/supabase/api/fetch.billing.method";
import { fetchOrders } from "@/supabase/api/fetch.order";
import { fetchOrderByID } from "@/supabase/api/fetch.order.id";
import { fetchOrderByStatus } from "@/supabase/api/fetch.order.status";
import { fetchStats } from "@/supabase/api/fetch.landing";
import { fetchFeedback } from "@/supabase/api/fetch.feedback";

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
    queryFn: fetchProduct,
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

export const useCart = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useAddress = () => {
  return useQuery({
    queryKey: ["address"],
    queryFn: fetchUserAddress,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useBillingMethod = () => {
  return useQuery({
    queryKey: ["billingMethod"],
    queryFn: fetchBillingMethod,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useOrder = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useOrderById = (id: number) => {
  return useQuery({
    queryKey: ["orderById", id],
    queryFn: () => fetchOrderByID(id),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useOrderByStatus = (status: string) => {
  return useQuery({
    queryKey: ["orderByStatus", status],
    queryFn: () => fetchOrderByStatus(status),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useLanding = () => {
  return useQuery({
    queryKey: ["landing"],
    queryFn: fetchStats,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};

export const useFeedback = () => {
  return useQuery({
    queryKey: ["feedback"],
    queryFn: fetchFeedback,
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
