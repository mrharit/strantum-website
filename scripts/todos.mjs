// Lists every [[TODO: …]] / [[CONFIRM: …]] placeholder in the source, so the
// end-of-phase report (CLAUDE.md §9.1) is generated, not remembered.
//   npm run todos
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const SKIP_DIRS = new Set(["node_modules", ".next", ".git"]);
const EXT = /\.(tsx?|mdx?|css|json)$/;

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* walk(p);
    else if (EXT.test(name)) yield p;
  }
}

const LITERAL = /\[\[(TODO|CONFIRM):?\s*([^\]]*)\]\]/g; // written out in strings/comments
const JSX = /<(Todo|Confirm)\b[^>]*>([^<]*)<\/\1>/g; // <Todo>office address</Todo>

const rows = [];
for (const dir of ["src", "public", "content"]) {
  let base;
  try {
    base = join(root, dir);
    statSync(base);
  } catch {
    continue;
  }
  for (const file of walk(base)) {
    const rel = relative(root, file).replaceAll("\\", "/");
    if (rel.endsWith("components/ui/Todo.tsx")) continue; // the component itself
    readFileSync(file, "utf8")
      .split(/\r?\n/)
      .forEach((line, i) => {
        for (const m of line.matchAll(LITERAL)) {
          rows.push({ kind: m[1], text: m[2].trim(), at: `${rel}:${i + 1}` });
        }
        for (const m of line.matchAll(JSX)) {
          rows.push({
            kind: m[1] === "Confirm" ? "CONFIRM" : "TODO",
            text: m[2].trim(),
            at: `${rel}:${i + 1}`,
          });
        }
      });
  }
}

const seen = new Set();
const unique = rows.filter((r) => {
  const k = `${r.at}|${r.text}`;
  return seen.has(k) ? false : seen.add(k);
});

if (unique.length === 0) {
  console.log("No TODO / CONFIRM placeholders found.");
} else {
  for (const kind of ["TODO", "CONFIRM"]) {
    const group = unique.filter((r) => r.kind === kind);
    if (!group.length) continue;
    console.log(`\n${kind} (${group.length})`);
    for (const r of group) console.log(`  ${r.at.padEnd(46)} ${r.text}`);
  }
  console.log(`\n${unique.length} placeholder(s) in total.\n`);
}
