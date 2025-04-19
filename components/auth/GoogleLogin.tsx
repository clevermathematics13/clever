// components/auth/GoogleLogin.tsx
'use client'

import { useRouter } from 'next/navigation'
import { supabaseBrowser } from '@/lib/supabaseBrowser'

export default function GoogleLogin() {
  const router = useRouter()

  const handleLogin = async () => {
    const { error } = await supabaseBrowser.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/auth/callback` }
    })
    if (error) console.error('Login error:', error.message)
  }

  return (
    <button
      onClick={handleLogin}
      className="bg-white text-black px-4 py-2 rounded shadow hover:shadow-lg transition"
    >
      Sign in with Google
    </button>
  )
}
