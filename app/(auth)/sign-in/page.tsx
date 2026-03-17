import Link from "next/link";
import { signIn, signUp } from "../actions";

type SignInPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto grid min-h-screen max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_0.95fr] lg:px-10">
      <section className="panel flex flex-col justify-between overflow-hidden p-8 lg:p-10">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-teal">Northstar English</p>
          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-semibold leading-tight lg:text-6xl">
              한국인 학습자를 위한 영어회화 전용 포털
            </h1>
            <p className="max-w-lg text-base leading-7 text-slate-600">
              로그인하면 대시보드, 강의 영상, PDF 자료, 선생님 공지사항을 한 번에 확인할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            "레벨별로 정리된 코스 구성",
            "영상 레슨과 PDF 학습자료 제공",
            "선생님 공지와 자료실을 한 곳에서 확인"
          ].map((text) => (
            <div key={text} className="rounded-[24px] border border-white/70 bg-white/70 p-4">
              <p className="text-sm leading-6 text-slate-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6">
        {params.error ? (
          <div className="rounded-3xl border border-coral/30 bg-coral/10 px-5 py-4 text-sm text-coral">
            {params.error}
          </div>
        ) : null}
        <div className="panel p-6">
          <h2 className="text-2xl font-semibold">로그인</h2>
          <form action={signIn} className="mt-5 space-y-4">
            <input name="email" type="email" className="field" placeholder="이메일 주소" required />
            <input
              name="password"
              type="password"
              className="field"
              placeholder="비밀번호"
              required
            />
            <button className="button-primary w-full">포털 들어가기</button>
          </form>
        </div>
        <div className="panel p-6">
          <h2 className="text-2xl font-semibold">학생 계정 만들기</h2>
          <form action={signUp} className="mt-5 space-y-4">
            <input name="fullName" className="field" placeholder="이름" required />
            <input name="email" type="email" className="field" placeholder="이메일 주소" required />
            <input
              name="password"
              type="password"
              className="field"
              placeholder="비밀번호 만들기"
              required
            />
            <button className="button-secondary w-full">회원가입</button>
          </form>
        </div>
        <Link href="/" className="text-sm text-slate-600 underline-offset-4 hover:underline">
          홈으로 돌아가기
        </Link>
      </section>
    </main>
  );
}
