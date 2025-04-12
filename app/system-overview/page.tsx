// app/system-overview/page.tsx
import React from "react";

export default function SystemOverviewPage() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">📕 CleverMathematics System Overview</h1>

      <h2 className="text-xl font-semibold">🎯 Purpose</h2>
      <p>
        This platform allows teachers to assign PDF-based exercises to students,
        track progress, and give feedback — all in one personalized dashboard.
      </p>

      <h2 className="text-xl font-semibold">🧱 Architecture</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Next.js App Router</strong> – for modern routing and server components</li>
        <li><strong>Supabase</strong> – handles auth, database, and file storage</li>
        <li><strong>Tailwind CSS</strong> – utility-first UI styling</li>
        <li><strong>shadcn/ui</strong> – clean, responsive components</li>
        <li><strong>Vercel</strong> – for continuous deployment & hosting</li>
      </ul>

      <h2 className="text-xl font-semibold">🧠 Data Flow</h2>
      <ol className="list-decimal pl-6 space-y-1">
        <li>Teachers create and release questions stored as PDFs in Supabase storage. Metadata (e.g., subject, points, reference code) is saved in the database and displayed per student.</li>
        <li>Students log in via Supabase Auth</li>
        <li>View dashboard of assigned questions</li>
        <li>Open and submit answers (coming soon: fillable PDFs!)</li>
        <li>Teachers monitor progress & provide feedback</li>
      </ol>

      <h2 className="text-xl font-semibold">🔮 Future Plans</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li>Graph-based insights</li>
        <li>Fillable PDFs with autosave</li>
        <li>Student–teacher messaging</li>
        <li>AI feedback on answers</li>
      </ul>
    </main>
  );
}
