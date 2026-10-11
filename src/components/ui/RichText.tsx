import { Fragment } from "react";
import { Todo } from "@/components/ui/Todo";

const TOKEN = /(\[\[(?:TODO|CONFIRM):?\s*[^\]]*\]\])/g;
const PARTS = /^\[\[(TODO|CONFIRM):?\s*([^\]]*)\]\]$/;

/** Renders plain strings, turning TODO / CONFIRM tokens in double square brackets into visible placeholders. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, i) => {
        const m = part.match(PARTS);
        return m ? (
          <Todo key={i} kind={m[1] as "TODO" | "CONFIRM"}>
            {m[2]}
          </Todo>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        );
      })}
    </>
  );
}
