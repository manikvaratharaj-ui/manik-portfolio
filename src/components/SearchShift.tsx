"use client";

import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { about } from "@/content/profile";
import { ease } from "@/lib/motion";

/*
 * The About visual. The same query shown two ways:
 *   Then — a ranked list of links, with "your page" somewhere in it.
 *   Now  — an AI answer, with "your page" pulled up as a cited source.
 * The highlighted item is one shared element (layoutId), so it physically
 * travels from the list into the citations. Purely conceptual: no metrics.
 */

type Mode = "then" | "now";
const { shift } = about;

const Bar = ({ w, tone = "soft", h = "h-1.5", sheen = false }: { w: string; tone?: "soft" | "faint" | "blue"; h?: string; sheen?: boolean }) => (
  <span
    className={`block ${h} rounded-full ${sheen ? "shimmer" : ""} ${tone === "blue" ? "bg-blue/35" : tone === "soft" ? "bg-fg/[0.14]" : "bg-fg/[0.08]"}`}
    style={{ width: w }}
  />
);

function YourPage({ variant }: { variant: "row" | "chip" }) {
  return (
    <motion.div
      layoutId="your-page"
      transition={{ duration: 0.8, ease }}
      className={`relative rounded-xl border border-champagne/60 bg-champagne/[0.07] ${variant === "row" ? "p-3" : "p-2.5"}`}
    >
      <span className="meta absolute -top-2 right-3 rounded-full bg-ink-2 px-1.5 text-[0.5625rem] text-champagne">
        {variant === "row" ? "Your page" : "Cited"}
      </span>
      <div className="flex gap-3">
        {variant === "row" && <span className="w-5 shrink-0 pt-0.5 font-display text-[0.75rem] tabular-nums text-champagne">03</span>}
        <div className="min-w-0 flex-1 space-y-1.5">
          <Bar w="42%" tone="faint" />
          <span className="block h-2 w-[78%] rounded-full bg-champagne/55" />
          {variant === "row" && (
            <>
              <Bar w="92%" tone="faint" />
              <Bar w="64%" tone="faint" />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ThenPanel() {
  const rows = [
    { u: "38%", t: "72%", a: "88%", b: "56%" },
    { u: "30%", t: "64%", a: "94%", b: "48%" },
    null,
    { u: "34%", t: "58%", a: "86%", b: "62%" },
    { u: "26%", t: "68%", a: "90%", b: "44%" },
  ];
  return (
    <motion.div
      key="then"
      className="absolute inset-0 p-5 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      transition={{ duration: 0.5, ease }}
    >
      <p className="meta mb-4 text-fg-3">{shift.then.title}</p>
      <ol className="space-y-3">
        {rows.map((r, i) =>
          r ? (
            <motion.li
              key={i}
              className="flex gap-3 px-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.5, ease }}
            >
              <span className="w-5 shrink-0 pt-0.5 font-display text-[0.75rem] tabular-nums text-fg-3">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1 space-y-1.5">
                <Bar w={r.u} tone="faint" />
                <Bar w={r.t} tone="blue" h="h-2" />
                <Bar w={r.a} tone="faint" />
                <Bar w={r.b} tone="faint" />
              </div>
            </motion.li>
          ) : (
            <li key={i}>
              <YourPage variant="row" />
            </li>
          ),
        )}
      </ol>
    </motion.div>
  );
}

function NowPanel() {
  const lines = ["96%", "88%", "92%", "70%", "84%"];
  return (
    <motion.div
      key="now"
      className="absolute inset-0 flex flex-col p-5 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
      transition={{ duration: 0.5, ease }}
    >
      <p className="meta mb-4 flex items-center gap-2 text-fg-3">
        <Sparkles className="h-3.5 w-3.5 text-cyan" aria-hidden />
        {shift.now.title}
      </p>
      <div className="rounded-2xl border border-line bg-fg/[0.025] p-4">
        <div className="space-y-2.5">
          {lines.map((w, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease }}
            >
              <Bar w={w} tone="soft" h="h-2" sheen />
              {(i === 1 || i === 3) && (
                <span
                  className={`inline-flex h-4 min-w-4 shrink-0 items-center justify-center rounded px-1 font-display text-[0.5625rem] font-semibold ${
                    i === 1 ? "bg-champagne/20 text-champagne" : "bg-fg/10 text-fg-2"
                  }`}
                >
                  {i === 1 ? 2 : 3}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      <p className="meta mb-3 mt-5 text-fg-3">Sources</p>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((n) =>
          n === 2 ? (
            <YourPage key={n} variant="chip" />
          ) : (
            <motion.div
              key={n}
              className="rounded-xl border border-line p-2.5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 + n * 0.06, duration: 0.5, ease }}
            >
              <div className="space-y-1.5">
                <Bar w="46%" tone="faint" />
                <Bar w="80%" tone="soft" h="h-2" />
              </div>
            </motion.div>
          ),
        )}
      </div>
      <p className="meta mb-3 mt-5 hidden text-fg-3 sm:block">Follow-up questions</p>
      <div className="hidden flex-wrap gap-2 sm:flex">
        {["62%", "44%"].map((w, i) => (
          <motion.span
            key={w}
            className="flex h-8 items-center rounded-full border border-line px-3"
            style={{ width: w }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.08, duration: 0.5, ease }}
          >
            <Bar w="100%" tone="faint" />
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export function SearchShift() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const id = useId();
  const [mode, setMode] = useState<Mode>("then");
  const [manual, setManual] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Without motion there's no scroll story: show the point of the section.
  useEffect(() => {
    if (reduce) setMode("now");
  }, [reduce]);

  // Scroll tells the story until the visitor takes over with the toggle.
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (manual || reduce) return;
    setMode(v > 0.5 ? "now" : "then");
  });

  const choose = (m: Mode) => {
    setManual(true);
    setMode(m);
  };

  return (
    <figure ref={ref} className="w-full">
      <div className="spotlight elev relative overflow-hidden rounded-[20px] border border-line bg-ink-2 shadow-[0_30px_80px_-40px_rgb(var(--blue-rgb)/0.35)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_70%_at_100%_0%,rgb(var(--blue-rgb)/0.10),transparent_60%)]" />

        {/* Search bar + Then/Now switch */}
        <div className="relative flex items-center gap-3 border-b border-line p-3 sm:p-4">
          <div className="flex min-w-0 flex-1 items-center gap-2.5 rounded-full border border-line bg-ink px-3.5 py-2.5">
            <Search className="h-3.5 w-3.5 shrink-0 text-fg-3" aria-hidden />
            <span className="truncate text-[0.8125rem] text-fg-2">{shift.query}</span>
            <span aria-hidden className="ml-0.5 h-3.5 w-px shrink-0 animate-pulse bg-cyan" />
          </div>
          <div role="tablist" aria-label="Compare how search answers a query" className="flex shrink-0 rounded-full border border-line p-1">
            {(["then", "now"] as const).map((m) => (
              <button
                key={m}
                type="button"
                role="tab"
                id={`${id}-${m}-tab`}
                aria-selected={mode === m}
                aria-controls={`${id}-panel`}
                onClick={() => choose(m)}
                className="relative rounded-full px-3 py-1.5 font-display text-[0.75rem] font-medium"
              >
                {mode === m && (
                  <motion.span layoutId={`${id}-pill`} transition={{ duration: 0.45, ease }} className="absolute inset-0 rounded-full bg-fg" />
                )}
                <span className={`relative transition-colors ${mode === m ? "text-ink" : "text-fg-2 hover:text-fg"}`}>{shift[m].label}</span>
              </button>
            ))}
          </div>
        </div>

        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-${mode}-tab`}
          className="relative h-[23.5rem] sm:h-[25rem]"
        >
          <span className="sr-only">
            {mode === "then"
              ? "Illustration: a ranked list of search results, with your page in third place."
              : "Illustration: an AI-written answer that cites your page as one of its sources."}
          </span>
          <LayoutGroup id={id}>
            <AnimatePresence initial={false}>{mode === "then" ? <ThenPanel key="then" /> : <NowPanel key="now" />}</AnimatePresence>
          </LayoutGroup>
        </div>
      </div>

      <figcaption className="mt-5 grid grid-cols-2 gap-4 text-[0.8125rem] leading-relaxed">
        {(["then", "now"] as const).map((m) => (
          <div key={m} className={`border-t pt-3 transition-colors duration-500 ${mode === m ? "border-champagne text-fg" : "border-line text-fg-3"}`}>
            <span className={`meta block ${mode === m ? "text-champagne" : ""}`}>{shift[m].label}</span>
            <span className="mt-1 block">{shift[m].note}</span>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}
