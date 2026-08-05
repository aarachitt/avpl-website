# AVPL Website — Production Build

Production Next.js implementation of the Aarachitt Ventures Pvt Ltd
website, converted from the approved Claude Design prototype
(`../project/Aarachitt Ventures Website.dc.html`). The original
design bundle is preserved untouched one directory up — this folder
is the buildable, deployable engineering output.

## Stack

- **Next.js 14** (App Router) + **TypeScript** (strict mode)
- **Tailwind CSS**, themed with AVPL's exact palette/type scale (see `tailwind.config.ts`)
- **Zod** for request validation (client + server)
- **Resend** (default) or **SMTP via Nodemailer** for lead delivery
- **Claude (Anthropic) API** for the AI Campaign Builder, with a deterministic,
  zero-cost fallback generator that ships live by default
- **Lucide** icons

## Getting started

```bash
cd avpl-website
npm install
cp .env.example .env.local   # then fill in the values you have
npm run dev                  # http://localhost:3000
```

## Environment variables

See `.env.example` for the full list with comments. Nothing needs to
be filled in to run the site locally — every integration has a safe
default:

| Concern | Default behaviour with no config |
|---|---|
| AI Campaign Builder | `AI_PROVIDER=fallback` — deterministic blueprint generator, no external calls, no cost. |
| Contact form / lead delivery | Logs a warning server-side and returns a clear error to the user instead of silently discarding the submission. Set `RESEND_API_KEY` (or `SMTP_*`) to actually deliver leads. |

To turn on live AI generation: set `AI_PROVIDER=anthropic` and
`ANTHROPIC_API_KEY` in your environment. The integration is fully
built — no code changes are needed, and if the API call fails for any
reason at runtime, requests automatically fall back to the
deterministic generator rather than breaking the page.

## Project structure

```
src/
  app/                    # routes (App Router) — one folder per page
    api/contact/          # POST — contact form submission
    api/campaign-builder/ # POST — AI blueprint generation
  components/
    layout/                Header, Footer, CtaBand
    ui/                     Button, Chip, Magnetic (shared primitives)
    home/, services/, wins/, contact/, campaign-builder/
  lib/
    content/               Single source of truth for services, wins, nav, site config
    validation/             Zod schemas (contact + campaign wizard)
    ai/                     Provider abstraction (fallback + Anthropic)
    email/                  Provider abstraction (Resend + SMTP) + templates
    rate-limit.ts, spam-check.ts, sanitize.ts
  types/                   Shared TypeScript types
```

## Routes

| Route | Description |
|---|---|
| `/` | Home |
| `/who-we-are` | Mission, vision, core belief |
| `/services` | 10 service verticals, expand/collapse, explored-progress |
| `/wins` | Brands, institutions, ventures worked with |
| `/ai-campaign-builder` | 5-step AI Campaign Builder wizard |
| `/contact` | Lead capture form |
| `/api/contact` | POST — validated, sanitized, rate-limited contact submission |
| `/api/campaign-builder` | POST — validated, rate-limited blueprint generation |
| `/sitemap.xml`, `/robots.txt` | Generated automatically from `app/sitemap.ts` / `app/robots.ts` |

## Build & deploy

```bash
npm run build
npm run start   # production server on :3000
```

The app is a standard Next.js production build with no
platform-specific assumptions — it deploys to Vercel with zero
config, or to any Node 18+ host (Render, Railway, a VPS behind
PM2/systemd, Docker) via `next build && next start`. API routes run
as standard Next.js route handlers (`export const runtime = "nodejs"`),
so no separate backend service is required.

Before going live:

1. Set all required env vars on your host (see `.env.example`).
2. Verify a sending domain with your email provider (Resend/SMTP) so
   `LEADS_FROM_EMAIL` doesn't land in spam.
3. Update `NEXT_PUBLIC_SITE_URL` to your real domain (used by canonical
   tags, OG metadata and the sitemap).
4. Replace `public/og-image.png` (1200×630) with real social-share
   artwork — none is included yet.
5. Point DNS at your chosen host.

## Notes on fidelity to the approved design

Palette, type (Playfair Display + Manrope), spacing, card styling,
hover/motion language (float, shimmer, fade-up, magnetic buttons) and
all copy are ported directly from `Aarachitt Ventures Website.dc.html`.
Two things were intentionally *not* carried over:

- An unused chat-widget code path that existed in the prototype's JS
  but was never rendered in any screen (dead code).
- The Founder section and 4 additional services mentioned in the
  original brief/content docs but absent from the approved design —
  left out per an explicit scope decision to match the approved
  `.dc.html` exactly. Straightforward to add later (`src/lib/content/services.ts`
  and a new `/who-we-are` section) if wanted.
