import { siteConfig, socialLinks, contact } from "@/lib/content/site";

// Footer copy verbatim from brief §3 PAGE 7: "Aarachitt Ventures Pvt
// Ltd — Build Brands. Generate Growth. Create Impact."
export function Footer() {
  return (
    <footer className="border-t border-ivory-border bg-ivory px-6 py-10 md:px-12">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-charcoal">
          {siteConfig.name} — {siteConfig.footerTagline}
        </p>
        <div className="flex items-center gap-5">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-ink-soft hover:text-gold"
            >
              {s.label}
            </a>
          ))}
          {contact.email && (
            <a href={`mailto:${contact.email}`} className="text-xs text-ink-soft hover:text-gold">
              {contact.email}
            </a>
          )}
        </div>
      </div>
      <p className="mx-auto mt-4 max-w-[1240px] text-xs text-ink-soft">
        &copy; {new Date().getFullYear()} {siteConfig.name} &middot; {siteConfig.location}
      </p>
    </footer>
  );
}
