// app/supabase-provider.tsx
"use client";

import { useState } from "react";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/supabaseClient";

interface SupabaseProviderProps {
  children: React.ReactNode;
}

export default function SupabaseProvider({ children }: SupabaseProviderProps) {
  // Use the centralized client only
  const [supabaseClient] = useState(() => supabase);

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}
