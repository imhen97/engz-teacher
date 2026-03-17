import Link from "next/link";
import { ArrowRight, Bell, BookMarked, CalendarDays, Download, PlayCircle, Sparkles } from "lucide-react";
import { CourseCard } from "@/components/course-card";
import { SectionHeading } from "@/components/section-heading";
import { StatCard } from "@/components/stat-card";
import { getPortalSnapshot } from "@/lib/data";

export default async function DashboardPage() {
  const snapshot = await getPortalSnapshot();
  const featuredCourse = snapshot.courses[0];
  const latestAnnouncement = snapshot.announcements[0];
  const latestResources = snapshot.resources.slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="relative overflow-hidden rounded-[34px] border border-white/80 bg-gradient-to-br from-white via-rose-50 to-amber-50 p-8 shadow-[0_22px_60px_rgba(244,114,182,0.14)]">
          <div className="absolute -top-10 right-8 h-32 w-32 rounded-full bg-pink-200/50 blur-3xl" />
          <div className="absolute bottom-0 left-8 h-28 w-28 rounded-full bg-amber-100/70 blur-3xl" />
          <div className="relative space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs uppercase tracking-[0.28em] text-rose-500 shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              ENGZ MEMBER LOUNGE
            </span>
            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-slate-900 lg:text-5xl">
                해나쌤 영어 수강생을 위한 멤버십형 학습 공간
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                이번 주 강의, 최신 공지, 자료 다운로드, 학습 순서를 한 화면에서 바로 확인할 수 있도록 구성했습니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {featuredCourse ? (
                <Link href={`/courses/${featuredCourse.slug}`} className="button-primary">
                  오늘의 강의 시작하기
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              ) : null}
              <Link href="/announcements" className="button-secondary">
                공지사항 확인
              </Link>
              <Link href="/resources" className="button-secondary">
                자료실 바로가기
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[30px] border border-white/80 bg-white/90 p-5 shadow-[0_16px_40px_rgba(244,114,182,0.10)]">
            <p className="text-xs uppercase tracking-[0.28em] text-rose-500">이번 주 학습</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3 rounded-2xl bg-rose-50 px-4 py-3">
                <PlayCircle className="mt-0.5 h-4 w-4 text-rose-500" />
                강의 영상을 보고 핵심 표현을 정리해 보세요.
              </li>
              <li className="flex items-start gap-3 rounded-2xl bg-amber-50 px-4 py-3">
                <Download className="mt-0.5 h-4 w-4 text-amber-600" />
                PDF 학습자료를 내려받아 복습해 보세요.
              </li>
              <li className="flex items-start gap-3 rounded-2xl bg-sky-50 px-4 py-3">
                <CalendarDays className="mt-0.5 h-4 w-4 text-sky-500" />
                공지사항에서 과제 일정과 수업 안내를 체크하세요.
              </li>
            </ul>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <StatCard icon={BookMarked} label="공개된 강의" value={String(snapshot.courses.length)} />
            <StatCard icon={PlayCircle} label="이용 가능한 레슨" value={String(snapshot.lessons.length)} />
            <StatCard icon={Download} label="학습 자료 파일" value={String(snapshot.resources.length)} />
            <StatCard icon={Bell} label="공지사항" value={String(snapshot.announcements.length)} />
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-4">
          <SectionHeading
            eyebrow="코스 라인업"
            title="지금 수강할 수 있는 강의"
            description="멤버십 대시보드처럼 추천 코스를 먼저 보여주고, 수강생이 바로 레슨으로 들어갈 수 있게 구성했습니다."
            action={{ href: "/courses", label: "전체 강의 보기" }}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {snapshot.courses.slice(0, 4).map((course) => (
              <CourseCard key={course.id} course={course} lessonCount={course.lessons.length} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SectionHeading
            eyebrow="퀵 보드"
            title="최신 공지와 자료"
            action={{ href: "/announcements", label: "공지 전체 보기" }}
          />
          {latestAnnouncement ? (
            <article className="rounded-[30px] border border-white/80 bg-white/90 p-6 shadow-[0_16px_40px_rgba(244,114,182,0.10)]">
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-rose-500">
                <span>{latestAnnouncement.audience}</span>
                <span>{new Date(latestAnnouncement.published_at).toLocaleDateString("ko-KR")}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-slate-900">{latestAnnouncement.title}</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">{latestAnnouncement.body}</p>
            </article>
          ) : null}
          <div className="rounded-[30px] border border-white/80 bg-white/90 p-6 shadow-[0_16px_40px_rgba(244,114,182,0.10)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-900">바로 내려받는 자료</h3>
              <Link href="/resources" className="text-sm font-semibold text-rose-500">
                전체 자료실
              </Link>
            </div>
            <div className="mt-4 space-y-3">
              {latestResources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-rose-100 bg-rose-50/60 px-4 py-3 text-sm text-slate-700 transition hover:bg-rose-50"
                >
                  <span>
                    <span className="block font-semibold text-slate-900">{resource.title}</span>
                    <span className="mt-1 block text-xs text-slate-500">{resource.category}</span>
                  </span>
                  <Download className="h-4 w-4 text-rose-500" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
