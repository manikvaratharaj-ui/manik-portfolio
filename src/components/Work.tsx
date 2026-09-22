"use client";

import { AnimatePresence, motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { caseStudies, type CaseStudy } from "@/content/profile";
import { ease } from "@/lib/motion";
import { useLive } from "@/lib/useLive";
import { MaskLines } from "./ui/MaskLines";
import { SectionIntro } from "./ui/SectionIntro";
import { WorkVisual } from "./WorkVisual";

const pad = (n: number) => String(n + 1).padStart(2, "0");
const total = String(caseStudies.length).padStart(2, "0");

function Stats({ stats, large }: { stats: CaseStudy["stats"]; large?: boolean }) {
  if (!stats.length) return null;
  return (
    <dl className={`grid grid-cols-2 gap-6 ${large ? "max-w-xl" : ""}`}>
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col-reverse border-l border-champagne/40 pl-4">
          <dt className="mt-2 text-[0.8125rem] leading-snug text-fg-2">{s.label}</dt>
          <dd className={`font-display font-semibold leading-none tracking-[-0.04em] text-fg ${large ? "text-5xl" : "text-[2.4rem]"}`}>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function CaseRow({ cs, i, onOpen }: { cs: CaseStudy; i: number; onOpen: (i: number, el: HTMLElement) => void }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const flip = i % 2 === 1;
  const live = useLive();
  // Depth on scroll: the visual rises into place while the big number drifts the other way.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const visY = useTransform(scrollYProgress, [0, 1], [56, -56]);
  const visScale = useTransform(scrollYProgress, [0, 0.35], [0.94, 1]);
  const numY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <article ref={ref} aria-labelledby={`cs-row-${cs.slug}`} className="group relative grid grid-cols-12 gap-x-6 gap-y-10 border-t border-line py-12 lg:py-20">
      <motion.div style={live ? { y: visY, scale: visScale } : undefined} className={`col-span-12 lg:col-span-7 ${flip ? "lg:col-start-6 lg:row-start-1" : ""}`}>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
         
          onClick={(e) => onOpen(i, e.currentTarget)}
          className="spotlight elev elev-hover relative block aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-[20px] border border-line bg-ink-2 transition-[border-color,box-shadow] duration-500 group-hover:border-blue-2/35 group-hover:shadow-[0_0_0_1px_rgb(var(--blue2-rgb)/0.08),0_30px_80px_-40px_rgb(var(--blue-rgb)/0.45)]"
        >
          <span className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_0%,rgb(var(--blue-rgb)/0.12),transparent_60%)]" />
          <span className="absolute inset-0 block transition-transform duration-[1100ms] ease-out-quint group-hover:scale-[1.045] group-hover:-translate-y-1">
            <WorkVisual motif={cs.motif} play={inView} />
          </span>
          <span className="meta absolute bottom-5 left-6 text-fg-3">{cs.context}</span>
        </button>
      </motion.div>

      <div className={`col-span-12 flex flex-col lg:col-span-5 ${flip ? "lg:col-start-1 lg:row-start-1 lg:pr-6" : "lg:pl-6"}`}>
        <motion.span aria-hidden style={live ? { y: numY } : undefined} className="font-display text-[4.25rem] font-semibold leading-none tracking-[-0.05em] text-fg/[0.12] transition-colors duration-500 group-hover:text-fg/[0.32] lg:text-[5.5rem]">
          {pad(i)}
        </motion.span>
        <p className="meta mt-6 text-champagne">{cs.category}</p>
        <h3 id={`cs-row-${cs.slug}`} className="mt-4 font-display text-[clamp(1.4rem,2vw,1.9rem)] font-semibold leading-[1.12] tracking-[-0.025em] text-fg">
          {cs.title}
        </h3>
        <p className="mt-5 max-w-lg text-[1rem] leading-[1.7] text-fg-2">{cs.summary}</p>

        {cs.stats.length > 0 && (
          <div className="mt-8">
            <Stats stats={cs.stats} />
          </div>
        )}

        <p className="mt-8 text-[0.8125rem] text-fg-3">
          <span className="text-fg-2">Tools</span>
          <span aria-hidden className="mx-3 inline-block h-px w-4 align-middle bg-line-2" />
          {cs.tools.join(", ")}
        </p>

        <div className="mt-9">
          <button
            type="button"
            onClick={(e) => onOpen(i, e.currentTarget)}
            className="group/btn inline-flex items-center gap-3 font-display text-[0.9375rem] font-semibold text-fg"
          >
            <span className="u-link u-link-static">View case study</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-2 transition-[transform,background-color,border-color] duration-500 ease-out-quint group-hover:translate-x-1.5 group-hover:border-cyan/50 group-hover/btn:bg-fg/[0.05]">
              <ArrowRight className="h-4 w-4" aria-hidden />
            </span>
            <span className="sr-only">: {cs.title}</span>
          </button>
        </div>
      </div>
    </article>
  );
}

const PARTS = ["Challenge", "Strategy", "Execution", "Tools", "Outcome"] as const;

function Part({ n, label, children }: { n: number; label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-line py-10">
      <h3 className="col-span-12 flex items-baseline gap-4 md:col-span-3">
        <span className="meta text-champagne">{String(n).padStart(2, "0")}</span>
        <span className="font-display text-lg font-semibold text-fg">{label}</span>
      </h3>
      <div className="col-span-12 text-[1rem] leading-[1.7] text-fg-2 md:col-span-8 md:col-start-5">{children}</div>
    </div>
  );
}

function CaseStudyDialog({ index, onClose, onGo }: { index: number | null; onClose: () => void; onGo: (i: number) => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cs = index === null ? null : caseStudies[index];

  useEffect(() => {
    if (index === null) return;
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const f = dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, onClose]);

  useEffect(() => {
    dialogRef.current?.scrollTo({ top: 0 });
  }, [index]);

  const next = index === null ? 0 : (index + 1) % caseStudies.length;

  return (
    <AnimatePresence>
      {cs && index !== null && (
        <motion.div
          key="case-dialog"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cs-title"
          className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-ink"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="sticky top-0 z-10 border-b border-line bg-ink/80 backdrop-blur-xl">
            <div className="shell flex items-center justify-between py-4">
              <span className="meta text-fg-3">
                Case study <span className="text-champagne">{pad(index)}</span> / {total}
              </span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="group inline-flex items-center gap-3 rounded-full border border-line-2 py-2 pl-4 pr-2 font-display text-sm font-medium text-fg transition-colors hover:border-cyan/50"
              >
                Close
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-fg/[0.06] transition-transform duration-500 group-hover:rotate-90">
                  <X className="h-3.5 w-3.5" aria-hidden />
                </span>
              </button>
            </div>
          </div>

          <motion.article
            key={cs.slug}
            className="shell pb-24 pt-12 lg:pt-16"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease }}
          >
            <div className="grid grid-cols-12 gap-x-6 gap-y-8">
              <div className="col-span-12 lg:col-span-8">
                <p className="meta text-champagne">{cs.category}</p>
                <h2 id="cs-title" className="mt-5 font-display text-[clamp(1.8rem,3.4vw,3.2rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-fg">
                  {cs.title}
                </h2>
                <p className="mt-6 max-w-2xl text-[1.125rem] leading-[1.7] text-fg-2">{cs.summary}</p>
              </div>
              <dl className="col-span-12 space-y-5 self-end text-sm lg:col-span-3 lg:col-start-10">
                <div>
                  <dt className="meta text-fg-3">Context</dt>
                  <dd className="mt-1.5 text-fg">{cs.context}</dd>
                </div>
                <div>
                  <dt className="meta text-fg-3">Period</dt>
                  <dd className="mt-1.5 text-fg">{cs.period}</dd>
                </div>
              </dl>
            </div>

            <div className="relative mt-14 aspect-[16/9] overflow-hidden rounded-[26px] border border-line bg-ink-2 md:aspect-[16/8]">
              <span className="absolute inset-0 bg-[radial-gradient(120%_80%_at_80%_0%,rgb(var(--blue-rgb)/0.14),transparent_60%)]" />
              <WorkVisual motif={cs.motif} play />
            </div>

            <div className="mt-16">
              <Part n={1} label={PARTS[0]}>
                <p className="max-w-2xl">{cs.challenge}</p>
              </Part>
              <Part n={2} label={PARTS[1]}>
                <p className="max-w-2xl">{cs.strategy}</p>
              </Part>
              <Part n={3} label={PARTS[2]}>
                <ul className="max-w-2xl space-y-3">
                  {cs.execution.map((e) => (
                    <li key={e} className="flex gap-4">
                      <span aria-hidden className="mt-[0.75em] block h-px w-3 shrink-0 bg-cyan" />
                      {e}
                    </li>
                  ))}
                </ul>
              </Part>
              <Part n={4} label={PARTS[3]}>
                <ul className="flex flex-wrap gap-2">
                  {cs.tools.map((t) => (
                    <li key={t} className="rounded-full border border-line-2 px-3.5 py-1.5 text-[0.875rem] text-fg">
                      {t}
                    </li>
                  ))}
                </ul>
              </Part>
              <Part n={5} label={PARTS[4]}>
                <p className="max-w-2xl text-fg">{cs.outcome}</p>
                {cs.stats.length > 0 && (
                  <div className="mt-8">
                    <Stats stats={cs.stats} large />
                  </div>
                )}
              </Part>
            </div>

            <button
              type="button"
              onClick={() => onGo(next)}
              className="group mt-10 flex w-full items-end justify-between gap-6 border-t border-line pt-10 text-left"
            >
              <span>
                <span className="meta text-fg-3">Next case study</span>
                <span className="mt-3 block max-w-3xl font-display text-[clamp(1.3rem,2.2vw,1.9rem)] font-semibold leading-tight tracking-[-0.03em] text-fg-2 transition-colors group-hover:text-fg">
                  {caseStudies[next].title}
                </span>
              </span>
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line-2 transition-[transform,border-color] duration-500 ease-out-quint group-hover:translate-x-1.5 group-hover:border-cyan/50">
                <ArrowRight className="h-5 w-5" aria-hidden />
              </span>
            </button>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Work() {
  const [open, setOpen] = useState<number | null>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const onOpen = useCallback((i: number, el: HTMLElement) => {
    lastTrigger.current = el;
    setOpen(i);
  }, []);
  const onClose = useCallback(() => {
    setOpen(null);
    window.setTimeout(() => lastTrigger.current?.focus({ preventScroll: true }), 60);
  }, []);

  return (
    <section id="work" aria-labelledby="work-title" className="relative py-20 lg:py-28">
      <div className="shell">
        <SectionIntro index="05" label="Work" />
        <div className="mt-8 grid grid-cols-12 items-end gap-x-6 gap-y-8 lg:mt-10">
          <h2 id="work-title" className="display col-span-12 t-h2 lg:col-span-8">
            <MaskLines lines={[[{ text: "Selected" }], [{ text: "work & impact" }]]} />
          </h2>
          <p className="col-span-12 max-w-md text-[1rem] leading-[1.7] text-fg-2 lg:col-span-4">
            Six projects across technical SEO, AI search, outreach and automation. Figures appear only where they’re on the record.
          </p>
        </div>

        <div className="mt-10 lg:mt-14">
          {caseStudies.map((cs, i) => (
            <CaseRow key={cs.slug} cs={cs} i={i} onOpen={onOpen} />
          ))}
        </div>
      </div>

      <CaseStudyDialog index={open} onClose={onClose} onGo={setOpen} />
    </section>
  );
}
