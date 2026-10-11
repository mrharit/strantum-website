// WCAG 2.x contrast check for the brand tokens. Reads the real values from
// src/app/globals.css (:root), so it cannot drift from the CSS.
//   npm run contrast
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const css = readFileSync(
  fileURLToPath(new URL("../src/app/globals.css", import.meta.url)),
  "utf8",
);
const root = css.match(/:root\s*{([\s\S]*?)\n}/)?.[1] ?? "";

function token(name) {
  const m = root.match(new RegExp(`--${name}:\\s*([^;]+);`));
  if (!m) throw new Error(`Token --${name} not found in :root`);
  const v = m[1].trim();
  if (v.startsWith("#")) {
    const n = parseInt(v.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255, a: 1 };
  }
  const rgba = v.match(/rgba?\(([^)]+)\)/);
  if (rgba) {
    const [r, g, b, a = 1] = rgba[1].split(",").map(Number);
    return { r, g, b, a };
  }
  throw new Error(`Cannot parse --${name}: ${v}`);
}

// Composite a (possibly translucent) colour over an opaque background.
const over = (fg, bg) => ({
  r: fg.r * fg.a + bg.r * (1 - fg.a),
  g: fg.g * fg.a + bg.g * (1 - fg.a),
  b: fg.b * fg.a + bg.b * (1 - fg.a),
  a: 1,
});

const lin = (c) => {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const lum = ({ r, g, b }) => 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
const ratio = (fg, bg) => {
  const f = lum(over(fg, bg));
  const b = lum(bg);
  const [hi, lo] = f > b ? [f, b] : [b, f];
  return (hi + 0.05) / (lo + 0.05);
};

const T = Object.fromEntries(
  [
    "ink",
    "ink-raised",
    "ivory",
    "ivory-muted",
    "teal",
    "teal-ink",
    "signal",
    "ink-muted",
  ].map((n) => [n, token(n)]),
);

// [label, fg, bg, minimum, expectFail]
//  4.5 = body text, 3 = large text / UI components / graphics.
const PAIRS = [
  ["ivory on ink (body)", "ivory", "ink", 4.5],
  ["ivory on ink-raised", "ivory", "ink-raised", 4.5],
  ["ivory-muted on ink", "ivory-muted", "ink", 4.5],
  ["ivory-muted on ink-raised", "ivory-muted", "ink-raised", 4.5],
  ["teal on ink (links, eyebrows)", "teal", "ink", 4.5],
  ["teal on ink-raised", "teal", "ink-raised", 4.5],
  ["ink on teal (primary button)", "ink", "teal", 4.5],
  ["ink on ivory (body, light sections)", "ink", "ivory", 4.5],
  ["ink-muted on ivory", "ink-muted", "ivory", 4.5],
  ["teal-ink on ivory (links, eyebrows)", "teal-ink", "ivory", 4.5],
  ["teal on ivory — DO NOT USE for text", "teal", "ivory", 4.5, true],
  ["ivory on teal — DO NOT USE for text", "ivory", "teal", 4.5, true],
  ["signal on ink (clash marker, graphic)", "signal", "ink", 3],
  ["teal-ink on ivory as focus ring", "teal-ink", "ivory", 3],
  ["teal on ink as focus ring", "teal", "ink", 3],
];

let failed = 0;
console.log("\nWCAG 2.x contrast — values read from globals.css\n");
for (const [label, fg, bg, min, expectFail] of PAIRS) {
  const r = ratio(T[fg], T[bg]);
  const ok = r >= min;
  const verdict = expectFail
    ? ok
      ? "UNEXPECTED PASS"
      : "fails (as documented)"
    : ok
      ? "pass"
      : "FAIL";
  if (expectFail ? ok : !ok) failed++;
  console.log(
    `${r.toFixed(2).padStart(6)}:1  need ${String(min).padEnd(3)}  ${verdict.padEnd(22)} ${label}`,
  );
}
console.log(
  failed
    ? `\n${failed} pair(s) not as expected.\n`
    : "\nAll pairs behave as documented.\n",
);
process.exit(failed ? 1 : 0);
