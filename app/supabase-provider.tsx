'use client'

import { useState } from 'react'
import {
  createBrowserSupabaseClient,
  SessionContextProvider
} from '@supabase/auth-helpers-react'

interface SupabaseProviderProps {
  children: React.ReactNode
}

export default function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient()
  )

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
  )
}
