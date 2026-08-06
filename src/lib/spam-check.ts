/**
 * Layered, dependency-free spam defense for public forms:
 *  1. Honeypot field — invisible to real users via CSS, but scripted
 *     bots that fill every input will populate it. Each form supplies
 *     its own honeypot value (field name varies per form so it never
 *     collides with a real field, e.g. "website" is a genuine field
 *     on the Partnership form, so that form's honeypot is "hpField").
 *  2. Minimum fill-time heuristic — rejects submissions faster than a
 *     human could plausibly complete the form.
 *  3. Rate limiting — handled separately in lib/rate-limit.ts.
 *
 * This intentionally avoids a third-party CAPTCHA dependency by
 * default so forms work out of the box. If stronger protection is
 * needed later, wire TURNSTILE_SITE_KEY / TURNSTILE_SECRET_KEY (see
 * .env.example) into this same check without touching the routes.
 */

const MIN_FILL_TIME_MS = 1500;

export function isLikelySpam(input: { honeypot?: string; renderedAt?: number }): boolean {
  if (input.honeypot && input.honeypot.trim().length > 0) return true;

  if (typeof input.renderedAt === "number") {
    const elapsed = Date.now() - input.renderedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_TIME_MS) return true;
  }

  return false;
}
