"use client";

import React, { useState } from "react";
import { CloudDownload, Sparkles } from "lucide-react";
import FreeOfferPopup from "../popup/FreeOfferPopup";

export default function GetFreeAIButton() {
  const [isFreePopupOpen, setIsFreePopupOpen] = useState(false);

  return (
    <>
      <div className="relative w-full">
        <FreeOfferPopup
          isOpen={isFreePopupOpen}
          setIsOpen={setIsFreePopupOpen}
        />
      </div>

      <div className="fixed bottom-20 right-5 z-50 flex items-center">
        {/* Compact External Speech Bubble ("Get Free AI" outside the button) */}
        <button
          type="button"
          onClick={() => setIsFreePopupOpen(true)}
          aria-label="Get Free AI"
          className="group relative mr-2.5 hidden lg:flex items-center drop-shadow-[0_4px_14px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:-translate-x-0.5 cursor-pointer"
        >
          <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-xl border border-amber-500/45 group-hover:border-amber-300 text-zinc-900 dark:text-amber-200 text-xs font-bold tracking-wide shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-300">
            <Sparkles className="w-3 h-3 text-amber-500 shrink-0 animate-pulse" />
            <span className="leading-none whitespace-nowrap">Get Free AI</span>

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
        </button>

        {/* Compact Gold AI Button (44px) with Zoom-Shake Animation */}
        <button
          type="button"
          onClick={() => setIsFreePopupOpen(true)}
          aria-label="Get Free AI"
          title="Get Free AI"
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
            cursor-pointer
          "
        >
          <CloudDownload className="w-5 h-5 stroke-[2.25]" />
        </button>
      </div>
    </>
  );
}