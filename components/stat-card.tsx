import type { LucideIcon } from "lucide-react";

export function StatCard({
  icon: Icon,
  label,
  value
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/80 bg-white/90 p-5 shadow-[0_16px_40px_rgba(244,114,182,0.10)]">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm text-slate-500">{label}</span>
        <div className="rounded-2xl bg-rose-50 p-3 text-rose-500">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  );
}
