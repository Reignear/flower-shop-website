import { supabase } from "@/supabase/client";
export async function UserSignOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}
