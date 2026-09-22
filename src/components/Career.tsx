"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { roles } from "@/content/profile";
import { ease } from "@/lib/motion";
import { MaskLines } from "./ui/MaskLines";
import { SectionIntro } from "./ui/SectionIntro";

export function Career() {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(() => new Set([0]));
  const [armed, setArmed] = useState(false);

  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const items = listRef.current?.querySelectorAll<HTMLElement>("[data-role]");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = Number((e.target as HTMLElement).dataset.role);
          setActive(i);
          setSeen((prev) => (prev.has(i) ? prev : new Set(prev).add(i)));
        });
      },
      { rootMargin: "-42% 0px -42% 0px" },
    );
    items.forEach((el) => io.observe(el));
    setArmed(true);
    return () => io.disconnect();
  }, []);

  const role = roles[active];

  return (
    <section id="experience" aria-labelledby="career-title" className="relative border-t border-line bg-ink-2/40 py-20 lg:py-28">
      <div className="shell">
        <SectionIntro index="04" label="Experience" />
        <h2 id="career-title" className="display mt-8 t-h2 lg:mt-10">
          <MaskLines lines={[[{ text: "From outreach" }], [{ text: "to AI search." }]]} />
        </h2>
        <p className="mt-8 max-w-xl text-[1rem] leading-[1.7] text-fg-2">
          Four roles since 2021, each adding a layer: campaigns, link building, technical and on-page SEO, then strategy, AEO and leading a team.
        </p>

        <div className="mt-20 grid grid-cols-12 gap-x-6">
          {/* Sticky period (desktop) */}
          <div aria-hidden className="col-span-4 hidden lg:block">
            <div className="sticky top-36">
              <div className="flex items-center gap-3">
                <span className="meta text-champagne">{String(active + 1).padStart(2, "0")}</span>
                <span className="meta text-fg-3">/ {String(roles.length).padStart(2, "0")}</span>
              </div>
              <div className="relative mt-3 h-[5.75rem] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={active}
                    className="absolute inset-0 font-display text-[5.25rem] font-semibold leading-none tracking-[-0.055em] text-fg"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.7, ease }}
                  >
                    {role.start.slice(0, 4)}
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="mt-3 font-display text-sm font-medium text-fg-2">{role.period}</p>
              <p className="mt-1 text-sm text-fg-3">{role.focus}</p>
            </div>
          </div>

          {/* Timeline */}
          <ol ref={listRef} className="relative col-span-12 pl-10 sm:pl-14 lg:col-span-8">
            <span aria-hidden className="absolute bottom-0 left-[5px] top-0 w-px bg-line sm:left-[9px]" />
            <motion.span
              aria-hidden
              style={{ scaleY: fill }}
              className="absolute bottom-0 left-[5px] top-0 w-px origin-top bg-gradient-to-b from-cyan via-blue-2 to-blue sm:left-[9px]"
            />
            {roles.map((r, i) => {
              const on = i === active;
              const revealed = !armed || seen.has(i);
              return (
                <li
                  key={r.company}
                  data-role={i}
                  className="relative py-12 first:pt-2 lg:py-16 lg:first:pt-4"
                >
                  <p className="meta relative text-fg-3">
                    <span
                      aria-hidden
                      className={`absolute -left-10 top-1/2 block h-[11px] w-[11px] -translate-y-1/2 rounded-full border transition-colors duration-500 sm:-left-[calc(3.5rem-4px)] ${
                        on ? "border-cyan bg-cyan shadow-[0_0_0_5px_rgb(var(--cyan-rgb)/0.12)]" : "border-line-2 bg-ink"
                      }`}
                    />
                    <span className={on ? "text-champagne" : ""}>{r.period}</span>
                  </p>
                  <h3
                    className={`mt-3 font-display text-[clamp(1.4rem,2.2vw,1.95rem)] font-semibold leading-[1.05] tracking-[-0.03em] transition-colors duration-700 ${
                      on ? "text-fg" : "text-fg-2"
                    }`}
                  >
                    {r.company}
                  </h3>
                  <p className={`mt-2 font-display text-[1rem] font-medium transition-colors duration-700 ${on ? "text-fg-2" : "text-fg-3"}`}>{r.title}</p>
                  <ul className="mt-7 max-w-2xl space-y-3">
                    {r.points.map((p, j) => (
                      <motion.li
                        key={p}
                        className={`flex gap-4 text-[1rem] leading-[1.7] transition-colors duration-700 ${on ? "text-fg-2" : "text-fg-3"}`}
                        initial={false}
                        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                        transition={{ delay: revealed ? j * 0.08 : 0, duration: 0.6, ease }}
                      >
                        <span aria-hidden className="mt-[0.72em] block h-px w-3 shrink-0 bg-fg-3" />
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
