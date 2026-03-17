import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CourseRecord } from "@/lib/types";

export function CourseCard({
  course,
  lessonCount
}: {
  course: CourseRecord;
  lessonCount: number;
}) {
  return (
    <article className="rounded-[28px] border border-black/5 bg-white p-6 shadow-[0_18px_45px_rgba(22,22,22,0.06)] transition hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(22,22,22,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow">{course.level}</span>
        <span className="rounded-full bg-[#f4efe5] px-3 py-2 text-xs text-slate-600">레슨 {lessonCount}개</span>
      </div>
      <h2 className="display-serif mt-4 text-3xl leading-tight text-slate-950">{course.title}</h2>
      <p className="mt-4 min-h-24 text-sm leading-7 text-slate-600">{course.description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4">
        <span className="text-sm text-slate-500">ENGZ 커리큘럼</span>
        <Link href={`/courses/${course.slug}`} className="inline-flex items-center text-sm font-semibold text-slate-950">
          강의 보기
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
