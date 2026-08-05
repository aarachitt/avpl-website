import type { CampaignBlueprint } from "@/types/campaign";
import type { WizardInput } from "@/lib/validation/campaign";
import { generateFallbackBlueprint } from "@/lib/ai/fallback";
import { generateBlueprintWithAnthropic } from "@/lib/ai/anthropic";

/**
 * Single entry point the API route calls. Provider selection is
 * entirely env-driven (AI_PROVIDER), so switching from the free
 * deterministic fallback to a live Claude integration — or back, e.g.
 * if a key is revoked — never requires a code or frontend change.
 *
 * If a live provider is configured but the call fails for any reason
 * (network, quota, bad key), we log the failure and serve the
 * fallback blueprint rather than showing the user a broken wizard.
 * The response tells the caller which path was actually used via
 * `source`, so this is never silently misrepresented.
 */
export async function generateBlueprint(input: WizardInput): Promise<CampaignBlueprint> {
  const provider = (process.env.AI_PROVIDER || "fallback").toLowerCase();

  if (provider === "anthropic") {
    try {
      return await generateBlueprintWithAnthropic(input);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("[ai] Anthropic provider failed, serving fallback blueprint:", err);
      return generateFallbackBlueprint(input);
    }
  }

  return generateFallbackBlueprint(input);
}
