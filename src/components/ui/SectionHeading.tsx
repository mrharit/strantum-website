import type { ReactNode } from "react";

/** Eyebrow + H2 + lead. Pass the one accent word inside <span className="accent">. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  className = "",
}: {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`max-w-3xl ${className}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="display display-lg mt-5">
        {title}
      </h2>
      {lead && (
        <p className="mt-6 max-w-xl text-pretty text-[1.0625rem] leading-relaxed opacity-75">
          {lead}
        </p>
      )}
    </header>
  );
}
