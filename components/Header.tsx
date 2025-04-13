// components/Header.tsx
'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
      setLoading(false);
    };

    getUser();
  }, [supabase]);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="text-blue-600 font-semibold text-xl">📘 CleverMathematics</div>
      <div>
        {!loading && user ? (
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-300 transition"
          >
            Logout
          </button>
        ) : (
          !loading && (
            <button
              onClick={handleLogin}
              className="text-sm text-green-600 hover:text-green-400 transition"
            >
              Login
            </button>
          )
        )}
      </div>
    </header>
  );
}
