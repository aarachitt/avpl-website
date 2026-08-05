import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 pt-[84px] text-center">
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">404</p>
      <h1 className="mb-4 font-display text-[clamp(28px,4vw,44px)] font-semibold">
        This page hasn&apos;t been built yet.
      </h1>
      <p className="mb-8 max-w-md text-[15px] leading-[1.8] text-ink">
        The page you&apos;re looking for doesn&apos;t exist — but we can still build something
        together.
      </p>
      <div className="flex flex-wrap justify-center gap-3.5">
        <Link
          href="/"
          className="rounded-pill bg-charcoal px-7 py-3.5 text-sm font-bold text-ivory shadow-cta hover:bg-gold"
        >
          Back to Home
        </Link>
        <Link
          href="/contact"
          className="rounded-pill border-[1.5px] border-champagne px-7 py-3.5 text-sm font-bold text-charcoal hover:bg-highlight"
        >
          Let&apos;s Build Together
        </Link>
      </div>
    </div>
  );
}
