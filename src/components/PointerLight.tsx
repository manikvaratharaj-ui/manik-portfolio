"use client";

import { useEffect } from "react";

/*
 * Pointer light — a quiet, professional hover effect in place of a custom cursor.
 * On mouse/trackpad devices, cards marked `.spotlight` get a soft inner glow and
 * a lit border that follow the pointer. Cards inside a `.spotlight-group` share
 * the light, so neighbouring cards glow faintly as the pointer approaches.
 *
 * Performance: one passive listener, at most one update per animation frame,
 * no React state and no extra DOM. The native cursor is untouched.
 * Touch devices never attach the listener, so phones and tablets are unaffected.
 */
export function PointerLight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    let last: PointerEvent | null = null;
    let lit: HTMLElement[] = [];

    const clear = (els: HTMLElement[]) =>
      els.forEach((el) => {
        el.style.removeProperty("--mx");
        el.style.removeProperty("--my");
      });

    const update = () => {
      frame = 0;
      const e = last;
      if (!e) return;
      const t = e.target instanceof Element ? e.target : null;
      const group = t?.closest(".spotlight-group");
      const single = t?.closest<HTMLElement>(".spotlight");
      const targets = group
        ? Array.from(group.querySelectorAll<HTMLElement>(".spotlight"))
        : single
          ? [single]
          : [];

      clear(lit.filter((el) => !targets.includes(el)));
      for (const el of targets) {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
      lit = targets;
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      last = e;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const reset = () => {
      clear(lit);
      lit = [];
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      cancelAnimationFrame(frame);
      reset();
    };
  }, []);

  return null;
}
