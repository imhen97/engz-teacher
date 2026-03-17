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
              A focused portal for English teaching and self-study.
            </h1>
            <p className="max-w-lg text-base leading-7 text-slate-600">
              Sign in to open your dashboard, watch lesson videos, download course PDFs, and
              follow teacher announcements.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            "Structured courses by level",
            "Lesson video and PDF delivery",
            "Teacher-managed resources and announcements"
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
          <h2 className="text-2xl font-semibold">Sign in</h2>
          <form action={signIn} className="mt-5 space-y-4">
            <input name="email" type="email" className="field" placeholder="Email address" required />
            <input
              name="password"
              type="password"
              className="field"
              placeholder="Password"
              required
            />
            <button className="button-primary w-full">Enter Portal</button>
          </form>
        </div>
        <div className="panel p-6">
          <h2 className="text-2xl font-semibold">Create student account</h2>
          <form action={signUp} className="mt-5 space-y-4">
            <input name="fullName" className="field" placeholder="Full name" required />
            <input name="email" type="email" className="field" placeholder="Email address" required />
            <input
              name="password"
              type="password"
              className="field"
              placeholder="Create password"
              required
            />
            <button className="button-secondary w-full">Register</button>
          </form>
        </div>
        <Link href="/" className="text-sm text-slate-600 underline-offset-4 hover:underline">
          Return to home
        </Link>
      </section>
    </main>
  );
}
