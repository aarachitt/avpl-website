import type { WizardValues, CampaignBlueprint } from "@/types/campaign";

/**
 * Privacy-conscious handoff between the AI Campaign Builder and the
 * Contact form: we persist only the minimum context needed so the
 * user never has to retype what they already told the wizard, using
 * sessionStorage (cleared when the tab closes, never sent to a
 * server, never appended to a shareable URL).
 */

const STORAGE_KEY = "avpl_campaign_context";

export type CampaignContext = {
  businessName: string;
  industry: string;
  primaryGoal: string;
  timeframe: string;
  budget: string;
  blueprintTitle: string;
  recommendedService?: string;
};

export function saveCampaignContext(values: WizardValues, blueprint: CampaignBlueprint) {
  if (typeof window === "undefined") return;
  const ctx: CampaignContext = {
    businessName: values.businessName,
    industry: values.industry,
    primaryGoal: values.primaryGoal,
    timeframe: values.timeframe,
    budget: values.budget,
    blueprintTitle: blueprint.title,
    recommendedService: blueprint.services[0],
  };
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ctx));
  } catch {
    // sessionStorage may be unavailable (private browsing, etc.) — non-fatal.
  }
}

export function readCampaignContext(): CampaignContext | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CampaignContext) : null;
  } catch {
    return null;
  }
}

export function clearCampaignContext() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
