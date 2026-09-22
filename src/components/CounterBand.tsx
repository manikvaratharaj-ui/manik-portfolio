"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { counters } from "@/content/profile";

function CountUp({ value, pad, suffix }: { value: number; pad: boolean; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  // Server render shows the final number, so no-JS visitors still see it.
  const [n, setN] = useState(value);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduce) return;
    setN(0);
    setArmed(true);
  }, [reduce]);

  useEffect(() => {
    if (!armed || !inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [armed, inView, value]);

  const shown = pad ? String(n).padStart(2, "0") : String(n);
  return (
    <span ref={ref} className="tabular-nums">
      {shown}
      <span className="text-champagne">{suffix}</span>
    </span>
  );
}

const cellBorders = [
  "",
  "border-l border-line",
  "border-t border-line lg:border-t-0 lg:border-l",
  "border-l border-t border-line lg:border-t-0",
];

export function CounterBand() {
  return (
    <section aria-label="At a glance" className="border-y border-line bg-ink-2">
      <dl className="shell grid grid-cols-2 lg:grid-cols-4">
        {counters.map((c, i) => (
          <div key={c.label} className={`flex flex-col-reverse gap-4 px-4 py-12 sm:px-8 lg:py-16 ${cellBorders[i]}`}>
            <dt className="max-w-[15rem] text-[0.8125rem] leading-snug text-fg-2">{c.label}</dt>
            <dd className="font-display text-[clamp(2.1rem,3.6vw,3.4rem)] font-semibold leading-none tracking-[-0.04em] text-fg">
              {"text" in c ? <span className="text-cyan">{c.text}</span> : <CountUp value={c.value} pad={c.pad} suffix={c.suffix} />}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
