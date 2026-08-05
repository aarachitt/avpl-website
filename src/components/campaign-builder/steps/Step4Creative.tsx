import { toneOptions, platformOptions } from "@/lib/content/campaign-options";
import { FieldLabel, TextField, ChipGroup, ChipMultiGroup } from "@/components/campaign-builder/fields";
import type { StepProps } from "@/components/campaign-builder/steps/types";

export function Step4Creative({ values, setField }: StepProps) {
  const togglePlatform = (p: string) => {
    const next = values.platforms.includes(p)
      ? values.platforms.filter((x) => x !== p)
      : [...values.platforms, p];
    setField("platforms", next);
  };

  return (
    <div className="animate-fade-up">
      <h2 className="mb-1.5 font-display text-[26px] font-semibold">
        Give it a <span className="italic text-gold">creative</span> edge
      </h2>
      <p className="mb-7 text-[13px] text-ink">Optional — helps tailor tone and platform mix.</p>

      <div className="mb-[22px]">
        <FieldLabel>Preferred tone</FieldLabel>
        <ChipGroup options={toneOptions} value={values.tone} onSelect={(v) => setField("tone", v)} />
      </div>

      <div className="mb-[22px]">
        <FieldLabel>Preferred platforms</FieldLabel>
        <ChipMultiGroup options={platformOptions} values={values.platforms} onToggle={togglePlatform} />
      </div>

      <div>
        <FieldLabel>Website / reference links</FieldLabel>
        <TextField
          id="links"
          value={values.links}
          onChange={(v) => setField("links", v)}
          placeholder="yourbrand.com, instagram.com/yourbrand"
        />
      </div>
    </div>
  );
}
