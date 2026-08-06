"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, Clock } from "lucide-react";
import Link from "next/link";

type Message = { role: "user" | "assistant"; content: string };

const STARTER_PROMPTS = [
  "What services would fit an early-stage D2C brand?",
  "Help me think through positioning for a new product launch.",
  "What's the difference between your Consultation and Startup Support?",
  "Walk me through a lightweight growth strategy exercise.",
];

export function ChatInterface() {
  const [configured, setConfigured] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/ai-assistant")
      .then((r) => r.json())
      .then((d) => setConfigured(Boolean(d?.configured)))
      .catch(() => setConfigured(false));
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();

      if (res.status === 503 && data?.code === "not_configured") {
        setConfigured(false);
        return;
      }
      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "The Assistant couldn't respond just now.");
      }
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  if (configured === false) {
    return (
      <div className="rounded-[28px] border border-ivory-border bg-white p-9 text-center shadow-card-lg md:p-12">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-ivory-card text-gold-deep">
          <Clock size={22} aria-hidden="true" />
        </div>
        <h2 className="mb-3 font-display text-2xl font-semibold">
          The AI Assistant is being connected.
        </h2>
        <p className="mx-auto mb-6 max-w-md text-sm leading-[1.8] text-ink">
          This co-pilot is built to have genuine, reasoning conversations — not scripted replies —
          so we're not simulating one here while the live connection is finalised. In the
          meantime, try the guided AI Campaign Builder, or reach out directly.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/ai-campaign-builder"
            className="rounded-pill bg-charcoal px-6 py-3.5 text-sm font-bold text-ivory hover:bg-gold"
          >
            Try the AI Campaign Builder
          </Link>
          <Link
            href="/contact"
            className="rounded-pill border-[1.5px] border-champagne px-6 py-3.5 text-sm font-bold text-charcoal hover:bg-highlight"
          >
            Contact Us
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden rounded-[28px] border border-ivory-border bg-white shadow-card-lg">
      <div
        ref={scrollRef}
        className="flex h-[440px] flex-col gap-4 overflow-y-auto p-6 md:p-8"
        role="log"
        aria-live="polite"
        aria-label="Conversation with the AVPL Growth Co-Pilot"
      >
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-5 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory-card text-gold-deep">
              <Sparkles size={20} aria-hidden="true" />
            </div>
            <p className="max-w-sm text-sm text-ink">
              Ask a question, think out loud about a challenge, or pick a starting point below.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {STARTER_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => send(p)}
                  className="rounded-pill border border-champagne px-4 py-2 text-xs font-semibold text-charcoal hover:bg-highlight"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
          >
            <span className="mb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-ink-soft">
              {m.role === "user" ? "You" : "AVPL Growth Co-Pilot"}
            </span>
            <div
              className="max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-[1.6]"
              style={
                m.role === "user"
                  ? { background: "#FFFFFF", border: "1px solid #E4DAC5", color: "#23201C" }
                  : { background: "#E9DFC6", color: "#3A3529" }
              }
            >
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-start">
            <div
              className="flex items-center gap-1.5 rounded-2xl px-4 py-3"
              style={{ background: "#E9DFC6" }}
              aria-label="AVPL Growth Co-Pilot is typing"
            >
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold-deep [animation-delay:0ms]" />
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold-deep [animation-delay:150ms]" />
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold-deep [animation-delay:300ms]" />
            </div>
          </div>
        )}
      </div>

      {error && (
        <p className="border-t border-ivory-border px-6 py-2 text-xs font-semibold text-red-700" role="alert">
          {error}
        </p>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-end gap-3 border-t border-ivory-border p-4 md:p-5"
      >
        <label htmlFor="chat-input" className="sr-only">
          Message the AVPL Growth Co-Pilot
        </label>
        <textarea
          id="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about a service, a challenge, or think out loud..."
          rows={1}
          className="max-h-32 flex-1 resize-none rounded-xl border border-champagne bg-ivory px-4 py-3 text-sm font-body focus-visible:outline-2 focus-visible:outline-gold"
          disabled={configured === null}
        />
        <button
          type="submit"
          disabled={loading || configured === null || !input.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-charcoal text-ivory transition-colors duration-300 hover:bg-gold disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Send message"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
