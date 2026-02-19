import { supabase } from "@/supabase/client";
import type { Cart } from "@/utils/interface";

export const insertOrder = async ({
  data,
  shipping_fee,
  total,
  delivery_date,
  billing_method_id,
  user_address_id,
}: {
  data: Cart[];
  shipping_fee: number;
  total: number;
  delivery_date: string;
  billing_method_id: number;
  user_address_id: number;
}) => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: order, error: errorOrders } = await supabase
    .from("orders_table")
    .insert({
      user_id: user?.id,
      order_date: new Date().toISOString(),
      total_amount: total,
      status: "pending",
      delivery_date: delivery_date, // Set delivery date to current date for now, can be updated later
      user_address_id: user_address_id,
      shipping_fee: shipping_fee,
      reference_number: `ORD-${Math.floor(Math.random() * 1000000)}`, // Generate a random reference number
    })
    .select("*")
    .single();

  if (errorOrders) {
    console.log(errorOrders);
    return { order: null, error: errorOrders };
  }

  // AS FOR NOW IT ONLY ACCEPT COD, BUT IN THE FUTURE WE CAN ADD OTHER PAYMENT METHODS
  const { error: errorPayment } = await supabase.from("payment_table").insert({
    billing_method_id: billing_method_id,
    order_id: order.id,
    reference_no: 0,
    amount: total,
    currency: "PHP",
    status: "completed",
    payment_gateway: "COD",
  });

  if (errorPayment) {
    console.log(errorPayment);
  }

  await Promise.all(
    data.map(async (item) => {
      const { data: orderItems, error: errorOrderItems } = await supabase
        .from("order_items_table")
        .insert({
          order_id: order.id,
          product_id: item.product_id.id,
          quantity: item.quantity,
          unit_price: item.product_id.price,
          sub_total: item.quantity * item.product_id.price,
        });

      if (errorOrderItems) {
        console.error("Order Items Error:", errorOrderItems);
      }
      return { orderItems, error: errorOrderItems };
    }),
  );
  return { order };
};
