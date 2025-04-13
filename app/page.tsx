// app/page.tsx

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-4">📘 Welcome to CleverMathematics</h1>
      <p className="text-lg text-center max-w-md">
        A simple, secure platform for managing PDF-based assignments.
      </p>
      <a
        href="/login"
        className="mt-6 text-blue-600 underline hover:text-blue-800 transition"
      >
        Log in to get started
      </a>
    </main>
  )
}
