import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/ui/Magnetic";

type Variant = "solid" | "gold" | "outline";

const base =
  "inline-flex items-center gap-2 rounded-pill text-sm font-bold cursor-pointer transition-all duration-300 focus-visible:outline-offset-4";

const variants: Record<Variant, string> = {
  solid:
    "bg-charcoal text-ivory px-[30px] py-[15px] shadow-cta hover:bg-gold hover:shadow-cta-gold",
  gold: "bg-gradient-to-r from-gold to-gold-light text-charcoal px-6 py-[13px] shadow-cta-gold hover:shadow-[0_14px_30px_rgba(184,134,46,0.5)]",
  outline:
    "border-[1.5px] border-champagne text-charcoal px-[30px] py-[15px] hover:bg-highlight hover:border-gold",
};

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  type?: "button" | "submit";
  magnetic?: boolean;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
};

export function Button({
  children,
  href,
  onClick,
  variant = "solid",
  type = "button",
  magnetic = true,
  className = "",
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`;

  const content = href ? (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={classes}
    >
      {children}
    </button>
  );

  if (!magnetic || disabled) return content;
  return <Magnetic>{content}</Magnetic>;
}
