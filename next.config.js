/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add any additional configuration options here.
};

module.exports = nextConfig;

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Supabase env variables are missing! Check your .env.local file.')
}

