"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { CampaignBlueprint, WizardValues } from "@/types/campaign";
import { saveCampaignContext } from "@/lib/campaign-handoff";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-ivory-border bg-white p-[22px] px-6">
      <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.1em] text-gold-deep">{title}</p>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {items.map((item) => (
        <div key={item} className="flex gap-2 text-sm leading-[1.6] text-charcoal-soft">
          <span className="text-gold">&bull;</span>
          {item}
        </div>
      ))}
    </div>
  );
}

export function BlueprintResult({
  blueprint,
  values,
  onReset,
}: {
  blueprint: CampaignBlueprint;
  values: WizardValues;
  onReset: () => void;
}) {
  const router = useRouter();

  const handleBuildTogether = () => {
    saveCampaignContext(values, blueprint);
    router.push("/contact?from=campaign-builder");
  };

  return (
    <div className="relative z-[1] p-6 md:p-12">
      <div className="mb-2 text-center">
        <span className="mb-[18px] inline-block rounded-pill border border-champagne px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-gold-deep">
          Growth Blueprint
        </span>
        <h2 className="mb-2 font-display text-[clamp(24px,3vw,34px)] font-semibold">
          {blueprint.title}
        </h2>
        {blueprint.source === "fallback" && (
          <p className="mb-6 text-xs text-ink-soft">
            Generated instantly from AVPL&apos;s strategy templates.
          </p>
        )}
      </div>

      <div className="mb-[18px] rounded-2xl border border-ivory-border bg-ivory-card p-[22px] px-6">
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-gold-deep">
          Executive Summary
        </p>
        <p className="text-sm leading-[1.75] text-charcoal-soft">{blueprint.executiveSummary}</p>
      </div>

      <div className="mb-[18px] rounded-2xl border border-ivory-border bg-ivory-card p-[22px] px-6">
        <p className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-gold-deep">
          Positioning
        </p>
        <p className="text-sm leading-[1.75] text-charcoal-soft">{blueprint.positioning}</p>
      </div>

      <div className="mb-[18px] grid gap-[18px] md:grid-cols-2">
        <Card title="Recommended Channels">
          <BulletList items={blueprint.channels} />
        </Card>
        <Card title="Message Pillars">
          <BulletList items={blueprint.pillars} />
        </Card>
      </div>

      <div className="mb-[18px]">
        <Card title="Content Ideas">
          <BulletList items={blueprint.contentIdeas} />
        </Card>
      </div>

      <div className="mb-[18px]">
        <Card title="30-Day Action Plan">
          <BulletList items={blueprint.plan} />
        </Card>
      </div>

      <div className="mb-[26px] grid gap-[18px] md:grid-cols-2">
        <Card title="AVPL Services To Activate">
          <BulletList items={blueprint.services} />
        </Card>
        <Card title="KPIs & Timeline">
          <BulletList items={blueprint.kpis} />
          <div className="mt-1.5 flex gap-2 border-t border-ivory-border pt-2.5 text-sm text-charcoal-soft">
            <span className="text-gold">&bull;</span>
            Timeline: {blueprint.timeline}
          </div>
        </Card>
      </div>

      <p className="mx-auto mb-6 max-w-lg text-center text-sm text-ink">{blueprint.nextStep}</p>

      <div className="flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={handleBuildTogether}
          className="inline-flex items-center gap-2 rounded-pill px-7 py-3.5 text-sm font-bold text-charcoal shadow-cta-gold"
          style={{ background: "linear-gradient(120deg, #B8862E, #D9BD7A)" }}
        >
          Let&apos;s Build This Campaign Together
          <ArrowRight size={14} />
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-pill border-[1.5px] border-champagne px-[26px] py-3.5 text-sm font-bold text-charcoal"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}
