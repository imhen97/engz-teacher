import { BellRing, CalendarRange } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { getPortalSnapshot } from "@/lib/data";

export default async function AnnouncementsPage() {
  const snapshot = await getPortalSnapshot();

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/80 bg-gradient-to-r from-white via-amber-50 to-rose-50 p-6 shadow-[0_18px_45px_rgba(244,114,182,0.12)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose-500">NOTICE BOARD</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">수강생 공지 보드</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              수업 안내, 숙제 공지, 주간 체크포인트를 회원 전용 게시판처럼 한 줄 흐름으로 볼 수 있게 구성했습니다.
            </p>
          </div>
          <div className="rounded-2xl bg-white/85 px-5 py-4 text-sm shadow-sm">
            <p className="font-semibold text-slate-900">최신 공지 수</p>
            <p className="mt-1 text-slate-600">총 {snapshot.announcements.length}개</p>
          </div>
        </div>
      </div>

      <SectionHeading
        eyebrow="공지"
        title="최근 수업 안내"
        description="날짜와 대상 태그를 먼저 보여줘서 회원 사이트 공지 보드처럼 빠르게 훑어볼 수 있도록 정리했습니다."
      />
      <div className="space-y-4">
        {snapshot.announcements.map((announcement) => (
          <article key={announcement.id} className="rounded-[30px] border border-white/80 bg-white/90 p-6 shadow-[0_16px_40px_rgba(244,114,182,0.10)]">
            <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-rose-500">
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-2">
                <BellRing className="h-3.5 w-3.5" />
                {announcement.audience}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2 text-amber-700">
                <CalendarRange className="h-3.5 w-3.5" />
                {new Date(announcement.published_at).toLocaleDateString("ko-KR")}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-slate-900">{announcement.title}</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">{announcement.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
