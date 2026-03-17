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
          <p className="text-xs uppercase tracking-[0.35em] text-teal">학생 대시보드</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight">
            수업, 자료, 공지를 한 곳에서 편하게 확인하세요.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            현재 듣는 강의를 이어서 보고, PDF 자료를 다시 확인하고, 새로운 공지사항도 빠르게 체크할 수 있습니다.
          </p>
          {featuredCourse ? (
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={`/courses/${featuredCourse.slug}`} className="button-primary">
                현재 강의 열기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/resources" className="button-secondary">
                자료실 보기
              </Link>
            </div>
          ) : null}
        </div>
        <div className="grid gap-4">
          <StatCard icon={BookMarked} label="공개된 강의" value={String(snapshot.courses.length)} />
          <StatCard icon={PlayCircle} label="이용 가능한 레슨" value={String(snapshot.lessons.length)} />
          <StatCard icon={Download} label="학습 자료 파일" value={String(snapshot.resources.length)} />
          <StatCard icon={Bell} label="공지사항" value={String(snapshot.announcements.length)} />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          <SectionHeading
            eyebrow="강의"
            title="이어서 학습하기"
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
            eyebrow="공지"
            title="최근 선생님 공지"
            action={{ href: "/announcements", label: "전체 보기" }}
          />
          {latestAnnouncement ? (
            <article className="panel p-6">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-coral">
                <span>{latestAnnouncement.audience}</span>
                <span>{new Date(latestAnnouncement.published_at).toLocaleDateString("ko-KR")}</span>
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
