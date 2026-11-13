"use client";
import React, { useState, useRef } from "react";
import { Sparkles, ShieldCheck, Cpu, Activity } from "lucide-react";

export default function BestForexEA() {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 500, y: 200 });
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
      className="relative w-full overflow-hidden bg-[url('/assets/home/best-forex-ea/best-forex-ea-bg.webp')] bg-cover bg-center bg-no-repeat transition-colors duration-300"
    >
      {/* Compact Vertical Padding */}
      <div className="relative w-full bg-[#FAF7F0]/92 dark:bg-[#050507]/88 backdrop-blur-sm py-8 md:py-10 lg:py-12 transition-colors duration-300">
        
        {/* Subtle Cyber Grid Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-35"
          style={{
            backgroundSize: "48px 48px",
            backgroundImage:
              "linear-gradient(to right, rgba(217, 119, 6, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(217, 119, 6, 0.06) 1px, transparent 1px)",
          }}
        />

        {/* Interactive Cursor Spotlight Glow */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0.35,
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.15), transparent 70%)`,
          }}
        />

        <div className="container relative z-10 mx-auto px-4">
          {/* Gradient-Bordered Luxury Showcase Card */}
          <div className="max-w-5xl mx-auto rounded-3xl p-[1.5px] bg-gradient-to-r from-amber-500/45 via-amber-300/60 to-amber-500/45 dark:from-amber-500/40 dark:via-zinc-700/50 dark:to-amber-500/40 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
            <div className="rounded-3xl bg-white/95 dark:bg-[#0B0B10]/92 backdrop-blur-2xl px-6 py-7 sm:px-10 sm:py-8 md:px-12 md:py-9 text-center space-y-4 transition-colors duration-300">
              
              {/* Top Authority Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.18)]">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
                  Institutional Algorithmic Architecture
                </span>
              </div>

              {/* Section Heading */}
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-white">
                Best Forex EA –{" "}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
                  BlackDiamond Special EA
                </span>
              </h2>

              {/* Decorative Gold Divider Line */}
              <div className="w-20 h-0.5 mx-auto rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_#F59E0B]" />

              {/* Main Description */}
              <p className="text-sm sm:text-base md:text-[17px] font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-4xl mx-auto">
                BlackDiamond Special EA is a premium AI‑powered Forex Expert
                Advisor designed for traders who want consistent, automated
                trading results with controlled risk. This advanced Forex robot
                for MT4 &amp; MT5 uses intelligent market analysis, precise entry
                logic, and strict risk management to trade the market
                automatically without emotional decision‑making. Whether you are
                a beginner or an experienced trader, BlackDiamond Special EA
                helps you participate in the Forex market using a reliable
                automated forex trading system built for long‑term performance.
              </p>

              {/* 3 Key Highlights Strip */}
              <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-50 dark:bg-zinc-900/90 border border-amber-500/30 text-xs sm:text-sm font-bold text-zinc-800 dark:text-amber-200">
                  <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>AI Market Analysis</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-zinc-900/90 border border-emerald-500/30 text-xs sm:text-sm font-bold text-zinc-800 dark:text-emerald-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Strict Risk Control</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky-50 dark:bg-zinc-900/90 border border-sky-500/30 text-xs sm:text-sm font-bold text-zinc-800 dark:text-sky-300">
                  <Activity className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>Zero Emotional Bias</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Subtle Bottom Gold Border Line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}