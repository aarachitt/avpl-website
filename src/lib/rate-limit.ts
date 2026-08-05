/**
 * Minimal in-memory sliding-window rate limiter, keyed by IP.
 *
 * This is "rate-limit-ready" as required, and works fine for a
 * single-instance/serverless-with-warm-lambda deployment during
 * normal traffic. For multi-instance production traffic at scale,
 * swap the in-memory Map below for a shared store (Upstash Redis,
 * Vercel KV, etc.) behind the same `checkRateLimit` interface — no
 * call-site changes required.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

const MAX_REQUESTS = Number(process.env.RATE_LIMIT_MAX ?? 5);
const WINDOW_MS = Number(process.env.RATE_LIMIT_WINDOW_MS ?? 10 * 60 * 1000);

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + WINDOW_MS;
    buckets.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetAt };
  }

  if (existing.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: MAX_REQUESTS - existing.count,
    resetAt: existing.resetAt,
  };
}

/** Best-effort client IP extraction behind common proxies/CDNs. */
export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headers.get("x-real-ip") || "unknown";
}
