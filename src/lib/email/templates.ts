import { sanitizeBodyText, sanitizeHeaderField } from "@/lib/sanitize";
import type { ContactInput } from "@/lib/validation/contact";
import type { PartnershipInput } from "@/lib/validation/partnership";

function row(label: string, value: string) {
  if (!value) return "";
  return `<tr><td style="padding:6px 12px 6px 0;color:#8A7A5C;font-size:12px;vertical-align:top;white-space:nowrap;">${label}</td><td style="padding:6px 0;color:#23201C;font-size:14px;">${value}</td></tr>`;
}

export function buildContactLeadEmail(input: ContactInput) {
  const name = sanitizeHeaderField(input.name);
  const company = sanitizeHeaderField(input.company || "");
  const email = sanitizeHeaderField(input.email);
  const phone = sanitizeHeaderField(input.phone || "");
  const service = sanitizeHeaderField(input.service || "");
  const message = sanitizeBodyText(input.message);

  const campaignRows = input.campaignContext
    ? [
        row("Campaign business", sanitizeHeaderField(input.campaignContext.businessName || "")),
        row("Campaign industry", sanitizeHeaderField(input.campaignContext.industry || "")),
        row("Campaign goal", sanitizeHeaderField(input.campaignContext.primaryGoal || "")),
        row("Blueprint", sanitizeHeaderField(input.campaignContext.blueprintTitle || "")),
      ]
        .filter(Boolean)
        .join("")
    : "";

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
    <h2 style="font-size:18px;color:#23201C;margin-bottom:4px;">New enquiry — AVPL website</h2>
    <p style="font-size:12px;color:#8A7A5C;margin-top:0;">Submitted via the Contact form</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
      ${row("Name", name)}
      ${row("Company", company)}
      ${row("Email", `<a href="mailto:${email}">${email}</a>`)}
      ${row("Phone", phone)}
      ${row("Looking for", service)}
      ${campaignRows}
    </table>
    <div style="background:#F3EDE1;border-radius:12px;padding:16px;">
      <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#8A6A2E;margin:0 0 8px;">Message</p>
      <p style="font-size:14px;color:#3A3529;white-space:pre-wrap;margin:0;">${message}</p>
    </div>
  </div>`;

  const text = [
    "New enquiry — AVPL website",
    `Name: ${input.name}`,
    company ? `Company: ${input.company}` : "",
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : "",
    input.service ? `Looking for: ${input.service}` : "",
    input.campaignContext?.blueprintTitle
      ? `Campaign Builder blueprint: ${input.campaignContext.blueprintTitle}`
      : "",
    "",
    "Message:",
    input.message,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `New enquiry from ${input.name}${company ? ` (${company})` : ""}`,
    html,
    text,
    replyTo: input.email,
  };
}

export function buildPartnershipLeadEmail(input: PartnershipInput) {
  const org = sanitizeHeaderField(input.organisationName);
  const category = sanitizeHeaderField(input.category);
  const website = sanitizeHeaderField(input.website || "");
  const contactPerson = sanitizeHeaderField(input.contactPerson);
  const email = sanitizeHeaderField(input.email);
  const phone = sanitizeHeaderField(input.phone || "");
  const servicesDescription = sanitizeBodyText(input.servicesDescription);
  const whyPartner = sanitizeBodyText(input.whyPartner);

  const html = `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;">
    <h2 style="font-size:18px;color:#23201C;margin-bottom:4px;">New partnership inquiry — AVPL website</h2>
    <p style="font-size:12px;color:#8A7A5C;margin-top:0;">Submitted via the Consultation page's Partner With Us form</p>
    <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
      ${row("Organisation", org)}
      ${row("Category", category)}
      ${row("Website / portfolio", website)}
      ${row("Contact person", contactPerson)}
      ${row("Email", `<a href="mailto:${email}">${email}</a>`)}
      ${row("Phone", phone)}
    </table>
    <div style="background:#F3EDE1;border-radius:12px;padding:16px;margin-bottom:12px;">
      <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#8A6A2E;margin:0 0 8px;">Services offered</p>
      <p style="font-size:14px;color:#3A3529;white-space:pre-wrap;margin:0;">${servicesDescription}</p>
    </div>
    <div style="background:#F3EDE1;border-radius:12px;padding:16px;">
      <p style="font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#8A6A2E;margin:0 0 8px;">Why they'd like to partner</p>
      <p style="font-size:14px;color:#3A3529;white-space:pre-wrap;margin:0;">${whyPartner}</p>
    </div>
  </div>`;

  const text = [
    "New partnership inquiry — AVPL website",
    `Organisation: ${input.organisationName}`,
    `Category: ${input.category}`,
    input.website ? `Website: ${input.website}` : "",
    `Contact person: ${input.contactPerson}`,
    `Email: ${input.email}`,
    input.phone ? `Phone: ${input.phone}` : "",
    "",
    "Services offered:",
    input.servicesDescription,
    "",
    "Why they'd like to partner:",
    input.whyPartner,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    subject: `Partnership inquiry: ${input.organisationName} (${input.category})`,
    html,
    text,
    replyTo: input.email,
  };
}
