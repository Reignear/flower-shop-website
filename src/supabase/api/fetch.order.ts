import { supabase } from "@/supabase/client";
import type { OrderItem } from "@/utils/interface";

export const fetchOrders = async () => {
  // Get the currently authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }
  // Check the user's role to determine if they are an admin or regular user
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
        ` reference_number,
          order_date,
          status,
          total_amount,
          delivery_date,
          user_table (first_name, middle_name, last_name),
          user_address_table(barangay, city)
         `,
      )
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
    }
    return data;
  }

  // For regular users, only fetch their own orders
  if (authenticated?.role === "user") {
    const { data, error } = await supabase
      .from("orders_table")
      .select(
        `*,
          order_items_table (*, product_id (*)),
          payment_table (*),
          user_address_table(*)
         `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (error) {
      console.log(error);
    }

    const formattedData = await Promise.all(
      data?.map(async (order) => {
        // If there are no order items, return the order as is
        if (!order.order_items_table || order.order_items_table.length === 0)
          return order;

        // Fetch signed URLs for all product images in the order items
        const itemsWithImages = await Promise.all(
          order.order_items_table.map(async (item: OrderItem) => {
            const { data: image_url } = await supabase.storage
              .from("product-images")
              .createSignedUrl(item.product_id.image, 60 * 60 * 24 * 7);
            // Return the order item with the image URL included in the product details
            return {
              ...item,
              product_id: {
                ...item.product_id,
                image_url: image_url?.signedUrl || "",
              },
            };
          }),
        );
        // Return the order with the updated order items that include image URLs
        return {
          ...order,
          order_items_table: itemsWithImages,
        };
      }) ?? [],
    );

    return formattedData;
  }
  return [];
};
