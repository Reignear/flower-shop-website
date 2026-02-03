import { useState, useEffect } from "react";
import { supabase } from "@/supabase/client";
import type { UserRole } from "@/utils/types";
import type { Session, User } from "@supabase/supabase-js";
import { AuthContext } from "@/hooks/use-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: profile } = await supabase
          .from("user_table")
          .select("role")
          .eq("id", session.user.id)
          .maybeSingle();
        setRole(profile?.role ?? null);
      } else {
        setRole(null);
      }
      setLoading(false);
    };
    initSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, role, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
