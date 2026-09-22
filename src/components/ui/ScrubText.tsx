"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useLive } from "@/lib/useLive";

/*
 * Reading highlight: words brighten one by one as the paragraph scrolls
 * through the viewport. Server render and reduced motion show it fully lit.
 */
function Word({ word, i, n, progress }: { word: string; i: number; n: number; progress: MotionValue<number> }) {
  const start = i / n;
  const opacity = useTransform(progress, [start, Math.min(1, start + 1.5 / n)], [0.22, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{word}</motion.span>{" "}
    </>
  );
}

export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const live = useLive();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 55%"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {live ? words.map((w, i) => <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} />) : text}
    </p>
  );
}
