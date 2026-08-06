import { Resend } from "resend";
import nodemailer from "nodemailer";

/**
 * Clean backend abstraction for outbound lead delivery. Callers never
 * touch Resend/SMTP directly — they call `sendLeadEmail`, and the
 * provider is chosen entirely by env config (EMAIL_PROVIDER). This
 * means delivery can be swapped for a CRM webhook, a database insert,
 * or both, without any change to the API routes that call it.
 */

export type LeadEmailInput = {
  subject: string;
  /** Sanitized HTML body. */
  html: string;
  /** Plain-text fallback. */
  text: string;
  replyTo?: string;
};

export type SendResult =
  | { ok: true; id?: string; provider: string }
  | { ok: false; error: string; provider: string };

export async function sendLeadEmail(input: LeadEmailInput): Promise<SendResult> {
  const provider = (process.env.EMAIL_PROVIDER || "resend").toLowerCase();

  // LEADS_FROM_EMAIL / LEADS_TO_EMAIL have no invented fallback — the
  // real AVPL email is a launch blocker (see LAUNCH_CHECKLIST.md).
  // Guessing a plausible-looking address here would silently misdeliver
  // real leads, which is worse than failing loudly.
  const from = process.env.LEADS_FROM_EMAIL;
  const toRaw = process.env.LEADS_TO_EMAIL;
  if (!from || !toRaw) {
    logDevFallback(input);
    return {
      ok: false,
      error: "LEADS_FROM_EMAIL / LEADS_TO_EMAIL are not configured yet",
      provider,
    };
  }
  const to = toRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (provider === "smtp") {
    return sendViaSmtp({ ...input, from, to });
  }

  return sendViaResend({ ...input, from, to });
}

async function sendViaResend(
  input: LeadEmailInput & { from: string; to: string[] }
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    logDevFallback(input);
    return { ok: false, error: "RESEND_API_KEY is not configured", provider: "resend" };
  }
  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: input.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo,
    });
    if (result.error) {
      return { ok: false, error: result.error.message, provider: "resend" };
    }
    return { ok: true, id: result.data?.id, provider: "resend" };
  } catch (err) {
    return { ok: false, error: toErrorMessage(err), provider: "resend" };
  }
}

async function sendViaSmtp(
  input: LeadEmailInput & { from: string; to: string[] }
): Promise<SendResult> {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  if (!host || !user || !password) {
    logDevFallback(input);
    return { ok: false, error: "SMTP is not fully configured", provider: "smtp" };
  }
  try {
    const transport = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === "true",
      auth: { user, pass: password },
    });
    const info = await transport.sendMail({
      from: input.from,
      to: input.to.join(","),
      subject: input.subject,
      html: input.html,
      text: input.text,
      replyTo: input.replyTo,
    });
    return { ok: true, id: info.messageId, provider: "smtp" };
  } catch (err) {
    return { ok: false, error: toErrorMessage(err), provider: "smtp" };
  }
}

/** In local/dev without credentials configured, log instead of silently
 * discarding the submission — never fail silently on a real lead. */
function logDevFallback(input: LeadEmailInput) {
  // eslint-disable-next-line no-console
  console.warn(
    "[email] No email provider credentials configured — lead was NOT delivered. " +
      "Set RESEND_API_KEY or SMTP_* in your environment. Subject:",
    input.subject
  );
}

function toErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return "Unknown email delivery error";
}
