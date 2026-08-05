import { Button } from "@/components/ui/Button";

export function CtaBand() {
  return (
    <section
      className="border-y border-ivory-border px-6 py-24 text-center md:px-12"
      style={{ background: "linear-gradient(160deg, #F3EDE1, #E4D6B8)" }}
    >
      <p className="mb-3.5 text-xs font-bold uppercase tracking-[0.16em] text-gold-deep">
        Your Next Chapter Starts Here
      </p>
      <h2 className="mx-auto mb-7 max-w-2xl font-display text-[clamp(28px,3.4vw,44px)] font-semibold text-charcoal">
        Come, Build. Grow. Disrupt.
      </h2>
      <Button href="/contact" variant="solid">
        Let&apos;s Build Together &rarr;
      </Button>
    </section>
  );
}
