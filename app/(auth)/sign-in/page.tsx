import Link from "next/link";
import { signIn, signUp } from "../actions";

type SignInPageProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto grid min-h-screen max-w-6xl gap-8 px-6 py-10 lg:grid-cols-[1fr_0.95fr] lg:px-10">
      <section className="panel relative flex flex-col justify-between overflow-hidden p-8 lg:p-10">
        <div className="absolute -left-10 top-10 h-36 w-36 rounded-full bg-pink-200/60 blur-3xl" />
        <div className="absolute bottom-8 right-6 h-40 w-40 rounded-full bg-amber-100/80 blur-3xl" />
        <div className="relative space-y-6">
          <p className="text-xs uppercase tracking-[0.35em] text-rose-500">ENGZ HENNA ENGLISH</p>
          <div className="space-y-4">
            <h1 className="max-w-xl text-4xl font-semibold leading-tight text-slate-900 lg:text-6xl">
              ENGZ 해나쌤 영어 수강생 전용 페이지
            </h1>
            <p className="max-w-lg text-base leading-7 text-slate-600">
              로그인하면 강의 영상, PDF 자료, 숙제 공지, 수업 안내를 귀엽고 편한 화면에서 바로 확인할 수 있어요.
            </p>
          </div>
        </div>
        <div className="relative grid gap-4 sm:grid-cols-3">
          {[
            "레벨별 강의와 순서형 레슨",
            "영상 수업과 PDF 자료 한 번에",
            "공지사항과 자료실을 쉽게 확인"
          ].map((text) => (
            <div key={text} className="rounded-[28px] border border-white/80 bg-white/80 p-4 shadow-sm">
              <p className="text-sm leading-6 text-slate-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6">
        {params.error ? (
          <div className="rounded-[28px] border border-rose-200 bg-rose-50 px-5 py-4 text-sm text-rose-600">
            {params.error}
          </div>
        ) : null}
        {params.success ? (
          <div className="rounded-[28px] border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
            {params.success}
          </div>
        ) : null}
        <div className="panel p-6">
          <h2 className="text-2xl font-semibold text-slate-900">로그인</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">기존 수강생 계정으로 바로 들어가세요.</p>
          <form action={signIn} className="mt-5 space-y-4">
            <input name="email" type="email" className="field" placeholder="이메일 주소" required />
            <input name="password" type="password" className="field" placeholder="비밀번호" required />
            <button className="button-primary w-full">수강 페이지 들어가기</button>
          </form>
        </div>
        <div className="panel p-6">
          <h2 className="text-2xl font-semibold text-slate-900">학생 계정 만들기</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">처음이라면 계정을 만든 뒤 이메일 인증 후 로그인해 주세요.</p>
          <form action={signUp} className="mt-5 space-y-4">
            <input name="fullName" className="field" placeholder="이름" required />
            <input name="email" type="email" className="field" placeholder="이메일 주소" required />
            <input name="password" type="password" className="field" placeholder="비밀번호 만들기" required />
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
