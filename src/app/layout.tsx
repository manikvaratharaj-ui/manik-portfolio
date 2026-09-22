import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import type { ReactNode } from "react";
import { Providers } from "@/components/Providers";
import { certifications, education, expertise, roles, site } from "@/content/profile";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// One sans family for headings, UI and body; Instrument Serif (same design family)
// is kept for a few editorial accents only.
const sans = localFont({
  src: "../fonts/InstrumentSans-Variable.woff2",
  weight: "400 700",
  variable: "--font-sans",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Arial"],
});

const instrument = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSerif-Italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
  preload: false, // used for a handful of words; not worth blocking on
  fallback: ["Georgia", "serif"],
});

const ogImage = { url: "/og.jpg", width: 1200, height: 630, alt: `${site.name}, ${site.role}` };

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.fullName, url: site.url }],
  creator: site.fullName,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: "en_IN",
    firstName: "Manikkavasagam",
    lastName: "Varatharaj",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [ogImage.url],
  },
  formatDetection: { telephone: false, email: false, address: false },
  // Google Search Console "HTML tag" verification (optional): set NEXT_PUBLIC_GSC_VERIFICATION
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION && {
    verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
  }),
};

// Google Analytics 4 (optional): set NEXT_PUBLIC_GA_ID, e.g. G-XXXXXXXXXX. Nothing loads without it.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const viewport: Viewport = {
  themeColor: "#080D18",
  colorScheme: "dark",
};

const current = roles.find((r) => r.end === null);

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${site.url}/#person`,
      name: site.name,
      alternateName: site.fullName,
      jobTitle: site.role,
      url: site.url,
      image: `${site.url}/images/portrait-editorial.webp`,
      email: `mailto:${site.email}`,
      sameAs: [site.linkedin],
      address: {
        "@type": "PostalAddress",
        addressLocality: site.location.city,
        addressRegion: site.location.region,
        addressCountry: site.location.countryCode,
      },
      ...(current && { worksFor: { "@type": "Organization", name: current.company } }),
      alumniOf: education
        .filter((e) => /Institute|Academy/.test(e.school))
        .map((e) => ({ "@type": "CollegeOrUniversity", name: e.school })),
      knowsAbout: expertise.map((e) => e.title),
      hasCredential: certifications.map((c) => ({
        "@type": "EducationalOccupationalCredential",
        name: c.title,
        recognizedBy: { "@type": "Organization", name: c.issuer },
        ...(c.url && { url: c.url }),
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en-IN",
      publisher: { "@id": `${site.url}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${site.url}/#profile`,
      url: site.url,
      name: site.title,
      isPartOf: { "@id": `${site.url}/#website` },
      mainEntity: { "@id": `${site.url}/#person` },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning className={`${sans.variable} ${instrument.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Without JavaScript, show every entrance-animated element in its final state */}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              "<style>main [style]{opacity:1!important;transform:none!important;clip-path:none!important;filter:none!important}</style>",
          }}
        />
      </head>
      <body className="min-h-screen font-body text-fg">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Providers>{children}</Providers>
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        <div aria-hidden className="grain" />
      </body>
    </html>
  );
}
