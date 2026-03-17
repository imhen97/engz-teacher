import Link from "next/link";
import { ArrowRight, Bell, BookMarked, CalendarDays, Download, PlayCircle } from "lucide-react";
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
      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="overflow-hidden rounded-[34px] bg-[#161616] p-8 text-white shadow-[0_26px_70px_rgba(22,22,22,0.14)]">
          <p className="eyebrow text-amber-300">MEMBER DASHBOARD</p>
          <h1 className="display-serif mt-4 max-w-3xl text-4xl leading-tight lg:text-5xl">
            배운 내용을 실제 실력으로 연결하는 멤버십 학습 구조
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/70">
            오늘의 강의부터 공지, 다운로드 자료, 학습 순서까지 브랜드 무드에 맞는 대시보드 안에서 자연스럽게 이어집니다.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {featuredCourse ? (
              <Link href={`/courses/${featuredCourse.slug}`} className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-neutral-100">
                오늘의 강의 시작하기
                <ArrowRight className="ml-2 inline h-4 w-4" />
              </Link>
            ) : null}
            <Link href="/resources" className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5">
              자료실 바로가기
            </Link>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              ["학습 흐름", "강의 > 레슨 > 자료 > 공지"],
              ["수강 방식", "영상과 PDF를 같은 문맥에서"],
              ["운영 목적", "수업 집중도와 복습 효율 개선"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/45">{label}</p>
                <p className="mt-3 text-sm leading-7 text-white/80">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[30px] border border-black/5 bg-white p-5 shadow-[0_18px_45px_rgba(22,22,22,0.06)]">
            <p className="eyebrow">THIS WEEK</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-3 rounded-2xl bg-[#f7f2ea] px-4 py-3">
                <PlayCircle className="mt-0.5 h-4 w-4 text-slate-950" />
                강의 영상을 시청하고 핵심 표현을 먼저 체크하세요.
              </li>
              <li className="flex items-start gap-3 rounded-2xl bg-[#f7f2ea] px-4 py-3">
                <Download className="mt-0.5 h-4 w-4 text-slate-950" />
                PDF 자료를 내려받아 복습 노트를 정리하세요.
              </li>
              <li className="flex items-start gap-3 rounded-2xl bg-[#f7f2ea] px-4 py-3">
                <CalendarDays className="mt-0.5 h-4 w-4 text-slate-950" />
                공지사항에서 과제 마감과 수업 일정을 확인하세요.
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
            eyebrow="COURSES"
            title="현재 수강 가능한 강의"
            description="ENGZ 본사이트의 프리미엄 톤을 유지하면서, 수강생이 실제로 가장 자주 쓰는 코스 탐색 흐름에 맞게 정리했습니다."
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
            eyebrow="NOTICE & FILES"
            title="최신 공지와 다운로드"
            action={{ href: "/announcements", label: "공지 전체 보기" }}
          />
          {latestAnnouncement ? (
            <article className="rounded-[30px] border border-black/5 bg-white p-6 shadow-[0_18px_45px_rgba(22,22,22,0.06)]">
              <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-amber-700">
                <span>{latestAnnouncement.audience}</span>
                <span>{new Date(latestAnnouncement.published_at).toLocaleDateString("ko-KR")}</span>
              </div>
              <h2 className="display-serif mt-4 text-3xl leading-tight text-slate-950">{latestAnnouncement.title}</h2>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">{latestAnnouncement.body}</p>
            </article>
          ) : null}
          <div className="rounded-[30px] border border-black/5 bg-white p-6 shadow-[0_18px_45px_rgba(22,22,22,0.06)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-slate-950">바로 내려받는 자료</h3>
              <Link href="/resources" className="text-sm font-semibold text-slate-950">
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
                  className="flex items-center justify-between rounded-2xl border border-black/5 bg-[#f7f2ea] px-4 py-3 text-sm text-slate-700 transition hover:bg-[#f2ebdf]"
                >
                  <span>
                    <span className="block font-semibold text-slate-950">{resource.title}</span>
                    <span className="mt-1 block text-xs text-slate-500">{resource.category}</span>
                  </span>
                  <Download className="h-4 w-4 text-slate-950" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
