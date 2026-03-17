import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import type { CourseRecord } from "@/lib/types";

export function CourseCard({
  course,
  lessonCount
}: {
  course: CourseRecord;
  lessonCount: number;
}) {
  return (
    <article className="group relative overflow-hidden rounded-[30px] border border-white/80 bg-white/90 p-5 shadow-[0_18px_45px_rgba(244,114,182,0.12)] transition hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(244,114,182,0.18)]">
      <div className="absolute -right-8 top-0 h-24 w-24 rounded-full bg-rose-100 blur-2xl" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-500">
            <Sparkles className="h-3.5 w-3.5" />
            {course.level}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2 text-xs text-amber-700">
            <BookOpen className="h-3.5 w-3.5" />
            레슨 {lessonCount}개
          </span>
        </div>
        <h2 className="mt-4 text-2xl font-semibold text-slate-900">{course.title}</h2>
        <p className="mt-3 min-h-24 text-sm leading-7 text-slate-600">{course.description}</p>
        <div className="mt-6 flex items-center justify-between border-t border-rose-100 pt-4">
          <span className="text-sm text-slate-500">해나쌤 추천 코스</span>
          <Link href={`/courses/${course.slug}`} className="inline-flex items-center text-sm font-semibold text-rose-500">
            강의 보기
            <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
