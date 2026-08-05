import { audienceOptions, ageOptions } from "@/lib/content/campaign-options";
import { FieldLabel, TextField, SelectField, ChipGroup } from "@/components/campaign-builder/fields";
import type { StepProps } from "@/components/campaign-builder/steps/types";

export function Step3Audience({ values, errors, setField }: StepProps) {
  return (
    <div className="animate-fade-up">
      <h2 className="mb-1.5 font-display text-[26px] font-semibold">
        Who are you <span className="italic text-gold">talking to</span>?
      </h2>
      <p className="mb-7 text-[13px] text-ink">The audience defines the channels and the voice.</p>

      <div className="mb-[22px]">
        <FieldLabel required>Audience type</FieldLabel>
        <ChipGroup
          options={audienceOptions}
          value={values.audienceType}
          onSelect={(v) => setField("audienceType", v)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <FieldLabel required>Primary age range</FieldLabel>
          <SelectField
            id="ageRange"
            value={values.ageRange}
            onChange={(v) => setField("ageRange", v)}
            options={ageOptions}
            error={errors.ageRange}
            required
          />
        </div>
        <div>
          <FieldLabel required>Geography</FieldLabel>
          <TextField
            id="geography"
            value={values.geography}
            onChange={(v) => setField("geography", v)}
            placeholder="e.g. Mumbai + Tier-1 metros"
            error={errors.geography}
            required
          />
        </div>
      </div>
    </div>
  );
}
