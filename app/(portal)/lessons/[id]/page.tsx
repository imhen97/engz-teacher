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
            레슨 영상
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
              아직 이 레슨에는 영상 링크가 등록되지 않았습니다.
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="panel p-6">
            <h2 className="text-xl font-semibold">학습 자료</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              레슨 PDF를 내려받거나 강의 페이지로 돌아가 전체 순서대로 학습할 수 있습니다.
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
                  PDF 다운로드
                </a>
              ) : null}
              <Link href={`/courses/${lesson.courseSlug}`} className="button-secondary w-full">
                <FileText className="mr-2 h-4 w-4" />
                강의로 돌아가기
              </Link>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
