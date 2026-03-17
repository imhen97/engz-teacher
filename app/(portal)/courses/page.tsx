import { BookOpen, Layers3 } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { SectionHeading } from "@/components/section-heading";
import { getPortalSnapshot } from "@/lib/data";

export default async function CoursesPage() {
  const snapshot = await getPortalSnapshot();

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/80 bg-gradient-to-r from-white via-rose-50 to-amber-50 p-6 shadow-[0_18px_45px_rgba(244,114,182,0.12)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose-500">COURSE LIBRARY</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">ENGZ 강의 아카이브</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              멤버십 사이트처럼 강의를 한눈에 훑고, 원하는 코스를 바로 열 수 있는 라이브러리 구성입니다.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/85 px-4 py-3 text-sm text-slate-600 shadow-sm">
              <p className="font-semibold text-slate-900">전체 코스</p>
              <p className="mt-1">{snapshot.courses.length}개</p>
            </div>
            <div className="rounded-2xl bg-white/85 px-4 py-3 text-sm text-slate-600 shadow-sm">
              <p className="font-semibold text-slate-900">전체 레슨</p>
              <p className="mt-1">{snapshot.lessons.length}개</p>
            </div>
          </div>
        </div>
      </div>

      <SectionHeading
        eyebrow="강의 구성"
        title="현재 수강 가능한 코스"
        description="브랜드 톤에 맞춘 카드형 레이아웃으로 강의 요약과 레슨 수를 빠르게 확인할 수 있습니다."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {snapshot.courses.map((course) => (
          <CourseCard key={course.id} course={course} lessonCount={course.lessons.length} />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[28px] border border-white/80 bg-white/90 p-5 shadow-[0_16px_40px_rgba(244,114,182,0.10)]">
          <div className="flex items-center gap-3 text-rose-500">
            <BookOpen className="h-5 w-5" />
            <h2 className="text-lg font-semibold text-slate-900">수강 방법</h2>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            강의를 열면 레슨 순서대로 영상을 보고 PDF 자료를 내려받을 수 있습니다. 공지사항을 함께 확인하면 과제 일정도 놓치지 않습니다.
          </p>
        </div>
        <div className="rounded-[28px] border border-white/80 bg-white/90 p-5 shadow-[0_16px_40px_rgba(244,114,182,0.10)]">
          <div className="flex items-center gap-3 text-rose-500">
            <Layers3 className="h-5 w-5" />
            <h2 className="text-lg font-semibold text-slate-900">멤버십형 구성</h2>
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            코스 카드, 요약 패널, 빠른 이동 버튼을 분리해서 회원 전용 대시보드처럼 탐색 흐름이 자연스럽게 이어지도록 구성했습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
