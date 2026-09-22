"use client";

import { useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { site } from "@/content/profile";

export function Footer() {
  const reduce = useReducedMotion();
  const year = new Date().getFullYear();

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.querySelector<HTMLElement>("header a[href='#top']")?.focus({ preventScroll: true });
  };

  return (
    <footer className="relative border-t border-line">
      <div className="shell grid grid-cols-12 items-end gap-x-6 gap-y-10 py-12 lg:py-14">
        <div className="col-span-12 md:col-span-6">
          <p className="font-display text-[1.125rem] font-semibold uppercase tracking-[0.02em] text-fg">
            {site.name.replace(" V", "")} <span className="text-champagne">V</span>
          </p>
          <p className="meta mt-3 text-fg-3">SEO • Digital marketing • AEO</p>
        </div>

        <div className="col-span-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-6 md:col-span-6 md:justify-end">
          <ul className="flex items-center gap-7 font-display text-[0.875rem] font-medium text-fg-2">
            <li>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="u-link hover:text-fg">
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="u-link hover:text-fg">
                Email
              </a>
            </li>
          </ul>

          <button
            type="button"
            onClick={toTop}
            className="group inline-flex items-center gap-3 font-display text-[0.875rem] font-medium text-fg"
          >
            Back to top
            <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-line-2 transition-colors duration-300 group-hover:border-cyan/60">
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-500 ease-out-quint group-hover:-translate-y-7" aria-hidden />
              <ArrowUp className="absolute h-3.5 w-3.5 translate-y-7 text-cyan transition-transform duration-500 ease-out-quint group-hover:translate-y-0" aria-hidden />
            </span>
          </button>
        </div>

        <div className="col-span-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[0.8125rem] text-fg-3">
          <p suppressHydrationWarning>© {year} {site.fullName}</p>
          <p>
            {site.location.city}, {site.location.country}
          </p>
        </div>
      </div>
    </footer>
  );
}
