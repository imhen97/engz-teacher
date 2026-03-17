import Link from "next/link";
import { notFound } from "next/navigation";
import { Download, FileText, Video } from "lucide-react";
import { getLessonById } from "@/lib/data";

type LessonPageProps = {
  params: Promise<{ id: string }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { id } = await params;
  const lesson = await getLessonById(id);

  if (!lesson) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section className="panel overflow-hidden p-8">
        <p className="text-xs uppercase tracking-[0.35em] text-teal">{lesson.courseTitle}</p>
        <h1 className="mt-4 text-4xl font-semibold">{lesson.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{lesson.summary}</p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="panel p-4">
          <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
            <Video className="h-4 w-4 text-teal" />
            Lesson video
          </div>
          {lesson.video_url ? (
            <div className="aspect-video overflow-hidden rounded-[24px] border border-slate-200 bg-slate-950">
              <iframe
                className="h-full w-full"
                src={lesson.video_url}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="rounded-[24px] border border-dashed border-slate-300 bg-slate-50 p-10 text-sm text-slate-500">
              No video URL has been attached to this lesson yet.
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="panel p-6">
            <h2 className="text-xl font-semibold">Materials</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Download the lesson worksheet or open the course to move through the full sequence.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              {lesson.pdf_url ? (
                <a
                  href={lesson.pdf_url}
                  target="_blank"
                  rel="noreferrer"
                  className="button-primary w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </a>
              ) : null}
              <Link href={`/courses/${lesson.courseSlug}`} className="button-secondary w-full">
                <FileText className="mr-2 h-4 w-4" />
                Back to course
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
