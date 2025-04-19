// app/student/dashboard/page.tsx – student dashboard (client‑only)

import QuestionFilterClient from '@/components/QuestionFilterClient'

export default function StudentDashboard() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📘 Student Dashboard</h1>
      <QuestionFilterClient />
    </main>
  )
}
