import Link from "next/link";
import { ArrowRight, BookOpen, Download, PlayCircle, Sparkles } from "lucide-react";
import { getPortalSnapshot } from "@/lib/data";

export default async function HomePage() {
  const snapshot = await getPortalSnapshot();
  const featuredCourse = snapshot.courses[0];

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
      <header className="flex items-center justify-between rounded-full border border-black/5 bg-white/80 px-5 py-3 shadow-[0_10px_30px_rgba(22,22,22,0.05)] backdrop-blur">
        <div>
          <p className="eyebrow text-black">ENGZ HENNA ENGLISH</p>
          <p className="mt-1 text-sm text-slate-500">해나쌤 영어회화 멤버십 포털</p>
        </div>
        <div className="flex gap-3">
          <Link href="/sign-in" className="button-secondary">
            로그인
          </Link>
          <Link href="/dashboard" className="button-primary">
            멤버 페이지 입장
          </Link>
        </div>
      </header>

      <section className="grid flex-1 gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-7">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">
            <Sparkles className="h-3.5 w-3.5" />
            ENGZ MEMBERSHIP
          </span>
          <div className="space-y-5">
            <h1 className="display-serif max-w-4xl text-5xl leading-[1.05] text-slate-950 lg:text-7xl">
              해나쌤 영어를
              <br />
              가장 몰입감 있게
              <br />
              수강하는 방법
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              ENGZ 본사이트의 프리미엄 브랜드 무드를 바탕으로, 수강생이 강의와 자료, 공지와 학습 흐름을 한 번에 확인할 수 있는 전용 학습 포털로 구성했습니다.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href={featuredCourse ? `/courses/${featuredCourse.slug}` : "/dashboard"} className="button-primary">
              지금 강의 시작하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/resources" className="button-secondary">
              자료실 보기
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="panel p-5">
              <p className="text-sm text-slate-500">운영 중인 강의</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{snapshot.courses.length}</p>
            </div>
            <div className="panel p-5">
              <p className="text-sm text-slate-500">다운로드 자료</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{snapshot.resources.length}</p>
            </div>
            <div className="panel p-5">
              <p className="text-sm text-slate-500">최신 공지</p>
              <p className="mt-3 text-3xl font-semibold text-slate-950">{snapshot.announcements.length}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-[34px] bg-[#161616] p-8 text-white shadow-[0_28px_70px_rgba(22,22,22,0.16)]">
            <p className="eyebrow text-amber-300">MEMBER EXPERIENCE</p>
            <h2 className="display-serif mt-4 text-4xl leading-tight">
              강의, 레슨, 자료,
              <br />
              공지를 한 구조 안에서.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-white/70">
              단순한 파일 모음이 아니라, 실제 수강 흐름에 맞춘 멤버십형 학습 경험으로 재구성했습니다.
            </p>
            <div className="mt-8 grid gap-3">
              {[
                { icon: BookOpen, title: "코스 라이브러리", text: "레벨별 강의를 한눈에 탐색" },
                { icon: PlayCircle, title: "레슨 뷰어", text: "영상과 PDF를 같은 맥락에서 확인" },
                { icon: Download, title: "리소스 허브", text: "복습 자료를 빠르게 다운로드" }
              ].map((item) => (
                <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-2xl bg-white/10 p-3 text-amber-300">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-sm text-white/65">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="panel p-5">
              <p className="eyebrow">FOR STUDENTS</p>
              <p className="mt-3 text-lg font-semibold text-slate-950">집중해서 보고, 바로 복습하는 구조</p>
            </div>
            <div className="panel p-5">
              <p className="eyebrow">FOR TEACHERS</p>
              <p className="mt-3 text-lg font-semibold text-slate-950">업로드와 공지 전달이 쉬운 관리 흐름</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
