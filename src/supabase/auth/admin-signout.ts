import { supabase } from "@/supabase/client";
export async function AdminSignOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}
