import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-rose-500">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
        ) : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="inline-flex items-center rounded-full border border-rose-100 bg-white px-4 py-2 text-sm font-semibold text-rose-500 shadow-sm transition hover:border-rose-200 hover:bg-rose-50"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
