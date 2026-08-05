import { Check } from "lucide-react";

const STEP_LABELS: Record<number, string> = {
  1: "Business Discovery",
  2: "Campaign Objective",
  3: "Target Audience",
  4: "Creative Inputs",
  5: "Extra Context",
};

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <ol className="mb-10 flex items-start" aria-label="Campaign builder steps">
      {[1, 2, 3, 4, 5].map((n) => {
        const done = currentStep > n;
        const active = currentStep === n;
        const optional = n >= 4;
        return (
          <li key={n} className="flex flex-1 items-center last:flex-none">
            <div className="flex min-w-0 flex-col items-center gap-2">
              <div
                aria-current={active ? "step" : undefined}
                className="flex h-[34px] w-[34px] items-center justify-center rounded-full text-[13px] font-bold transition-all duration-[350ms]"
                style={{
                  background: done ? "#B8862E" : active ? "#FFFFFF" : "#F3EDE1",
                  color: done ? "#23201C" : active ? "#B8862E" : "#B0A481",
                  border: active
                    ? "2px solid #B8862E"
                    : done
                      ? "2px solid #B8862E"
                      : "1.5px solid #E4DAC5",
                  boxShadow: active ? "0 0 0 4px rgba(184,134,46,0.15)" : "none",
                }}
              >
                {done ? <Check size={14} /> : n}
              </div>
              <span
                className="max-w-[76px] text-center text-[11px] font-bold leading-[1.3]"
                style={{ color: done || active ? "#23201C" : "#B0A481" }}
              >
                {STEP_LABELS[n]}
              </span>
              {optional && (
                <span className="text-[8px] uppercase tracking-[0.1em] text-champagne-muted">
                  Optional
                </span>
              )}
            </div>
            {n < 5 && (
              <div
                className="mx-1.5 h-px flex-1 -translate-y-[22px]"
                style={{ background: done ? "#B8862E" : "#E4DAC5" }}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
