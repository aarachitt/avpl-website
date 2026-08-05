"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/content/site";
import { Magnetic } from "@/components/ui/Magnetic";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-6 py-[18px] backdrop-blur-2xl transition-all duration-[350ms] md:px-12"
      style={{
        background: scrolled ? "rgba(250,246,239,0.85)" : "rgba(250,246,239,0.4)",
        boxShadow: scrolled ? "0 4px 24px rgba(35,32,28,0.08)" : "none",
      }}
    >
      <Link href="/" className="flex items-center gap-3" aria-label="AVPL — home">
        <span className="flex w-5 flex-col items-center" aria-hidden="true">
          <span className="-mb-[3px] h-[10px] w-[10px] rounded-full bg-gold" />
          <span className="-mb-[3px] h-[9px] w-5 rounded-full bg-champagne" />
          <span className="h-[11px] w-6 rounded-full bg-charcoal" />
        </span>
        <span>
          <span className="block font-display text-base font-semibold leading-none tracking-[0.04em]">
            AARACHITT
          </span>
          <span className="mt-[2px] block text-[8px] tracking-[0.18em] text-ink">
            VENTURES PVT. LTD.
          </span>
        </span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden items-center gap-1.5 md:flex" aria-label="Primary">
        {navLinks.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? "page" : undefined}
              className="rounded-pill px-4 py-[9px] text-[13px] font-semibold transition-all duration-[250ms] hover:bg-highlight"
              style={{
                color: active ? "#B8862E" : "#23201C",
                background: active ? "#F0E6D1" : "transparent",
              }}
            >
              {link.label}
            </Link>
          );
        })}
        <Magnetic className="ml-2.5">
          <Link
            href="/contact"
            className="rounded-pill bg-charcoal px-[22px] py-[11px] text-[13px] font-bold text-ivory shadow-cta transition-all duration-300 hover:bg-gold hover:shadow-cta-gold"
          >
            Let&apos;s Build Together
          </Link>
        </Magnetic>
      </nav>

      {/* Mobile toggle */}
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal md:hidden"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
        aria-controls="mobile-menu"
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-[64px] bottom-0 z-[99] flex flex-col gap-1 overflow-y-auto bg-ivory px-6 py-6 md:hidden"
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className="rounded-2xl px-4 py-4 text-base font-semibold"
                style={{
                  color: active ? "#B8862E" : "#23201C",
                  background: active ? "#F0E6D1" : "transparent",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="mt-3 rounded-pill bg-charcoal px-6 py-4 text-center text-base font-bold text-ivory"
          >
            Let&apos;s Build Together
          </Link>
        </div>
      )}
    </header>
  );
}
