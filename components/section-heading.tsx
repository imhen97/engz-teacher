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
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display-serif mt-3 text-4xl leading-tight text-slate-950">{title}</h1>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>
        ) : null}
      </div>
      {action ? (
        <Link href={action.href} className="button-secondary">
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
