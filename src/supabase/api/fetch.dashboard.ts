/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/supabase/client";
export const fetchDashboardData = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  const { data: authenticated } = await supabase
    .from("user_table")
    .select("role")
    .eq("id", user.id)
    .single();

  // Only fetch dashboard data for admin users
  if (authenticated?.role === "admin") {
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
  }
  // Fetch dashboard data for regular users (e.g., their own orders and feedback)
  if (authenticated?.role === "user") {
    const activeUser = await supabase
      .from("user_table")
      .select("first_name, middle_name, last_name")
      .eq("id", user.id)
      .single();

    const orderFeedback = await supabase
      .from("order_feedback_table")
      .select("id, rating", { count: "exact" })
      .eq("user_id", user.id);

    const productFeedback = await supabase
      .from("product_feedback_table")
      .select("id, rating", { count: "exact" })
      .eq("user_id", user.id);

    const orders = supabase
      .from("orders_table")
      .select(
        `
      created_at, 
      id, 
      total_amount,
      order_items_table(
        id, 
        product_id(
          id, 
          category_id(
            id,
            name
          )
        )
      )
    `,
      )
      .order("created_at", { ascending: false })
      .eq("status", "delivered")
      .eq("user_id", user.id);

    const [
      activeUserResult,
      ordersResult,
      orderFeedbackResult,
      productFeedbackResult,
    ] = await Promise.all([activeUser, orders, orderFeedback, productFeedback]);

    const averageOrderFeedback =
      (orderFeedbackResult.data?.reduce(
        (sum, feedback) => sum + (feedback.rating || 0),
        0,
      ) || 0) / (orderFeedbackResult.count || 1);

    const averageProductFeedback =
      (productFeedbackResult.data?.reduce(
        (sum, feedback) => sum + (feedback.rating || 0),
        0,
      ) || 0) / (productFeedbackResult.count || 1);

    const totalOrderAmount =
      ordersResult.data?.reduce(
        (sum, order) => sum + (order.total_amount || 0),
        0,
      ) || 0;

    const categoryCount: Record<string, number> = {};
    ordersResult.data?.forEach((order) => {
      order.order_items_table?.forEach((item: any) => {
        const categoryName = item.product_id?.category_id?.name;
        if (categoryName) {
          categoryCount[categoryName] = (categoryCount[categoryName] || 0) + 1;
        }
      });
    });
    const categoryDistribution = Object.entries(categoryCount).map(
      ([label, count]) => ({
        label,
        value: count,
      }),
    );

    const totalAmountOrderPerMonth: number[] = Array(12).fill(0);
    ordersResult.data?.forEach((order) => {
      const month = new Date(order.created_at).getMonth();
      totalAmountOrderPerMonth[month] += order.total_amount || 0;
    });

    return {
      activeUser: activeUserResult.data,
      orders: ordersResult.data,
      totalAmount: totalOrderAmount,
      averageOrderFeedback,
      averageProductFeedback,
      categoryDistribution,
      totalAmountOrderPerMonth,
    };
  }
};
