"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import DiamondIcon from "../../../public/assets/icons/diamond.png";
import {
  Cpu,
  ShieldCheck,
  Globe,
  Headphones,
  Sparkles,
} from "lucide-react";

const SPECIALTY_PARTS = [
  {
    partNumber: "",
    title: "Algorithmic Core & Execution",
    subtitle: "Institutional precision & multi-strategy logic",
    icon: Cpu,
    accent: "amber",
    items: [
      "Auto Market Analysis with Advanced Algorithm",
      "Smart Entry & Exit System",
      "Scalping & Swing Trading Combined",
      "5 Premium Indicators Included Inside EA",
      "Optimized for M30 Timeframe",
      "Fast Trade Execution Logic",
      "Consistent Monthly Growth Strategy",
      "Regular Performance Optimization",
      "Real Account Tested Strategy",
    ],
  },
  {
    partNumber: "",
    title: "Capital & Prop Firm Protection",
    subtitle: "Zero dangerous grid or martingale exposure",
    icon: ShieldCheck,
    accent: "emerald",
    items: [
      "No Martingale Strategy",
      "No Grid Trading",
      "News Filter Protection System",
      "Auto Profit Lock & Dynamic Stop Loss Protection",
      "Built-in Risk Management System",
      "Low Drawdown Strategy & Low Risk Mode",
      "Multi-Layer Trade Protection System",
      "Smart Recovery & Capital Protection Features",
      "Advanced Money Management System",
      "Stable Performance During Market Volatility",
    ],
  },
  {
    partNumber: "",
    title: "Account & Broker Freedom",
    subtitle: "Universal compatibility across all setups",
    icon: Globe,
    accent: "sky",
    items: [
      "Any Broker & Any Account Type Support",
      "Works on Live, Demo, Prop Firm & FTMO Accounts",
      "Any Currency Pair Trading",
      "Minimum Recommended Deposit: $100",
      "Suitable for Small and Large Accounts",
      "Fixed Lot & Custom Lot Options",
      "Maximum Supported Spread Up to 20 Pips",
      "Professional Trade Management",
      "Detailed Trading Reports & Statistics",
    ],
  },
  {
    partNumber: "",
    title: "Hands-Free Automation & VIP Care",
    subtitle: "Plug-and-play setup with lifetime support",
    icon: Headphones,
    accent: "amber",
    items: [
      "Fully Automated Trading Solution",
      "No Signal Service Required",
      "Emotion-Free Trading Decisions",
      "24/7 Market Monitoring System",
      "VPS Friendly & Low Resource Usage",
      "Beginner Friendly – No Trading Experience Needed",
      "Easy Installation & Setup",
      "Free Lifetime Updates",
      "One-Time Payment with Lifetime VIP Support",
    ],
  },
];

export default function OurSpecialty() {
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
      className="relative w-full overflow-hidden bg-[#FAF7F0] text-zinc-900 dark:bg-[#050507] dark:text-white py-10 md:py-12 lg:py-14 transition-colors duration-300"
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

      <div className="container relative z-10 mx-auto px-4 space-y-8 lg:space-y-10">
        {/* Compact Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40 shadow-[0_0_18px_rgba(245,158,11,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
              37+ Institutional Trading Capabilities
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Our{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              Specialty
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
            Engineered across four core pillars for stability, prop-firm safety, and effortless automation.
          </p>
        </div>

        {/* 2x2 Part-by-Part Structured Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SPECIALTY_PARTS.map((part, idx) => {
            const IconComponent = part.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-b from-amber-500/45 via-amber-400/20 to-amber-500/45 dark:from-amber-500/40 dark:via-zinc-800/70 dark:to-amber-500/30 hover:from-amber-400 hover:to-yellow-500 shadow-md hover:shadow-[0_0_35px_rgba(245,158,11,0.22)] transition-all duration-300"
              >
                <div className="h-full rounded-3xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl p-6 sm:p-7 flex flex-col space-y-5 transition-colors duration-300">
                  
                  {/* Card Part Header */}
                  <div className="flex items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 flex items-center justify-center shadow-[0_0_18px_rgba(245,158,11,0.35)] shrink-0">
                        <IconComponent className="w-5 h-5 text-black stroke-[2.2]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                          {part.partNumber}
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold text-zinc-900 dark:text-white leading-tight">
                          {part.title}
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                          {part.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Clean Part Items List */}
                  <ul className="space-y-2.5">
                    {part.items.map((feature, fIdx) => (
                      <li
                        key={fIdx}
                        className="group/item flex items-center gap-3 px-2.5 py-1.5 rounded-xl hover:bg-amber-500/10 dark:hover:bg-amber-500/10 transition-all duration-200 cursor-default"
                      >
                        <div className="w-5 h-5 rounded-md bg-amber-500/15 border border-amber-500/35 flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                          <Image
                            className="w-3.5 h-3.5 object-contain"
                            src={DiamondIcon}
                            alt="Diamond Icon"
                          />
                        </div>
                        <span className="text-sm sm:text-[15px] font-medium text-zinc-800 dark:text-zinc-200 group-hover/item:text-amber-800 dark:group-hover/item:text-amber-200 group-hover/item:translate-x-1 transition-all duration-200">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Subtle Gold Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent pointer-events-none" />
    </section>
  );
}