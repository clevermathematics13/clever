// app/auth/callback/route.ts
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const cookieStore = cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )

  /* ---------- NEW: exchange the code for a session ---------- */
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  if (code) {
    await supabase.auth.exchangeCodeForSession(code)
  }
  /* ---------------------------------------------------------- */

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    return NextResponse.redirect(new URL('/student/dashboard', request.url))
  }

  return NextResponse.redirect(new URL('/login', request.url))
}
