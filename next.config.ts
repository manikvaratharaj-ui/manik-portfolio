import type { NextConfig } from "next";

// `npm run export` sets STATIC_EXPORT=1 to produce a plain static site in /out
// (any static host). `npm run build` targets a Node / Vercel deployment with
// on-the-fly image optimisation.
const staticExport = process.env.STATIC_EXPORT === "1";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(staticExport
    ? { output: "export", trailingSlash: true, images: { unoptimized: true } }
    : { images: { formats: ["image/avif", "image/webp"] } }),
};

export default config;
