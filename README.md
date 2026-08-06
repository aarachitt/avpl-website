# AVPL Website — Production Build

Production Next.js implementation of the Aarachitt Ventures Pvt Ltd
website, built to `AVPL_Website_Development_Brief.docx` (content,
routes, forms, AI, SEO/schema requirements) on top of the visual
system established in the original approved Claude Design prototype
(`../project/Aarachitt Ventures Website.dc.html`, preserved untouched
one directory up).

**Not launch-ready yet** — see `LAUNCH_CHECKLIST.md` for the four
genuine open items (real contact details, the Ching's Schezwan case
study, the AI Assistant's live credential, final logo/brand codes).
Everything else in the brief is implemented and testable today.

## Stack

- **Next.js 14** (App Router) + **TypeScript** (strict mode)
- **Tailwind CSS**, themed with AVPL's exact palette/type scale (see `tailwind.config.ts`)
- **Zod** for request validation (client + server)
- **Resend** (default) or **SMTP via Nodemailer** for lead delivery
- **Claude (Anthropic) API** for the AI Assistant (real multi-turn chat) and,
  optionally, the AI Campaign Builder — both ship with honest, non-fake
  offline states until a credential is supplied (see `LAUNCH_CHECKLIST.md`)
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
be filled in to run the site locally — every integration has a safe,
honest default:

| Concern | Default behaviour with no config |
|---|---|
| AI Assistant (`/ai-assistant`) | Shows an explicit "being connected" state — never a fake/simulated conversation, per the brief's ban on scripted AI. |
| AI Campaign Builder (`/ai-campaign-builder`) | Deterministic, zero-cost blueprint generator — no external calls. |
| Contact / Partnership forms | Logs a warning server-side and returns a clear error instead of silently discarding the submission. Requires `LEADS_FROM_EMAIL` + `LEADS_TO_EMAIL` + a provider key before any lead can actually deliver. |

Set `AI_PROVIDER=anthropic` + `ANTHROPIC_API_KEY` to bring the AI
Assistant (and, if desired, the Campaign Builder) live — no code
changes needed.

## Project structure

```
src/
  app/
    page.tsx                 Home
    about/                    Who We Are
    services/                 Services (15 cards + FAQ + JSON-LD)
    impact/                   Our Impact (+ case-study placeholder)
    ai-assistant/              Real LLM chat
    ai-campaign-builder/       Guided 5-step blueprint wizard
    consultation/              Categories + Partner Network + Partnership form
    contact/                   Lead capture
    api/
      contact/, partnership/, campaign-builder/, ai-assistant/
    sitemap.ts, robots.ts
  components/
    layout/                   Header, Footer, CtaBand
    ui/                        Button, Chip, Magnetic
    services/, impact/, consultation/, ai-assistant/, campaign-builder/, contact/
  lib/
    content/                   Single source of truth: site, about, services,
                                consultation, faq, wins (impact)
    validation/                 Zod schemas
    ai/                         knowledge.ts (system-prompt grounding),
                                 chat.ts (Assistant), fallback.ts + anthropic.ts (Campaign Builder)
    email/                      Provider abstraction (Resend + SMTP) + templates
    schema.ts                   Organization / LocalBusiness / Service / FAQPage JSON-LD
    rate-limit.ts, spam-check.ts, sanitize.ts
  types/
public/
  llms.txt                     AI-crawler discoverability summary
```

## Routes

| Route | Description |
|---|---|
| `/` | Home |
| `/about` | Who We Are — mission, vision, values, mission pillars |
| `/services` | 15 service verticals + FAQ accordion + `FAQPage`/`Service` JSON-LD |
| `/impact` | Brands/institutions/ventures + Ching's Schezwan case-study placeholder |
| `/ai-assistant` | Real multi-turn LLM chat, grounded in AVPL's own content |
| `/ai-campaign-builder` | Guided 5-step blueprint wizard |
| `/consultation` | Consultation categories, Partner Network, disclaimer, Partnership form |
| `/contact` | Lead capture, pending contact details shown honestly |
| `/api/contact`, `/api/partnership` | POST — validated/sanitized/rate-limited lead delivery |
| `/api/campaign-builder` | POST — blueprint generation |
| `/api/ai-assistant` | GET (config check) / POST — chat turn |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt` | Crawler discoverability (AI crawlers explicitly allowed) |

## Build & deploy

```bash
npm run build
npm run start   # production server on :3000
```

Standard Next.js production build, no platform-specific assumptions —
deploys to Vercel with zero config, or any Node 18+ host via
`next build && next start`. API routes are standard Next.js route
handlers (`export const runtime = "nodejs"`), no separate backend
service required.

Before going live, work through `LAUNCH_CHECKLIST.md` in full — it is
the authoritative list of what's still pending and exactly where to
fill each item in.

## Content architecture

All brief copy lives in `src/lib/content/*.ts` as the single source of
truth — nav, services (with `contactCategory` mapping used by "Get
this built by AVPL" links), consultation categories/partner network,
FAQ, and company/contact config. The AI system prompt
(`src/lib/ai/knowledge.ts`) is generated FROM these same modules, so
the website and the AI Assistant can never drift out of sync.
