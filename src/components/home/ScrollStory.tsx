"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { TextLink } from "@/components/ui/Button";
import type { Chapter } from "@/content/home";

/**
 * Scroll story, Phase 2 version: real HTML captions beside a sticky diagram
 * that swaps state as each chapter passes the middle of the viewport.
 * Phase 3 replaces the diagram with the pinned Three.js scene on capable
 * desktops. This layout stays as the mobile / reduced-motion fallback.
 *
 * Below lg each chapter carries its own diagram inline, so no scroll tracking
 * is needed there and nothing depends on JavaScript.
 */
export function ScrollStory({
  chapters,
  diagrams,
}: {
  chapters: Chapter[];
  diagrams: ReactNode[];
}) {
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const items = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const root = rootRef.current;
    if (root) root.dataset.enhanced = "true"; // lets CSS dim inactive captions
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActive(Number((e.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => {
      io.disconnect();
      if (root) delete root.dataset.enhanced;
    };
  }, []);

  const current = chapters[active];

  return (
    <div
      ref={rootRef}
      className="group/story mt-16 grid gap-x-10 lg:grid-cols-12 lg:gap-x-12"
    >
      {/* Captions */}
      <ol className="lg:col-span-5">
        {chapters.map((c, i) => (
          <li
            key={c.n}
            ref={(el) => {
              items.current[i] = el;
            }}
            data-index={i}
            data-active={i === active}
            className="border-t border-rule py-10 transition-opacity duration-500 first:border-t-0 group-data-[enhanced=true]/story:data-[active=false]:lg:opacity-35 lg:flex lg:min-h-[72svh] lg:flex-col lg:justify-center lg:border-t-0 lg:py-12 motion-reduce:transition-none"
          >
            <p className="data flex items-center gap-3 text-(--accent)">
              <span>{String(c.n).padStart(2, "0")} / 06</span>
              <span aria-hidden="true" className="h-px w-8 bg-current opacity-50" />
            </p>
            <h3 className="display display-md mt-4">{c.name}</h3>
            <p className="eyebrow mt-3 !text-fg-muted">{c.service}</p>
            <p className="mt-5 max-w-md text-[1.0625rem] leading-relaxed text-fg-muted">
              {c.text}
            </p>
            <TextLink href={c.href} className="mt-6 self-start">
              View service
            </TextLink>

            {/* Inline diagram for phones and tablets */}
            <div
              aria-hidden="true"
              className="mt-8 border border-rule bg-raised/60 p-3 lg:hidden"
            >
              {diagrams[i]}
            </div>
          </li>
        ))}
      </ol>

      {/* Sticky diagram, desktop */}
      <div className="relative hidden lg:col-span-7 lg:block">
        <div
          aria-hidden="true"
          className="sticky top-[calc(var(--header-h)+1.5rem)] h-[calc(100svh-var(--header-h)-3rem)] min-h-[34rem] border border-rule bg-raised/50"
        >
          <div className="data absolute inset-x-0 top-0 z-10 flex items-center justify-between border-b border-rule bg-raised/80 px-5 py-3 text-fg-muted">
            <span>Chapter {String(current.n).padStart(2, "0")} / 06</span>
            <span className="eyebrow !text-fg-muted">{current.name}</span>
          </div>
          {diagrams.map((d, i) => (
            <div
              key={i}
              className={`absolute inset-0 flex items-center justify-center p-6 pt-14 transition-opacity duration-700 motion-reduce:duration-300 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="h-full w-full [&>svg]:h-full [&>svg]:w-full">
                {d}
              </div>
            </div>
          ))}
          {/* progress ticks */}
          <div className="absolute inset-x-5 bottom-4 flex gap-1.5">
            {chapters.map((c, i) => (
              <span
                key={c.n}
                className={`h-0.5 flex-1 transition-colors duration-500 motion-reduce:transition-none ${
                  i <= active ? "bg-(--accent)" : "bg-rule"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
