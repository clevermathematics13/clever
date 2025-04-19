// app/login/page.tsx

import Image from 'next/image'
import GoogleLogin from '@/components/auth/GoogleLogin'

export const metadata = {
  title: 'CleverMathematics — Login',
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <Image
        src="/CleverMathematics-logo.png"
        alt="CleverMathematics Logo"
        width={300}
        height={100}
        style={{ height: 'auto', width: 'auto' }}
        priority
      />

      <h1 className="text-2xl font-bold mt-6">
        Welcome to CleverMathematics
      </h1>
      <p className="text-center mt-2 mb-6">
        Please sign in with your school Google account to continue.
      </p>

      {/* only this part is interactive */}
      <GoogleLogin />
    </main>
  )
}
