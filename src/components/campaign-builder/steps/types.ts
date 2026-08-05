import type { WizardValues } from "@/types/campaign";

export type StepProps = {
  values: WizardValues;
  errors: Partial<Record<keyof WizardValues, boolean>>;
  setField: <K extends keyof WizardValues>(key: K, value: WizardValues[K]) => void;
};
