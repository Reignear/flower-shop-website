/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/supabase/client";

export const fetchAnalyticsData = async () => {
  const order = supabase
    .from("orders_table")
    .select(
      `
      created_at, 
      id, 
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
    .eq("status", "delivered");

  const user = supabase
    .from("user_table")
    .select("created_at")
    .eq("role", "user");

  const [orderResult, userResults] = await Promise.all([order, user]);

  if (orderResult.error) {
    return {
      orderPerMonth: [],
      categoryDistribution: [],
      userCount: 0,
    };
  }
  if (userResults.error) {
    return {
      orderPerMonth: [],
      categoryDistribution: [],
      userCount: 0,
    };
  }

  // Transform data to match desired format
  const categoryCount: Record<string, number> = {};
  orderResult.data?.forEach((order) => {
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

  // Calculate order count per month
  const orderPerMonth: number[] = Array(12).fill(0);
  orderResult.data?.forEach((order) => {
    const month = new Date(order.created_at).getMonth();
    orderPerMonth[month] += 1;
  });

  //  Calculate user count per month
  const userCountPerMonth: number[] = Array(12).fill(0);
  userResults.data?.forEach((user) => {
    const month = new Date(user.created_at).getMonth();
    userCountPerMonth[month] += 1;
  });

  return {
    orderPerMonth,
    categoryDistribution,
    userCountPerMonth,
  };
};
