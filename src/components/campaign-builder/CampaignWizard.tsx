"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";
import type { WizardValues, CampaignBlueprint } from "@/types/campaign";
import { emptyWizardValues } from "@/types/campaign";
import { Stepper } from "@/components/campaign-builder/Stepper";
import { Step1Business } from "@/components/campaign-builder/steps/Step1Business";
import { Step2Objective } from "@/components/campaign-builder/steps/Step2Objective";
import { Step3Audience } from "@/components/campaign-builder/steps/Step3Audience";
import { Step4Creative } from "@/components/campaign-builder/steps/Step4Creative";
import { Step5Context } from "@/components/campaign-builder/steps/Step5Context";
import { BlueprintResult } from "@/components/campaign-builder/BlueprintResult";

type RequiredKey = keyof WizardValues;

const REQUIRED_BY_STEP: Record<number, RequiredKey[]> = {
  1: ["businessName", "industry", "oneLiner", "businessStage"],
  2: ["primaryGoal", "timeframe", "budget"],
  3: ["audienceType", "ageRange", "geography"],
  4: [],
  5: [],
};

const STEP_TAGS: Record<number, string> = {
  1: "Business basics",
  2: "The objective",
  3: "You can generate now",
  4: "Creative direction",
  5: "Final touches",
};

export function CampaignWizard() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<WizardValues>(emptyWizardValues);
  const [errors, setErrors] = useState<Partial<Record<RequiredKey, boolean>>>({});
  const [hasError, setHasError] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [blueprint, setBlueprint] = useState<CampaignBlueprint | null>(null);

  // Spam defense: rendered-at timestamp + honeypot field.
  const renderedAt = useRef(Date.now());
  const [website, setWebsite] = useState("");

  const setField = <K extends keyof WizardValues>(key: K, value: WizardValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
    setHasError(false);
  };

  const validateStep = (n: number): boolean => {
    const required = REQUIRED_BY_STEP[n] ?? [];
    const missing = required.filter((k) => {
      const val = values[k];
      return !val || (Array.isArray(val) && val.length === 0);
    });
    if (missing.length) {
      const next: Partial<Record<RequiredKey, boolean>> = {};
      missing.forEach((k) => (next[k] = true));
      setErrors(next);
      setHasError(true);
      return false;
    }
    setErrors({});
    setHasError(false);
    return true;
  };

  const goNext = () => {
    if ((step === 1 || step === 2) && !validateStep(step)) return;
    setStep((s) => Math.min(5, s + 1));
  };
  const goBack = () => {
    setStep((s) => Math.max(1, s - 1));
    setHasError(false);
  };
  const goToStep4 = () => {
    if (validateStep(3)) setStep(4);
  };

  const generate = async () => {
    if (step === 3 && !validateStep(3)) return;
    setApiError(null);
    setGenerating(true);
    try {
      const res = await fetch("/api/campaign-builder", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...values, website, renderedAt: renderedAt.current }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Something went wrong while generating your blueprint.");
      }
      setBlueprint(data.blueprint as CampaignBlueprint);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const reset = () => {
    setStep(1);
    setValues(emptyWizardValues);
    setErrors({});
    setHasError(false);
    setBlueprint(null);
    setApiError(null);
    renderedAt.current = Date.now();
  };

  const showBack = step > 1;
  const showContinue = step === 1 || step === 2 || step === 4;
  const showGenerate = step === 3 || step === 5;
  const showSkipLink = step === 3;

  const stepContent = useMemo(() => {
    const props = { values, errors, setField };
    switch (step) {
      case 1:
        return <Step1Business {...props} />;
      case 2:
        return <Step2Objective {...props} />;
      case 3:
        return <Step3Audience {...props} />;
      case 4:
        return <Step4Creative {...props} />;
      default:
        return <Step5Context {...props} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, values, errors]);

  if (blueprint && !generating) {
    return <BlueprintResult blueprint={blueprint} values={values} onReset={reset} />;
  }

  if (generating) {
    return (
      <div className="relative z-[1] flex flex-col items-center gap-[22px] p-[100px_48px]" role="status">
        <div className="h-[54px] w-[54px] animate-spin rounded-full border-[3px] border-ivory-border border-t-gold" />
        <p className="font-display text-xl font-semibold">Building your blueprint...</p>
        <p className="text-[13px] text-ink">Mapping strategy, channels and next steps</p>
      </div>
    );
  }

  return (
    <div className="relative z-[1] px-6 pt-11 md:px-12">
      <Stepper currentStep={step} />

      {/* Honeypot — hidden from real users, visible to naive bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (showGenerate) generate();
          else goNext();
        }}
      >
        {stepContent}

        {hasError && (
          <p className="mt-4 text-xs font-semibold text-gold-deep" role="alert">
            Please fill in the required fields marked with *
          </p>
        )}
        {apiError && (
          <p className="mt-4 text-xs font-semibold text-red-700" role="alert">
            {apiError}
          </p>
        )}

        <div className="relative z-[1] mt-9 flex flex-wrap items-center justify-between gap-3 border-t border-ivory-border py-[22px]">
          <p className="text-xs text-ink-soft">
            Step {step} of 5 &middot; {STEP_TAGS[step]}
            {showSkipLink && (
              <>
                {" "}
                &nbsp;&middot;&nbsp;
                <button
                  type="button"
                  onClick={goToStep4}
                  className="font-bold text-gold underline underline-offset-2"
                >
                  Add optional details
                </button>
              </>
            )}
          </p>
          <div className="flex gap-2.5">
            {showBack && (
              <button
                type="button"
                onClick={goBack}
                className="flex items-center gap-1.5 rounded-pill border-[1.5px] border-champagne px-5 py-3 text-[13px] font-bold hover:bg-ivory-card"
              >
                <ArrowLeft size={14} />
                Back
              </button>
            )}
            {showContinue && (
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-pill px-6 py-[13px] text-[13px] font-bold text-charcoal shadow-cta-gold"
                style={{ background: "linear-gradient(120deg, #B8862E, #D9BD7A)" }}
              >
                Continue
                <ArrowRight size={14} />
              </button>
            )}
            {showGenerate && (
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-pill px-6 py-[13px] text-[13px] font-bold text-charcoal shadow-cta-gold"
                style={{ background: "linear-gradient(120deg, #B8862E, #D9BD7A)" }}
              >
                <Sparkles size={14} />
                Generate Blueprint
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
