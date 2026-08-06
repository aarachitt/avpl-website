# AVPL Website — Launch Checklist

Status: **development-complete, not launch-ready.** Every requirement in
`AVPL_Website_Development_Brief.docx` that doesn't depend on external
information has been implemented and is testable today. The four items
below are the brief's own "Open Items Before Launch" (§7) — genuine
unresolved external inputs, not engineering gaps. **Do not launch with
any of these still unresolved**, per the brief's explicit instruction
not to go live with placeholder contact information.

## 1. Real contact details

**Blocked on:** address, phone, email, LinkedIn and Instagram handles.

Currently `null` in `src/lib/content/site.ts` (`contact` object) — the
Contact page renders an honest "Coming soon" placeholder for each
field rather than inventing one, and structured data (`Organization`
/ `LocalBusiness` JSON-LD in `src/lib/schema.ts`) omits any field that
isn't configured.

**To resolve:** fill in the five `contact.*` fields in
`src/lib/content/site.ts`. Everything downstream (Contact page,
Footer, JSON-LD, `sameAs`) updates automatically — no other file
needs to change.

## 2. Full Ching's Schezwan case study

**Blocked on:** approved metrics, photos, and outcomes for the
on-ground activation campaign.

The `/impact` page renders a clearly marked, honest placeholder
(`src/components/impact/CaseStudyPlaceholder.tsx`) — no fabricated
reach, conversion, ROI, or testimonial figures.

**To resolve:** populate `chingsSchezwanCaseStudy` in
`src/lib/content/wins.ts` with the approved content, then update
`CaseStudyPlaceholder.tsx` to render it in full.

## 3. Final AI Assistant model/provider + hosting decision

**Current state:** the AI Campaign Builder (`/ai-campaign-builder`)
runs on a deterministic, zero-cost fallback generator by design. The
conversational AI Assistant (`/ai-assistant`) is fully built against
the Claude (Anthropic) Messages API but ships **disconnected** — it
shows an honest "being connected" state rather than a fake bot, per
the brief's explicit ban on scripted/decision-tree AI (§12).

**To resolve:** set `AI_PROVIDER=anthropic` and `ANTHROPIC_API_KEY` in
production environment variables. No code or UI changes are required
— the Assistant goes live immediately once the key is present. If a
different provider is ultimately chosen, only `src/lib/ai/chat.ts`
needs a new implementation behind the same `generateChatReply()`
signature.

## 4. Final logo files and brand colour codes

**Current state:** built to the approved palette/typography direction
already in the codebase (`tailwind.config.ts`) — warm ivory/cream,
charcoal, gold/amber accent, Playfair Display + Manrope. The header
logo mark is a CSS-drawn placeholder (three stacked shapes), not a
supplied logo file.

**To resolve:** drop the final logo asset into `public/` and swap the
mark in `src/components/layout/Header.tsx`; update
`tailwind.config.ts` color tokens if final brand codes differ from
the current palette.

---

## Also worth doing before launch (not brief-mandated blockers, but loose ends)

- Replace `public/og-image.png` (1200×630) — no social-share image is included yet.
- Verify a sending domain with Resend/SMTP so lead emails don't land in spam (`EMAIL_PROVIDER`, `RESEND_API_KEY` / `SMTP_*` in `.env.local`).
- Set `NEXT_PUBLIC_SITE_URL` to the real production domain.
- If deployment sits behind Cloudflare, check its default bot-management rules aren't silently blocking GPTBot / PerplexityBot / ClaudeBot / Google-Extended — `robots.ts` explicitly allows them at the Next.js level, but Cloudflare's WAF/Bot Fight Mode operates independently and can override this upstream.
