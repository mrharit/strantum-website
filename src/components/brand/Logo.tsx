import { site } from "@/lib/site";

export type LogoVariant = "on-ink" | "on-ivory";
type LogoSize = "sm" | "md" | "lg";

// File convention (see public/brand/README.md):
//   logo-reversed.svg → for ink backgrounds  (variant "on-ink", the default)
//   logo.svg          → for ivory backgrounds (variant "on-ivory")
// The flags are set in next.config.ts, which checks public/brand at build time.
const FILES: Record<LogoVariant, { src: string; present: boolean }> = {
  "on-ink": {
    src: "/brand/logo-reversed.svg",
    present: Boolean(process.env.NEXT_PUBLIC_HAS_LOGO_REVERSED),
  },
  "on-ivory": {
    src: "/brand/logo.svg",
    present: Boolean(process.env.NEXT_PUBLIC_HAS_LOGO_PRIMARY),
  },
};

const SIZES: Record<LogoSize, { text: string; img: string }> = {
  sm: { text: "text-[1.05rem]", img: "h-7" },
  md: { text: "text-[1.375rem]", img: "h-9" },
  lg: { text: "text-[2rem]", img: "h-14" },
};

const COLOURS: Record<LogoVariant, { word: string; tagline: string }> = {
  "on-ink": { word: "text-ivory", tagline: "text-ivory-muted" },
  "on-ivory": { word: "text-ink", tagline: "text-ink-muted" },
};

const LABEL = `${site.name} — ${site.tagline}`;

/** The "A" with its crossbar replaced by the signal-red bar. Sized in em so it
 *  tracks the surrounding type (cap height 0.7em). */
function BarredA() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 78 70"
      className="mx-[0.05em] inline-block h-[0.7em] w-[0.78em] overflow-visible align-baseline"
    >
      <rect x="19" y="44" width="40" height="8.5" fill="var(--signal)" />
      <path
        d="M0 70 L39 0 L78 70 L68.3 70 L39 17.4 L9.7 70 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Logo({
  variant = "on-ink",
  size = "md",
  showTagline = true,
  className = "",
}: {
  variant?: LogoVariant;
  size?: LogoSize;
  showTagline?: boolean;
  className?: string;
}) {
  const file = FILES[variant];
  const s = SIZES[size];
  const c = COLOURS[variant];

  if (file.present) {
    return (
      // Plain <img>: SVG needs no optimisation and keeps it crisp at any size.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={file.src}
        alt={LABEL}
        className={`${s.img} w-auto ${className}`}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={LABEL}
      className={`inline-flex flex-col leading-none ${s.text} ${c.word} ${className}`}
    >
      <span
        aria-hidden="true"
        className="font-display inline-flex items-baseline uppercase tracking-[0.06em]"
      >
        STR
        <BarredA />
        NTUM
      </span>
      {showTagline && (
        <span
          aria-hidden="true"
          className={`font-display mt-[0.55em] block text-[0.36em] uppercase tracking-[0.3em] [text-align-last:justify] ${c.tagline}`}
        >
          {site.tagline}
        </span>
      )}
    </span>
  );
}
