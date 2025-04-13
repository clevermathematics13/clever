// app/student/dashboard/page.tsx
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { redirect } from 'next/navigation';
import QuestionFilterClient from '@/components/QuestionFilterClient';

export default async function StudentDashboard() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set() {},
        remove() {},
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📘 Student Dashboard</h1>
      <QuestionFilterClient />
    </main>
  );
}
