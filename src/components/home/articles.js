"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { CheckCircle2, Sparkles } from "lucide-react";
import articleImage01 from "../../../public/assets/home/articles/01_Best Forex EA.webp";
import articleImage02 from "../../../public/assets/home/articles/02_No_emotion_trading_accuracy.webp";
import articleImage03 from "../../../public/assets/home/articles/03_AI‑Powered-Automated-Forex-Trading.webp";
import articleImage04 from "../../../public/assets/home/articles/04_Low-Drawdown-Risk-Management-Focus.webp";
import articleImage05 from "../../../public/assets/home/articles/05_Verified_Results_Transparent_Performance.webp";
import articleImage06 from "../../../public/assets/home/articles/06_Easy-MT4-Setup-User‑Friendly.webp";
import articleImage07 from "../../../public/assets/home/articles/07_Who Is BlackDiamond Special EA.webp";
import articleImage08 from "../../../public/assets/home/articles/08_Automated-Trading-with-Confidence.webp";

const ARTICLES_DATA = [
  {
    id: "01",
    tag: "Flagship System",
    title: "Best Forex EA – BlackDiamond Special EA",
    image: articleImage01,
    summary:
      "A premium AI-powered Expert Advisor for MT4 & MT5 built for consistent, automated Forex & Gold returns with strict risk control.",
    bullets: [
      "Intelligent algorithmic market analysis & precise entries",
      "100% automated execution without emotional bias",
      "Engineered for sustainable long-term account growth",
    ],
  },
  {
    id: "02",
    tag: "Core Advantage",
    title: "Why Choose BlackDiamond Special EA",
    image: articleImage02,
    summary:
      "Focuses strictly on high-probability setups rather than over-trading, protecting your capital across real market conditions.",
    bullets: [
      "AI-driven entry precision with low drawdown protection",
      "Compatible with small, medium, and prop firm accounts",
      "Zero manual intervention or signal service required",
    ],
  },
  {
    id: "03",
    tag: "4D Nano Engine",
    title: "AI-Powered Automated Forex Trading",
    image: articleImage03,
    summary:
      "Continuously scans price action, trend momentum, and volatility to execute disciplined trades and filter out low-quality setups.",
    bullets: [
      "Real-time multi-timeframe trend & volatility scanner",
      "Rule-based execution eliminates human guesswork",
      "Dynamically adapts to shifting market conditions",
    ],
  },
  {
    id: "04",
    tag: "Capital Safety",
    title: "Low Drawdown & Risk Management Focus",
    image: articleImage04,
    summary:
      "Built as a safe, non-martingale trading robot that prioritizes account preservation over risky grid exposure.",
    bullets: [
      "Dynamic lot sizing & intelligent SL/TP protection",
      "Built-in news & volatility safety filters",
      "Zero Martingale & Zero Grid exposure",
    ],
  },
  {
    id: "05",
    tag: "100% Audited",
    title: "Verified Results & Transparent Performance",
    image: articleImage05,
    summary:
      "Proven on real live market accounts with publicly auditable Myfxbook & FXBlue track records—no unrealistic hype.",
    bullets: [
      "Live account performance verified on Myfxbook",
      "Transparent metrics for informed trading decisions",
      "Built for steady, repeatable monthly growth",
    ],
  },
  {
    id: "06",
    tag: "3-Minute Launch",
    title: "Easy MT4/MT5 Setup & User-Friendly",
    image: articleImage06,
    summary:
      "Designed for effortless plug-and-play deployment—no coding or complex configuration needed to get started.",
    bullets: [
      "1. Attach BlackDiamond EA to your MT4/MT5 chart",
      "2. Load the included optimized preset (.set) file",
      "3. Enable Auto-Trading and let the AI run 24/7",
    ],
  },
  {
    id: "07",
    tag: "Trader Fit",
    title: "Who Is BlackDiamond Special EA For?",
    image: articleImage07,
    summary:
      "Tailored for both busy beginners and experienced traders seeking reliable automation with strict risk boundaries.",
    bullets: [
      "Traders aiming for consistent hands-free profits",
      "FTMO & Prop Firm challenge traders needing low DD",
      "Small-to-large account holders seeking stability",
    ],
  },
  {
    id: "08",
    tag: "Get Started",
    title: "Start Automated Trading with Confidence",
    image: articleImage08,
    summary:
      "Upgrade your trading desk with institutional automation, disciplined risk control, and 365-day VIP support.",
    bullets: [
      "Instant license delivery with step-by-step setup guide",
      "Lifetime free algorithm upgrades & preset updates",
      "Dedicated 24/7 technical support team",
    ],
  },
];

export default function Articles() {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 500, y: 300 });
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
      className="relative w-full overflow-hidden bg-[#FAF7F0] text-zinc-900 dark:bg-[#050507] dark:text-white py-6 md:py-8 lg:py-10 transition-colors duration-300"
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

      <div className="container relative z-10 mx-auto px-4 space-y-5 lg:space-y-6">
        {/* Compact Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.16)]">
            <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
              System Architecture &amp; Insights
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Inside{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              BlackDiamond Special EA
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
            Everything you need to know about our AI execution engine, risk rules, and setup workflow.
          </p>
        </div>

        {/* Tight 2-Column Professional Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          {ARTICLES_DATA.map((item) => (
            <article
              key={item.id}
              className="group relative flex flex-col rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/45 via-amber-400/20 to-amber-500/45 dark:from-amber-500/40 dark:via-zinc-800/70 dark:to-amber-500/30 hover:from-amber-400 hover:to-yellow-500 shadow-md hover:shadow-[0_0_30px_rgba(245,158,11,0.22)] hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="h-full rounded-2xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl overflow-hidden flex flex-col transition-colors duration-300">
                {/* Compact Top Image Banner */}
                <div className="relative w-full h-40 sm:h-44 overflow-hidden bg-zinc-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B10] via-black/20 to-transparent" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-400 text-black font-mono text-[11px] font-black shadow">
                      #{item.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Compact Content Body */}
                <div className="p-4 sm:p-5 flex flex-col grow space-y-2.5">
                  <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="h-[1px] bg-gradient-to-r from-amber-500/30 via-amber-400/15 to-transparent" />

                  <ul className="space-y-1.5">
                    {item.bullets.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2 text-xs sm:text-[13px] font-medium text-zinc-800 dark:text-zinc-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom Subtle Gold Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent pointer-events-none" />
    </section>
  );
}