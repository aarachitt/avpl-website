import { goalOptions, timeframeOptions, budgetOptions } from "@/lib/content/campaign-options";
import { FieldLabel, SelectField, ChipGroup } from "@/components/campaign-builder/fields";
import type { StepProps } from "@/components/campaign-builder/steps/types";

export function Step2Objective({ values, errors, setField }: StepProps) {
  return (
    <div className="animate-fade-up">
      <h2 className="mb-1.5 font-display text-[26px] font-semibold">
        What&apos;s the <span className="italic text-gold">objective</span>?
      </h2>
      <p className="mb-7 text-[13px] text-ink">Pick the single outcome this campaign must drive.</p>

      <div className="mb-6">
        <FieldLabel required>Primary goal</FieldLabel>
        <ChipGroup
          options={goalOptions}
          value={values.primaryGoal}
          onSelect={(v) => setField("primaryGoal", v)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel required>Timeframe</FieldLabel>
          <SelectField
            id="timeframe"
            value={values.timeframe}
            onChange={(v) => setField("timeframe", v)}
            options={timeframeOptions}
            error={errors.timeframe}
            required
          />
        </div>
        <div>
          <FieldLabel required>Monthly budget band</FieldLabel>
          <SelectField
            id="budget"
            value={values.budget}
            onChange={(v) => setField("budget", v)}
            options={budgetOptions}
            error={errors.budget}
            required
          />
        </div>
      </div>
    </div>
  );
}
