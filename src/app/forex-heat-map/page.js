"use client";

import React, { useState, useRef } from "react";
import { Flame, ShieldCheck, Radio, Sparkles } from "lucide-react";

export default function ForexHeatMap() {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 500, y: 250 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-screen overflow-hidden bg-[#FAF7F0] text-zinc-900 dark:bg-[#050507] dark:text-white pt-36 sm:pt-40 lg:pt-48 pb-14 transition-colors duration-300"
    >
      {/* Subtle Cyber Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-35"
        style={{
          backgroundSize: "48px 48px",
          backgroundImage:
            "linear-gradient(to right, rgba(217, 119, 6, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(217, 119, 6, 0.06) 1px, transparent 1px)",
        }}
      />

      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0.35,
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.16), transparent 70%)`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4 space-y-6 lg:space-y-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40 shadow-[0_0_18px_rgba(245,158,11,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
              Real-Time Currency Strength Matrix
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Live Currency{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              Heat Map
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-medium">
            Monitor live currency pair momentum, volatility shifts, and relative
            market strength across major, minor, and exotic pairs.
          </p>
        </div>

        {/* Institutional Terminal Frame for Myfxbook Heat Map */}
        <div className="max-w-6xl mx-auto rounded-3xl p-[1.5px] bg-gradient-to-b from-amber-400/60 via-amber-500/25 to-amber-400/50 dark:from-amber-400/50 dark:via-zinc-800/80 dark:to-amber-500/40 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          <div className="rounded-3xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl overflow-hidden">
            {/* Terminal Top Bar */}
            <div className="px-5 py-3.5 border-b border-amber-500/25 bg-amber-500/5 dark:bg-[#0E0D0A] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-amber-200">
                  Global Currency Strength &amp; Pair Volatility Heat Map
                </span>
              </div>

              <div className="flex items-center gap-4 text-[11px] font-bold">
                <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>LIVE FEED</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Multi-Pair AI Market Tracker</span>
                </span>
              </div>
            </div>

            {/* Clean White Container for Myfxbook Iframe Readability */}
            <div className="w-full bg-white">
              <iframe
                title="Myfxbook Live Currency Heat Map"
                className="w-full min-h-[780px] lg:min-h-screen block border-0"
                src="https://widgets.myfxbook.com/widgets/heat-map.html?symbols=8,47,9,10,1234,11,103,12,46,1245,6,13,14,15,17,18,7,2114,19,20,21,22,1246,23,1,1233,107,24,25,4,2872,137,48,1236,1247,2012,2,1863,3240,26,49,27,28,2090,131,5,29,5779,31,34,3,36,37,38,2076,40,41,42,43,45,3005,3473,50,2115,2603,2119,1815,2521,51,5435,5079,1893&type=0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}