import Link from "next/link";
import { ArrowRight, BookOpen, Download, ShieldCheck, Video } from "lucide-react";
import { getPortalSnapshot } from "@/lib/data";

export default async function HomePage() {
  const snapshot = await getPortalSnapshot();

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
      <header className="flex items-center justify-between rounded-full border border-white/70 bg-white/70 px-5 py-3 shadow-panel backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-teal">Northstar English</p>
          <p className="text-sm text-slate-600">한국인 수강생을 위한 영어회화 학습 포털</p>
        </div>
        <div className="flex gap-3">
          <Link href="/sign-in" className="button-secondary">
            로그인
          </Link>
          <Link href="/dashboard" className="button-primary">
            포털 입장
          </Link>
        </div>
      </header>

      <section className="grid flex-1 gap-8 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-coral/20 bg-coral/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-coral">
            강의, 레슨, 학습자료
          </span>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-ink lg:text-7xl">
              한국인 영어회화 수강생이 편하게 쓰는 학습 포털
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-700">
              선생님은 영상과 PDF가 포함된 레슨을 올리고, 수강생은 강의 진행표와 자료실,
              공지사항을 한 화면에서 쉽게 확인할 수 있습니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard" className="button-primary">
              대시보드 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/admin" className="button-secondary">
              관리자 페이지
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="panel p-5">
              <p className="text-3xl font-semibold">{snapshot.courses.length}</p>
              <p className="mt-2 text-sm text-slate-600">운영 중인 강의</p>
            </div>
            <div className="panel p-5">
              <p className="text-3xl font-semibold">{snapshot.resources.length}</p>
              <p className="mt-2 text-sm text-slate-600">다운로드 자료</p>
            </div>
            <div className="panel p-5">
              <p className="text-3xl font-semibold">{snapshot.announcements.length}</p>
              <p className="mt-2 text-sm text-slate-600">최신 공지</p>
            </div>
          </div>
        </div>

        <div className="panel relative overflow-hidden p-6">
          <div className="absolute inset-x-8 top-8 h-36 rounded-full bg-teal/10 blur-3xl" />
          <div className="relative space-y-4">
            {[
              {
                icon: ShieldCheck,
                title: "로그인 관리",
                description: "Supabase 인증 기반으로 학생과 선생님 권한을 분리합니다."
              },
              {
                icon: BookOpen,
                title: "강의 구성",
                description: "레벨별 코스와 순서형 레슨으로 학습 흐름을 정리합니다."
              },
              {
                icon: Video,
                title: "영상 레슨",
                description: "수업 영상을 보고 PDF 보조 자료도 함께 내려받을 수 있습니다."
              },
              {
                icon: Download,
                title: "자료실",
                description: "워크시트, 단어장, 복습 파일을 한 곳에 모아 제공합니다."
              }
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-white/80 bg-white/80 p-5 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-sand p-3 text-teal">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
