import Link from "next/link";
import { LogOut } from "lucide-react";
import { NavLink } from "@/components/nav-link";
import { signOut } from "@/lib/actions";
import type { CurrentUserProfile } from "@/lib/types";

const links = [
  { href: "/dashboard", label: "대시보드" },
  { href: "/courses", label: "강의" },
  { href: "/resources", label: "자료실" },
  { href: "/announcements", label: "공지사항" },
  { href: "/admin", label: "관리자" }
];

const roleLabel: Record<string, string> = {
  student: "수강생",
  teacher: "선생님",
  admin: "관리자"
};

export function PortalShell({
  children,
  profile
}: {
  children: React.ReactNode;
  profile: CurrentUserProfile;
}) {
  return (
    <div className="min-h-screen">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 px-4 py-4 lg:grid-cols-[290px_1fr] lg:px-6">
        <aside className="panel flex flex-col justify-between p-5">
          <div>
            <Link href="/" className="block rounded-[32px] bg-gradient-to-br from-rose-400 via-pink-300 to-amber-200 px-5 py-6 text-slate-900 shadow-lg">
              <p className="text-xs uppercase tracking-[0.35em] text-white/90">ENGZ HENNA ENGLISH</p>
              <h1 className="mt-4 text-2xl font-semibold">해나쌤 영어 수강 페이지</h1>
              <p className="mt-2 text-sm leading-6 text-slate-800/80">
                강의, 레슨, 자료실, 공지사항을 귀엽고 편하게 확인하세요.
              </p>
            </Link>
            <nav className="mt-6 grid gap-2">
              {links.map((link) => (
                <NavLink key={link.href} href={link.href} label={link.label} />
              ))}
            </nav>
          </div>

          <div className="rounded-[28px] border border-rose-100 bg-white/90 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.25em] text-rose-500">{roleLabel[profile.role] ?? profile.role}</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">{profile.fullName}</p>
            <p className="mt-1 text-sm text-slate-500">{profile.email}</p>
            <form action={signOut} className="mt-4">
              <button className="button-secondary w-full">
                <LogOut className="mr-2 h-4 w-4" />
                로그아웃
              </button>
            </form>
          </div>
        </aside>

        <main className="py-3">
          <div className="panel min-h-full p-5 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
