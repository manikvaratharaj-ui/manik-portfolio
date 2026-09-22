"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useRef, useState } from "react";
import { expertise, type Expertise as ExpertiseItem } from "@/content/profile";
import { ease } from "@/lib/motion";
import { MaskLines } from "./ui/MaskLines";
import { SectionIntro } from "./ui/SectionIntro";

const pad = (n: number) => String(n + 1).padStart(2, "0");

function Detail({ item }: { item: ExpertiseItem }) {
  return (
    <>
      <p className="text-[1rem] leading-[1.7] text-fg-2">{item.summary}</p>
      <h4 className="meta mt-9 text-fg-3">In practice</h4>
      <ul className="mt-4 space-y-3">
        {item.practice.map((p, i) => (
          <motion.li
            key={p}
            className="flex gap-4 border-b border-line pb-3 text-[0.9375rem] text-fg"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease }}
          >
            <span aria-hidden className="mt-[0.6em] block h-1 w-1 shrink-0 rounded-full bg-cyan" />
            {p}
          </motion.li>
        ))}
      </ul>
      <h4 className="meta mt-9 text-fg-3">Tools</h4>
      <ul className="mt-4 flex flex-wrap gap-2">
        {item.tools.map((t) => (
          <li key={t} className="rounded-full border border-line-2 px-3 py-1.5 text-[0.8125rem] text-fg-2">
            {t}
          </li>
        ))}
      </ul>
    </>
  );
}

export function Expertise() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const item = expertise[active];

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const next = e.key === "ArrowDown" ? i + 1 : e.key === "ArrowUp" ? i - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const n = (next + expertise.length) % expertise.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="relative py-20 lg:py-28">
      <div className="shell">
        <SectionIntro index="02" label="Expertise" />
        <h2 id="expertise-title" className="display mt-8 t-h2 lg:mt-10">
          <MaskLines lines={[[{ text: "Where strategy" }], [{ text: "meets execution." }]]} />
        </h2>

        {/* Desktop: index + live panel */}
        <div className="mt-20 hidden grid-cols-12 gap-x-6 lg:grid">
          <div role="tablist" aria-orientation="vertical" aria-label="Areas of expertise" className="col-span-6 border-t border-line">
            {expertise.map((e, i) => {
              const on = i === active;
              return (
                <button
                  key={e.title}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`exp-tab-${i}`}
                  aria-selected={on}
                  aria-controls="exp-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onKeyDown={(ev) => onKey(ev, i)}
                  className="group relative flex w-full items-baseline gap-6 border-b border-line py-5 text-left"
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-white/[0.035] to-transparent"
                    initial={false}
                    animate={{ scaleX: on ? 1 : 0, opacity: on ? 1 : 0 }}
                    transition={{ duration: 0.6, ease }}
                  />
                  <span className={`meta relative w-8 tabular-nums transition-colors duration-300 ${on ? "text-champagne" : "text-fg-3"}`}>{pad(i)}</span>
                  <span
                    className={`relative font-display text-[clamp(1.15rem,1.6vw,1.45rem)] font-medium tracking-[-0.02em] transition-[color,transform] duration-500 ease-out-quint ${
                      on ? "translate-x-2 text-fg" : "text-fg-3 group-hover:text-fg-2"
                    }`}
                  >
                    {e.title}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="col-span-5 col-start-8">
            <div id="exp-panel" role="tabpanel" aria-labelledby={`exp-tab-${active}`} className="sticky top-28 min-h-[30rem]">
              {/* Moving background element: an orbit that turns to the active index */}
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-16 h-72 w-72">
                <motion.svg viewBox="0 0 200 200" className="h-full w-full" animate={{ rotate: active * 45 }} transition={{ duration: 1.1, ease }}>
                  <circle cx="100" cy="100" r="92" fill="none" stroke="rgb(var(--fg-rgb) / 0.07)" />
                  <circle cx="100" cy="100" r="64" fill="none" stroke="rgb(var(--fg-rgb) / 0.05)" strokeDasharray="2 6" />
                  <circle cx="100" cy="8" r="3.5" fill="var(--color-cyan)" />
                  <circle cx="100" cy="36" r="2" fill="var(--color-champagne)" />
                </motion.svg>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.45, ease }}
                  className="relative"
                >
                  <div className="font-display text-[8.5rem] font-black leading-none tracking-[-0.06em] text-fg/[0.06]" aria-hidden>
                    {pad(active)}
                  </div>
                  <h3 className="-mt-10 font-display text-3xl font-semibold tracking-[-0.02em] text-fg">{item.title}</h3>
                  <div className="mt-6">
                    <Detail item={item} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile and tablet: tap-to-open list */}
        <ul className="mt-14 border-t border-line lg:hidden">
          {expertise.map((e, i) => {
            const on = openMobile === i;
            return (
              <li key={e.title} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={on}
                    aria-controls={`exp-m-${i}`}
                    onClick={() => setOpenMobile(on ? null : i)}
                    className="flex w-full items-center gap-5 py-5 text-left"
                  >
                    <span aria-hidden className={`meta w-7 tabular-nums ${on ? "text-champagne" : "text-fg-3"}`}>
                      {pad(i)}{" "}
                    </span>
                    <span className={`flex-1 font-display text-xl font-medium ${on ? "text-fg" : "text-fg-2"}`}>{e.title}</span>
                    <Plus className={`h-4 w-4 text-fg-3 transition-transform duration-300 ${on ? "rotate-45" : ""}`} aria-hidden />
                  </button>
                </h3>
                <div
                  id={`exp-m-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-out-quint ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden" inert={!on}>
                    <div className="pb-8 pl-12">
                      <Detail item={e} />
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
