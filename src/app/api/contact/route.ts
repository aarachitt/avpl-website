import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contact";
import { isLikelySpam } from "@/lib/spam-check";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendLeadEmail } from "@/lib/email/sender";
import { buildContactLeadEmail } from "@/lib/email/templates";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const rate = checkRateLimit(`contact:${ip}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again.", fieldErrors },
      { status: 422 }
    );
  }

  if (isLikelySpam({ honeypot: parsed.data.website, renderedAt: parsed.data.renderedAt })) {
    // Return a generic success to avoid tipping off bots — don't
    // deliver the email, but don't error either.
    return NextResponse.json({ ok: true });
  }

  const email = buildContactLeadEmail(parsed.data);
  const result = await sendLeadEmail(email);

  if (!result.ok) {
    // Never expose provider internals to the client.
    // eslint-disable-next-line no-console
    console.error("[api/contact] delivery failed:", result.error);
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't send your message right now. Please try again in a moment.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
