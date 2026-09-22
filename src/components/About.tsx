"use client";

import { about } from "@/content/profile";
import { SearchShift } from "./SearchShift";
import { ScrubText } from "./ui/ScrubText";
import { MaskLines } from "./ui/MaskLines";
import { SectionIntro } from "./ui/SectionIntro";

/*
 * The portrait lives in the hero only. Here the story is told with the work
 * itself: how the same search moved from a list of links to a cited answer.
 */
export function About() {
  const [lead, ...rest] = about.paragraphs;

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-20 lg:py-28">
      <div className="shell">
        <SectionIntro index="01" label="About" />

        <div className="mt-8 grid grid-cols-12 gap-x-6 gap-y-14 lg:mt-10">
          <h2 id="about-title" className="display col-span-12 t-h2 lg:col-span-7">
            <MaskLines lines={about.statement} stagger={0.07} />
          </h2>

          <div className="col-span-12 md:col-span-10 md:col-start-2 lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:pt-4">
            <div className="lg:sticky lg:top-28">
              <SearchShift />
              <p className="mt-6 flex gap-3 text-[0.8125rem] leading-relaxed text-fg-3">
                <span aria-hidden className="mt-2 block h-px w-6 shrink-0 bg-champagne" />
                {about.caption}
              </p>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-1">
            <ScrubText text={lead} className="font-display text-[clamp(1.1rem,1.35vw,1.25rem)] font-medium leading-[1.55] text-fg" />
            <div className="mt-8 space-y-6 text-[1rem] leading-[1.7] text-fg-2">
              {rest.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
