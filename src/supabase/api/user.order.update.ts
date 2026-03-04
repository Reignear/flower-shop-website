import { supabase } from "@/supabase/client";
export const updateUserOrder = async ({
  id,
  status,
}: {
  id: number;
  status: string;
}) => {
  const { data, error } = await supabase
    .from("orders_table")
    .update({ status: status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
