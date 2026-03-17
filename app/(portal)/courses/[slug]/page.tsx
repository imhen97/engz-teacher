import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, FileText, PlayCircle } from "lucide-react";
import { getCourseBySlug } from "@/lib/data";

type CoursePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section className="panel overflow-hidden p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-teal">{course.level}</p>
        <h1 className="mt-4 text-4xl font-semibold">{course.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{course.description}</p>
      </section>
      <section className="space-y-4">
        {course.lessons.map((lesson) => (
          <Link
            key={lesson.id}
            href={`/lessons/${lesson.id}`}
            className="panel flex flex-col gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-xl sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.25em] text-coral">
                Lesson {lesson.position.toString().padStart(2, "0")}
              </p>
              <h2 className="text-xl font-semibold">{lesson.title}</h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-600">{lesson.summary}</p>
            </div>
            <div className="flex gap-3 text-sm text-slate-500">
              <span className="inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2">
                <PlayCircle className="h-4 w-4 text-teal" />
                Video
              </span>
              {lesson.pdf_url ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-sand px-4 py-2">
                  <FileText className="h-4 w-4 text-coral" />
                  PDF
                </span>
              ) : null}
              <ChevronRight className="hidden h-5 w-5 sm:block" />
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
