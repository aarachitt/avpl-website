"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { contactServiceOptions } from "@/lib/content/services";
import { readCampaignContext, clearCampaignContext, type CampaignContext } from "@/lib/campaign-handoff";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const emptyForm: FormState = { name: "", company: "", email: "", phone: "", service: "", message: "" };

export function ContactForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [campaignContext, setCampaignContext] = useState<CampaignContext | null>(null);

  const renderedAt = useRef(Date.now());
  const [website, setWebsite] = useState("");

  // Pre-fill from a preselected service link (/contact?service=Branding)
  // or from the AI Campaign Builder handoff (/contact?from=campaign-builder).
  useEffect(() => {
    const preselectedService = searchParams.get("service");
    if (preselectedService && contactServiceOptions.includes(preselectedService)) {
      setForm((f) => ({ ...f, service: preselectedService }));
    }

    if (searchParams.get("from") === "campaign-builder") {
      const ctx = readCampaignContext();
      if (ctx) {
        setCampaignContext(ctx);
        setForm((f) => ({
          ...f,
          service: ctx.recommendedService && contactServiceOptions.includes(ctx.recommendedService)
            ? ctx.recommendedService
            : f.service,
          message: `We just used the AI Campaign Builder for ${ctx.businessName || "our brand"} — "${ctx.blueprintTitle}". We'd like to move forward with this.`,
        }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setField = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your full name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Please enter a valid email";
    if (form.message.trim().length < 10) next.message = "Tell us a little more (10+ characters)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          website,
          renderedAt: renderedAt.current,
          campaignContext: campaignContext
            ? {
                businessName: campaignContext.businessName,
                industry: campaignContext.industry,
                primaryGoal: campaignContext.primaryGoal,
                timeframe: campaignContext.timeframe,
                budget: campaignContext.budget,
                blueprintTitle: campaignContext.blueprintTitle,
              }
            : undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      clearCampaignContext();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto max-w-[480px] rounded-3xl border border-ivory-border bg-ivory-card p-12">
        <h2 className="mb-3 font-display text-2xl font-semibold">Thank you.</h2>
        <p className="text-sm leading-[1.7] text-ink">
          We&apos;ve received your note — our team will reach out within one business day to start
          the conversation.
        </p>
      </div>
    );
  }

  const fieldClass =
    "w-full box-border text-sm px-[14px] py-[11px] border rounded-[10px] border-champagne";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative mx-auto max-w-[520px] rounded-3xl border border-ivory-border bg-white p-9 text-left shadow-card"
    >
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {campaignContext && (
        <div className="mb-4 rounded-xl border border-champagne bg-ivory-card px-4 py-3 text-xs text-ink">
          Carried over from your Campaign Builder blueprint —{" "}
          <strong>{campaignContext.blueprintTitle}</strong>.
        </div>
      )}

      <div className="mb-3.5 grid gap-3.5 md:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-[11px] text-ink-soft">
            Your name
          </label>
          <input
            id="name"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Full name"
            className={fieldClass}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            required
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-xs text-red-700" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-[11px] text-ink-soft">
            Company / Brand
          </label>
          <input
            id="company"
            value={form.company}
            onChange={(e) => setField("company", e.target.value)}
            placeholder="Your company"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mb-3.5 grid gap-3.5 md:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[11px] text-ink-soft">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder="you@company.com"
            className={fieldClass}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            required
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-xs text-red-700" role="alert">
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-[11px] text-ink-soft">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder="+91 98765 43210"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mb-3.5">
        <label htmlFor="service" className="mb-1.5 block text-[11px] text-ink-soft">
          What are you looking for?
        </label>
        <select
          id="service"
          value={form.service}
          onChange={(e) => setField("service", e.target.value)}
          className={`${fieldClass} bg-white`}
        >
          <option value="">Select a service</option>
          {contactServiceOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label htmlFor="message" className="mb-1.5 block text-[11px] text-ink-soft">
          Tell us about your project
        </label>
        <textarea
          id="message"
          value={form.message}
          onChange={(e) => setField("message", e.target.value)}
          placeholder="Share a bit about your brand, challenge, or goal..."
          rows={4}
          className={`${fieldClass} resize-none font-body`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          required
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-xs text-red-700" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {status === "error" && (
        <p className="mb-4 text-sm font-semibold text-red-700" role="alert">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-xl bg-charcoal py-[15px] text-center text-sm font-bold text-ivory transition-colors duration-300 hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Let's Build Together →"}
      </button>
    </form>
  );
}
