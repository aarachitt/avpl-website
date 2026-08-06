import { Clock } from "lucide-react";
import { chingsSchezwanCaseStudy } from "@/lib/content/wins";

/**
 * Production-safe placeholder for the Ching's Schezwan on-ground
 * activation case study (brief §4/§8 — explicitly pending). No
 * metrics, photos, testimonials, ROI, reach, or conversion figures
 * are fabricated. Once `chingsSchezwanCaseStudy` in
 * lib/content/wins.ts is populated with the approved case study,
 * this component should be updated to render it — the surrounding
 * page requires no restructuring.
 */
export function CaseStudyPlaceholder() {
  return (
    <div className="rounded-card border-[1.5px] border-dashed border-champagne bg-ivory-card p-9 md:p-12">
      <div className="mb-4 flex items-center gap-2 text-gold-deep">
        <Clock size={18} aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-[0.14em]">Case study coming soon</span>
      </div>
      <h3 className="mb-3 font-display text-2xl font-semibold">
        {chingsSchezwanCaseStudy.client} — {chingsSchezwanCaseStudy.campaignType}
      </h3>
      <p className="max-w-2xl text-sm leading-[1.8] text-ink">
        The full write-up of this on-ground activation campaign — including outcomes, photography,
        and approach — is being finalised and will be published here. We don&apos;t publish
        figures we haven&apos;t verified, so this space stays honest until it does.
      </p>
    </div>
  );
}
