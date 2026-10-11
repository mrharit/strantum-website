const LETTERS = ["A", "B", "C", "D", "E", "F"];

/**
 * The vertical hairlines of a drawing sheet. With `bubbles`, each rule gets a
 * grid bubble (A–F) in the place a structural grid would carry one.
 * Three columns on phones, six from md up.
 */
export function ColumnRules({
  bubbles = false,
  className = "",
}: {
  bubbles?: boolean;
  className?: string;
}) {
  return (
    <div aria-hidden="true" className={`col-rules ${className}`}>
      <div className="container-page h-full">
        <div className="grid h-full grid-cols-3 border-r border-current/[0.07] md:grid-cols-6">
          {LETTERS.map((l, i) => (
            <div
              key={l}
              className={`relative border-l border-current/[0.07] ${i > 2 ? "hidden md:block" : ""}`}
            >
              {bubbles && (
                <span className="data absolute -left-[11px] top-[calc(var(--header-h)+0.9rem)] grid size-[22px] place-items-center rounded-full border border-ivory/25 bg-ink text-[0.6875rem] text-ivory/60">
                  {l}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
