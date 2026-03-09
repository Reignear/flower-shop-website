import { supabase } from "@/supabase/client";
import { capitalizeFirstLetter } from "@/utils/capitalize";

export const fetchDeliveryData = async () => {
  const { data, error } = await supabase
    .from("orders_table")
    .select(
      "id, status, delivery_date, user:user_id (first_name, middle_name, last_name), shipping_address:user_address_id(address_line1, address_line2, barangay, city)",
    );
  if (error) {
    throw new Error(error.message);
  }
  return data?.map((order) => {
    const user = Array.isArray(order.user) ? order.user[0] : order.user;
    const address = Array.isArray(order.shipping_address)
      ? order.shipping_address[0]
      : order.shipping_address;
    return {
      id: order.id,
      status: order.status,
      date: order.delivery_date,
      user: user
        ? `${capitalizeFirstLetter(user.first_name)} ${capitalizeFirstLetter(user.middle_name)} ${capitalizeFirstLetter(user.last_name)}`
        : "Unknown",
      shipping_address: address
        ? `${address.address_line1}, ${address.address_line2}, ${address.barangay}, ${address.city}`
        : "No address provided",
    };
  });
};
