"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import { Fragment, useEffect, useRef, useState } from "react";
import { howIWork } from "@/content/profile";
import { ease } from "@/lib/motion";
import { useLive } from "@/lib/useLive";
import { MaskLines } from "./ui/MaskLines";
import { SectionIntro } from "./ui/SectionIntro";

/*
 * How I work — the philosophy and the process as one story.
 *   1. What changes: two bands of statements that slide in opposite
 *      directions as you scroll (scroll-linked, not auto-playing).
 *   2. What doesn't: on desktop the current principle stays pinned on the
 *      left while the practices behind it scroll past on the right.
 */

const NUMERALS = ["i.", "ii.", "iii."];
const { principles } = howIWork;

function ChangeBand() {
  const ref = useRef<HTMLDivElement>(null);
  const live = useLive();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xA = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const xB = useTransform(scrollYProgress, [0, 1], ["-22%", "0%"]);
  const items = [...howIWork.changes, ...howIWork.changes, ...howIWork.changes];

  const Row = ({ outline = false }: { outline?: boolean }) => (
    <div className="flex w-max items-center">
      {items.map((t, i) => (
        <Fragment key={i}>
          <span
            className={`whitespace-nowrap font-display font-semibold tracking-[-0.03em] ${
              outline ? "text-outline text-[clamp(1.75rem,4vw,3.5rem)]" : "text-fg-3 text-[clamp(1.35rem,2.8vw,2.4rem)]"
            }`}
          >
            {t}
          </span>
          <span className="mx-[0.9em] inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-champagne/60" />
        </Fragment>
      ))}
    </div>
  );

  return (
    <div ref={ref} aria-hidden className="fade-x mt-12 space-y-2 overflow-hidden py-2 lg:mt-14 lg:space-y-3">
      <motion.div style={live ? { x: xA } : undefined}>
        <Row />
      </motion.div>
      <motion.div style={live ? { x: xB } : undefined}>
        <Row outline />
      </motion.div>
    </div>
  );
}

function PrincipleText({ i, size = "lg" }: { i: number; size?: "lg" | "md" }) {
  const p = principles[i];
  return (
    <p
      className={`font-serif leading-[1] tracking-[-0.02em] text-fg ${
        size === "lg" ? "text-[clamp(2.4rem,4.2vw,4rem)]" : "text-[clamp(2rem,7vw,2.75rem)]"
      }`}
    >
      {p.lead} <em className="italic text-champagne">{p.key}</em>
    </p>
  );
}

export function Approach() {
  const [active, setActive] = useState(0);
  const blocks = useRef<(HTMLElement | null)[]>([]);
  let step = 0;

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    blocks.current.forEach((b) => b && io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <section id="approach" aria-labelledby="approach-title" className="relative border-t border-line py-20 lg:py-28">
      <p className="sr-only">{howIWork.sentence}</p>

      <div className="shell">
        <SectionIntro index="06" label="How I work" />
        <div className="mt-8 grid grid-cols-12 items-end gap-x-6 gap-y-5 lg:mt-10">
          <h2 id="approach-title" className="display col-span-12 t-h2 lg:col-span-7">
            <MaskLines lines={[[{ text: "Channels change." }], [{ text: "The principles don’t." }]]} />
          </h2>
          <p className="col-span-12 max-w-md text-[1rem] leading-[1.7] text-fg-2 lg:col-span-5">{howIWork.intro}</p>
        </div>
      </div>

      <ChangeBand />

      <div className="shell mt-14 grid grid-cols-12 gap-x-6 lg:mt-20">
        {/* Pinned principle (desktop) */}
        <div className="col-span-5 hidden lg:block">
          <div className="sticky top-32">
            <p className="meta text-champagne">The principle remains</p>
            <div className="relative mt-6 min-h-[15rem]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                  transition={{ duration: 0.6, ease }}
                >
                  <span className="font-serif text-[1.5rem] italic text-champagne">{NUMERALS[active]}</span>
                  <div className="mt-3">
                    <PrincipleText i={active} />
                  </div>
                  <p className="mt-6 max-w-sm text-[1rem] leading-[1.65] text-fg-2">{principles[active].gloss}</p>
                </motion.div>
              </AnimatePresence>
            </div>
            {/* progress through the three principles */}
            <div aria-hidden className="mt-8 flex max-w-[14rem] gap-2">
              {principles.map((_, i) => (
                <span key={i} className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-line-2">
                  <motion.span
                    className="absolute inset-0 origin-left rounded-full bg-champagne"
                    initial={false}
                    animate={{ scaleX: i <= active ? 1 : 0 }}
                    transition={{ duration: 0.6, ease }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* The practices behind each principle */}
        <ol className="spotlight-group col-span-12 lg:col-span-7 lg:col-start-6">
          {principles.map((p, i) => (
            <li
              key={p.key}
              ref={(el) => {
                blocks.current[i] = el;
              }}
              data-i={i}
              className="border-t border-line py-10 first:border-t-0 first:pt-0 lg:flex lg:min-h-[70vh] lg:flex-col lg:justify-center lg:py-12 lg:first:border-t lg:first:pt-12"
            >
              {/* Inline principle on smaller screens */}
              <div className="mb-7 lg:hidden">
                <span className="font-serif text-[1.25rem] italic text-champagne">{NUMERALS[i]}</span>
                <div className="mt-2">
                  <PrincipleText i={i} size="md" />
                </div>
                <p className="mt-4 max-w-md text-[0.9375rem] leading-[1.65] text-fg-2">{p.gloss}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {p.stages.map((st) => {
                  step += 1;
                  return (
                    <motion.div
                      key={st.title}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                      transition={{ duration: 0.8, ease }}
                      className={`spotlight elev rounded-2xl border border-line bg-ink-2/70 p-6 ${p.stages.length === 1 ? "sm:col-span-2" : ""}`}
                    >
                      <div className="flex items-baseline justify-between">
                        <h3 className="font-display text-[1.125rem] font-semibold tracking-[-0.01em] text-fg">{st.title}</h3>
                        <span className="meta tabular-nums text-fg-3">Step {String(step).padStart(2, "0")}</span>
                      </div>
                      <ul className={`mt-5 grid gap-x-6 gap-y-2.5 ${p.stages.length === 1 ? "sm:grid-cols-2" : ""}`}>
                        {st.items.map((it, k) => (
                          <motion.li
                            key={it}
                            className="flex items-center gap-2.5 text-[0.9375rem] text-fg-2"
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, ease, delay: 0.2 + k * 0.06 }}
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cyan/35 text-cyan">
                              <Check className="h-3 w-3" strokeWidth={2.25} aria-hidden />
                            </span>
                            {it}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
