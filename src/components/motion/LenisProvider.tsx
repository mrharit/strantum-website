"use client";

import { useEffect } from "react";
import { setLenis } from "@/lib/scroll";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Smooth scroll (Lenis) driven by the GSAP ticker so ScrollTrigger stays in
 * step. Mounted once in the root layout.
 *
 * - prefers-reduced-motion: Lenis is never created (native scroll, §7.3).
 * - Lenis, GSAP and ScrollTrigger are dynamically imported, so they stay out
 *   of the initial bundle and load after hydration.
 * - Cleanup fully tears down: Cache Components keeps hidden routes mounted
 *   (<Activity>), so nothing here may leak between effect runs.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let cancelled = false;
    let teardown: (() => void) | undefined;

    (async () => {
      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        autoRaf: false, // GSAP's ticker owns the frame loop
        anchors: { offset: -88 }, // clear the fixed header
      });
      const tick = (time: number) => lenis.raf(time * 1000);

      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);

      teardown = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    })();

    return () => {
      cancelled = true;
      teardown?.();
    };
  }, [reduced]);

  return <>{children}</>;
}
