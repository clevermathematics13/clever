// app/student/dashboard/page.tsx
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { redirect } from 'next/navigation';

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
        set() {}, // No-op
        remove() {}, // No-op
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: questions, error } = await supabase
    .from('questions')
    .select('id, title, pdf_url, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching questions:', error.message);
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">📘 Student Dashboard</h1>
        <p className="text-red-500">Failed to load questions.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">📘 Student Dashboard</h1>

      {questions?.length ? (
        <ul className="space-y-4">
          {questions.map((q) => (
            <li key={q.id} className="border p-4 rounded shadow-sm">
              <h2 className="text-lg font-semibold text-blue-700">{q.title}</h2>
              <a
                href={q.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-green-600 underline"
              >
                View PDF
              </a>
              <p className="text-xs text-gray-500 mt-1">Assigned: {new Date(q.created_at).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No questions assigned yet.</p>
      )}
    </main>
  );
}
