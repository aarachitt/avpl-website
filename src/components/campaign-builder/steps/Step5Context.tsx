import { FieldLabel, TextField, TextAreaField } from "@/components/campaign-builder/fields";
import type { StepProps } from "@/components/campaign-builder/steps/types";

export function Step5Context({ values, setField }: StepProps) {
  return (
    <div className="animate-fade-up">
      <h2 className="mb-1.5 font-display text-[26px] font-semibold">
        Any extra <span className="italic text-gold">context</span>?
      </h2>
      <p className="mb-7 text-[13px] text-ink">
        Optional — the more you share, the sharper the blueprint.
      </p>

      <div className="mb-[18px]">
        <FieldLabel>Competitors</FieldLabel>
        <TextField
          id="competitors"
          value={values.competitors}
          onChange={(v) => setField("competitors", v)}
          placeholder="Who else are you up against?"
        />
      </div>

      <div>
        <FieldLabel>Anything else? Offers, seasonality, challenges, ideas</FieldLabel>
        <TextAreaField
          id="notes"
          value={values.notes}
          onChange={(v) => setField("notes", v)}
          placeholder="Share anything that would help us tailor this further..."
        />
      </div>
    </div>
  );
}
