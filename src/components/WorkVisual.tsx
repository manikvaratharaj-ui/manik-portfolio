"use client";

import { motion, useReducedMotion, type SVGMotionProps } from "framer-motion";
import type { Motif } from "@/content/profile";
import { ease } from "@/lib/motion";

/* Conceptual illustrations only — no real metrics are encoded in these shapes. */

const C = {
  line: "rgb(var(--fg-rgb) / 0.10)",
  soft: "rgb(var(--fg-rgb) / 0.18)",
  cyan: "var(--color-cyan)",
  blue: "var(--color-blue-2)",
  champ: "var(--color-champagne)",
  text: "rgb(var(--fg2-rgb) / 0.75)",
};

type DrawProps = SVGMotionProps<SVGPathElement> & { play: boolean; delay?: number; dur?: number };

function Draw({ play, delay = 0, dur = 1.4, ...rest }: DrawProps) {
  return (
    <motion.path
      fill="none"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={play ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ delay, duration: dur, ease }}
      {...rest}
    />
  );
}

function Fade({ play, delay = 0, children }: { play: boolean; delay?: number; children: React.ReactNode }) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: play ? 1 : 0 }} transition={{ delay, duration: 0.8, ease }}>
      {children}
    </motion.g>
  );
}

const Label = ({ x, y, children, anchor = "start" }: { x: number; y: number; children: string; anchor?: "start" | "end" | "middle" }) => (
  <text x={x} y={y} fill={C.text} fontSize="10" letterSpacing="1.6" textAnchor={anchor} style={{ textTransform: "uppercase", fontFamily: "var(--font-display)" }}>
    {children}
  </text>
);

function Migration({ play }: { play: boolean }) {
  const rows = Array.from({ length: 6 }, (_, i) => 78 + i * 46);
  const map = [0, 2, 1, 4, 3, 5];
  const widths = [96, 72, 110, 64, 88, 100];
  return (
    <>
      <Label x={84} y={52}>Legacy URLs</Label>
      <Label x={556} y={52} anchor="end">New URLs</Label>
      {rows.map((y, i) => (
        <Fade key={`l${i}`} play={play} delay={i * 0.05}>
          <rect x={84} y={y} width={150} height={24} rx={5} fill="rgb(var(--fg-rgb) / 0.025)" stroke={C.line} />
          <rect x={96} y={y + 10} width={widths[i]} height={4} rx={2} fill={C.soft} />
          <rect x={406} y={rows[map[i]]} width={150} height={24} rx={5} fill="rgb(var(--blue-rgb) / 0.06)" stroke="rgb(var(--blue2-rgb) / 0.25)" />
          <rect x={418} y={rows[map[i]] + 10} width={widths[5 - i]} height={4} rx={2} fill="rgb(var(--cyan-rgb) / 0.45)" />
        </Fade>
      ))}
      {rows.map((y, i) => {
        const y2 = rows[map[i]] + 12;
        const hi = i === 2;
        return (
          <g key={`c${i}`}>
            <Draw play={play} delay={0.35 + i * 0.08} d={`M234 ${y + 12} C 320 ${y + 12}, 320 ${y2}, 406 ${y2}`} stroke={hi ? C.champ : "rgb(var(--cyan-rgb) / 0.45)"} strokeWidth={hi ? 1.5 : 1} />
            <Fade play={play} delay={0.9 + i * 0.08}>
              <circle cx={320} cy={(y + 12 + y2) / 2} r={hi ? 3.5 : 2.2} fill={hi ? C.champ : C.cyan} />
            </Fade>
          </g>
        );
      })}
      <Fade play={play} delay={1.4}>
        <text x={320} y={360} fill={C.text} fontSize="10" letterSpacing="1.6" textAnchor="middle" style={{ fontFamily: "var(--font-display)" }}>
          301s mapped, then validated
        </text>
      </Fade>
    </>
  );
}

function Entities({ play }: { play: boolean }) {
  const cx = 290;
  const cy = 214;
  const nodes = [
    [0.2, 128, 7], [1.05, 150, 5], [1.9, 118, 8], [2.7, 160, 5], [3.4, 128, 6], [4.2, 150, 7], [5.0, 112, 5], [5.7, 158, 6],
  ].map(([a, r, s]) => ({ x: cx + Math.cos(a) * r * 1.2, y: cy + Math.sin(a) * r * 0.78, s }));
  return (
    <>
      <Fade play={play}>
        <ellipse cx={cx} cy={cy} rx={150} ry={98} fill="none" stroke={C.line} strokeDasharray="2 6" />
        <ellipse cx={cx} cy={cy} rx={196} ry={128} fill="none" stroke={C.line} />
      </Fade>
      {nodes.map((n, i) => (
        <Draw key={`e${i}`} play={play} delay={0.2 + i * 0.06} d={`M${cx} ${cy} L${n.x.toFixed(1)} ${n.y.toFixed(1)}`} stroke="rgb(var(--cyan-rgb) / 0.35)" />
      ))}
      <Draw play={play} delay={0.8} d={`M${nodes[0].x.toFixed(1)} ${nodes[0].y.toFixed(1)} L${nodes[1].x.toFixed(1)} ${nodes[1].y.toFixed(1)} L${nodes[2].x.toFixed(1)} ${nodes[2].y.toFixed(1)}`} stroke={C.line} />
      <Draw play={play} delay={0.9} d={`M${nodes[4].x.toFixed(1)} ${nodes[4].y.toFixed(1)} L${nodes[5].x.toFixed(1)} ${nodes[5].y.toFixed(1)}`} stroke={C.line} />
      {nodes.map((n, i) => (
        <Fade key={`n${i}`} play={play} delay={0.5 + i * 0.05}>
          <circle cx={n.x} cy={n.y} r={n.s} fill="var(--color-ink-2)" stroke={i === 3 ? C.champ : C.cyan} strokeWidth={1.2} />
        </Fade>
      ))}
      <Fade play={play} delay={0.1}>
        <circle cx={cx} cy={cy} r={30} fill="rgb(var(--blue-rgb) / 0.16)" stroke={C.blue} />
        <rect x={cx - 14} y={cy - 3} width={28} height={6} rx={3} fill={C.cyan} />
      </Fade>
      {/* An "answer" that cites the entity */}
      <Fade play={play} delay={1.1}>
        <rect x={452} y={40} width={150} height={78} rx={10} fill="rgb(var(--fg-rgb) / 0.03)" stroke={C.soft} />
        <rect x={466} y={58} width={96} height={5} rx={2.5} fill={C.soft} />
        <rect x={466} y={72} width={122} height={4} rx={2} fill={C.line} />
        <rect x={466} y={84} width={110} height={4} rx={2} fill={C.line} />
        <circle cx={588} cy={100} r={5} fill="none" stroke={C.champ} />
      </Fade>
      <Draw play={play} delay={1.3} d={`M452 100 C 400 110, 360 150, ${cx + 26} ${cy - 16}`} stroke={C.champ} strokeDasharray="3 5" />
    </>
  );
}

function Crawl({ play }: { play: boolean }) {
  const root = { x: 300, y: 48 };
  const l2 = [120, 300, 480].map((x) => ({ x, y: 138 }));
  const l3 = [60, 150, 240, 300, 360, 450, 540].map((x) => ({ x, y: 234 }));
  const l4 = [150, 300, 450].map((x) => ({ x, y: 322 }));
  const parents3 = [0, 0, 1, 1, 1, 2, 2];
  const node = (p: { x: number; y: number }, w = 40) => ({ x: p.x - w / 2, y: p.y, w });
  const elbow = (a: { x: number; y: number }, b: { x: number; y: number }) => `M${a.x} ${a.y + 22} V${(a.y + 22 + b.y) / 2} H${b.x} V${b.y}`;
  return (
    <>
      {l2.map((p, i) => <Draw key={`a${i}`} play={play} delay={0.2 + i * 0.05} d={elbow(root, p)} stroke={C.line} />)}
      {l3.map((p, i) => <Draw key={`b${i}`} play={play} delay={0.45 + i * 0.04} d={elbow(l2[parents3[i]], p)} stroke={C.line} />)}
      {l4.map((p, i) => <Draw key={`c${i}`} play={play} delay={0.7 + i * 0.05} d={elbow(l3[[1, 3, 5][i]], p)} stroke={C.line} />)}
      {[root, ...l2, ...l3, ...l4].map((p, i) => {
        const n = node(p);
        const issue = i === 7;
        return (
          <Fade key={`n${i}`} play={play} delay={0.15 + i * 0.03}>
            <rect x={n.x} y={n.y} width={n.w} height={22} rx={5} fill="rgb(var(--fg-rgb) / 0.03)" stroke={issue ? C.champ : "rgb(var(--cyan-rgb) / 0.35)"} />
            <circle cx={n.x + n.w - 8} cy={n.y + 11} r={2.6} fill={issue ? C.champ : C.cyan} />
            <rect x={n.x + 7} y={n.y + 9} width={14} height={4} rx={2} fill={C.soft} />
          </Fade>
        );
      })}
      <Draw play={play} delay={1.1} dur={2} d="M36 60 C 120 40, 200 120, 300 150 S 470 250, 590 330" stroke={C.champ} strokeWidth={1} strokeDasharray="2 6" />
      <Fade play={play} delay={1.5}>
        <Label x={590} y={40} anchor="end">Crawl, index, render</Label>
      </Fade>
    </>
  );
}

function Outreach({ play }: { play: boolean }) {
  const cols = 26;
  const rowsN = 14;
  const picked = new Set([31, 58, 97, 120, 151, 176, 209, 233, 262, 289, 318, 340]);
  const hub = { x: 470, y: 196 };
  const dots = Array.from({ length: cols * rowsN }, (_, i) => ({ i, x: 60 + (i % cols) * 20, y: 58 + Math.floor(i / cols) * 22 }));
  return (
    <>
      <Fade play={play}>
        {dots.map((d) => (
          <circle key={d.i} cx={d.x} cy={d.y} r={1.4} fill="rgb(var(--fg-rgb) / 0.16)" />
        ))}
      </Fade>
      {dots
        .filter((d) => picked.has(d.i))
        .map((d, k) => (
          <g key={`p${d.i}`}>
            <Draw play={play} delay={0.6 + k * 0.06} d={`M${d.x} ${d.y} L${hub.x} ${hub.y}`} stroke="rgb(var(--cyan-rgb) / 0.28)" />
            <Fade play={play} delay={0.4 + k * 0.06}>
              <circle cx={d.x} cy={d.y} r={3.2} fill={C.cyan} />
            </Fade>
          </g>
        ))}
      <Fade play={play} delay={1.2}>
        <circle cx={hub.x} cy={hub.y} r={16} fill="rgb(var(--champ-rgb) / 0.14)" stroke={C.champ} />
        <circle cx={hub.x} cy={hub.y} r={4} fill={C.champ} />
        <Label x={60} y={38}>Every site reviewed by hand</Label>
      </Fade>
    </>
  );
}

function Growth({ play }: { play: boolean }) {
  const main = "M60 318 C 140 312, 190 290, 240 280 S 340 252, 392 214 S 500 150, 590 96";
  const second = "M60 338 C 160 336, 220 322, 290 310 S 420 282, 470 262 S 560 226, 590 214";
  return (
    <>
      <defs>
        <linearGradient id="growth-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-blue-2)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-blue-2)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <Fade play={play}>
        {[80, 140, 200, 260, 320].map((y) => (
          <line key={y} x1={60} x2={590} y1={y} y2={y} stroke="rgb(var(--fg-rgb) / 0.06)" />
        ))}
      </Fade>
      <Fade play={play} delay={1}>
        <path d={`${main} L590 360 L60 360 Z`} fill="url(#growth-fill)" />
      </Fade>
      <Draw play={play} delay={0.2} dur={1.8} d={second} stroke={C.champ} strokeDasharray="3 6" />
      <Draw play={play} delay={0.1} dur={1.8} d={main} stroke={C.cyan} strokeWidth={2} />
      <Fade play={play} delay={1.6}>
        <circle cx={590} cy={96} r={5} fill={C.cyan} />
        <circle cx={590} cy={96} r={12} fill="none" stroke="rgb(var(--cyan-rgb) / 0.35)" />
        <circle cx={590} cy={214} r={4} fill={C.champ} />
        <Label x={60} y={52}>Traffic and conversions</Label>
      </Fade>
    </>
  );
}

function Reporting({ play }: { play: boolean }) {
  const reduce = useReducedMotion();
  const bars = [46, 62, 54, 78, 70, 92, 84, 104];
  const trend = "M84 236 C 120 226, 140 214, 168 206 S 222 170, 246 164 S 278 132, 290 126";
  const cards = [104, 172, 240];
  const link = "M306 200 C 336 200, 340 128, 380 128";
  return (
    <>
      <Label x={64} y={70}>Search Console data</Label>
      <Label x={588} y={70} anchor="end">Initiatives</Label>

      {/* the report */}
      <Fade play={play}>
        <rect x={64} y={88} width={242} height={226} rx={14} fill="rgb(var(--fg-rgb) / 0.025)" stroke={C.line} />
        <rect x={82} y={106} width={64} height={5} rx={2.5} fill={C.soft} />
        <rect x={82} y={118} width={40} height={4} rx={2} fill={C.line} />
      </Fade>
      {bars.map((h, i) => (
        <Fade key={i} play={play} delay={0.15 + i * 0.05}>
          <rect x={86 + i * 26} y={296 - h * 0.5} width={14} height={h * 0.5} rx={3} fill="rgb(var(--blue2-rgb) / 0.22)" />
        </Fade>
      ))}
      <Draw play={play} delay={0.5} dur={1.6} d={trend} stroke={C.cyan} strokeWidth={1.5} />
      <Fade play={play} delay={1.6}>
        <circle cx={290} cy={126} r={4} fill={C.champ} />
        <circle cx={290} cy={126} r={9} fill="none" stroke="rgb(var(--champ-rgb) / 0.4)" />
      </Fade>

      {/* insight -> initiative */}
      <Draw play={play} delay={1.2} d={link} stroke="rgb(var(--cyan-rgb) / 0.45)" />
      {cards.map((y, i) => (
        <Fade key={y} play={play} delay={1.4 + i * 0.12}>
          <rect
            x={380}
            y={y}
            width={208}
            height={52}
            rx={12}
            fill={i === 0 ? "rgb(var(--champ-rgb) / 0.08)" : "rgb(var(--fg-rgb) / 0.03)"}
            stroke={i === 0 ? "rgb(var(--champ-rgb) / 0.6)" : C.line}
          />
          <rect x={396} y={y + 16} width={20} height={20} rx={5} fill="none" stroke={i === 0 ? C.champ : C.soft} />
          {i > 0 && <path d={`M${401} ${y + 26} l4 4 l7 -8`} stroke={C.cyan} strokeWidth={1.5} fill="none" />}
          <rect x={428} y={y + 18} width={[112, 92, 124][i]} height={5} rx={2.5} fill={i === 0 ? "rgb(var(--champ-rgb) / 0.55)" : C.soft} />
          <rect x={428} y={y + 30} width={[70, 84, 60][i]} height={4} rx={2} fill={C.line} />
        </Fade>
      ))}

      {/* and back into the next report */}
      <Draw play={play} delay={1.9} d="M484 300 C 484 356, 196 356, 196 326" stroke={C.line} strokeDasharray="3 5" />
      <Fade play={play} delay={2.1}>
        <path d="M190 332 L196 322 L202 332" stroke={C.soft} fill="none" />
        <Label x={340} y={372} anchor="middle">Review, then report again</Label>
      </Fade>

      {play && !reduce && (
        <circle r={3.5} fill={C.champ}>
          <animateMotion dur="3.2s" repeatCount="indefinite" path={link} begin="2s" />
        </circle>
      )}
    </>
  );
}

const MAP: Record<Motif, (p: { play: boolean }) => React.ReactElement> = {
  migration: Migration,
  entities: Entities,
  crawl: Crawl,
  outreach: Outreach,
  growth: Growth,
  reporting: Reporting,
};

export function WorkVisual({ motif, play }: { motif: Motif; play: boolean }) {
  const Cmp = MAP[motif];
  return (
    <svg viewBox="0 0 640 400" className="h-full w-full" role="presentation" aria-hidden>
      <Cmp play={play} />
    </svg>
  );
}
