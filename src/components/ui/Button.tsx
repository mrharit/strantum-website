import Link from "next/link";
import { ArrowRight } from "@/components/ui/icons";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
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
