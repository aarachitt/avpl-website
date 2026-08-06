"use client";

import { useState, type KeyboardEvent } from "react";
import { Plus } from "lucide-react";
import { servicesFaq } from "@/lib/content/faq";

/**
 * Accessible accordion for the Services page FAQ. Content for every
 * question is always present in the rendered HTML (server-rendered on
 * first load, just visually collapsed via CSS) — never mounted only
 * after a client-side fetch — so it stays crawlable by search and AI
 * bots regardless of open/closed state, per brief §7.
 */
export function FaqAccordion() {
  const [open, setOpen] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const onKeyDown = (i: number) => (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(i);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {servicesFaq.map((item, i) => {
        const isOpen = open.has(i);
        const panelId = `faq-panel-${i}`;
        return (
          <div
            key={item.question}
            className="rounded-2xl border border-ivory-border bg-white transition-colors duration-300"
            style={{ borderColor: isOpen ? "#C9A458" : "#E4DAC5" }}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                onKeyDown={onKeyDown(i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-[15px] font-bold text-charcoal">{item.question}</span>
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ background: isOpen ? "rgba(184,134,46,0.14)" : "transparent" }}
                  aria-hidden="true"
                >
                  <Plus
                    size={14}
                    style={{
                      color: isOpen ? "#B8862E" : "#8A7A5C",
                      transform: isOpen ? "rotate(45deg) scale(1.08)" : "rotate(0deg) scale(1)",
                      transition: "transform 260ms cubic-bezier(0.22,1,0.36,1), color 260ms ease",
                    }}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              className="overflow-hidden px-6 transition-[max-height,opacity,padding-bottom] duration-[380ms]"
              style={{
                maxHeight: isOpen ? "300px" : "0px",
                opacity: isOpen ? 1 : 0,
                paddingBottom: isOpen ? "20px" : "0px",
              }}
            >
              <p className="text-sm leading-[1.75] text-ink">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
