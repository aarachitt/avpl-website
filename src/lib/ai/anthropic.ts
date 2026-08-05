import type { CampaignBlueprint } from "@/types/campaign";
import type { WizardInput } from "@/lib/validation/campaign";
import { services as avplServices } from "@/lib/content/services";

/**
 * Real, server-side AI provider. Called ONLY from API route handlers
 * (never from the browser) — the key is read from process.env and
 * never serialized into any response sent to the client.
 *
 * Uses a direct fetch against the Claude Messages API rather than the
 * SDK, to keep the dependency surface minimal for this one call site.
 */

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";

export class AnthropicUnavailableError extends Error {}

export async function generateBlueprintWithAnthropic(
  v: WizardInput
): Promise<CampaignBlueprint> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new AnthropicUnavailableError("ANTHROPIC_API_KEY is not configured");
  }

  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";
  const serviceNames = avplServices.map((s) => s.name).join(", ");

  const systemPrompt = `You are AVPL's (Aarachitt Ventures Pvt Ltd) senior growth strategist. AVPL is India's 360° growth & solutions company. Your job is to turn a short client brief into a grounded, specific marketing campaign blueprint.

AVPL's service catalogue (only recommend from this list): ${serviceNames}.

Respond with ONLY a single JSON object — no markdown fences, no commentary — matching exactly this shape:
{
  "title": string,
  "executiveSummary": string (2-3 sentences),
  "positioning": string (2-3 sentences),
  "channels": string[] (3-5 items),
  "pillars": string[] (3-5 messaging pillars),
  "contentIdeas": string[] (3-5 concrete content ideas),
  "plan": string[] (4 items, a week-by-week 30-day plan),
  "services": string[] (2-4 items, ONLY from the AVPL service catalogue above),
  "kpis": string[] (3-4 measurable KPIs),
  "timeline": string,
  "nextStep": string (one sentence, a call to action to work with AVPL)
}`;

  const userPrompt = buildUserPrompt(v);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  let response: Response;
  try {
    response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: "user", content: userPrompt }],
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const errText = await safeText(response);
    throw new Error(`Anthropic API error ${response.status}: ${errText}`);
  }

  const data = (await response.json()) as {
    content?: { type: string; text?: string }[];
  };
  const text = data.content?.find((b) => b.type === "text")?.text;
  if (!text) throw new Error("Anthropic response contained no text content");

  const parsed = parseBlueprintJson(text);
  return { ...parsed, source: "anthropic" };
}

function buildUserPrompt(v: WizardInput): string {
  const lines = [
    `Business name: ${v.businessName}`,
    `Industry: ${v.industry}`,
    `What they sell (one line): ${v.oneLiner}`,
    `Business stage: ${v.businessStage}`,
    `Primary goal: ${v.primaryGoal}`,
    `Timeframe: ${v.timeframe}`,
    `Monthly budget band: ${v.budget}`,
    `Audience type: ${v.audienceType}`,
    `Primary age range: ${v.ageRange}`,
    `Geography: ${v.geography}`,
  ];
  if (v.tone) lines.push(`Preferred tone: ${v.tone}`);
  if (v.platforms?.length) lines.push(`Preferred platforms: ${v.platforms.join(", ")}`);
  if (v.links) lines.push(`Reference links: ${v.links}`);
  if (v.competitors) lines.push(`Competitors: ${v.competitors}`);
  if (v.notes) lines.push(`Additional context: ${v.notes}`);
  return lines.join("\n");
}

function parseBlueprintJson(raw: string): Omit<CampaignBlueprint, "source"> {
  const cleaned = raw.trim().replace(/^```json\s*/i, "").replace(/```$/, "");
  const obj = JSON.parse(cleaned);

  const asStringArray = (val: unknown): string[] =>
    Array.isArray(val) ? val.filter((x): x is string => typeof x === "string") : [];

  return {
    title: String(obj.title ?? "Your Growth Blueprint"),
    executiveSummary: String(obj.executiveSummary ?? ""),
    positioning: String(obj.positioning ?? ""),
    channels: asStringArray(obj.channels),
    pillars: asStringArray(obj.pillars),
    contentIdeas: asStringArray(obj.contentIdeas),
    plan: asStringArray(obj.plan),
    services: asStringArray(obj.services),
    kpis: asStringArray(obj.kpis),
    timeline: String(obj.timeline ?? ""),
    nextStep: String(obj.nextStep ?? ""),
  };
}

async function safeText(res: Response): Promise<string> {
  try {
    return await res.text();
  } catch {
    return "<unreadable response body>";
  }
}
