"use client";

import { motion } from "framer-motion";
import { BarChart3, Code2, Link2, Search, Workflow, type LucideIcon } from "lucide-react";
import { coreSkills, stack, type StackStage } from "@/content/profile";
import { ease } from "@/lib/motion";
import { SectionIntro } from "./ui/SectionIntro";

/*
 * The marketing stack: tools grouped by the job they do in search-led growth
 * (discover → build → earn → measure → scale), each with what it's used for,
 * followed by the skills the tools serve. No skill bars, no percentages.
 */

const ICONS: Record<StackStage, LucideIcon> = {
  discover: Search,
  build: Code2,
  earn: Link2,
  measure: BarChart3,
  scale: Workflow,
};

const reveal = {
  hidden: { opacity: 0, y: 14 },
  shown: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: i * 0.05 } }),
};

export function Toolkit() {
  let toolCount = 0;
  stack.forEach((g) => (toolCount += g.tools.length));

  return (
    <section id="toolkit" aria-labelledby="toolkit-title" className="relative border-t border-line py-20 lg:py-28">
      <div className="shell">
        <SectionIntro index="03" label="Toolkit" />

        <div className="mt-8 grid grid-cols-12 items-end gap-x-6 gap-y-5 lg:mt-10">
          <h2 id="toolkit-title" className="display col-span-12 t-h2 lg:col-span-7">
            The marketing stack.
          </h2>
          <p className="col-span-12 max-w-md text-[1rem] leading-[1.7] text-fg-2 lg:col-span-5">
            The {toolCount} tools I use at each stage of search-led growth — from finding demand to measuring and scaling what
            works — and the skills behind them.
          </p>
        </div>

        <div className="spotlight-group mt-12 border-b border-line lg:mt-14">
          {stack.map((g, i) => {
            const Icon = ICONS[g.stage];
            return (
              <motion.article
                key={g.stage}
                custom={i}
                variants={reveal}
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                className="group relative grid grid-cols-12 gap-x-6 gap-y-5 border-t border-line py-6 lg:py-7"
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[-1px] h-px w-full origin-left scale-x-0 bg-gradient-to-r from-cyan to-transparent transition-transform duration-700 ease-out-quint group-hover:scale-x-100"
                />

                <div className="col-span-12 flex gap-4 md:col-span-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-ink-2 text-fg-2 transition-colors duration-300 group-hover:border-cyan/40 group-hover:text-cyan">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="meta text-champagne">
                      {String(i + 1).padStart(2, "0")} · {g.stageLabel}
                    </p>
                    <h3 className="mt-1.5 font-display text-[1.125rem] font-semibold tracking-[-0.01em] text-fg">{g.job}</h3>
                    <p className="mt-1 text-[0.875rem] leading-snug text-fg-3">{g.purpose}</p>
                  </div>
                </div>

                <ul className="col-span-12 grid content-start gap-2.5 sm:grid-cols-2 md:col-span-8 xl:grid-cols-4">
                  {g.tools.map((t, j) => (
                    <motion.li
                      key={t.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                      transition={{ duration: 0.6, ease, delay: 0.12 + j * 0.06 }}
                      className="spotlight elev elev-hover rounded-xl border border-line bg-ink-2/60 px-4 py-3 transition-[transform,border-color,background-color] duration-500 ease-out-quint hover:-translate-y-0.5 hover:border-cyan/35 hover:bg-ink-2"
                    >
                      <p className="font-display text-[0.9375rem] font-medium text-fg">{t.name}</p>
                      <p className="mt-0.5 text-[0.8125rem] leading-snug text-fg-3">{t.use}</p>
                    </motion.li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-5 lg:mt-12">
          <div className="col-span-12 md:col-span-4">
            <h3 className="meta text-fg-2">Core skills</h3>
            <p className="mt-2 max-w-xs text-[0.875rem] leading-snug text-fg-3">What the stack is in service of.</p>
          </div>
          <ul className="col-span-12 flex flex-wrap gap-2 md:col-span-8">
            {coreSkills.map((s, i) => (
              <motion.li
                key={s}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease, delay: i * 0.03 }}
                className="rounded-full border border-line-2 px-3.5 py-1.5 text-[0.8125rem] text-fg-2 transition-colors duration-300 hover:border-cyan/45 hover:text-fg"
              >
                {s}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
