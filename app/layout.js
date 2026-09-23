// Required by Next.js. The home page itself is served from public/portfolio.html (see next.config.mjs).
export const metadata = { title: "Manikkavasagam V" };

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN">
      <body>{children}</body>
    </html>
  );
}
