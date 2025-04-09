'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
// ⬇️ Import from @supabase/auth-helpers-react, not nextjs
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-react'

export default function LoginPage() {
  const router = useRouter()

  // Local form state
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  // Create a single supabase browser client
  const [supabase] = useState(() => createBrowserSupabaseClient())

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Now call signInWithPassword
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      // Redirect to home page on success
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label htmlFor="email" className="block mb-2">
          <span className="text-gray-700">Email</span>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="you@example.com"
          />
        </label>
        <label htmlFor="password" className="block mb-4">
          <span className="text-gray-700">Password</span>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border rounded"
            placeholder="********"
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Log In
        </button>
      </form>
    </div>
  )
}
