import { supabase } from "@/supabase/client";
import type { OrderItem } from "@/utils/interface";

export const fetchOrderByID = async (id: number) => {
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
        `*,
          user: user_table(*),
          order_items: order_items_table (*, product: product_id (*)),
          payment: payment_table (*, billing: billing_method_id (*)),
          shipping_address: user_address_table(*),
          feedback: order_feedback_table (*)
          
         `,
      )
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);
    }
    if (!data) return null;

    // If there are no order items, return the order as is
    if (!data.order_items || data.order_items.length === 0) return data;

    // Fetch signed URLs for all product images in the order items
    const itemsWithImages = await Promise.all(
      data.order_items.map(async (item: OrderItem) => {
        const { data: image_url } = await supabase.storage
          .from("product-images")
          .createSignedUrl(item.product.image, 60 * 60 * 24 * 7);
        return {
          ...item,
          product: {
            ...item.product,
            image_url: image_url?.signedUrl || "",
          },
        };
      }),
    );
    return {
      ...data,
      order_items: itemsWithImages,
    };
  }

  // For regular users, only fetch their own orders
  if (authenticated?.role === "user") {
    const { data, error } = await supabase
      .from("orders_table")
      .select(
        `*,
          order_items: order_items_table (*, product: product_id (*)),
          payment: payment_table (*, billing: billing_method_id (*)),
          shipping_address: user_address_table(*),
          feedback: order_feedback_table (*)
         `,
      )
      .eq("user_id", user.id)
      .eq("id", id)
      .single();
    if (error) {
      console.log(error);
    }
    if (!data) return null;

    if (!data.order_items || data.order_items.length === 0) return data;

    const itemsWithImages = await Promise.all(
      data.order_items.map(async (item: OrderItem) => {
        const { data: image_url } = await supabase.storage
          .from("product-images")
          .createSignedUrl(item.product.image, 60 * 60 * 24 * 7);
        return {
          ...item,
          product: {
            ...item.product,
            image_url: image_url?.signedUrl || "",
          },
        };
      }),
    );
    return {
      ...data,
      order_items: itemsWithImages,
    };
  }
  return null;
};
