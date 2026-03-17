import { Download, FileStack, FolderHeart } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { getPortalSnapshot } from "@/lib/data";

export default async function ResourcesPage() {
  const snapshot = await getPortalSnapshot();

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/80 bg-gradient-to-r from-white via-rose-50 to-pink-50 p-6 shadow-[0_18px_45px_rgba(244,114,182,0.12)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-rose-500">RESOURCE HUB</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">ENGZ 학습 자료실</h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              워크시트, 단어장, 스피킹 프롬프트, 복습 자료를 회원 페이지처럼 정리한 다운로드 허브입니다.
            </p>
          </div>
          <div className="rounded-2xl bg-white/85 px-5 py-4 text-sm shadow-sm">
            <p className="font-semibold text-slate-900">현재 등록된 자료</p>
            <p className="mt-1 text-slate-600">총 {snapshot.resources.length}개</p>
          </div>
        </div>
      </div>

      <SectionHeading
        eyebrow="자료실"
        title="카테고리별 학습 파일"
        description="다운로드 버튼을 카드 안에 크게 배치해서 회원 사이트 자료실처럼 바로 사용할 수 있게 했습니다."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {snapshot.resources.map((resource) => (
          <article key={resource.id} className="relative overflow-hidden rounded-[30px] border border-white/80 bg-white/90 p-6 shadow-[0_16px_40px_rgba(244,114,182,0.10)]">
            <div className="absolute -right-6 top-0 h-24 w-24 rounded-full bg-rose-100 blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-500">
                  <FolderHeart className="h-3.5 w-3.5" />
                  {resource.category}
                </span>
                <FileStack className="h-5 w-5 text-slate-300" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-900">{resource.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{resource.description}</p>
              <a
                href={resource.file_url}
                target="_blank"
                rel="noreferrer"
                className="button-secondary mt-5"
              >
                <Download className="mr-2 h-4 w-4" />
                파일 다운로드
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
