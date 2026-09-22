# Manikkavasagam V — Portfolio

Personal portfolio for Manikkavasagam V, Digital Marketing Executive (SEO, AEO, B2B growth, marketing automation).

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion and Lucide icons. The page is fully static and prerendered at build time. It ships in two themes: dark (the brand default) and light.

## Quick start

Requires Node.js 18.18 or newer (20+ recommended).

```bash
npm install
cp .env.example .env.local   # then set your domain
npm run dev                   # http://localhost:3000
```

## Put it online (recommended: Vercel, free)

1. **Get a domain.** For example `manikvaratharaj.com`, to match your email. Any registrar works: GoDaddy, Namecheap, Hostinger or Cloudflare.
2. **Put the code on GitHub.** Create a private repository and upload this folder, without `node_modules` or `.next`.
3. **Import it on Vercel.** Go to vercel.com, sign in with GitHub, choose **Add New → Project** and select the repository. Vercel detects Next.js automatically.
4. **Add environment variables.** Under **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` = `https://www.your-domain.com` (required)
   - `NEXT_PUBLIC_GA_ID` = your GA4 ID (optional)
   - `NEXT_PUBLIC_GSC_VERIFICATION` = your Search Console code (optional)

   Then deploy, or redeploy.
5. **Connect the domain.** Under **Settings → Domains**, add `your-domain.com` and `www.your-domain.com`. Copy the DNS records Vercel shows (usually an A record for the root and a CNAME for `www`) into your registrar's DNS settings. HTTPS is set up automatically once DNS updates, usually within minutes, occasionally up to 48 hours.
6. **Tell Google.**
   - In Google Search Console, add the domain.
   - Verify it with a DNS TXT record, or with the HTML-tag code via `NEXT_PUBLIC_GSC_VERIFICATION`.
   - Submit `https://www.your-domain.com/sitemap.xml`, then use **URL Inspection → Request indexing** on the home page.

Every later change is: edit, push to GitHub, and Vercel redeploys automatically.

### Alternative: any static host (no GitHub needed)

```bash
NEXT_PUBLIC_SITE_URL=https://www.your-domain.com npm run export
```

Upload the contents of `out/`. This works with:
- **Netlify:** drag and drop the folder on app.netlify.com/drop.
- **Cloudflare Pages.**
- **Hostinger or cPanel:** upload into `public_html`.

Set the site URL before exporting, because it's baked into the pages.

### Check before sharing

- Open the site on a phone and a laptop, in both themes.
- Click **Download CV**.
- Paste the URL into a LinkedIn post draft to see the link preview.
- Run a PageSpeed Insights test.

## Page structure

| # | Section | Component |
| --- | --- | --- |
| — | Hero (the only place the portrait appears) | `Hero.tsx` |
| 01 | About, with the "Then / Now" search visual | `About.tsx`, `SearchShift.tsx` |
| — | Counter band | `CounterBand.tsx` |
| 02 | Expertise | `Expertise.tsx` |
| 03 | Toolkit — the marketing stack (discover, earn, measure, scale) plus core skills | `Toolkit.tsx` |
| 04 | Experience timeline | `Career.tsx` |
| 05 | Selected work and case studies | `Work.tsx`, `WorkVisual.tsx` |
| 06 | Process | `Process.tsx` |
| 07 | Certifications and education | `Credentials.tsx` |
| — | Working philosophy | `Philosophy.tsx` |
| 08 | Contact | `Contact.tsx` |

Section order lives in `src/app/page.tsx`. Each section's number is set in its `SectionIntro`. The nav highlights the nearest menu item for every section; Toolkit counts as Expertise and Process as Work. That mapping is in `SECTION_TO_NAV` in `Nav.tsx`.

## Themes

- **Switching:** a sun/moon button sits in the nav and in the mobile menu. The new theme spreads out in a circle from the button, using the View Transitions API where the browser supports it; otherwise the switch is instant.
- **Remembering:** the choice is saved in the visitor's browser. An inline script in `<head>` (`src/lib/theme.ts`) applies it before first paint, so there is no flash.
- **Share links:** add `?theme=light` or `?theme=dark` to any URL to open it in that theme. This is handy for sending a comparison.
- **Colours:** every colour is a token in `src/app/globals.css`. The dark palette is in `@theme` and the light overrides are under `html[data-theme="light"]`. Glows, strokes and tints use channel variables (`--fg-rgb`, `--cyan-rgb`, `--champ-rgb` and others), so they follow the theme too. In light mode blue, cyan and champagne are deepened so text in those colours stays at or above WCAG AA.
- **Default:** dark is the brand default. To follow the visitor's system setting instead, change the init script in `src/lib/theme.ts`.

## Editing content

Every fact on the site lives in one file: **`src/content/profile.ts`**. It was written from the résumé document (`portfolio.docx`). Components only read from it, so a change there updates every section, the metadata and the structured data together.

The file follows one rule: **no number, client, result or claim that isn't verified**. The résumé marks unverified figures with placeholders such as `[XX%]` and `[X]`. Those are left out; the sentence keeps its qualitative claim without the figure.

### Content decisions

- **Employers in case studies are anonymised.** Case studies describe the setting, for example "Enterprise B2B platform" or "Link-building agency". Employer names appear only in the Experience timeline and About, as on the résumé.
- **Paid search is not included**, because the résumé doesn't list it.
- **Availability** reads "Open to full-time roles · on-site or remote". Change `site.availability` and the line in `Contact.tsx` if that changes.
- **Education** shows the two degrees; school records stay in the data with `show: false`.
- **Certificates** show only the issuer and title, with no validity dates.

### Certificate links

Each certification has a `url` field, which is empty for now. Paste the verification link there, and the title becomes a link with a small arrow. The link is also added to the page's structured data.

### Figures

The site deliberately shows no confidential performance data. Case studies are written around the challenge, the approach and what was done. The only figures come from the résumé:

- +20% website traffic and +15% conversion rate on the 2021 client campaigns
- a 20,000+ website database with 100% manual review in the outreach work
- the counter band: 5+ years, 4 roles and 6 certifications

Each case study's `stats` array stays empty unless you choose to add a figure you're comfortable publishing.

The phone number is deliberately not shown.

## Project structure

```
src/
  app/
    layout.tsx        fonts, metadata, Open Graph/Twitter, JSON-LD, theme init, grain overlay
    page.tsx          section order
    robots.ts, sitemap.ts, icon.svg
    globals.css       design tokens for both themes and utility classes
  content/profile.ts  single source of truth for all copy and facts
  components/
    Nav, ThemeToggle, Hero, About, SearchShift, CounterBand, Expertise, Toolkit,
    Career, Work (+ WorkVisual), Process, Credentials, Philosophy, Contact, Footer
    ui/               MaskLines (headline reveal), Magnetic, SectionIntro
  lib/
    motion.ts         easing curves, ramp() helper
    useLive.ts        hydration-safe "animations allowed" flag
    theme.ts          pre-paint theme script
  fonts/              self-hosted Satoshi, Manrope, Instrument Serif (woff2)
public/
  images/portrait-cutout.webp     hero cut-out (background removed, face untouched)
  images/portrait-editorial.webp  used as the Person image in structured data
  og.jpg                          1200×630 social share image
```

## Replacing the portrait

The hero uses a transparent WebP cut-out. To swap it:

1. Keep the same file name.
2. Update the `width`/`height` props in `Hero.tsx` to match the new image.
3. Keep the new photo's person lit from a similar angle, so the blue edge light still makes sense.

## Motion and accessibility

- **Reduced motion.** `prefers-reduced-motion` is respected in every section. Entrance slides become instant, scroll-linked effects and the philosophy band stop, and the About visual opens straight on its "Now" state. The server always renders the finished, fully visible state, so nothing can get stuck hidden.
- **No JavaScript.** A `<noscript>` rule shows every animated element in its final state.
- **Keyboard.**
  - A skip link comes first in the tab order, and focus rings are visible.
  - The Expertise tabs use arrow keys.
  - The About "Then / Now" switch is a real tab control.
  - The theme button always says which theme it will switch to.
  - The case-study dialog traps focus, closes on Escape and returns focus to the button that opened it.
- **Colour contrast.** In both themes, once revealed, small text stays at or above 4.5:1 and large display text at or above 3:1. The career timeline mutes inactive roles by colour, not opacity.
- **Headings.** There is one `h1`, followed by `h2` per section and `h3` per item. Headline lines include real spaces, so crawlers read "Building digital growth…" rather than "BuildingDigital growth…".
- **Responsive.** Checked for horizontal overflow at 320, 360, 390, 414, 768 and 1024 px.

## SEO

- Metadata in `layout.tsx`:
  - title and description
  - canonical URL
  - Open Graph (type `profile`) and a Twitter large-image card
  - robots directives
- Structured data: `Person` (with work, alumni, skills and credentials), `WebSite` and `ProfilePage`, linked by `@id`.
- `robots.txt` and `sitemap.xml` are generated from `NEXT_PUBLIC_SITE_URL`.

## Fonts and licences

- **Satoshi** (Indian Type Foundry, via Fontshare) is free for personal and commercial use under the ITF Free Font License. Check the current terms at fontshare.com before launch.
- **Manrope** and **Instrument Serif** are under the SIL Open Font License.

All fonts are self-hosted, so the site makes no third-party font requests.
