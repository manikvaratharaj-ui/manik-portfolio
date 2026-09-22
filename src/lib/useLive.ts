"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * True once hydrated AND the visitor hasn't asked for reduced motion.
 * The server and the first client render both return false, so the
 * server-rendered markup is always the fully visible, static state and
 * scroll-linked styles are attached only on the client afterwards.
 */
export function useLive() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted && !reduce;
}
