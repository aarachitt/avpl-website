/**
 * Minimal, dependency-free sanitization for user-submitted text that
 * ends up in outbound emails (HTML context) or logs. Not a substitute
 * for the zod validation layer — this is a second, defense-in-depth
 * pass specifically against HTML/header injection.
 */

const HTML_ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export function escapeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (ch) => HTML_ESCAPE_MAP[ch] ?? ch);
}

/** Strips CR/LF and other control characters that could be used for
 * SMTP/email-header injection via a form field. */
export function stripControlChars(input: string): string {
  // eslint-disable-next-line no-control-regex
  return input.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").replace(/\r|\n/g, " ");
}

/** Sanitizes a single plain-text field intended for an email header
 * (name, subject, from-name, etc.) — collapses to one line and trims. */
export function sanitizeHeaderField(input: string, maxLength = 200): string {
  return stripControlChars(input).trim().slice(0, maxLength);
}

/** Sanitizes free-text body content for safe HTML-email embedding. */
export function sanitizeBodyText(input: string, maxLength = 5000): string {
  return escapeHtml(input.trim().slice(0, maxLength));
}
