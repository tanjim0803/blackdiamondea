"use client";

import React, { useState, useRef } from "react";
import { ShieldCheck, Sparkles } from "lucide-react";

export default function LegalPageLayout({
  badge = "Official Policy & Compliance",
  title,
  highlightText,
  lastUpdated = "November 2026",
  children,
}) {
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
      className="relative w-full min-h-screen overflow-hidden bg-[#FAF7F0] text-zinc-900 dark:bg-[#050507] dark:text-white pt-28 lg:pt-36 pb-14 transition-colors duration-300"
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
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.15), transparent 70%)`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4 space-y-8">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40 shadow-[0_0_18px_rgba(245,158,11,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
              {badge}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            {title}{" "}
            {highlightText && (
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
                {highlightText}
              </span>
            )}
          </h1>

          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Last Updated: {lastUpdated} • BLACKDIAMONDEA Compliance</span>
          </div>
        </div>

        {/* Glassmorphic Content Card */}
        <div className="max-w-4xl mx-auto rounded-3xl p-[1px] bg-gradient-to-b from-amber-500/45 via-amber-400/20 to-amber-500/45 dark:from-amber-500/40 dark:via-zinc-800/70 dark:to-amber-500/30 shadow-xl">
          <div className="rounded-3xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl p-6 sm:p-10 space-y-6 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-extrabold [&_h2]:text-zinc-900 [&_h2]:dark:text-amber-300 [&_h2]:pt-3 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-zinc-900 [&_h3]:dark:text-amber-200 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_strong]:text-zinc-900 [&_strong]:dark:text-white">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}