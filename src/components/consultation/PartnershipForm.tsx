"use client";

import { useRef, useState } from "react";
import { partnershipCategoryOptions } from "@/lib/content/consultation";

type FormState = {
  organisationName: string;
  category: string;
  website: string;
  contactPerson: string;
  email: string;
  phone: string;
  servicesDescription: string;
  whyPartner: string;
};

const emptyForm: FormState = {
  organisationName: "",
  category: "",
  website: "",
  contactPerson: "",
  email: "",
  phone: "",
  servicesDescription: "",
  whyPartner: "",
};

const fieldClass =
  "w-full box-border text-sm px-[14px] py-[11px] border rounded-[10px] border-champagne";

export function PartnershipForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const renderedAt = useRef(Date.now());
  const [hpField, setHpField] = useState("");

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
    if (form.organisationName.trim().length < 2) next.organisationName = "Please enter your organisation name";
    if (!form.category) next.category = "Please select a category";
    if (form.contactPerson.trim().length < 2) next.contactPerson = "Please enter a contact person";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Please enter a valid email";
    if (form.servicesDescription.trim().length < 10)
      next.servicesDescription = "Tell us a little about your services (10+ characters)";
    if (form.whyPartner.trim().length < 10)
      next.whyPartner = "Tell us why you'd like to partner with us (10+ characters)";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/partnership", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, hpField, renderedAt: renderedAt.current }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-ivory-border bg-ivory-card p-12 text-center">
        <h3 className="mb-3 font-display text-2xl font-semibold">Thank you.</h3>
        <p className="text-sm leading-[1.7] text-ink">
          We&apos;ve received your partnership inquiry — our team will review it and reach out if
          it&apos;s a fit.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative mx-auto max-w-[640px] rounded-3xl border border-ivory-border bg-white p-9 text-left shadow-card"
    >
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="hpField">Leave blank</label>
        <input
          id="hpField"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={hpField}
          onChange={(e) => setHpField(e.target.value)}
        />
      </div>

      <div className="mb-3.5 grid gap-3.5 md:grid-cols-2">
        <div>
          <label htmlFor="organisationName" className="mb-1.5 block text-[11px] text-ink-soft">
            Organisation / Firm Name
          </label>
          <input
            id="organisationName"
            value={form.organisationName}
            onChange={(e) => setField("organisationName", e.target.value)}
            className={fieldClass}
            aria-invalid={!!errors.organisationName}
            aria-describedby={errors.organisationName ? "organisationName-error" : undefined}
            required
          />
          {errors.organisationName && (
            <p id="organisationName-error" className="mt-1 text-xs text-red-700" role="alert">
              {errors.organisationName}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="category" className="mb-1.5 block text-[11px] text-ink-soft">
            Category of Service
          </label>
          <select
            id="category"
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
            className={`${fieldClass} bg-white`}
            aria-invalid={!!errors.category}
            aria-describedby={errors.category ? "category-error" : undefined}
            required
          >
            <option value="">Select a category</option>
            {partnershipCategoryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.category && (
            <p id="category-error" className="mt-1 text-xs text-red-700" role="alert">
              {errors.category}
            </p>
          )}
        </div>
      </div>

      <div className="mb-3.5">
        <label htmlFor="website" className="mb-1.5 block text-[11px] text-ink-soft">
          Website / Portfolio Link
        </label>
        <input
          id="website"
          value={form.website}
          onChange={(e) => setField("website", e.target.value)}
          placeholder="yourorganisation.com"
          className={fieldClass}
        />
      </div>

      <div className="mb-3.5 grid gap-3.5 md:grid-cols-2">
        <div>
          <label htmlFor="contactPerson" className="mb-1.5 block text-[11px] text-ink-soft">
            Contact Person
          </label>
          <input
            id="contactPerson"
            value={form.contactPerson}
            onChange={(e) => setField("contactPerson", e.target.value)}
            className={fieldClass}
            aria-invalid={!!errors.contactPerson}
            aria-describedby={errors.contactPerson ? "contactPerson-error" : undefined}
            required
          />
          {errors.contactPerson && (
            <p id="contactPerson-error" className="mt-1 text-xs text-red-700" role="alert">
              {errors.contactPerson}
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
            className={fieldClass}
          />
        </div>
      </div>

      <div className="mb-3.5">
        <label htmlFor="p-email" className="mb-1.5 block text-[11px] text-ink-soft">
          Email
        </label>
        <input
          id="p-email"
          type="email"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
          className={fieldClass}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "p-email-error" : undefined}
          required
        />
        {errors.email && (
          <p id="p-email-error" className="mt-1 text-xs text-red-700" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="mb-3.5">
        <label htmlFor="servicesDescription" className="mb-1.5 block text-[11px] text-ink-soft">
          Brief Description of Services
        </label>
        <textarea
          id="servicesDescription"
          value={form.servicesDescription}
          onChange={(e) => setField("servicesDescription", e.target.value)}
          rows={3}
          className={`${fieldClass} resize-none font-body`}
          aria-invalid={!!errors.servicesDescription}
          aria-describedby={errors.servicesDescription ? "servicesDescription-error" : undefined}
          required
        />
        {errors.servicesDescription && (
          <p id="servicesDescription-error" className="mt-1 text-xs text-red-700" role="alert">
            {errors.servicesDescription}
          </p>
        )}
      </div>

      <div className="mb-5">
        <label htmlFor="whyPartner" className="mb-1.5 block text-[11px] text-ink-soft">
          Why You&apos;d Like to Partner With Us
        </label>
        <textarea
          id="whyPartner"
          value={form.whyPartner}
          onChange={(e) => setField("whyPartner", e.target.value)}
          rows={3}
          className={`${fieldClass} resize-none font-body`}
          aria-invalid={!!errors.whyPartner}
          aria-describedby={errors.whyPartner ? "whyPartner-error" : undefined}
          required
        />
        {errors.whyPartner && (
          <p id="whyPartner-error" className="mt-1 text-xs text-red-700" role="alert">
            {errors.whyPartner}
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
        {status === "submitting" ? "Submitting..." : "Submit Partnership Inquiry →"}
      </button>
    </form>
  );
}
