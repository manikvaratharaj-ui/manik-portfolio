# Manikkavasagam V — Portfolio (Next.js)

The finished portfolio lives in `public/portfolio.html` (design, animations, fonts, photo and CV are all inside it).
Next.js serves it at the site root through a rewrite in `next.config.mjs`, so visitors see it at `/`.

## Run locally
    npm install
    npm run dev        # http://localhost:3000

## Deploy
- **Vercel:** import this folder (or its Git repo) — framework "Next.js", no settings to change.
- **Netlify:** import the repo; build command `npm run build` (Next.js runtime is detected automatically).
- **Any Node server:** `npm install && npm run build && npm start`.

## Updating content
Replace `public/portfolio.html` with a newer version and redeploy.
