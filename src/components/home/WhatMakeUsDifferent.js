"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import aiPowered from "../../../public/assets/home/icons/ai-powered.svg";
import lowBalance from "../../../public/assets/home/icons/low-balance.svg";
import accurateEntry from "../../../public/assets/home/icons/accurate-entry.svg";
import verifiedResults from "../../../public/assets/home/icons/verified-results.svg";
import easySetup from "../../../public/assets/home/icons/easy-setup.svg";
import totalSupport from "../../../public/assets/home/icons/total-support.svg";
import { Sparkles } from "lucide-react";

const FEATURES = [
  {
    icon: aiPowered,
    title: "AI-Powered",
    description: "Driven by the Revolutionary 4D Nano Algorithm Technology",
  },
  {
    icon: lowBalance,
    title: "Low Balance",
    description: "Trade now with as low as $100!",
  },
  {
    icon: accurateEntry,
    title: "Accurate Entry",
    description: "Formulated with the algorithm that surpass any speculation.",
  },
  {
    icon: verifiedResults,
    title: "Verified Results",
    description: "MyFXbook, FxBlue & Live Trading Verified.",
  },
  {
    icon: easySetup,
    title: "Easy Setup",
    description: "Plug-and-play with customizable settings for all trader levels.",
  },
  {
    icon: totalSupport,
    title: "Total Support",
    description: "Guaranteed 365 day customer support for all your trades.",
  },
];

export default function WhatMakeUsDifferent() {
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
      className="relative w-full overflow-hidden bg-[url('/assets/home/what-make-us-different.webp')] bg-cover bg-center bg-no-repeat bg-fixed transition-colors duration-300"
    >
      {/* Compact Vertical Padding */}
      <div className="relative w-full bg-[#FAF7F0]/92 dark:bg-[#050507]/88 backdrop-blur-sm py-8 md:py-10 lg:py-12 transition-colors duration-300">
        
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
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.16), transparent 70%)`,
          }}
        />

        <div className="container relative z-10 mx-auto px-4 space-y-7 lg:space-y-9">
          
          {/* Compact Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.18)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
                Core Trading Advantages
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              What Makes Us{" "}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
                Different
              </span>
            </h2>

            <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-medium leading-relaxed">
              Make stable and consistent profits with our collection of the most
              up-to-date AI enabled Forex Trading Tools.
            </p>
          </div>

          {/* 6 Compact Luxury Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {FEATURES.map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/45 via-amber-400/20 to-amber-500/45 dark:from-amber-500/40 dark:via-zinc-800/60 dark:to-amber-500/30 hover:from-amber-400 hover:to-yellow-500 shadow-md hover:shadow-[0_0_35px_rgba(245,158,11,0.28)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-full rounded-2xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-xl px-4 py-6 flex flex-col items-center text-center space-y-3 transition-colors duration-300">
                  
                  {/* Gold Medal Icon Container */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 p-3 flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.35)] group-hover:scale-105 transition-all duration-300">
                    <Image
                      src={item.icon}
                      alt={item.title}
                      width={44}
                      height={44}
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  {/* Feature Title */}
                  <h5 className="text-base sm:text-lg font-extrabold tracking-tight text-zinc-900 dark:text-amber-300 group-hover:text-amber-600 dark:group-hover:text-amber-200 transition-colors">
                    {item.title}
                  </h5>

                  {/* Feature Description */}
                  <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {item.description}
                  </p>

                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Subtle Gold Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}