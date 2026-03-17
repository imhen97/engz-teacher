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
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.35em] text-teal">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold">{title}</h1>
        {description ? <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{description}</p> : null}
      </div>
      {action ? (
        <Link href={action.href} className="text-sm font-semibold text-slate-700 underline-offset-4 hover:underline">
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
