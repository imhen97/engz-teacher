"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function NavLink({
  href,
  label
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-4 py-3 text-sm font-medium transition",
        active ? "bg-ink text-white" : "text-slate-600 hover:bg-white hover:text-slate-950"
      )}
    >
      {label}
    </Link>
  );
}
