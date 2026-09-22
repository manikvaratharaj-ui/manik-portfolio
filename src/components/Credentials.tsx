"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { certifications, education } from "@/content/profile";
import { ease } from "@/lib/motion";
import { MaskLines } from "./ui/MaskLines";
import { SectionIntro } from "./ui/SectionIntro";

// Degrees only: school records stay in the data but are not shown.
const degrees = education.filter((e) => e.show);

const row = {
  hidden: { opacity: 0, y: 16 },
  shown: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, ease, delay: i * 0.06 } }),
};

export function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-title" className="relative border-t border-line bg-ink-2/40 py-20 lg:py-28">
      <div className="shell">
        <SectionIntro index="07" label="Credentials" />
        <h2 id="credentials-title" className="display mt-8 t-h2 lg:mt-10">
          <MaskLines lines={[[{ text: "Certifications" }], [{ text: "& education." }]]} />
        </h2>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-14 lg:mt-14">
          {/* Certifications */}
          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-baseline justify-between border-b border-line-2 pb-4">
              <h3 className="meta text-fg-2">Licences & certifications</h3>
              <span className="meta tabular-nums text-fg-3">{String(certifications.length).padStart(2, "0")}</span>
            </div>
            <ul className="grid sm:grid-cols-2 sm:gap-x-8">
              {certifications.map((c, i) => (
                <motion.li
                  key={c.title + c.issuer}
                  custom={i}
                  variants={row}
                  initial="hidden"
                  whileInView="shown"
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  className="group relative border-b border-line py-5"
                >
                  <span
                    aria-hidden
                    className="absolute left-0 top-5 h-[calc(100%-2.5rem)] w-px origin-top scale-y-0 bg-champagne transition-transform duration-500 ease-out-quint group-hover:scale-y-100"
                  />
                  <div className="transition-transform duration-500 ease-out-quint group-hover:translate-x-3">
                    <p className="meta text-fg-3">{c.issuer}</p>
                    <p className="mt-2 font-display text-[1.125rem] font-semibold leading-snug tracking-[-0.01em] text-fg">
                      {c.url ? (
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-baseline gap-1.5">
                          <span className="u-link">{c.title}</span>
                          <ArrowUpRight className="h-3.5 w-3.5 shrink-0 self-center text-fg-3 transition-[transform,color] duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-cyan" aria-hidden />
                          <span className="sr-only">(verify, opens in a new tab)</span>
                        </a>
                      ) : (
                        c.title
                      )}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Education */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="flex items-baseline justify-between border-b border-line-2 pb-4">
              <h3 className="meta text-fg-2">Education</h3>
              <span className="meta tabular-nums text-fg-3">{String(degrees.length).padStart(2, "0")}</span>
            </div>
            <ol>
              {degrees.map((e, i) => (
                <motion.li
                  key={e.title}
                  custom={i}
                  variants={row}
                  initial="hidden"
                  whileInView="shown"
                  viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                  className="group grid grid-cols-[6.5rem_1fr] gap-x-5 border-b border-line py-5 sm:grid-cols-[7rem_1fr]"
                >
                  <span className="pt-1 font-display text-[0.875rem] font-medium tabular-nums text-fg-3 transition-colors duration-300 group-hover:text-champagne">
                    {e.years}
                  </span>
                  <div>
                    <p className="font-display text-[1.125rem] font-semibold leading-snug tracking-[-0.01em] text-fg">{e.title}</p>
                    <p className="mt-1.5 text-[0.9375rem] text-fg-2">{e.school}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
