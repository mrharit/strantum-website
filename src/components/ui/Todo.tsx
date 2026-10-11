/**
 * Visible placeholder for anything we have not been given or must confirm
 * (CLAUDE.md §9.1). Renders `[[TODO: …]]` / `[[CONFIRM: …]]` so nothing is
 * ever invented. `npm run todos` lists every one in the source.
 */
export function Todo({
  children,
  kind = "TODO",
}: {
  children: React.ReactNode;
  kind?: "TODO" | "CONFIRM";
}) {
  return (
    <span className="data rounded-[2px] border border-dashed border-current/50 bg-current/10 px-1.5 py-0.5 align-baseline text-[0.85em] break-words [box-decoration-break:clone]">
      [[{kind}: {children}]]
    </span>
  );
}

export function Confirm({ children }: { children: React.ReactNode }) {
  return <Todo kind="CONFIRM">{children}</Todo>;
}
