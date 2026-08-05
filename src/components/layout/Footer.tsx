import { siteConfig, socialLinks } from "@/lib/content/site";

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-ivory-border bg-ivory px-6 py-10 md:px-12">
      <p className="text-xs text-ink-soft">
        &copy; {new Date().getFullYear()} {siteConfig.name} &middot; {siteConfig.location}
      </p>
      <div className="flex gap-5">
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
        <a href={`mailto:${siteConfig.email}`} className="text-xs text-ink-soft hover:text-gold">
          {siteConfig.email}
        </a>
      </div>
    </footer>
  );
}
