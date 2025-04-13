# CleverMathematics System Overview

## 🎯 Purpose
This platform allows teachers to assign PDF-based exercises to students, track progress, and give feedback — all in one personalized dashboard.

## 🏗️ Architecture
- **Next.js App Router** – for modern routing and server components
- **Supabase** – handles auth, database, and file storage
- **Tailwind CSS** – utility-first UI styling
- **shadcn/ui** – clean, responsive components
- **Vercel** – for continuous deployment & hosting

## 📦 Data Flow
Teachers create and release questions stored as PDFs in Supabase storage. Metadata (e.g., subject, points, reference code) is saved in the database and displayed per student.

- Students log in via Supabase Auth
- View dashboard of assigned questions
- Open and submit answers (coming soon: fillable PDFs!)
- Teachers monitor progress & provide feedback

## 🌐 Future Plans
- Graph-based insights
- Fillable PDFs with autosave
- Student–teacher messaging
- AI feedback on answers
