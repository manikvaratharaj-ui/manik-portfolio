import { Download } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/content/profile";

/** Download link for the CV. `variant` controls the look; all variants download the same file. */
export function CvLink({
  variant = "pill",
  className = "",
  children,
}: {
  variant?: "pill" | "icon" | "text" | "block";
  className?: string;
  children?: ReactNode;
}) {
  const label = children ?? "Download CV";
  const common = { href: site.cv.url, download: site.cv.fileName, type: "application/pdf" } as const;

  if (variant === "icon") {
    return (
      <a
        {...common}
        aria-label="Download CV (PDF)"
        title="Download CV"
        className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-line-2 text-fg-2 transition-colors hover:border-cyan/50 hover:text-fg ${className}`}
      >
        <Download className="h-4 w-4" aria-hidden />
      </a>
    );
  }
  if (variant === "text") {
    return (
      <a {...common} className={`group inline-flex items-center gap-2 font-display text-[0.9375rem] font-medium text-fg ${className}`}>
        <span className="u-link u-link-static">{label}</span>
        <Download className="h-4 w-4 transition-transform duration-300 ease-out-quint group-hover:translate-y-0.5" aria-hidden />
        <span className="sr-only">(PDF)</span>
      </a>
    );
  }
  if (variant === "block") {
    return (
      <a
        {...common}
        className={`flex items-center justify-center gap-2.5 rounded-full bg-fg px-6 py-3.5 font-display text-[0.9375rem] font-semibold text-ink ${className}`}
      >
        <Download className="h-4 w-4" aria-hidden />
        {label}
        <span className="sr-only">(PDF)</span>
      </a>
    );
  }
  return (
    <a
      {...common}
      className={`group inline-flex items-center gap-2 rounded-full bg-fg px-4 py-2 font-display text-[0.8125rem] font-semibold text-ink transition-colors hover:bg-cyan ${className}`}
    >
      <Download className="h-3.5 w-3.5 transition-transform duration-300 ease-out-quint group-hover:translate-y-0.5" aria-hidden />
      {label}
      <span className="sr-only">(PDF)</span>
    </a>
  );
}
