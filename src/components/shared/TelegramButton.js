"use client";

import React from "react";

export default function TelegramButton() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center">
      {/* Compact External Speech Bubble ("Contact us" outside the button) */}
      <a
        href="https://t.me/bdeaspecial"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on Telegram"
        className="group relative mr-2.5 flex items-center drop-shadow-[0_4px_14px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-x-0.5"
      >
        <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-xl border border-amber-500/45 group-hover:border-amber-300 text-zinc-900 dark:text-amber-200 text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-300">
          {/* Subtle Live Dot */}
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
          </span>

          <span className="leading-none whitespace-nowrap">Contact us</span>

          {/* Speech Bubble Pointer / Arrow */}
          <div
            className="
              absolute 
              top-1/2 -right-1.5 -translate-y-1/2 
              w-0 h-0 
              border-t-[5px] border-t-transparent 
              border-b-[5px] border-b-transparent 
              border-l-[6px] border-l-amber-500/65
            "
          />
        </div>
      </a>

      {/* Compact Gold Theme Telegram Button (44px) with Zoom-Shake Animation */}
      <a
        href="https://t.me/bdeaspecial"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Join our Telegram"
        className="
          relative
          flex items-center justify-center 
          w-11 h-11 
          rounded-full 
          bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-600
          text-black 
          ring-1.5 ring-amber-300/80 hover:ring-amber-200
          shadow-[0_0_18px_rgba(245,158,11,0.45)] hover:shadow-[0_0_26px_rgba(251,191,36,0.75)]
          origin-center
          animate-zoom-shake
          transition-shadow duration-300
        "
      >
        {/* Compact SVG Paper Plane Icon in Deep Black for Crisp Gold Contrast */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-5 h-5 fill-black -ml-0.5"
        >
          <path d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z" />
        </svg>

        {/* Compact Red Notification Badge */}
        <div
          className="
            absolute -top-0.5 -right-0.5 
            flex items-center justify-center 
            w-4 h-4 
            bg-[#D92222] 
            rounded-full 
            border border-white dark:border-[#0B0B10]
            shadow-sm
          "
        >
          <span className="text-white text-[10px] font-extrabold leading-none">
            1
          </span>
        </div>
      </a>
    </div>
  );
}