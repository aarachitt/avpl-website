"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { services, type Service } from "@/lib/content/services";

export function ServiceGrid() {
  const [explored, setExplored] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setExplored((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const exploredCount = explored.size;
  const progressPct = (exploredCount / services.length) * 100;
  const allExplored = exploredCount === services.length;

  return (
    <>
      <div className="mx-auto mb-14 max-w-[480px]">
        <p className="mb-2 text-center text-xs font-bold text-gold-deep" aria-live="polite">
          Services explored: {exploredCount} / {services.length}
        </p>
        <div className="h-1.5 overflow-hidden rounded-full bg-ivory-border">
          <div
            className="h-full rounded-full transition-[width] duration-500"
            style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, #B8862E, #D9BD7A)" }}
          />
        </div>
      </div>

      <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
        {services.map((svc, i) => (
          <ServiceCard
            key={svc.slug}
            index={i}
            service={svc}
            open={explored.has(i)}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>

      {allExplored && (
        <div className="mt-10 rounded-card border-[1.5px] border-dashed border-champagne bg-ivory-card p-9 text-center">
          <p className="mb-3.5 font-display text-xl font-semibold">
            You&apos;ve mapped the full AVPL universe.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-pill bg-charcoal px-7 py-3.5 text-sm font-bold text-ivory"
          >
            Let&apos;s build yours &rarr;
          </Link>
        </div>
      )}
    </>
  );
}

function ServiceCard({
  index,
  service,
  open,
  onToggle,
}: {
  index: number;
  service: Service;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `service-panel-${service.slug}`;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      aria-controls={panelId}
      onClick={onToggle}
      onKeyDown={onKeyDown}
      className="cursor-pointer rounded-card border p-7 transition-[background,border-color,box-shadow,transform] duration-300 hover:-translate-y-[3px] hover:shadow-card"
      style={{
        background: open ? "#F3EDE1" : "#FFFFFF",
        borderColor: open ? "#C9A458" : "#E4DAC5",
        boxShadow: open
          ? "0 0 0 1px rgba(184,134,46,0.16), 0 22px 44px rgba(184,134,46,0.14)"
          : "none",
      }}
    >
      <div className="mb-3.5 flex items-start justify-between">
        <span className="font-display text-[30px] font-semibold text-gold">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-[280ms]"
          style={{ background: open ? "rgba(184,134,46,0.14)" : "transparent" }}
          aria-hidden="true"
        >
          <Plus
            size={14}
            style={{
              color: open ? "#B8862E" : "#8A7A5C",
              transform: open ? "rotate(45deg) scale(1.08)" : "rotate(0deg) scale(1)",
              transition: "transform 260ms cubic-bezier(0.22,1,0.36,1), color 260ms ease",
            }}
          />
        </span>
      </div>
      <h2 className="mb-2 text-lg font-bold">{service.name}</h2>
      <p className="mb-1 text-[13px] leading-[1.6] text-ink">{service.line}</p>
      <div
        id={panelId}
        className="flex flex-col gap-2 overflow-hidden border-t transition-[max-height,opacity,margin-top,padding-top] duration-[380ms]"
        style={{
          maxHeight: open ? "420px" : "0px",
          opacity: open ? 1 : 0,
          marginTop: open ? "16px" : "0px",
          paddingTop: open ? "16px" : "0px",
          borderColor: open ? "rgba(228,218,197,1)" : "rgba(228,218,197,0)",
        }}
      >
        {service.bullets.map((b) => (
          <div key={b} className="flex gap-2 text-[13px] text-ink">
            <span className="text-gold">&ndash;</span>
            {b}
          </div>
        ))}
        <Link
          href={`/contact?service=${encodeURIComponent(service.contactCategory)}`}
          onClick={(e) => e.stopPropagation()}
          className="mt-1 inline-block text-[13px] font-bold text-gold underline underline-offset-2 hover:text-gold-dark"
        >
          Get this built by AVPL &rarr;
        </Link>
        {service.linksTo && (
          <Link
            href={service.linksTo.href}
            onClick={(e) => e.stopPropagation()}
            className="inline-block text-[13px] font-bold text-charcoal underline underline-offset-2 hover:text-gold"
          >
            {service.linksTo.label}
          </Link>
        )}
      </div>
    </div>
  );
}
