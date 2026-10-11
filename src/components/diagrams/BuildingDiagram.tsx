// The STRANTUM building: one procedural G+6 mid-rise drawn as an isometric
// line drawing. Six stages match the six chapters of the scroll story (§7.1):
//   1 Architecture · 2 Structure · 3 MEP · 4 Clash · 5 Coordinated · 6 Documentation
// Pure geometry, no assets, no ids: safe to render many times per page.
//
// Phase 3 reuses this as the mobile / reduced-motion poster sequence and as
// the static poster shown while Three.js loads.

import type { ReactNode } from "react";

export type Stage = 1 | 2 | 3 | 4 | 5 | 6;

type V3 = [number, number, number];

/* ----------------------------- geometry ------------------------------- */
// Units are structural bays (1 bay = 6 m). z is up.
const W = 6; // bays along x  (grid A–G)
const D = 3; // bays along y  (grid 1–4)
const FL = 7; // slab levels above ground: G+6 → levels 1…6 + roof
const H1 = 0.5; // floor-to-floor (3 m)
const H = FL * H1;

const U = 78; // px per unit
const C = Math.cos(Math.PI / 6);
const S = 0.5;
const OX = 300;
const OY = 328;

const px = (x: number, y: number, z: number): [number, number] => [
  OX + (x - y) * C * U,
  OY + (x + y) * S * U - z * U,
];
const pt = (p: V3) => {
  const [a, b] = px(...p);
  return `${a.toFixed(1)},${b.toFixed(1)}`;
};
const poly = (pts: V3[]) => pts.map(pt).join(" ");
const line = (a: V3, b: V3) => `M${pt(a)}L${pt(b)}`;

/* ------------------------------ palette ------------------------------- */
const IVORY = "var(--ivory)";
const TEAL = "var(--teal)";
const SIGNAL = "var(--signal)";

/* ------------------------------ helpers ------------------------------- */
function Box({
  x0,
  y0,
  z0,
  x1,
  y1,
  z1,
  stroke = IVORY,
  strokeOpacity = 0.5,
  fill = IVORY,
  fillOpacity = 0.06,
  sw = 1,
}: {
  x0: number;
  y0: number;
  z0: number;
  x1: number;
  y1: number;
  z1: number;
  stroke?: string;
  strokeOpacity?: number;
  fill?: string;
  fillOpacity?: number;
  sw?: number;
}) {
  // Three faces are visible from this viewpoint: top, x = x1, y = y1.
  return (
    <g
      stroke={stroke}
      strokeOpacity={strokeOpacity}
      strokeWidth={sw}
      fill={fill}
      fillOpacity={fillOpacity}
      strokeLinejoin="round"
    >
      <polygon
        points={poly([
          [x0, y0, z1],
          [x1, y0, z1],
          [x1, y1, z1],
          [x0, y1, z1],
        ])}
      />
      <polygon
        points={poly([
          [x1, y0, z0],
          [x1, y1, z0],
          [x1, y1, z1],
          [x1, y0, z1],
        ])}
      />
      <polygon
        points={poly([
          [x0, y1, z0],
          [x1, y1, z0],
          [x1, y1, z1],
          [x0, y1, z1],
        ])}
      />
    </g>
  );
}

function Bubble({
  cx,
  cy,
  label,
  r = 15,
  opacity = 0.55,
}: {
  cx: number;
  cy: number;
  label: string;
  r?: number;
  opacity?: number;
}) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        stroke={IVORY}
        strokeOpacity={opacity}
        strokeWidth={1}
      />
      <text
        x={cx}
        y={cy}
        dy="0.35em"
        textAnchor="middle"
        fill={IVORY}
        fillOpacity={opacity + 0.15}
        stroke="none"
        fontSize={r * 0.95}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {label}
      </text>
    </g>
  );
}

const LETTERS = ["A", "B", "C", "D", "E", "F", "G"];

/* ------------------------------ layers -------------------------------- */

/** Structural grid on the ground plane, with bubbles. */
function GridLayer() {
  const near = D + 1.15;
  const right = W + 1.15;
  return (
    <g>
      <g
        stroke={IVORY}
        strokeOpacity={0.22}
        strokeWidth={0.8}
        strokeDasharray="10 3 2 3"
      >
        {LETTERS.map((_, i) => (
          <path key={i} d={line([i, -0.6, 0], [i, near - 0.25, 0])} />
        ))}
        {[0, 1, 2, 3].map((j) => (
          <path key={j} d={line([-0.6, j, 0], [right - 0.25, j, 0])} />
        ))}
      </g>
      {LETTERS.map((l, i) => {
        const [cx, cy] = px(i, near, 0);
        return <Bubble key={l} cx={cx} cy={cy} label={l} />;
      })}
      {[0, 1, 2, 3].map((j) => {
        const [cx, cy] = px(right, j, 0);
        return <Bubble key={j} cx={cx} cy={cy} label={String(j + 1)} />;
      })}
    </g>
  );
}

/** Stage 1: the ivory wireframe shell. */
function ShellLayer({ faded = false }: { faded?: boolean }) {
  const k = faded ? 0.55 : 1;
  const levels = Array.from({ length: FL + 1 }, (_, i) => i);
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* hidden back edges: ground and roof, very faint */}
      <g stroke={IVORY} strokeOpacity={0.14 * k} strokeWidth={0.8}>
        <path d={line([0, 0, 0], [W, 0, 0])} />
        <path d={line([0, 0, 0], [0, D, 0])} />
        <path d={line([0, 0, 0], [0, 0, H])} />
      </g>

      {/* façade mullions on the two visible faces */}
      <g stroke={IVORY} strokeOpacity={0.2 * k} strokeWidth={0.75}>
        {Array.from({ length: 11 }, (_, i) => 0.5 * (i + 1)).map((x) => (
          <path key={`mx${x}`} d={line([x, D, 0], [x, D, H])} />
        ))}
        {Array.from({ length: 5 }, (_, i) => 0.5 * (i + 1)).map((y) => (
          <path key={`my${y}`} d={line([W, y, 0], [W, y, H])} />
        ))}
      </g>

      {/* floor lines on the two visible faces */}
      <g stroke={IVORY} strokeOpacity={0.5 * k} strokeWidth={1}>
        {levels.map((i) => (
          <path
            key={`f${i}`}
            d={`M${pt([0, D, i * H1])}L${pt([W, D, i * H1])}L${pt([W, 0, i * H1])}`}
          />
        ))}
        {/* roof outline, full */}
        <path
          d={`M${pt([0, 0, H])}L${pt([W, 0, H])}L${pt([W, D, H])}L${pt([0, D, H])}Z`}
        />
      </g>

      {/* visible corner verticals */}
      <g stroke={IVORY} strokeOpacity={0.65 * k} strokeWidth={1.2}>
        <path d={line([0, D, 0], [0, D, H])} />
        <path d={line([W, D, 0], [W, D, H])} />
        <path d={line([W, 0, 0], [W, 0, H])} />
      </g>

      {/* plant room on the roof */}
      <Box
        x0={2.2}
        y0={0.9}
        z0={H}
        x1={4}
        y1={2.1}
        z1={H + 0.36}
        strokeOpacity={0.5 * k}
        fillOpacity={0.04}
      />
    </g>
  );
}

/** Stage 2: columns, slabs, core, beams. */
function StructureLayer() {
  const cols: [number, number][] = [];
  for (let x = 0; x <= W; x++) for (let y = 0; y <= D; y++) cols.push([x, y]);
  const floors = Array.from({ length: FL }, (_, i) => i + 1);
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* slab top faces + edge thickness */}
      {floors.map((i) => {
        const z = i * H1;
        return (
          <g key={`s${i}`}>
            <polygon
              points={poly([
                [0, 0, z],
                [W, 0, z],
                [W, D, z],
                [0, D, z],
              ])}
              fill={IVORY}
              fillOpacity={0.035}
              stroke="none"
            />
            <path
              d={`M${pt([0, D, z - 0.07])}L${pt([W, D, z - 0.07])}L${pt([W, 0, z - 0.07])}`}
              stroke={IVORY}
              strokeOpacity={0.3}
              strokeWidth={0.8}
            />
          </g>
        );
      })}

      {/* beams: two longitudinal lines per floor, parallel to the MEP trunk */}
      {floors.map((i) =>
        [1, 2].map((y) => (
          <Box
            key={`b${i}-${y}`}
            x0={0}
            x1={W}
            y0={y - 0.05}
            y1={y + 0.05}
            z0={i * H1 - 0.12}
            z1={i * H1}
            strokeOpacity={0.34}
            fillOpacity={0.05}
            sw={0.8}
          />
        )),
      )}

      {/* core */}
      <Box
        x0={2.5}
        y0={0.9}
        z0={0}
        x1={3.5}
        y1={2.1}
        z1={H}
        strokeOpacity={0.5}
        fillOpacity={0.09}
      />

      {/* columns on every grid intersection */}
      <g stroke={IVORY} strokeOpacity={0.78} strokeWidth={1.5}>
        {cols.map(([x, y]) => (
          <path key={`c${x}-${y}`} d={line([x, y, 0], [x, y, H])} />
        ))}
      </g>
    </g>
  );
}

const DUCT = { y0: 1.34, y1: 1.56 };
const duct = (zk: number) => ({ z0: zk - 0.26, z1: zk - 0.17 });

/** Stage 3: MEP in teal. `rerouteLevel` lowers the duct under the transfer beam. */
function MepLayer({
  clashLevel,
  resolved,
  hot,
}: {
  clashLevel?: number;
  resolved?: boolean;
  hot?: boolean; // paint the clashing duct run red (stage 4)
}) {
  const floors = Array.from({ length: 6 }, (_, i) => i + 1);
  const glow = { filter: "drop-shadow(0 0 3px rgba(0,174,187,0.55))" };
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <g style={glow}>
        {floors.map((k) => {
          const zk = k * H1;
          const { z0, z1 } = duct(zk);
          const isClash = clashLevel === k;
          return (
            <g key={`m${k}`}>
              {/* left trunk, into the core */}
              <Box
                x0={0.4}
                x1={2.5}
                y0={DUCT.y0}
                y1={DUCT.y1}
                z0={z0}
                z1={z1}
                stroke={TEAL}
                strokeOpacity={0.95}
                fill={TEAL}
                fillOpacity={0.16}
              />
              {/* right trunk: straight, or rerouted at the clash level */}
              {isClash && resolved ? (
                <>
                  <Box
                    x0={3.5}
                    x1={4.12}
                    y0={DUCT.y0}
                    y1={DUCT.y1}
                    z0={z0}
                    z1={z1}
                    stroke={TEAL}
                    strokeOpacity={0.95}
                    fill={TEAL}
                    fillOpacity={0.16}
                  />
                  <Box
                    x0={4.12}
                    x1={4.26}
                    y0={DUCT.y0}
                    y1={DUCT.y1}
                    z0={z0 - 0.2}
                    z1={z1}
                    stroke={TEAL}
                    strokeOpacity={0.95}
                    fill={TEAL}
                    fillOpacity={0.16}
                  />
                  <Box
                    x0={4.26}
                    x1={4.94}
                    y0={DUCT.y0}
                    y1={DUCT.y1}
                    z0={z0 - 0.2}
                    z1={z1 - 0.2}
                    stroke={TEAL}
                    strokeOpacity={0.95}
                    fill={TEAL}
                    fillOpacity={0.16}
                  />
                  <Box
                    x0={4.94}
                    x1={5.08}
                    y0={DUCT.y0}
                    y1={DUCT.y1}
                    z0={z0 - 0.2}
                    z1={z1}
                    stroke={TEAL}
                    strokeOpacity={0.95}
                    fill={TEAL}
                    fillOpacity={0.16}
                  />
                  <Box
                    x0={5.08}
                    x1={5.6}
                    y0={DUCT.y0}
                    y1={DUCT.y1}
                    z0={z0}
                    z1={z1}
                    stroke={TEAL}
                    strokeOpacity={0.95}
                    fill={TEAL}
                    fillOpacity={0.16}
                  />
                </>
              ) : (
                <Box
                  x0={3.5}
                  x1={5.6}
                  y0={DUCT.y0}
                  y1={DUCT.y1}
                  z0={z0}
                  z1={z1}
                  stroke={isClash && hot ? SIGNAL : TEAL}
                  strokeOpacity={0.95}
                  fill={isClash && hot ? SIGNAL : TEAL}
                  fillOpacity={isClash && hot ? 0.3 : 0.16}
                  sw={isClash && hot ? 1.4 : 1}
                />
              )}
              {/* pipes */}
              <path
                d={`${line([0.4, 0.62, zk - 0.2], [2.5, 0.62, zk - 0.2])}${line([3.5, 0.62, zk - 0.2], [5.6, 0.62, zk - 0.2])}`}
                stroke={TEAL}
                strokeOpacity={0.85}
                strokeWidth={2}
              />
              <path
                d={`${line([0.4, 2.38, zk - 0.2], [2.5, 2.38, zk - 0.2])}${line([3.5, 2.38, zk - 0.2], [5.6, 2.38, zk - 0.2])}`}
                stroke={TEAL}
                strokeOpacity={0.85}
                strokeWidth={2}
              />
            </g>
          );
        })}
        {/* risers beside the core */}
        {[
          [2.3, 0.7],
          [3.7, 0.7],
          [2.3, 2.3],
        ].map(([x, y]) => (
          <path
            key={`r${x}-${y}`}
            d={line([x, y, 0], [x, y, H])}
            stroke={TEAL}
            strokeOpacity={0.9}
            strokeWidth={2.4}
          />
        ))}
      </g>
    </g>
  );
}

// Chapters 4–5 are framed tight on the clash, like the Phase 3 camera move.
const ZOOM = { x: 296, y: 196, w: 500, h: 475 };

const CLASH_LEVEL = 4;
const CLASH_AT: V3 = [4.6, 1.45, CLASH_LEVEL * H1 - 0.215];

/** The deep transfer beam that the duct runs into. */
function TransferBeam({ hot }: { hot?: boolean }) {
  const z = CLASH_LEVEL * H1;
  return (
    <Box
      x0={4.54}
      x1={4.66}
      y0={0.2}
      y1={2.8}
      z0={z - 0.3}
      z1={z}
      stroke={hot ? SIGNAL : IVORY}
      strokeOpacity={hot ? 1 : 0.55}
      fill={hot ? SIGNAL : IVORY}
      fillOpacity={hot ? 0.28 : 0.08}
      sw={hot ? 1.4 : 1}
    />
  );
}

/** Red or teal marker, leader and label. */
function Marker({ resolved }: { resolved: boolean }) {
  const [cx, cy] = px(...CLASH_AT);
  const colour = resolved ? TEAL : SIGNAL;
  const lx = cx - 60;
  const ly = cy - 112;
  const text = resolved ? "CL-014 · Resolved" : "CL-014 · Duct vs Beam";
  const w = resolved ? 214 : 252;
  return (
    <g stroke="none">
      {!resolved && (
        <circle
          className="clash-pulse"
          cx={cx}
          cy={cy}
          r={9}
          fill="none"
          stroke={SIGNAL}
          strokeWidth={1.4}
        />
      )}
      <circle cx={cx} cy={cy} r={resolved ? 10 : 7.5} fill={colour} />
      {resolved && (
        <path
          d={`M${cx - 3.6},${cy + 0.2}L${cx - 1},${cy + 3}L${cx + 4},${cy - 3}`}
          stroke="var(--ink)"
          strokeWidth={1.8}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
      <path
        d={`M${cx},${cy - 10}V${ly + 34}`}
        stroke={colour}
        strokeWidth={1}
        fill="none"
      />
      <rect
        x={lx}
        y={ly}
        width={w}
        height={34}
        fill="var(--ink)"
        stroke={colour}
        strokeWidth={1.2}
      />
      <text
        x={lx + 14}
        y={ly + 17}
        dy="0.35em"
        fill={resolved ? TEAL : IVORY}
        fontSize={17}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {text}
      </text>
    </g>
  );
}

function Counter({
  open,
  x,
  y,
}: {
  open: number;
  x: number;
  y: number;
}) {
  const colour = open === 0 ? TEAL : SIGNAL;
  return (
    <g stroke="none">
      <rect
        x={x}
        y={y}
        width={236}
        height={40}
        fill="var(--ink)"
        stroke={colour}
        strokeOpacity={0.7}
        strokeWidth={1}
      />
      <text
        x={x + 16}
        y={y + 20}
        dy="0.35em"
        fill={colour}
        fontSize={18}
        style={{ fontFamily: "var(--font-mono)" }}
      >
        clashes open: {open}
      </text>
    </g>
  );
}

/* --------------------------- stage 6: the sheet ------------------------ */

function hatch(x0: number, y0: number, x1: number, y1: number, gap: number) {
  let d = "";
  for (let c = x0 + y0 + gap; c < x1 + y1; c += gap) {
    const xs = Math.max(x0, c - y1);
    const xe = Math.min(x1, c - y0);
    d += `M${xs},${c - xs}L${xe},${c - xe}`;
  }
  return d;
}

function SheetLayer() {
  const sc = 72;
  const ox = 100;
  const oy = 176;
  const X = (u: number) => ox + u * sc;
  const Y = (u: number) => oy + u * sc;
  const mono = { fontFamily: "var(--font-mono)" } as const;
  const display = { fontFamily: "var(--font-display)" } as const;

  // section
  const base = 690;
  const pitch = 34;
  const lvl = (i: number) => base - i * pitch;

  const dim = (x0: number, x1: number, y: number, label: string) => (
    <g key={`${x0}-${y}`}>
      <path d={`M${x0},${y}H${x1}`} />
      <path d={`M${x0 - 4},${y + 4}L${x0 + 4},${y - 4}M${x1 - 4},${y + 4}L${x1 + 4},${y - 4}`} />
      <path d={`M${x0},${y + 4}V${y + 22}M${x1},${y + 4}V${y + 22}`} strokeOpacity={0.3} />
      <text
        x={(x0 + x1) / 2}
        y={y - 6}
        textAnchor="middle"
        fill={IVORY}
        stroke="none"
        fontSize={10}
        style={mono}
      >
        {label}
      </text>
    </g>
  );

  return (
    <g fill="none" strokeLinecap="square" strokeLinejoin="miter">
      {/* sheet borders */}
      <rect x={16} y={16} width={768} height={728} stroke={IVORY} strokeOpacity={0.55} />
      <rect x={24} y={24} width={752} height={712} stroke={IVORY} strokeOpacity={0.25} />

      {/* grid */}
      <g stroke={IVORY} strokeOpacity={0.22} strokeWidth={0.8} strokeDasharray="10 3 2 3">
        {LETTERS.map((_, i) => (
          <path key={i} d={`M${X(i)},${oy - 14}V${Y(3) + 26}`} />
        ))}
        {[0, 1, 2, 3].map((j) => (
          <path key={j} d={`M${ox - 14},${Y(j)}H${X(6) + 30}`} />
        ))}
      </g>
      {LETTERS.map((l, i) => (
        <Bubble key={l} cx={X(i)} cy={oy - 26} label={l} r={11} opacity={0.6} />
      ))}
      {[0, 1, 2, 3].map((j) => (
        <Bubble key={j} cx={ox - 26} cy={Y(j)} label={String(j + 1)} r={11} opacity={0.6} />
      ))}

      {/* plan: walls, core, columns, duct */}
      <rect x={X(0)} y={Y(0)} width={6 * sc} height={3 * sc} stroke={IVORY} strokeWidth={2.2} strokeOpacity={0.9} />
      <rect x={X(0) + 6} y={Y(0) + 6} width={6 * sc - 12} height={3 * sc - 12} stroke={IVORY} strokeOpacity={0.4} />
      <rect x={X(2.5)} y={Y(0.9)} width={sc} height={1.2 * sc} stroke={IVORY} strokeWidth={1.6} strokeOpacity={0.85} />
      <path d={hatch(X(2.5), Y(0.9), X(3.5), Y(2.1), 7)} stroke={IVORY} strokeOpacity={0.4} strokeWidth={0.8} />
      {LETTERS.flatMap((_, i) =>
        [0, 1, 2, 3].map((j) => (
          <rect
            key={`${i}-${j}`}
            x={X(i) - 4}
            y={Y(j) - 4}
            width={8}
            height={8}
            fill={IVORY}
            fillOpacity={0.85}
            stroke="none"
          />
        )),
      )}
      <g stroke={TEAL} strokeWidth={1.6} strokeDasharray="8 4">
        <path d={`M${X(0.4)},${Y(1.45)}H${X(2.5)}M${X(3.5)},${Y(1.45)}H${X(5.6)}`} />
      </g>
      <text x={X(1.1)} y={Y(1.45) - 8} fill={TEAL} stroke="none" fontSize={10} style={mono}>
        SA-01
      </text>

      {/* section cut A–A */}
      <path
        d={`M${ox - 10},${Y(2.5)}H${X(6) + 14}`}
        stroke={IVORY}
        strokeOpacity={0.5}
        strokeDasharray="14 4 2 4"
        strokeWidth={1}
      />
      <Bubble cx={ox - 26} cy={Y(2.5)} label="A" r={10} opacity={0.8} />
      <Bubble cx={X(6) + 30} cy={Y(2.5)} label="A" r={10} opacity={0.8} />

      {/* dimensions */}
      <g stroke={IVORY} strokeOpacity={0.6} strokeWidth={0.9}>
        {LETTERS.slice(0, 6).map((_, i) => dim(X(i), X(i + 1), 108, "6000"))}
        {dim(X(0), X(6), 82, "36000")}
        {/* depth: a horizontal dimension centred on (40, mid-plan), turned upright */}
        <g transform={`rotate(-90 40 ${Y(1.5)})`}>
          {dim(40 - 1.5 * sc, 40 + 1.5 * sc, Y(1.5), "18000")}
        </g>
      </g>

      {/* labels */}
      <text x={X(0)} y={Y(3) + 52} fill={IVORY} stroke="none" fontSize={11} style={mono} fillOpacity={0.85}>
        LEVEL 03 PLAN · NTS
      </text>

      {/* section A–A */}
      <g stroke={IVORY} strokeOpacity={0.7}>
        {Array.from({ length: FL + 1 }, (_, i) => (
          <path key={`l${i}`} d={`M${X(0)},${lvl(i)}H${X(6)}`} strokeWidth={i === 0 ? 2 : 1.3} />
        ))}
        {LETTERS.map((_, i) => (
          <path key={`c${i}`} d={`M${X(i)},${lvl(0)}V${lvl(FL)}`} strokeOpacity={0.55} strokeWidth={1.4} />
        ))}
        <rect x={X(2.5)} y={lvl(FL)} width={sc} height={lvl(0) - lvl(FL)} strokeOpacity={0.9} strokeWidth={1.4} />
        <path d={hatch(X(2.5), lvl(FL), X(3.5), lvl(0), 7)} strokeOpacity={0.3} strokeWidth={0.8} />
        <rect x={X(2.2)} y={lvl(FL) - 12} width={1.8 * sc} height={12} strokeOpacity={0.6} />
      </g>
      <g stroke={TEAL} strokeWidth={2.4} strokeOpacity={0.95}>
        {Array.from({ length: 6 }, (_, i) => i + 1).map((k) => (
          <path
            key={`d${k}`}
            d={`M${X(0.4)},${lvl(k) + 7}H${X(2.5)}M${X(3.5)},${lvl(k) + 7}H${X(5.6)}`}
          />
        ))}
      </g>
      {Array.from({ length: FL + 1 }, (_, i) => (
        <g key={`t${i}`} stroke="none">
          <path d={`M${X(6) + 10},${lvl(i)}l6,-6h-12z`} fill={IVORY} fillOpacity={0.7} />
          <text x={X(6) + 24} y={lvl(i)} dy="0.35em" fill={IVORY} fillOpacity={0.75} fontSize={10} style={mono}>
            +{(i * 3).toFixed(2)}
          </text>
        </g>
      ))}
      <text x={X(0)} y={base + 30} fill={IVORY} stroke="none" fontSize={11} style={mono} fillOpacity={0.85}>
        SECTION A–A · NTS
      </text>

      {/* title block */}
      <g stroke={IVORY} strokeOpacity={0.6}>
        <rect x={612} y={600} width={164} height={136} />
        <path d="M612,650H776M612,680H776M612,708H776" strokeOpacity={0.35} />
      </g>
      <g stroke="none" fill={IVORY}>
        <text x={624} y={622} fontSize={15} style={display} letterSpacing="0.06em">
          STRANTUM
        </text>
        <text x={624} y={639} fontSize={8} fillOpacity={0.7} style={display} letterSpacing="0.28em">
          DIGITAL ENGINEERING
        </text>
        <text x={624} y={668} fontSize={9.5} style={mono} fill={TEAL}>
          DEMONSTRATION MODEL
        </text>
        <text x={624} y={697} fontSize={9.5} style={mono} fillOpacity={0.85}>
          SHEET A-101 · REV P01
        </text>
        <text x={624} y={724} fontSize={9.5} style={mono} fillOpacity={0.85}>
          PLAN + SECTION · NTS
        </text>
      </g>
    </g>
  );
}

/* -------------------------------- main -------------------------------- */

export function BuildingDiagram({
  stage = 1,
  className = "",
}: {
  stage?: Stage;
  className?: string;
}) {
  let body: ReactNode;

  if (stage === 6) {
    body = <SheetLayer />;
  } else {
    body = (
      <>
        <GridLayer />
        <ShellLayer faded={stage >= 2} />
        {stage >= 2 && <StructureLayer />}
        {stage >= 4 && <TransferBeam hot={stage === 4} />}
        {stage === 2 && <TransferBeam />}
        {stage === 3 && <TransferBeam />}
        {stage >= 3 && (
          <MepLayer
            clashLevel={stage >= 4 ? CLASH_LEVEL : undefined}
            hot={stage === 4}
            resolved={stage === 5}
          />
        )}
        {stage >= 4 && <Marker resolved={stage === 5} />}
        {stage === 4 && <Counter open={1} x={ZOOM.x + 18} y={ZOOM.y + 18} />}
        {stage === 5 && <Counter open={0} x={ZOOM.x + 18} y={ZOOM.y + 18} />}
      </>
    );
  }

  return (
    <svg
      viewBox={
        stage === 4 || stage === 5
          ? `${ZOOM.x} ${ZOOM.y} ${ZOOM.w} ${ZOOM.h}`
          : "0 0 800 760"
      }
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
    >
      {body}
    </svg>
  );
}
