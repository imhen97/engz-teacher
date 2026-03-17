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
    <article className="panel flex h-full flex-col p-5">
      <p className="text-xs uppercase tracking-[0.25em] text-coral">{course.level}</p>
      <h2 className="mt-3 text-2xl font-semibold">{course.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{course.description}</p>
      <div className="mt-5 flex items-center justify-between">
        <span className="rounded-full bg-sand px-4 py-2 text-sm text-slate-700">
          레슨 {lessonCount}개
        </span>
        <Link href={`/courses/${course.slug}`} className="inline-flex items-center text-sm font-semibold">
          강의 보기
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
