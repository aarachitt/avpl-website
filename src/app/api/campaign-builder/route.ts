import { NextRequest, NextResponse } from "next/server";
import { wizardSchema } from "@/lib/validation/campaign";
import { isLikelySpam } from "@/lib/spam-check";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { generateBlueprint } from "@/lib/ai/generate-blueprint";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  const rate = checkRateLimit(`campaign:${ip}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = wizardSchema.safeParse(body);
  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return NextResponse.json(
      { ok: false, error: "Please complete the required fields.", fieldErrors },
      { status: 422 }
    );
  }

  if (isLikelySpam(parsed.data)) {
    return NextResponse.json({ ok: false, error: "Request rejected." }, { status: 400 });
  }

  try {
    const blueprint = await generateBlueprint(parsed.data);
    return NextResponse.json({ ok: true, blueprint });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[api/campaign-builder] generation failed:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't build your blueprint right now. Please try again." },
      { status: 502 }
    );
  }
}
