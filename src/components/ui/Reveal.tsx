"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

// One shared observer for every reveal on the page.
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (el.dataset.reveal) el.dataset.reveal = "shown";
          if (el.dataset.revealGroup) el.dataset.revealGroup = "shown";
          observer?.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
  }
  return observer;
}

/**
 * Fades an element in when it scrolls into view.
 * - The hidden state is applied here, on the client, so with JavaScript off the
 *   content is simply visible.
 * - `group`: the wrapper reveals and its `.rv` children stagger via `--i`.
 * - Reduced motion keeps the fade and drops the movement (see globals.css).
 * - Safe under <Activity>: effects re-run when a hidden route returns, and an
 *   already-shown element stays shown.
 */
export function Reveal({
  as: Tag = "div",
  group = false,
  delay = 0,
  className,
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  group?: boolean;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const key = group ? "revealGroup" : "reveal";
    if (el.dataset[key] === "shown") return;
    el.dataset[key] = "pending";
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, [group]);

  return (
    <Tag
      ref={ref}
      className={className}
      style={
        { "--reveal-delay": `${delay}ms`, ...style } as CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
