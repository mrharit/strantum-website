// One line drawing per service: the key frame of its Phase 4 micro-animation
// (brief §7.2). Static here. Parts that Phase 4 animates carry data-part.
// Colours: currentColor = the drawing, var(--accent) = teal (teal-ink on
// ivory), var(--signal) = clash red. No ids, so repeats are safe.

import type { ReactNode } from "react";

export type ServiceSlug =
  | "bim-modelling"
  | "coordination-clash-detection"
  | "scan-to-bim"
  | "as-built-fm"
  | "quantities-shop-drawings"
  | "4d-sequencing"
  | "infrastructure-bim"
  | "bid-support"
  | "bim-management";

const ACCENT = "var(--accent)";
const SIGNAL = "var(--signal)";

const mono = { fontFamily: "var(--font-mono)" } as const;

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 160 100"
      className="glyph h-full w-full"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.2}
      strokeLinecap="square"
      strokeLinejoin="miter"
    >
      {children}
    </svg>
  );
}

const Label = ({
  x,
  y,
  children,
  anchor = "middle",
  size = 6.5,
  fill = "currentColor",
  opacity = 0.75,
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  size?: number;
  fill?: string;
  opacity?: number;
}) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fontSize={size}
    fill={fill}
    fillOpacity={opacity}
    stroke="none"
    style={mono}
  >
    {children}
  </text>
);

/* 1 · BIM Modelling: LOD 100 → 400 on one column */
function Modelling() {
  const xs = [30, 64, 98, 132];
  return (
    <Frame>
      <path d="M10 78H150" strokeOpacity={0.5} />
      {/* LOD 100: mass block */}
      <rect x={xs[0] - 9} y={26} width={18} height={52} strokeDasharray="3 3" />
      {/* LOD 200: shaft + base plate */}
      <rect x={xs[1] - 8} y={30} width={16} height={48} />
      <rect x={xs[1] - 11} y={74} width={22} height={4} />
      {/* LOD 300: + capital and chamfer */}
      <rect x={xs[2] - 8} y={32} width={16} height={42} />
      <rect x={xs[2] - 11} y={74} width={22} height={4} />
      <rect x={xs[2] - 11} y={26} width={22} height={6} />
      <path d={`M${xs[2] - 8} 36l-3 -4M${xs[2] + 8} 36l3 -4`} />
      {/* LOD 400: + flutes and fixings */}
      <rect x={xs[3] - 8} y={32} width={16} height={42} />
      <rect x={xs[3] - 11} y={74} width={22} height={4} />
      <rect x={xs[3] - 11} y={26} width={22} height={6} />
      <path d={`M${xs[3] - 8} 36l-3 -4M${xs[3] + 8} 36l3 -4`} />
      <path d={`M${xs[3] - 3} 36V72M${xs[3] + 3} 36V72`} strokeOpacity={0.55} />
      <g data-part="accent" stroke={ACCENT}>
        <circle cx={xs[3] - 8} cy={76} r={1.3} />
        <circle cx={xs[3] + 8} cy={76} r={1.3} />
        <circle cx={xs[3] - 8} cy={29} r={1.3} />
        <circle cx={xs[3] + 8} cy={29} r={1.3} />
      </g>
      {xs.map((x, i) => (
        <Label key={x} x={x} y={92}>
          {(i + 1) * 100}
        </Label>
      ))}
    </Frame>
  );
}

/* 2 · Coordination & Clash Detection: beam × duct, then reroute */
function Clash() {
  return (
    <Frame>
      <path d="M12 12H148" strokeOpacity={0.5} />
      <path d="M16 12l-5 -5M30 12l-5 -5M44 12l-5 -5M58 12l-5 -5M72 12l-5 -5M86 12l-5 -5M100 12l-5 -5M114 12l-5 -5M128 12l-5 -5M142 12l-5 -5" strokeOpacity={0.3} strokeWidth={0.8} />
      {/* beam section */}
      <rect x={68} y={12} width={56} height={30} />
      {/* duct section, overlapping the beam */}
      <rect data-part="duct" x={86} y={34} width={48} height={26} />
      {/* the overlap */}
      <rect data-part="clash" x={86} y={34} width={38} height={8} fill={SIGNAL} fillOpacity={0.4} stroke={SIGNAL} />
      <circle data-part="clash" cx={105} cy={38} r={11} stroke={SIGNAL} strokeOpacity={0.6} />
      {/* rerouted position */}
      <rect data-part="accent" x={86} y={52} width={48} height={26} stroke={ACCENT} strokeDasharray="3 3" />
      <path data-part="accent" d="M110 62V74M106 70l4 4 4 -4" stroke={ACCENT} />
      <Label x={12} y={30} anchor="start" fill={SIGNAL} opacity={1}>
        CL-014
      </Label>
      <Label x={12} y={40} anchor="start">
        Duct vs
      </Label>
      <Label x={12} y={49} anchor="start">
        Beam
      </Label>
    </Frame>
  );
}

/* 3 · Scan to BIM: points on the left, solid walls on the right */
function ScanToBim() {
  // Deterministic jitter so server and client always agree.
  let seed = 7;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647 - 0.5;
  };
  const dots: [number, number][] = [];
  const edge = (x0: number, y0: number, x1: number, y1: number, n: number) => {
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      dots.push([x0 + (x1 - x0) * t + rnd() * 2.4, y0 + (y1 - y0) * t + rnd() * 2.4]);
    }
  };
  // wall outline, window, floor line: only the left part is dotted
  edge(18, 20, 90, 20, 14);
  edge(18, 20, 18, 82, 12);
  edge(18, 82, 90, 82, 14);
  edge(34, 36, 66, 36, 8);
  edge(34, 64, 66, 64, 8);
  edge(34, 36, 34, 64, 6);
  edge(66, 36, 66, 64, 6);
  for (let i = 0; i < 26; i++) {
    dots.push([20 + (rnd() + 0.5) * 68, 22 + (rnd() + 0.5) * 58]);
  }
  return (
    <Frame>
      <g fill="currentColor" stroke="none" fillOpacity={0.8}>
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={0.9} />
        ))}
      </g>
      {/* resolved geometry */}
      <path d="M90 20H142V82H90" />
      <path d="M104 36H128V64H104Z" strokeOpacity={0.9} />
      <path d="M104 50H128M116 36V64" strokeOpacity={0.45} strokeWidth={0.8} />
      <g data-part="accent" stroke={ACCENT}>
        <path d="M86 14V88" strokeDasharray="2 3" />
        <path d="M82 10l4 4 4 -4" />
      </g>
    </Frame>
  );
}

/* 4 · As-built & FM: dimmed model, asset tags */
function AsBuiltFm() {
  return (
    <Frame>
      <g strokeOpacity={0.4}>
        <rect x={52} y={22} width={92} height={62} />
        <path d="M52 42H144M52 63H144M82 22V84M113 22V84" />
      </g>
      <g data-part="accent" stroke={ACCENT}>
        <rect x={104} y={4} width={50} height={11} />
        <path d="M122 15L116 31" />
        <circle cx={116} cy={31} r={2} fill={ACCENT} />
        <rect x={4} y={46} width={40} height={11} />
        <path d="M44 52H60" />
        <circle cx={62} cy={52} r={2} fill={ACCENT} />
        <rect x={88} y={88} width={36} height={10} />
        <path d="M106 88L106 78" />
        <circle cx={106} cy={76} r={2} fill={ACCENT} />
      </g>
      <Label x={129} y={12.2} fill={ACCENT} opacity={1}>
        AHU-01
      </Label>
      <Label x={24} y={54} fill={ACCENT} opacity={1}>
        FCU-12
      </Label>
      <Label x={106} y={95.2} fill={ACCENT} opacity={1}>
        DB-03
      </Label>
    </Frame>
  );
}

/* 5 · Quantities & Shop Drawings: element → dimensioned drawing + table */
function Quantities() {
  return (
    <Frame>
      {/* iso block */}
      <path d="M34 22L56 33L34 44L12 33Z" />
      <path d="M12 33V55L34 66V44M56 33V55L34 66" />
      <path d="M62 50H78M74 46l4 4 -4 4" data-part="accent" stroke={ACCENT} />
      {/* dimensioned drawing */}
      <rect x={90} y={22} width={52} height={32} />
      <path d="M90 16H142M90 13V19M142 13V19" strokeWidth={0.9} />
      <path d="M148 22V54M145 22H151M145 54H151" strokeWidth={0.9} />
      <Label x={116} y={12}>3600</Label>
      {/* quantity table */}
      <g strokeOpacity={0.6} strokeWidth={0.9}>
        <path d="M90 64H150M90 74H150M90 84H150M90 94H150M90 64V94M126 64V94M150 64V94" />
      </g>
      <Label x={94} y={72} anchor="start">WALL</Label>
      <Label x={94} y={82} anchor="start">DOOR</Label>
      <Label x={94} y={92} anchor="start">DUCT</Label>
      <g data-part="accent">
        <Label x={146} y={72} anchor="end" fill={ACCENT} opacity={1}>48</Label>
        <Label x={146} y={82} anchor="end" fill={ACCENT} opacity={1}>12</Label>
        <Label x={146} y={92} anchor="end" fill={ACCENT} opacity={1}>96</Label>
      </g>
      <Label x={12} y={80} anchor="start">QTY</Label>
    </Frame>
  );
}

/* 6 · 4D Sequencing: floors by week, scrubber */
function FourD() {
  const rows = Array.from({ length: 6 }, (_, i) => i);
  const scrub = 98;
  return (
    <Frame>
      {rows.map((i) => {
        const y = 66 - i * 11;
        const built = i <= 3;
        return (
          <g key={i}>
            <rect
              x={14}
              y={y}
              width={56}
              height={9}
              strokeDasharray={built ? undefined : "3 3"}
              strokeOpacity={built ? 1 : 0.5}
              fill="currentColor"
              fillOpacity={built ? 0.14 : 0}
            />
            <path
              d={`M${78 + i * 8} ${y + 4.5}H${78 + i * 8 + 28}`}
              strokeWidth={4}
              strokeOpacity={built ? 0.9 : 0.35}
              strokeLinecap="butt"
            />
          </g>
        );
      })}
      <path d="M74 86H152" strokeOpacity={0.6} />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <path key={i} d={`M${78 + i * 9} 84V88`} strokeOpacity={0.6} />
      ))}
      <g data-part="accent" stroke={ACCENT}>
        <path d={`M${scrub} 8V86`} />
        <circle cx={scrub} cy={86} r={3.6} fill={ACCENT} />
      </g>
      <Label x={14} y={92} anchor="start">WK 01</Label>
      <Label x={152} y={96} anchor="end">WK 24</Label>
    </Frame>
  );
}

/* 7 · Infrastructure BIM: alignment + cross-section */
function Infrastructure() {
  const d = "M8 84C36 84 44 44 76 44S120 18 152 18";
  return (
    <Frame>
      <path d={d} strokeWidth={9} strokeOpacity={0.14} strokeLinecap="butt" />
      <path d={d} strokeWidth={9} strokeOpacity={0.5} strokeDasharray="0.1 100" />
      <path data-part="accent" d={d} stroke={ACCENT} strokeDasharray="5 3" strokeWidth={1.2} />
      {[
        [30, 76],
        [70, 45],
        [118, 28],
      ].map(([x, y], i) => (
        <g key={i} strokeOpacity={0.7} strokeWidth={0.9}>
          <path d={`M${x - 3} ${y + 7}L${x + 3} ${y - 7}`} />
        </g>
      ))}
      <Label x={32} y={96} anchor="start">CH 0+000</Label>
      {/* cross-section */}
      <g transform="translate(104 58)">
        <rect x={0} y={0} width={48} height={38} strokeOpacity={0.35} strokeWidth={0.8} />
        <path d="M2 28L12 28L16 20H32L36 28H46" />
        <path d="M2 28H46" strokeOpacity={0.4} strokeDasharray="2 2" />
        <path data-part="accent" d="M16 20H32" stroke={ACCENT} strokeWidth={2} />
        <path d="M6 33H42" strokeOpacity={0.5} strokeWidth={0.8} />
      </g>
    </Frame>
  );
}

/* 8 · Bid Support: drawing set fans out, totals, bid ready */
function Bid() {
  return (
    <Frame>
      {[30, 20, 10].map((a) => (
        <rect
          key={a}
          x={34}
          y={20}
          width={46}
          height={64}
          transform={`rotate(${a} 34 84)`}
          strokeOpacity={0.45}
        />
      ))}
      <rect x={34} y={20} width={46} height={64} fill="var(--surface)" />
      <path d="M40 30H74M40 36H64M40 42H70" strokeOpacity={0.5} strokeWidth={0.9} />
      <path d="M40 58H74M40 66H74M40 74H74" strokeOpacity={0.5} strokeWidth={0.9} />
      <path d="M62 58V74" strokeOpacity={0.5} strokeWidth={0.9} />
      <g data-part="accent" stroke={ACCENT}>
        <rect x={96} y={34} width={54} height={30} rx={2} />
        <path d="M104 49l5 5 9 -11" strokeWidth={1.6} />
      </g>
      <Label x={142} y={50} anchor="end" fill={ACCENT} opacity={1} size={7}>
        BID
      </Label>
      <Label x={142} y={59} anchor="end" fill={ACCENT} opacity={1} size={7}>
        READY
      </Label>
      <Label x={96} y={80} anchor="start">TOTALS</Label>
    </Frame>
  );
}

/* 9 · BIM Management: WIP → Shared → Published → Archived */
function Management() {
  const xs = [4, 44, 84, 124];
  const names = ["WIP", "SHARED", "PUBLISHED", "ARCHIVE"];
  return (
    <Frame>
      {xs.map((x, i) => (
        <g key={x}>
          <rect
            x={x}
            y={42}
            width={32}
            height={28}
            strokeDasharray={i === 0 ? "3 3" : undefined}
            strokeOpacity={i === 3 ? 0.5 : 1}
            stroke={i === 2 ? ACCENT : "currentColor"}
            fill={i === 2 ? ACCENT : "none"}
            fillOpacity={i === 2 ? 0.16 : 0}
            data-part={i === 2 ? "accent" : undefined}
          />
          <Label x={x + 16} y={59} fill={i === 2 ? ACCENT : "currentColor"} opacity={i === 3 ? 0.55 : 1} size={6.2}>
            {names[i]}
          </Label>
          {i < 3 && <path d={`M${x + 35} 56H${x + 41}M${x + 38.5} 53l3 3 -3 3`} strokeOpacity={0.7} />}
        </g>
      ))}
      {/* a file in transit */}
      <g data-part="accent" stroke={ACCENT}>
        <path d="M54 12H66L70 16V30H54Z" />
        <path d="M66 12V16H70" />
        <path d="M60 36V40M57 38l3 3 3 -3" />
      </g>
      <Label x={60} y={84} fill="currentColor" opacity={0.6}>
        status code + revision
      </Label>
    </Frame>
  );
}

const GLYPHS: Record<ServiceSlug, () => ReactNode> = {
  "bim-modelling": Modelling,
  "coordination-clash-detection": Clash,
  "scan-to-bim": ScanToBim,
  "as-built-fm": AsBuiltFm,
  "quantities-shop-drawings": Quantities,
  "4d-sequencing": FourD,
  "infrastructure-bim": Infrastructure,
  "bid-support": Bid,
  "bim-management": Management,
};

export function ServiceGlyph({ slug }: { slug: ServiceSlug }) {
  const G = GLYPHS[slug];
  return <G />;
}
