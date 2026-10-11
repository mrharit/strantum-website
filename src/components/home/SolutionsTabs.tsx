"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { TextLink } from "@/components/ui/Button";
import type { Solution } from "@/content/home";

/**
 * Role tabs (WAI-ARIA tabs pattern: arrow keys, Home/End, roving tabindex).
 * Server HTML contains every panel. The <noscript> rule reveals them all and
 * hides the tab list, so the content is complete with JavaScript off. It sits
 * in `@layer base` on purpose: Tailwind's preflight sets `[hidden]{display:none
 * !important}` in that layer, and for !important a layered rule beats an
 * unlayered one, so the override has to live in the same layer.
 */
export function SolutionsTabs({ solutions }: { solutions: Solution[] }) {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number) => {
    const next = (i + solutions.length) % solutions.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        go(i + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        go(i - 1);
        break;
      case "Home":
        e.preventDefault();
        go(0);
        break;
      case "End":
        e.preventDefault();
        go(solutions.length - 1);
        break;
    }
  };

  return (
    <div data-solutions className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
      <noscript>
        <style>{`@layer base{[data-solutions] [role="tabpanel"][hidden]{display:block!important}[data-solutions] [role="tablist"]{display:none!important}}[data-solutions] [role="tabpanel"]{border-top:1px solid var(--line);padding-top:2.5rem;margin-bottom:2.5rem}`}</style>
      </noscript>

      <div
        role="tablist"
        aria-label="Solutions by role"
        className="-mx-5 flex gap-1 overflow-x-auto px-5 pb-2 lg:col-span-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {solutions.map((s, i) => {
          const selected = i === active;
          return (
            <button
              key={s.slug}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`tab-${s.slug}`}
              aria-selected={selected}
              aria-controls={`panel-${s.slug}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`font-display shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-left text-[1rem] transition-colors duration-300 motion-reduce:transition-none lg:whitespace-normal lg:border-b lg:border-l-2 lg:border-b-line lg:py-5 lg:pl-6 lg:text-[1.1875rem] ${
                selected
                  ? "border-teal text-ivory lg:border-l-teal"
                  : "border-transparent text-ivory-muted hover:text-ivory lg:border-l-transparent"
              }`}
            >
              {s.role}
            </button>
          );
        })}
      </div>

      <div className="lg:col-span-8">
        {solutions.map((s, i) => (
          <div
            key={s.slug}
            role="tabpanel"
            id={`panel-${s.slug}`}
            aria-labelledby={`tab-${s.slug}`}
            hidden={i !== active}
            tabIndex={0}
            className="focus-visible:outline-offset-8"
          >
            <h3 className="display display-md">{s.role}</h3>

            <div className="mt-10 grid gap-10 md:grid-cols-2 md:gap-12">
              <div>
                <p className="eyebrow">The problem</p>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-ivory-muted">
                  {s.problem}
                </p>
              </div>
              <div>
                <p className="eyebrow">What we deliver</p>
                <p className="mt-4 text-[1.0625rem] leading-relaxed">
                  {s.deliver}
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <p className="eyebrow">Deliverables</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.deliverables.map((d) => (
                  <li key={d} className="chip text-ivory">
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
              <p className="data flex flex-wrap items-center gap-x-3 gap-y-1 text-ivory-muted">
                <span>Most used</span>
                {s.services.map((sv) => (
                  <Link
                    key={sv.href}
                    href={sv.href}
                    className="text-ivory underline decoration-current/30 underline-offset-[5px] transition-[text-decoration-color] hover:decoration-current"
                  >
                    {sv.title}
                  </Link>
                ))}
              </p>
              <TextLink href={`/solutions/${s.slug}`}>View solution</TextLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
