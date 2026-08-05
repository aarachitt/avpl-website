"use client";

import { useRef } from "react";
import type { ReactNode, MouseEvent } from "react";

/**
 * Faithful port of the design source's `magneticMove` / `magneticLeave`
 * handlers — buttons subtly follow the cursor within their bounds.
 * Disabled automatically under prefers-reduced-motion.
 */
export function Magnetic({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion.current || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.25;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0,0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`magnetic inline-block ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
