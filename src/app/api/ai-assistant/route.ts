import { NextRequest, NextResponse } from "next/server";
import { chatRequestSchema } from "@/lib/validation/ai-assistant";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { generateChatReply, AiAssistantNotConfiguredError } from "@/lib/ai/chat";

export const runtime = "nodejs";

/** Lightweight configuration check so the UI can show an honest
 * "not yet connected" state on load, without spending a chat turn. */
export async function GET() {
  const configured =
    (process.env.AI_PROVIDER || "fallback").toLowerCase() === "anthropic" &&
    Boolean(process.env.ANTHROPIC_API_KEY);
  return NextResponse.json({ configured });
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req.headers);
  // Chat is more chatty than a lead form — allow a higher ceiling,
  // still bounded, still rate-limit-ready against abuse.
  const rate = checkRateLimit(`ai-assistant:${ip}`);
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please slow down and try again shortly." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid conversation payload." },
      { status: 422 }
    );
  }

  try {
    const reply = await generateChatReply(parsed.data.messages);
    return NextResponse.json({ ok: true, reply });
  } catch (err) {
    if (err instanceof AiAssistantNotConfiguredError) {
      // Not an error state — an honest, explicit "not connected yet"
      // signal the UI renders distinctly. Never faked with a canned
      // reply (brief §12).
      return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
    }
    // eslint-disable-next-line no-console
    console.error("[api/ai-assistant] generation failed:", err);
    return NextResponse.json(
      { ok: false, error: "The Assistant couldn't respond just now. Please try again." },
      { status: 502 }
    );
  }
}
