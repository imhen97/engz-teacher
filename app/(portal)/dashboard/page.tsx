import Link from "next/link";
import { ArrowRight, Bell, BookMarked, Download, PlayCircle } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { getPortalSnapshot } from "@/lib/data";

export default async function DashboardPage() {
  const snapshot = await getPortalSnapshot();
  const featuredCourse = snapshot.courses[0];
  const latestAnnouncement = snapshot.announcements[0];

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="panel overflow-hidden p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-teal">Student dashboard</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight">
            Keep classes, downloads, and teacher updates in one calm workspace.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Continue your current course, review PDFs, and check fresh announcements without
            searching through chat threads or email.
          </p>
          {featuredCourse ? (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={`/courses/${featuredCourse.slug}`} className="button-primary">
                Open current course
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/resources" className="button-secondary">
                Browse resources
              </Link>
            </div>
          ) : null}
        </div>
        <div className="grid gap-4">
          <StatCard icon={BookMarked} label="Published courses" value={String(snapshot.courses.length)} />
          <StatCard icon={PlayCircle} label="Available lessons" value={String(snapshot.lessons.length)} />
          <StatCard icon={Download} label="Resource files" value={String(snapshot.resources.length)} />
          <StatCard icon={Bell} label="Announcements" value={String(snapshot.announcements.length)} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <SectionHeading
            eyebrow="Courses"
            title="Continue learning"
            action={{ href: "/courses", label: "See all courses" }}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {snapshot.courses.slice(0, 4).map((course) => (
              <CourseCard key={course.id} course={course} lessonCount={course.lessons.length} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SectionHeading
            eyebrow="Announcements"
            title="Latest teacher update"
            action={{ href: "/announcements", label: "View all" }}
          />
          {latestAnnouncement ? (
            <article className="panel p-6">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-coral">
                <span>{latestAnnouncement.audience}</span>
                <span>{new Date(latestAnnouncement.published_at).toLocaleDateString()}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold">{latestAnnouncement.title}</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                {latestAnnouncement.body}
              </p>
            </article>
          ) : null}
        </div>
      </section>
    </div>
  );
}
