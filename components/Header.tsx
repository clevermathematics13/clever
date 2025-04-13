// components/Header.tsx
'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [supabase] = useState(() => createBrowserClient());
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
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
    <header className="flex justify-between items-center p-4 border-b border-gray-700">
      <div className="text-blue-400 font-semibold text-xl">📘 CleverMathematics</div>
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="text-sm text-red-400 hover:text-red-200 transition"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="text-sm text-green-400 hover:text-green-200 transition"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
