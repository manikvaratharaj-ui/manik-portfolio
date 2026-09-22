"use client";

import { motion } from "framer-motion";
import { ease, type Line } from "@/lib/motion";

type Props = {
  lines: Line[];
  /** Animate on mount (hero) instead of when scrolled into view */
  onMount?: boolean;
  delay?: number;
  stagger?: number;
  className?: string;
  lineClassName?: string;
};

/**
 * Renders headline lines inside overflow masks and slides each line up.
 * The text stays in the DOM as real text for SEO and screen readers.
 * Reduced motion is handled globally by <MotionConfig reducedMotion="user">,
 * which makes the slide instant, so server and client markup always match.
 */
export function MaskLines({ lines, onMount, delay = 0, stagger = 0.08, className, lineClassName }: Props) {
  const trigger = onMount
    ? { animate: "shown" as const }
    : { whileInView: "shown" as const, viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <motion.span className={className} initial="hidden" {...trigger}>
      {lines.map((line, i) => (
        // A real space after each line keeps the heading's text correct for
        // crawlers and copy-paste ("Building digital", not "BuildingDigital").
        <span key={i} className={`block overflow-hidden pb-[0.08em] ${lineClassName ?? ""}`}>
          <motion.span
            className="block"
            variants={{
              hidden: { y: "105%" },
              shown: { y: "0%", transition: { duration: 1, ease, delay: delay + i * stagger } },
            }}
          >
            {line.map((seg, j) =>
              seg.serif ? (
                <span key={j} className="serif-accent text-champagne">
                  {seg.text}
                </span>
              ) : (
                <span key={j} className={seg.muted ? "text-fg-3" : undefined}>
                  {seg.text}
                </span>
              ),
            )}
          </motion.span>
          {i < lines.length - 1 ? " " : null}
        </span>
      ))}
    </motion.span>
  );
}
