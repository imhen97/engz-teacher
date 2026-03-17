import { Download } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { getPortalSnapshot } from "@/lib/data";

export default async function ResourcesPage() {
  const snapshot = await getPortalSnapshot();

  return (
    <div className="space-y-6">
      <SectionHeading
        eyebrow="자료실"
        title="학습 자료실"
        description="워크시트, 단어장, 스피킹 프롬프트, 복습 자료를 한 곳에서 내려받을 수 있습니다."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {snapshot.resources.map((resource) => (
          <article key={resource.id} className="panel p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-coral">{resource.category}</p>
                <h2 className="mt-3 text-xl font-semibold">{resource.title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{resource.description}</p>
              </div>
            </div>
            <a
              href={resource.file_url}
              target="_blank"
              rel="noreferrer"
              className="button-secondary mt-5"
            >
              <Download className="mr-2 h-4 w-4" />
              파일 다운로드
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
