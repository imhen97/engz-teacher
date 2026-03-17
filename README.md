# English Learning Portal

A Next.js + Supabase + Tailwind learning portal for English students and teachers.

## Features

- Authentication with Supabase Auth
- Student dashboard
- Course catalog and lesson pages
- Video lesson playback and PDF downloads
- Resource library
- Announcement feed
- Admin panel for teachers to create courses, lessons, resources, and announcements

## Stack

- Next.js App Router
- Supabase Auth, Database, and Storage
- Tailwind CSS

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Run the app:

```bash
npm run dev
```

If Supabase env vars are missing, the app falls back to demo content so the UI still renders.

## Suggested Supabase Schema

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'student' check (role in ('student', 'teacher', 'admin'))
);

create table public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text not null,
  level text not null,
  cover_image text,
  published boolean not null default true,
  teacher_id uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  slug text not null,
  summary text,
  video_url text,
  pdf_url text,
  position int not null default 1,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null,
  file_url text not null,
  created_at timestamptz not null default now()
);

create table public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  audience text not null default 'all',
  published_at timestamptz not null default now()
);

create table public.enrollments (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id uuid not null references public.courses(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (student_id, course_id)
);
```

## Suggested Storage Buckets

- `lesson-videos`
- `lesson-pdfs`
- `resource-files`

For a simple teacher workflow, make these buckets readable to authenticated users and writable only by teachers/admins through policies.
