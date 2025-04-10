'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

interface SupabaseProviderProps {
  children: React.ReactNode;
}

// Ensure these environment variables are set in your .env.local or Codespaces environment.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export default function SupabaseProvider({ children }: SupabaseProviderProps) {
  // Manually create the Supabase client.
  const [supabaseClient] = useState(() =>
    createClient(supabaseUrl, supabaseAnonKey)
  );

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  );
}
