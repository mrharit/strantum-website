import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ink";
  size?: "sm" | "md";
  className?: string;
  onClick?: () => void;
};

const SIZES = {
  sm: "h-10 px-4 text-[0.875rem]",
  md: "h-12 px-6 text-[0.9375rem]",
};

// Primary = teal background with INK text (ivory on teal fails contrast, §3.1).
const VARIANTS = {
  primary: "bg-teal text-ink hover:brightness-110",
  outline:
    "border border-current/40 hover:border-teal hover:text-teal",
  // For use on a teal surface: ink background, ivory text (15:1).
  ink: "bg-ink text-ivory hover:brightness-150",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
}: ButtonProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`font-display inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] tracking-[0.02em] transition-[filter,color,border-color] duration-300 motion-reduce:transition-none ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

/** Secondary CTA: a circular arrow button with a label (§3.2). */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`font-display group inline-flex items-center gap-3 tracking-[0.02em] ${className}`}
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-full border border-current/40 transition-[background-color,color,border-color] duration-300 group-hover:border-teal group-hover:bg-teal group-hover:text-ink motion-reduce:transition-none">
        <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
      </span>
      <span>{children}</span>
    </Link>
  );
}

/** Inline text link in the accent colour: "View service →". */
export function TextLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`data group/tl inline-flex items-center gap-2 py-1 text-(--accent) ${className}`}
    >
      <span className="underline decoration-current/30 underline-offset-[5px] transition-[text-decoration-color] duration-300 group-hover/tl:decoration-current motion-reduce:transition-none">
        {children}
      </span>
      <ArrowRight className="size-4 transition-transform duration-300 group-hover/tl:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/tl:translate-x-0" />
    </Link>
  );
}
