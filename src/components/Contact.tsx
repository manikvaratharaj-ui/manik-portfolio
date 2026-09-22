"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { contact, site } from "@/content/profile";
import { ease } from "@/lib/motion";
import { Magnetic } from "./ui/Magnetic";
import { CvLink } from "./ui/CvLink";
import { MaskLines } from "./ui/MaskLines";
import { SectionIntro } from "./ui/SectionIntro";

const mailto = `mailto:${site.email}?subject=${encodeURIComponent("Hello Manik")}`;

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-2 text-fg-2 transition-colors duration-300 hover:border-cyan/50 hover:text-fg"
      aria-label={copied ? "Email address copied" : "Copy email address"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "y" : "n"}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.25, ease }}
        >
          {copied ? <Check className="h-3.5 w-3.5 text-cyan" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
        </motion.span>
      </AnimatePresence>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden border-t border-line py-28 lg:pb-28 lg:pt-28">
      {/* Contour rings echo the hero, so the page opens and closes on the same motif */}
      <svg
        aria-hidden
        viewBox="0 0 800 800"
        fill="none"
        className="pointer-events-none absolute -bottom-[38%] -right-[18%] -z-10 w-[min(110vw,58rem)] opacity-70 md:-right-[8%]"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <motion.ellipse
            key={i}
            cx="400"
            cy="400"
            rx={120 + i * 34}
            ry={96 + i * 30}
            transform={`rotate(${-18 + i * 2} 400 400)`}
            stroke={i === 4 ? "rgb(var(--champ-rgb) / 0.45)" : "rgb(var(--fg-rgb) / 0.07)"}
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, delay: i * 0.08, ease }}
          />
        ))}
      </svg>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-[60%] w-[90%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgb(var(--blue-rgb)/0.10),transparent_65%)]"
      />

      <div className="shell">
        <SectionIntro index="08" label="Contact" />

        <h2 id="contact-title" className="display mt-8 text-[clamp(2rem,4.4vw,4.25rem)] lg:mt-10">
          <MaskLines lines={contact.headline} stagger={0.1} />
        </h2>

        <div className="mt-16 grid grid-cols-12 items-end gap-x-6 gap-y-16 lg:mt-24">
          <div className="col-span-12 lg:col-span-5">
            <p className="max-w-md text-[1rem] leading-[1.7] text-fg-2">
              Available for digital marketing consulting — with a focus on SEO, AEO, B2B growth, and marketing automation.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <Magnetic className="inline-block" strength={0.3} max={12}>
              <a
                href={mailto}
                className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-fg py-5 pl-8 pr-6 font-display text-[1rem] font-semibold tracking-[-0.005em] text-ink"
              >
                <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-cyan transition-transform duration-500 ease-out-quint group-hover:scale-y-100" />
                <span className="relative">Let’s connect</span>
                <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-ink text-fg">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-quint group-hover:-translate-y-6 group-hover:translate-x-6" aria-hidden />
                  <ArrowUpRight className="absolute h-4 w-4 -translate-x-6 translate-y-6 transition-transform duration-500 ease-out-quint group-hover:translate-x-0 group-hover:translate-y-0" aria-hidden />
                </span>
              </a>
            </Magnetic>
            <CvLink variant="text" />
            </div>
          </div>

          <dl className="col-span-12 border-t border-line-2 lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-1 gap-y-2 border-b border-line py-5 sm:grid-cols-[8rem_1fr] sm:items-center sm:gap-x-5 sm:py-6">
              <dt className="meta text-fg-3">Email</dt>
              <dd className="flex min-w-0 items-center justify-between gap-4">
                <a href={`mailto:${site.email}`} className="u-link truncate font-display text-[clamp(1rem,1.4vw,1.2rem)] font-medium text-fg">
                  {site.email}
                </a>
                <CopyEmail />
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-y-2 border-b border-line py-5 sm:grid-cols-[8rem_1fr] sm:items-center sm:gap-x-5 sm:py-6">
              <dt className="meta text-fg-3">LinkedIn</dt>
              <dd className="min-w-0">
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex max-w-full items-center gap-2 font-display text-[clamp(1rem,1.4vw,1.2rem)] font-medium text-fg"
                >
                  <span className="u-link truncate">manikkavasagam-varatharaj</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-fg-3 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-1 gap-y-2 border-b border-line py-5 sm:grid-cols-[8rem_1fr] sm:items-center sm:gap-x-5 sm:py-6">
              <dt className="meta text-fg-3">Location</dt>
              <dd className="font-display text-[clamp(1rem,1.4vw,1.2rem)] font-medium text-fg">
                {site.location.city}, {site.location.region}, {site.location.country}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
