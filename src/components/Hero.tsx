"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight, Briefcase, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { hero, site } from "@/content/profile";
import { ease } from "@/lib/motion";
import { CvLink } from "./ui/CvLink";
import { MaskLines } from "./ui/MaskLines";

/* Deterministic "search landscape" contour rings (same on server and client). */
const CONTOURS = Array.from({ length: 11 }, (_, i) => {
  const cx = 400;
  const cy = 380;
  const r = 70 + i * 34;
  const ph = i * 0.55;
  const pts = 120;
  let d = "";
  for (let k = 0; k <= pts; k++) {
    const t = (k / pts) * Math.PI * 2;
    const rr = r * (1 + 0.07 * Math.sin(2 * t + ph) + 0.045 * Math.sin(3 * t + ph * 1.7) + 0.02 * Math.sin(5 * t + ph * 0.6));
    const x = cx + rr * Math.cos(t) * 1.12;
    const y = cy + rr * Math.sin(t) * 0.9;
    d += `${k ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d + "Z";
});

type Annotation = { x: number; y: number; side: "left" | "right"; len: number; label: string; note: string; delay: number };

const ANNOTATIONS: Annotation[] = [
  { x: 40, y: 9, side: "left", len: 72, delay: 1.5, ...hero.annotations[0] },
  { x: 14, y: 36, side: "left", len: 36, delay: 1.65, ...hero.annotations[1] },
  { x: 6, y: 62, side: "left", len: 52, delay: 1.8, ...hero.annotations[2] },
];

function Callout({ a, px, py }: { a: Annotation; px: MotionValue<number>; py: MotionValue<number> }) {
  const left = a.side === "left";
  return (
    <motion.div
      aria-hidden
      className="absolute z-20 hidden lg:block"
      style={{ left: `${a.x}%`, top: `${a.y}%`, x: px, y: py }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: a.delay, duration: 0.8, ease }}
    >
      <div className="float-slow relative" style={{ animationDelay: `${a.delay}s` }}>
        <span className="node-pulse absolute -left-[3px] -top-[3px] block h-[6px] w-[6px] rounded-full bg-cyan" />
        <motion.span
          className={`absolute top-0 block h-px bg-gradient-to-r ${left ? "right-[6px] from-transparent to-cyan/60" : "left-[6px] from-cyan/60 to-transparent"}`}
          style={{ width: a.len, originX: left ? 1 : 0 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: a.delay + 0.1, duration: 0.7, ease }}
        />
        <div
          className={`absolute -top-[0.95rem] whitespace-nowrap ${left ? "text-right" : "text-left"}`}
          style={left ? { right: a.len + 14 } : { left: a.len + 14 }}
        >
          <div className="meta text-fg">{a.label}</div>
          <div className="mt-1 text-[0.75rem] text-fg-3">{a.note}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scroll-linked hand-off toward the About section
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const headY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const headOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 150]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 0.86]);
  const portraitFade = useTransform(scrollYProgress, [0.45, 0.95], [1, 0.15]);

  // The portrait hand-off only makes sense beside the copy (desktop). On smaller
  // screens the portrait sits under the copy and should simply scroll away.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Pointer: normalised -1..1 with soft springs
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const sx = useSpring(nx, { stiffness: 50, damping: 18, mass: 0.8 });
  const sy = useSpring(ny, { stiffness: 50, damping: 18, mass: 0.8 });
  const gx = useMotionValue(900);
  const gy = useMotionValue(300);
  const sgx = useSpring(gx, { stiffness: 70, damping: 22 });
  const sgy = useSpring(gy, { stiffness: 70, damping: 22 });
  const glow = useMotionTemplate`radial-gradient(560px circle at ${sgx}px ${sgy}px, rgb(var(--blue2-rgb) / 0.085), transparent 65%)`;

  const portraitPX = useTransform(sx, (v) => v * 5);
  const portraitPY = useTransform(sy, (v) => v * 4);
  const contourPX = useTransform(sx, (v) => v * -12);
  const contourPY = useTransform(sy, (v) => v * -9);
  const ghostPX = useTransform(sx, (v) => v * -18);
  const calloutPX = useTransform(sx, (v) => v * 8);
  const calloutPY = useTransform(sy, (v) => v * 6);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    nx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    ny.set(((e.clientY - r.top) / r.height) * 2 - 1);
    gx.set(e.clientX - r.left);
    gy.set(e.clientY - r.top);
  };

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onPointerMove}
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden lg:min-h-[100svh]"
    >
      {/* Background: grid, pointer glow, drifting light */}
      <motion.div aria-hidden style={{ opacity: bgOpacity }} className="pointer-events-none absolute inset-0 -z-10">
        <motion.div className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6 }}>
          <div className="hero-wash absolute inset-0" />
          <div className="hero-grid absolute inset-0" />
          <motion.div className="absolute inset-0" style={{ background: glow }} />
          <div className="drift absolute -right-[12%] top-[4%] h-[62vmax] w-[62vmax] rounded-full bg-[radial-gradient(closest-side,rgb(var(--blue-rgb)/0.17),rgb(var(--cyan-rgb)/0.04)_55%,transparent)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
        </motion.div>
      </motion.div>

      <div className="shell relative grid grid-cols-12 items-center gap-x-6 pb-14 pt-28 md:min-h-[100svh] md:pb-16 md:pt-24 lg:gap-x-10">
        {/* Copy */}
        <motion.div
          style={{ y: headY, opacity: headOpacity }}
          className="relative z-20 col-span-12 flex flex-col justify-center md:col-span-7 md:row-start-1 lg:py-16"
        >
          <motion.p
            className="meta flex flex-wrap items-center gap-x-3 gap-y-2 text-fg-2 max-[359px]:tracking-[0.1em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            <motion.span
              aria-hidden
              className="block h-px w-8 origin-left bg-champagne max-[359px]:hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.15, duration: 0.9, ease }}
            />
            {hero.eyebrow.map((item, i) => (
              <span key={item} className="flex items-center gap-3 whitespace-nowrap">
                {i > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-fg-3" />}
                {item}
              </span>
            ))}
          </motion.p>

          <h1 id="hero-title" className="display mt-6 text-[clamp(2.25rem,4.1vw,4.25rem)] font-medium leading-[1] tracking-[-0.03em] text-fg">
            <MaskLines lines={hero.headline} onMount delay={0.2} stagger={0.09} />
          </h1>

          <motion.p
            className="mt-6 max-w-[32rem] text-[1rem] leading-[1.7] text-fg-2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.9, ease }}
          >
            {hero.intro}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease }}
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full bg-fg py-3.5 pl-6 pr-5 font-display text-[0.9375rem] font-semibold text-ink transition-colors duration-300 hover:bg-cyan"
            >
              Explore my work
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out-quint group-hover:translate-x-1" aria-hidden />
            </a>
            <CvLink variant="text" />
          </motion.div>

          <motion.ul
            className="mt-12 flex flex-col items-start gap-3 text-[0.8125rem] text-fg-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.9 }}
          >
            <li className="flex items-center gap-2.5 sm:pr-5">
              <MapPin className="h-3.5 w-3.5 text-fg-3" aria-hidden />
              Based in {site.location.city}, {site.location.country}
            </li>
            <li className="flex items-center gap-2.5 sm:border-l sm:border-line-2 sm:px-5">
              <Briefcase className="h-3.5 w-3.5 text-fg-3" aria-hidden />
              5+ years experience
            </li>
            <li className="flex items-center gap-2.5 sm:border-l sm:border-line-2 sm:pl-5">
              <span aria-hidden className="flex h-3.5 w-3.5 items-center justify-center">
                <span className="live-dot" />
              </span>
              {site.availability}
            </li>
          </motion.ul>
        </motion.div>

        {/* Portrait */}
        <motion.div
          style={wide ? { y: portraitY, scale: portraitScale, opacity: portraitFade, originY: 1 } : undefined}
          className="relative col-span-12 mt-12 justify-self-center md:col-span-5 md:col-start-8 md:row-start-1 md:mt-0 md:justify-self-end md:self-center"
        >
          <div className="relative w-[min(78vw,20rem)] md:w-[min(38vw,24rem)] lg:w-[min(32vw,calc(70svh*0.664),28rem)]">
            {/* Depth: ghost monogram behind the body */}
            <motion.span
              aria-hidden
              style={{ x: ghostPX }}
              className="pointer-events-none absolute -left-[58%] top-[30%] select-none font-display text-[clamp(5rem,13vw,13rem)] font-black leading-none tracking-[-0.06em] text-fg/[0.045]"
            >
              MANIK
            </motion.span>

            {/* Depth: contour field + light behind the head */}
            <motion.svg
              aria-hidden
              viewBox="0 0 800 760"
              className="pointer-events-none absolute -left-[38%] -top-[6%] w-[176%] max-w-none"
              style={{ x: contourPX, y: contourPY }}
            >
              <defs>
                <radialGradient id="contour-fade" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--color-cyan)" stopOpacity="0" />
                </radialGradient>
                <mask id="contour-mask">
                  <rect width="800" height="760" fill="url(#contour-fade)" />
                </mask>
              </defs>
              <g mask="url(#contour-mask)" fill="none" stroke="var(--color-fg)" strokeWidth="1">
                {CONTOURS.map((d, i) => (
                  <motion.path
                    key={i}
                    d={d}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 2.2, ease }}
                  />
                ))}
              </g>
            </motion.svg>
            <div aria-hidden className="pointer-events-none absolute left-[18%] top-[2%] h-[46%] w-[74%] rounded-full bg-[radial-gradient(closest-side,rgb(var(--blue2-rgb)/0.30),rgb(var(--cyan-rgb)/0.06)_60%,transparent)] blur-2xl" />

            {/* The photograph */}
            <motion.div style={{ x: portraitPX, y: portraitPY }} className="relative">
              <motion.div
                className="relative"
                style={{ filter: "drop-shadow(-10px -6px 28px rgb(var(--blue2-rgb) / 0.16))" }}
                animate={reduce ? undefined : { y: [0, -6, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1.8 }}
              >
                <motion.div
                  className="portrait-mask relative"
                  initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)", clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)", clipPath: "inset(0% 0% 0% 0%)" }}
                  transition={{ delay: 0.3, duration: 1.45, ease }}
                >
                  <Image
                    src="/images/portrait-cutout.webp"
                    alt={`Portrait of ${site.name}, ${site.role}`}
                    width={941}
                    height={1417}
                    priority
                    fetchPriority="high"
                    sizes="(min-width: 1024px) 32vw, (min-width: 768px) 38vw, 78vw"
                    className="h-auto w-full"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {ANNOTATIONS.map((a) => (
              <Callout key={a.label} a={a} px={calloutPX} py={calloutPY} />
            ))}

            {/* Editorial caption */}
            <motion.div
              className="absolute bottom-[8%] right-0 z-20 text-right"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.35, duration: 0.9, ease }}
            >
              <span aria-hidden className="mb-3 ml-auto block h-px w-8 bg-champagne" />
              <p className="font-display text-sm font-semibold uppercase tracking-[0.12em] text-fg">{site.name}</p>
              <p className="mt-1 text-xs text-fg-2">{site.role}</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div style={{ opacity: headOpacity }} className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 lg:block">
        <motion.a
          href="#about"
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span className="meta text-[0.625rem] text-fg-3">Scroll to explore</span>
          <span aria-hidden className="scroll-line block h-10 w-px bg-line-2" />
        </motion.a>
      </motion.div>
    </section>
  );
}
