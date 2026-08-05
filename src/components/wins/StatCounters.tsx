"use client";

import { useEffect, useRef, useState } from "react";
import { impactStats } from "@/lib/content/wins";

/**
 * Animated counters that count up once the section scrolls into view —
 * ported from the design's animateCounters(), rebuilt on an
 * IntersectionObserver instead of a mount-time ref callback so it
 * still fires correctly for direct navigation to /wins.
 */
export function StatCounters() {
  const ref = useRef<HTMLDivElement>(null);
  const [values, setValues] = useState(impactStats.map(() => 0));
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      if (animated.current) return;
      animated.current = true;

      if (reducedMotion) {
        setValues(impactStats.map((s) => s.value));
        return;
      }

      const duration = 900;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setValues(impactStats.map((s) => Math.round(s.value * eased)));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) animate();
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-[70px] grid grid-cols-2 gap-5 md:grid-cols-4">
      {impactStats.map((stat, i) => (
        <div key={stat.label} className="rounded-card bg-ivory-card px-4 py-[34px] text-center">
          <div className="font-display text-5xl font-semibold text-gold">{values[i]}</div>
          <div className="mt-1.5 text-xs text-ink">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
