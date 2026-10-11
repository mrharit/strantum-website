import type Lenis from "lenis";

// Holds the live Lenis instance (set by <LenisProvider />). It is null under
// prefers-reduced-motion and before Lenis has loaded, so every helper is a
// safe no-op in those cases.
let instance: Lenis | null = null;

export function setLenis(next: Lenis | null) {
  instance = next;
}

export function getLenis() {
  return instance;
}

export function stopScroll() {
  instance?.stop();
}

export function startScroll() {
  instance?.start();
}
