// components/auth/GoogleLogin.tsx
"use client"

import { supabaseBrowser } from "@/lib/supabaseBrowser"

export default function GoogleLogin() {
  const supabase = supabaseBrowser

  const handleLogin = async () => {
    const redirectHost =
      process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${redirectHost}/auth/callback`, // 👈 always safe
      },
    })

    if (error) {
      console.error("Login error:", error.message)
      alert("Login failed: " + error.message)
    }
  }

  return (
    <button
      onClick={handleLogin}
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md transition"
    >
      Sign in with Google
    </button>
  )
}
