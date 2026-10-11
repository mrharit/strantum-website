"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Chevron,
  CloseIcon,
  MenuIcon,
} from "@/components/ui/icons";
import {
  primaryLinks,
  quoteLink,
  services,
  solutions,
  type NavItem,
} from "@/content/nav";
import { startScroll, stopScroll } from "@/lib/scroll";

type MenuId = "services" | "solutions";

const SCROLL_THRESHOLD = 80; // px before the bar turns solid (§5.1)

const MENUS: Record<
  MenuId,
  { label: string; href: string; intro: string; cta: string; items: NavItem[] }
> = {
  services: {
    label: "Services",
    href: "/services",
    intro: "Nine services that share one ISO\u00A019650\u2060-\u2060aligned process.",
    cta: "All services",
    items: services,
  },
  solutions: {
    label: "Solutions",
    href: "/solutions",
    intro: "Pick your role to see what we deliver and how we work with your team.",
    cta: "All solutions",
    items: solutions,
  },
};

// --- scroll state, as an external store so only boolean flips re-render ----
function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > SCROLL_THRESHOLD;
const getScrolledServer = () => false;

const navLink =
  "font-display relative px-3 py-2 text-[0.9375rem] tracking-[0.02em] text-fg transition-colors duration-300 hover:text-(--accent) motion-reduce:transition-none " +
  "after:absolute after:inset-x-3 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-(--accent) after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100 motion-reduce:after:transition-none";

export function Header() {
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrolled,
    getScrolledServer,
  );

  // Open/closed state is tied to the pathname it was opened on, so menus close
  // on navigation without an effect (and survive <Activity> route hiding).
  const [menuState, setMenuState] = useState<{
    id: MenuId;
    path: string;
  } | null>(null);
  const menu = menuState?.path === pathname ? menuState.id : null;
  const [mobileAt, setMobileAt] = useState<string | null>(null);
  const mobileOpen = mobileAt === pathname;
  const [mobileSection, setMobileSection] = useState<MenuId | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileFirstRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Partial<Record<MenuId, HTMLButtonElement | null>>>(
    {},
  );
  const closeTimer = useRef<number | undefined>(undefined);
  const baseId = useId();

  const openMenu = useCallback(
    (id: MenuId) => {
      window.clearTimeout(closeTimer.current);
      setMenuState({ id, path: pathname });
    },
    [pathname],
  );
  const scheduleClose = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenuState(null), 140);
  }, []);
  const closeAll = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setMenuState(null);
    setMobileAt(null);
  }, []);

  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Escape closes whatever is open and hands focus back to its trigger.
  useEffect(() => {
    if (!menu && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (menu) triggerRefs.current[menu]?.focus();
      else toggleRef.current?.focus();
      closeAll();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menu, mobileOpen, closeAll]);

  // Mobile menu: lock page scroll (CSS class + Lenis) while it is open.
  useEffect(() => {
    if (!mobileOpen) return;
    document.documentElement.classList.add("menu-open");
    stopScroll();
    return () => {
      document.documentElement.classList.remove("menu-open");
      startScroll();
    };
  }, [mobileOpen]);

  // Keep Tab inside the header + overlay while the mobile menu is open.
  const onHeaderKeyDown = (e: React.KeyboardEvent) => {
    if (!mobileOpen || e.key !== "Tab" || !headerRef.current) return;
    const focusable = Array.from(
      headerRef.current.querySelectorAll<HTMLElement>("a[href], button"),
    ).filter((el) => el.getClientRects().length > 0);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const toggleMobile = () => {
    if (mobileOpen) {
      setMobileAt(null);
    } else {
      setMenuState(null);
      setMobileAt(pathname);
      requestAnimationFrame(() => mobileFirstRef.current?.focus());
    }
  };

  const solid = scrolled || mobileOpen || menu !== null;

  return (
    <header
      ref={headerRef}
      onKeyDown={onHeaderKeyDown}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Background layer. Kept separate from the header: backdrop-filter would
          otherwise become the containing block for the fixed mobile overlay. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 border-b transition-[background-color,border-color,backdrop-filter] duration-300 motion-reduce:transition-none ${
          mobileOpen
            ? "border-rule bg-canvas"
            : solid
              ? "border-rule bg-raised/90 backdrop-blur-lg"
              : "border-transparent bg-transparent"
        }`}
      />

      {/* No positioned ancestor here: the mega panels size against the header. */}
      <div className="container-page flex h-[var(--header-h)] items-center justify-between gap-4">
        <Link href="/" onClick={closeAll} className="relative z-50 shrink-0">
          <Logo variant="on-ivory" size="md" />
        </Link>

        <nav aria-label="Primary" className="hidden self-stretch lg:block">
          <ul className="flex h-full items-stretch gap-1">
            {(Object.keys(MENUS) as MenuId[]).map((id) => {
              const m = MENUS[id];
              const open = menu === id;
              const panelId = `${baseId}-${id}`;
              return (
                <li
                  key={id}
                  className="flex items-center"
                  onMouseEnter={() => openMenu(id)}
                  onMouseLeave={scheduleClose}
                  onBlur={(e) => {
                    // Close when focus moves to another control. A null target
                    // (click on empty panel space) leaves it open.
                    const next = e.relatedTarget as Node | null;
                    if (next && !e.currentTarget.contains(next)) {
                      setMenuState(null);
                    }
                  }}
                >
                  <div className="flex items-center">
                    <Link
                      href={m.href}
                      onClick={closeAll}
                      aria-current={
                        pathname === m.href || pathname.startsWith(`${m.href}/`)
                          ? "page"
                          : undefined
                      }
                      className={`${navLink} pr-1`}
                    >
                      {m.label}
                    </Link>
                    <button
                      type="button"
                      ref={(el) => {
                        triggerRefs.current[id] = el;
                      }}
                      aria-expanded={open}
                      aria-controls={panelId}
                      aria-label={`${m.label} menu`}
                      onClick={() => (open ? setMenuState(null) : openMenu(id))}
                      className="grid size-8 place-items-center text-fg transition-colors duration-300 hover:text-(--accent) motion-reduce:transition-none"
                    >
                      <Chevron
                        className={`size-3.5 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>

                  <MegaPanel
                    id={panelId}
                    open={open}
                    menu={m}
                    onNavigate={closeAll}
                  />
                </li>
              );
            })}
            {primaryLinks.map((l) => (
              <li key={l.href} className="flex items-center">
                <Link
                  href={l.href}
                  onClick={closeAll}
                  aria-current={
                    pathname === l.href || pathname.startsWith(`${l.href}/`)
                      ? "page"
                      : undefined
                  }
                  className={navLink}
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative z-50 flex items-center gap-2">
          {/* Always visible, including on mobile (§5.1). */}
          <Button href={quoteLink.href} size="sm" onClick={closeAll}>
            {quoteLink.title}
          </Button>
          <button
            type="button"
            ref={toggleRef}
            onClick={toggleMobile}
            aria-expanded={mobileOpen}
            aria-controls={`${baseId}-mobile`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center text-fg transition-colors duration-300 hover:text-(--accent) motion-reduce:transition-none lg:hidden"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu */}
      <div
        id={`${baseId}-mobile`}
        data-lenis-prevent
        // Visibility must flip instantly on open (so focus() works on the first
        // frame) and only after the fade on close. A plain `transition` on
        // visibility starts at `hidden`, which silently rejects focus().
        className={`grain surface-ivory fixed inset-0 z-40 overflow-y-auto overscroll-contain pt-[var(--header-h)] lg:hidden ${
          mobileOpen
            ? "visible opacity-100 [transition:opacity_300ms,visibility_0s]"
            : "invisible opacity-0 [transition:opacity_300ms,visibility_0s_linear_300ms]"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="container-page flex min-h-full flex-col pb-10 pt-4"
        >
          <ul>
            {(Object.keys(MENUS) as MenuId[]).map((id, i) => {
              const m = MENUS[id];
              const open = mobileSection === id;
              const sectionId = `${baseId}-m-${id}`;
              return (
                <li key={id} className="border-b border-rule">
                  <button
                    type="button"
                    ref={i === 0 ? mobileFirstRef : undefined}
                    aria-expanded={open}
                    aria-controls={sectionId}
                    onClick={() => setMobileSection(open ? null : id)}
                    className="font-display flex w-full items-center justify-between py-5 text-left text-[1.5rem]"
                  >
                    {m.label}
                    <Chevron
                      className={`size-5 transition-transform duration-300 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  <div id={sectionId} hidden={!open} className="pb-5">
                    <Link
                      href={m.href}
                      onClick={closeAll}
                      className="data mb-3 flex items-center gap-2 py-2 text-(--accent)"
                    >
                      {m.cta} <ArrowRight className="size-4" />
                    </Link>
                    <ul className="grid gap-1">
                      {m.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={closeAll}
                            className="block py-2"
                          >
                            <span className="font-display block text-[1.0625rem]">
                              {item.title}
                            </span>
                            <span className="block text-[0.9375rem] leading-snug text-fg-muted">
                              {item.blurb}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
            {primaryLinks.map((l) => (
              <li key={l.href} className="border-b border-rule">
                <Link
                  href={l.href}
                  onClick={closeAll}
                  className="font-display block py-5 text-[1.5rem]"
                >
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button
              href={quoteLink.href}
              onClick={closeAll}
              className="w-full"
            >
              {quoteLink.title}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

function MegaPanel({
  id,
  open,
  menu,
  onNavigate,
}: {
  id: string;
  open: boolean;
  menu: (typeof MENUS)[MenuId];
  onNavigate: () => void;
}) {
  return (
    <div
      id={id}
      className={`absolute inset-x-0 top-full border-b border-rule bg-raised shadow-[0_28px_48px_-30px_rgba(3,18,17,0.35)] transition-[opacity,transform,visibility] duration-300 motion-reduce:translate-y-0 motion-reduce:transition-opacity ${
        open
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-2 opacity-0"
      }`}
    >
      <div className="container-page grid grid-cols-12 gap-10 py-10">
        <div className="col-span-3 flex flex-col items-start justify-between gap-8">
          <div>
            <p className="eyebrow">{menu.label}</p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-fg-muted">
              {menu.intro}
            </p>
          </div>
          <Link
            href={menu.href}
            onClick={onNavigate}
            className="font-display group inline-flex items-center gap-3 text-[0.9375rem]"
          >
            <span className="grid size-10 place-items-center rounded-full border border-current/40 transition-[background-color,color,border-color] duration-300 group-hover:border-(--accent) group-hover:bg-teal group-hover:text-ink motion-reduce:transition-none">
              <ArrowRight className="size-4" />
            </span>
            {menu.cta}
          </Link>
        </div>

        <ul className="col-span-9 grid grid-cols-3 gap-x-8 gap-y-7">
          {menu.items.map((item, i) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="group block border-t border-rule pt-4"
              >
                <span className="data text-(--accent)">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display mt-1 block text-[1.0625rem] leading-snug transition-colors duration-300 group-hover:text-(--accent) motion-reduce:transition-none">
                  {item.title}
                </span>
                <span className="mt-1 block text-[0.875rem] leading-snug text-fg-muted">
                  {item.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
