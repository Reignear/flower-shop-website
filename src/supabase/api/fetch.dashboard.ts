import { supabase } from "@/supabase/client";

export const fetchDashboardData = async () => {
  const totalRevenue = supabase
    .from("orders_table")
    .select("total_amount")
    .eq("status", "delivered");

  const totalOrders = supabase
    .from("orders_table")
    .select("id", { count: "exact" })
    .eq("status", "delivered");

  const totalCustomers = supabase
    .from("user_table")
    .select("id", { count: "exact" })
    .eq("role", "user");

  const orderFeedback = supabase
    .from("order_feedback_table")
    .select("id", { count: "exact" });

  const productFeedback = supabase
    .from("product_feedback_table")
    .select("id", { count: "exact" });

  // Execute all queries
  const [
    revenueResult,
    ordersResult,
    customersResult,
    orderFeedbackResult,
    productFeedbackResult,
  ] = await Promise.all([
    totalRevenue,
    totalOrders,
    totalCustomers,
    orderFeedback,
    productFeedback,
  ]);

  // Calculate total feedback count
  const totalFeedbackCount =
    (orderFeedbackResult.count || 0) + (productFeedbackResult.count || 0);

  // Calculate total revenue
  const totalRevenueAmount =
    revenueResult.data?.reduce(
      (sum, order) => sum + (order.total_amount || 0),
      0,
    ) || 0;

  return {
    totalRevenue: totalRevenueAmount,
    totalOrders: ordersResult.count || 0,
    totalCustomers: customersResult.count || 0,
    totalFeedback: totalFeedbackCount,
  };
};
