/** @type {import('next').NextConfig} */
const nextConfig = {
  // Serve the finished portfolio (public/portfolio.html) at the site root.
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/portfolio.html" }],
    };
  },
  async headers() {
    return [
      {
        source: "/portfolio.html",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
