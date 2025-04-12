// components/Header.tsx
import Link from "next/link"
import LogoutButton from "@/components/LogoutButton"
import { cookies } from "next/headers"
import { createServerClient } from "@supabase/ssr"

export default async function Header() {
  const cookieStore = cookies()

  /* Read‑only Supabase client — no cookie writes */
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { autoRefreshToken: false, persistSession: false }, // 👈 disable writes
      cookies: {
        /* only READ the cookie */
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        /* dummy no‑op writers (never called because autoRefresh is off) */
        set() {},
        remove() {},
      },
    }
  )

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <Link href="/" className="text-xl font-semibold">
        CleverMathematics
      </Link>

      {session ? (
        <LogoutButton /> /* logged‑in */
      ) : (
        <Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          Login
        </Link>
      )}
    </header>
  )
}
