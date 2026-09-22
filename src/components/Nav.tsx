"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/profile";
import { ease } from "@/lib/motion";
import { ThemeToggle } from "./ThemeToggle";
import { CvLink } from "./ui/CvLink";

/*
 * Every section maps to the nav item a reader would expect to be "in",
 * so the indicator never lingers on the wrong link between sections.
 */
const SECTION_TO_NAV: Record<string, string | null> = {
  about: "about",
  expertise: "expertise",
  toolkit: "expertise",
  experience: "experience",
  work: "work",
  approach: null,
  credentials: "credentials",
  contact: "contact",
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = Object.keys(SECTION_TO_NAV)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(SECTION_TO_NAV[e.target.id] ?? null);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const top = () => {
      if (window.scrollY < window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", top, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", top);
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="meta fixed left-4 top-4 z-[80] -translate-y-24 rounded-full bg-fg px-4 py-3 text-ink focus:translate-y-0"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500 ease-out-quint ${
          scrolled
            ? "border-b border-line bg-ink/75 py-3 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent py-5 md:py-6"
        }`}
      >
        <div className="shell flex items-center justify-between gap-6">
          <a href="#top" className="group flex items-baseline gap-2 font-display text-lg font-semibold tracking-tight" aria-label={`${site.name}, back to top`}>
            <span>
              MV<span className="text-champagne">.</span>
            </span>
            <span aria-hidden className="hidden text-xs font-medium tracking-[0.18em] text-fg-3 transition-colors group-hover:text-fg-2 sm:inline">
              / MANIK
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? "location" : undefined}
                    className={`relative block rounded-full px-4 py-2 font-display text-[0.8125rem] font-medium transition-colors ${
                      active === item.id ? "text-fg" : "text-fg-2 hover:text-fg"
                    }`}
                  >
                    {active === item.id && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full border border-line bg-fg/[0.05]"
                        transition={{ duration: 0.5, ease }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2.5">
            <span className="sm:hidden">
              <CvLink variant="icon" />
            </span>
            <span className="hidden sm:inline-flex">
              <CvLink />
            </span>
            <ThemeToggle />
            <a
              href="#contact"
              className="group hidden items-center gap-2 rounded-full border border-line-2 px-4 py-2 font-display text-[0.8125rem] font-medium text-fg transition-colors hover:border-cyan/50 hover:bg-fg/[0.05] xl:inline-flex"
            >
              Let’s connect
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-2 lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </div>

        {/* Reading progress: a hairline that only appears once the page moves */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className={`absolute inset-x-0 bottom-[-1px] h-px origin-left bg-gradient-to-r from-blue via-cyan to-champagne transition-opacity duration-500 ${
            scrolled ? "opacity-80" : "opacity-0"
          }`}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[70] flex flex-col bg-ink"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="shell flex items-center justify-between py-5">
              <span className="font-display text-lg font-semibold">
                MV<span className="text-champagne">.</span>
              </span>
              <div className="flex items-center gap-2.5">
                <ThemeToggle />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-2"
                  aria-label="Close menu"
                  autoFocus
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
            <nav aria-label="Mobile" className="shell flex flex-1 flex-col justify-center">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-2 font-display text-[clamp(2rem,9vw,2.75rem)] font-semibold tracking-[-0.03em]"
                    >
                      <span className="meta w-6 text-champagne">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="shell pb-5">
              <CvLink variant="block" />
            </div>
            <div className="shell flex flex-col gap-2 border-t border-line py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-sm text-fg-2">
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <span>
                {site.location.city}, {site.location.country}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
