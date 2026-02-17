import { supabase } from "@/supabase/client";

export const fetchOrders = async () => {
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

  // For admin users, fetch all orders with user details
  if (authenticated?.role === "admin") {
    const { data, error } = await supabase
      .from("orders_table")
      .select(
        `*,
          user_table (*),
          order_items_table (*, product_id (*)),
          payment_table (*)
         `,
      )
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
    }
    return { data };
  }
  // For regular users, only fetch their own orders
  if (authenticated?.role === "user") {
    const { data, error } = await supabase
      .from("orders_table")
      .select(
        `*,
          order_items_table (*, product_id (*)),
          payment_table (*)
         `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
    }
    console.log("Fetched orders for user:", data);
    return { data };
  }
};
