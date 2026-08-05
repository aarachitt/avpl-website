/**
 * Layered, dependency-free spam defense for public forms:
 *  1. Honeypot field ("website") — invisible to real users via CSS,
 *     but scripted bots that fill every input will populate it.
 *  2. Minimum fill-time heuristic — rejects submissions faster than a
 *     human could plausibly complete the form.
 *  3. Rate limiting — handled separately in lib/rate-limit.ts.
 *
 * This intentionally avoids a third-party CAPTCHA dependency by
 * default so the form works out of the box. If stronger protection is
 * needed later, wire TURNSTILE_SITE_KEY / TURNSTILE_SECRET_KEY (see
 * .env.example) into this same check without touching the routes.
 */

const MIN_FILL_TIME_MS = 1500;

export function isLikelySpam(input: { website?: string; renderedAt?: number }): boolean {
  if (input.website && input.website.trim().length > 0) return true;

  if (typeof input.renderedAt === "number") {
    const elapsed = Date.now() - input.renderedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_TIME_MS) return true;
  }

  return false;
}
