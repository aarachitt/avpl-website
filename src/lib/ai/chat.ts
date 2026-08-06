import { buildAvplSystemPrompt } from "@/lib/ai/knowledge";

export type ChatMessage = { role: "user" | "assistant"; content: string };

export class AiAssistantNotConfiguredError extends Error {}

const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const MAX_HISTORY_MESSAGES = 20;

/**
 * Real, server-side, multi-turn LLM call for the AI Assistant (brief
 * §12/§5) — a genuine conversational co-pilot, never a decision-tree
 * or keyword-matched bot. Grounded in AVPL's actual content via
 * buildAvplSystemPrompt(). Called only from the /api/ai-assistant
 * route handler; never exposed to or callable from the browser.
 *
 * Explicitly does NOT provide a "fake AI" fallback — if no provider
 * is configured, it throws AiAssistantNotConfiguredError so the route
 * (and the UI) can show an honest "not yet connected" state instead
 * of simulating a conversation.
 */
export async function generateChatReply(history: ChatMessage[]): Promise<string> {
  const provider = (process.env.AI_PROVIDER || "fallback").toLowerCase();
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (provider !== "anthropic" || !apiKey) {
    throw new AiAssistantNotConfiguredError(
      "The AI Assistant requires AI_PROVIDER=anthropic and ANTHROPIC_API_KEY to be configured."
    );
  }

  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";
  const trimmedHistory = history.slice(-MAX_HISTORY_MESSAGES);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30_000);

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
        max_tokens: 1024,
        system: buildAvplSystemPrompt(),
        messages: trimmedHistory.map((m) => ({ role: m.role, content: m.content })),
      }),
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    const errText = await response.text().catch(() => "<unreadable response body>");
    throw new Error(`Anthropic API error ${response.status}: ${errText}`);
  }

  const data = (await response.json()) as { content?: { type: string; text?: string }[] };
  const text = data.content?.find((b) => b.type === "text")?.text;
  if (!text) throw new Error("Anthropic response contained no text content");

  return text;
}
