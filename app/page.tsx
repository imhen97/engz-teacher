import Link from "next/link";
import { ArrowRight, BookOpen, Download, ShieldCheck, Video } from "lucide-react";
import { getPortalSnapshot } from "@/lib/data";

export default async function HomePage() {
  const snapshot = await getPortalSnapshot();

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
      <header className="flex items-center justify-between rounded-full border border-white/70 bg-white/70 px-5 py-3 shadow-panel backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-teal">Northstar English</p>
          <p className="text-sm text-slate-600">Teacher-led learning portal</p>
        </div>
        <div className="flex gap-3">
          <Link href="/sign-in" className="button-secondary">
            Sign In
          </Link>
          <Link href="/dashboard" className="button-primary">
            Open Portal
          </Link>
        </div>
      </header>

      <section className="grid flex-1 gap-8 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-coral/20 bg-coral/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-coral">
            Courses, lessons, resources
          </span>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-ink lg:text-7xl">
              Build an English classroom students can actually navigate.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-700">
              Teachers publish structured lessons with video and PDF materials. Students follow
              courses, revisit resources, and track announcements from one clean dashboard.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard" className="button-primary">
              Explore Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/admin" className="button-secondary">
              Teacher Admin
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="panel p-5">
              <p className="text-3xl font-semibold">{snapshot.courses.length}</p>
              <p className="mt-2 text-sm text-slate-600">Active courses</p>
            </div>
            <div className="panel p-5">
              <p className="text-3xl font-semibold">{snapshot.resources.length}</p>
              <p className="mt-2 text-sm text-slate-600">Downloadable resources</p>
            </div>
            <div className="panel p-5">
              <p className="text-3xl font-semibold">{snapshot.announcements.length}</p>
              <p className="mt-2 text-sm text-slate-600">Latest updates</p>
            </div>
          </div>
        </div>

        <div className="panel relative overflow-hidden p-6">
          <div className="absolute inset-x-8 top-8 h-36 rounded-full bg-teal/10 blur-3xl" />
          <div className="relative space-y-4">
            {[
              {
                icon: ShieldCheck,
                title: "Authentication",
                description: "Supabase auth with role-aware teacher and student access."
              },
              {
                icon: BookOpen,
                title: "Course system",
                description: "Organize lessons by level, topic, and release order."
              },
              {
                icon: Video,
                title: "Lesson delivery",
                description: "Stream video lessons and attach companion PDFs."
              },
              {
                icon: Download,
                title: "Resource library",
                description: "Central download space for worksheets, guides, and practice files."
              }
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-white/80 bg-white/80 p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-sand p-3 text-teal">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
