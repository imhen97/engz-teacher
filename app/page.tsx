import Link from "next/link";
import { ArrowRight, BookOpen, Download, ShieldCheck, Sparkles, Video } from "lucide-react";
import { getPortalSnapshot } from "@/lib/data";

export default async function HomePage() {
  const snapshot = await getPortalSnapshot();

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
      <header className="flex items-center justify-between rounded-full border border-white/80 bg-white/80 px-5 py-3 shadow-panel backdrop-blur">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-rose-500">ENGZ HENNA ENGLISH</p>
          <p className="text-sm text-slate-600">해나쌤 영어회화 수강생 포털</p>
        </div>
        <div className="flex gap-3">
          <Link href="/sign-in" className="button-secondary">
            로그인
          </Link>
          <Link href="/dashboard" className="button-primary">
            수강 페이지 입장
          </Link>
        </div>
      </header>

      <section className="grid flex-1 gap-8 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-xs uppercase tracking-[0.24em] text-rose-500">
            <Sparkles className="h-3.5 w-3.5" />
            ENGZ 해나쌤 영어
          </span>
          <div className="space-y-4">
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight text-slate-900 lg:text-7xl">
              한국인 영어회화 수강생을 위한 더 쉽고 귀여운 수강 페이지
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-700">
              해나쌤이 업로드한 영상 레슨과 PDF 자료, 숙제 공지, 학습 자료실을 한 화면에서 편하게 확인할 수 있도록 만든 ENGZ 수강 포털입니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/dashboard" className="button-primary">
              대시보드 보기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/admin" className="button-secondary">
              선생님 관리 페이지
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="panel p-5">
              <p className="text-3xl font-semibold text-slate-900">{snapshot.courses.length}</p>
              <p className="mt-2 text-sm text-slate-600">운영 중인 강의</p>
            </div>
            <div className="panel p-5">
              <p className="text-3xl font-semibold text-slate-900">{snapshot.resources.length}</p>
              <p className="mt-2 text-sm text-slate-600">다운로드 자료</p>
            </div>
            <div className="panel p-5">
              <p className="text-3xl font-semibold text-slate-900">{snapshot.announcements.length}</p>
              <p className="mt-2 text-sm text-slate-600">최신 공지</p>
            </div>
          </div>
        </div>

        <div className="panel relative overflow-hidden p-6">
          <div className="absolute -left-10 top-8 h-36 w-36 rounded-full bg-pink-200/60 blur-3xl" />
          <div className="absolute bottom-2 right-2 h-40 w-40 rounded-full bg-amber-100/80 blur-3xl" />
          <div className="relative space-y-4">
            {[
              {
                icon: ShieldCheck,
                title: "간편 로그인",
                description: "수강생과 선생님 계정을 나눠서 안전하게 사용할 수 있어요."
              },
              {
                icon: BookOpen,
                title: "차근차근 코스 구성",
                description: "레벨별 코스와 레슨 순서가 보기 쉽게 정리되어 있어요."
              },
              {
                icon: Video,
                title: "영상 + PDF 수업",
                description: "영상 시청과 자료 다운로드를 한 페이지에서 바로 할 수 있어요."
              },
              {
                icon: Download,
                title: "귀여운 자료실",
                description: "워크시트, 단어장, 복습 파일을 찾기 쉽게 모아두었습니다."
              }
            ].map((item) => (
              <div key={item.title} className="rounded-[28px] border border-white/80 bg-white/85 p-5 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-rose-50 p-3 text-rose-500">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
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
