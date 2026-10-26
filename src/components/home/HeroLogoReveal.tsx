"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Module scope resets on a genuine page load/reload but survives client-side
// navigation, so the reveal plays once per document load without any storage flag.
let revealFinished = false;

// The reveal clip (720x1280) frames the stones on a tall canvas, while the static
// logo (1000x1107) is cropped tight and carries the wordmark. These percentages
// place the clip inside a logo-shaped box so the final frame's stones land exactly
// on the static logo's stones; the wordmark then fades in beneath them.
const LOGO_ASPECT = "1000 / 1107";
const videoBox = { left: "-6.27%", top: "-35.1%", width: "107.33%", height: "172.4%" };

export function HeroLogoReveal() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [done, setDone] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const finish = (animate: boolean) => {
      revealFinished = true;
      setDone(true);
      if (!animate) setSettled(true);
    };
    const onEnded = () => finish(true);
    const onFail = () => finish(false);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || revealFinished) {
      video.pause();
      finish(false);
      return;
    }
    if (video.ended) {
      finish(true);
      return;
    }

    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onFail);
    // Autoplay may have been blocked; fall back to the static logo.
    video.play().catch(onFail);

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onFail);
    };
  }, []);

  return (
    <div className="flex min-h-0 w-full flex-1 items-center justify-center px-5 pt-5" style={{ containerType: "size" }}>
      <div
        className="relative"
        style={{ aspectRatio: LOGO_ASPECT, width: "min(100cqw, calc(100cqh * 1000 / 1107))" }}
      >
        <video
          ref={videoRef}
          className={`absolute max-w-none motion-reduce:hidden ${settled ? "invisible" : ""}`}
          style={videoBox}
          muted
          playsInline
          autoPlay
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src="/brand/avpl-logo-reveal.webm" type="video/webm" />
        </video>
        <Image
          src="/brand/avpl-logo.png"
          alt="Aarachitt Ventures Pvt Ltd"
          fill
          priority
          sizes="(min-width: 768px) 40vw, 90vw"
          onTransitionEnd={() => setSettled(true)}
          className={`object-contain transition-opacity duration-500 motion-reduce:opacity-100 motion-reduce:transition-none ${
            done ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  );
}
