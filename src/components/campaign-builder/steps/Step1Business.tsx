import { stageOptions } from "@/lib/content/campaign-options";
import { FieldLabel, TextField, ChipGroup } from "@/components/campaign-builder/fields";
import type { StepProps } from "@/components/campaign-builder/steps/types";

export function Step1Business({ values, errors, setField }: StepProps) {
  return (
    <div className="animate-fade-up">
      <h2 className="mb-1.5 font-display text-[26px] font-semibold">
        Tell us about your <span className="italic text-gold">business</span>
      </h2>
      <p className="mb-7 text-[13px] text-ink">This is what shapes your blueprint.</p>

      <div className="mb-[18px] grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel required>Brand / Company name</FieldLabel>
          <TextField
            id="businessName"
            value={values.businessName}
            onChange={(v) => setField("businessName", v)}
            placeholder="e.g. Aarachitt Ventures"
            error={errors.businessName}
            required
          />
        </div>
        <div>
          <FieldLabel required>Industry</FieldLabel>
          <TextField
            id="industry"
            value={values.industry}
            onChange={(v) => setField("industry", v)}
            placeholder="e.g. D2C food, EdTech, Real estate"
            error={errors.industry}
            required
          />
        </div>
      </div>

      <div className="mb-[18px]">
        <FieldLabel required>What do you sell, in one line?</FieldLabel>
        <TextField
          id="oneLiner"
          value={values.oneLiner}
          onChange={(v) => setField("oneLiner", v)}
          placeholder="e.g. Premium ready-to-cook regional meals"
          error={errors.oneLiner}
          required
        />
      </div>

      <div>
        <FieldLabel required>Business stage</FieldLabel>
        <ChipGroup
          options={stageOptions}
          value={values.businessStage}
          onSelect={(v) => setField("businessStage", v)}
        />
      </div>
    </div>
  );
}
