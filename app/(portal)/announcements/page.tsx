import { SectionHeading } from "@/components/section-heading";
import { getPortalSnapshot } from "@/lib/data";

export default async function AnnouncementsPage() {
  const snapshot = await getPortalSnapshot();

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="공지"
        title="공지사항"
        description="수업 안내, 숙제 공지, 주간 학습 안내를 한 페이지에서 확인할 수 있습니다."
      />
      <div className="space-y-4">
        {snapshot.announcements.map((announcement) => (
          <article key={announcement.id} className="panel p-6">
            <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.25em] text-teal">
              <span>{announcement.audience}</span>
              <span>{new Date(announcement.published_at).toLocaleDateString("ko-KR")}</span>
            </div>
            <h2 className="mt-3 text-2xl font-semibold">{announcement.title}</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
              {announcement.body}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
