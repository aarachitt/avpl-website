import { NextRequest, NextResponse } from "next/server";
import { partnershipSchema } from "@/lib/validation/partnership";
import { isLikelySpam } from "@/lib/spam-check";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { sendLeadEmail } from "@/lib/email/sender";
import { buildPartnershipLeadEmail } from "@/lib/email/templates";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const rate = checkRateLimit(`partnership:${ip}`);
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

  const parsed = partnershipSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again.", fieldErrors },
      { status: 422 }
    );
  }

  if (isLikelySpam({ honeypot: parsed.data.hpField, renderedAt: parsed.data.renderedAt })) {
    return NextResponse.json({ ok: true });
  }

  const email = buildPartnershipLeadEmail(parsed.data);
  const result = await sendLeadEmail(email);

  if (!result.ok) {
    // eslint-disable-next-line no-console
    console.error("[api/partnership] delivery failed:", result.error);
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your inquiry right now. Please try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
