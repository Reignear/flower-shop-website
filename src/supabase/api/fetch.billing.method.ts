import { supabase } from "@/supabase/client";

export const fetchBillingMethod = async () => {
  const { data } = await supabase.from("billing_method_table").select("*");
  return data;
};
