export default function SystemOverview() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">📚 CleverMathematics System Overview</h1>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">🎯 Purpose</h2>
        <p className="text-gray-700">
          This platform allows teachers to assign PDF-based exercises to students, track progress, and give feedback — all in one personalized dashboard.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">🏗️ Architecture</h2>
        <ul className="list-disc pl-5 text-gray-700 space-y-1">
          <li><strong>Next.js App Router</strong> – for modern routing and server components</li>
          <li><strong>Supabase</strong> – handles auth, database, and file storage</li>
          <li><strong>Tailwind CSS</strong> – utility-first UI styling</li>
          <li><strong>shadcn/ui</strong> – clean, responsive components</li>
          <li><strong>Vercel</strong> – for continuous deployment & hosting</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">📦 Data Flow</h2>
        <p className="text-gray-700 mb-2">
          Teachers create and release questions stored as PDFs in Supabase storage. Metadata (e.g., subject, points, reference code) is saved in the database and displayed per student.
        </p>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Students log in via Supabase Auth</li>
          <li>View dashboard of assigned questions</li>
          <li>Open and submit answers (coming soon: fillable PDFs!)</li>
          <li>Teachers monitor progress & provide feedback</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">🌐 Future Plans</h2>
        <ul className="list-disc pl-5 text-gray-700">
          <li>Graph-based insights</li>
          <li>Fillable PDFs with autosave</li>
          <li>Student–teacher messaging</li>
          <li>AI feedback on answers</li>
        </ul>
      </section>
    </main>
  );
}
