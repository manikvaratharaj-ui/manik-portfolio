"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { ease } from "@/lib/motion";

/** Section number + name. The rule draws in as the section arrives. */
export function SectionIntro({ index, label, children }: { index: string; label: string; children?: ReactNode }) {
  return (
    <div className="flex items-center gap-4 text-fg-3">
      <motion.span
        className="meta text-champagne"
        initial={{ opacity: 0, y: 6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
      >
        {index}
      </motion.span>
      <motion.span
        aria-hidden
        className="h-px w-10 origin-left bg-line-2"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease, delay: 0.1 }}
      />
      <motion.span
        className="meta"
        initial={{ opacity: 0, x: -6 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease, delay: 0.25 }}
      >
        {label}
      </motion.span>
      {children}
    </div>
  );
}
