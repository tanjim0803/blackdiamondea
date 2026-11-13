"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BlackDiamond from "../../../public/assets/home/hero-section/blackdiamond.webp";
import Mockup from "../../../public/assets/home/hero-section/mockup.webp";
import increaseUpProfitIcon from "../../../public/assets/home/icons/increase-up-profit-icon.webp";
import {
  ShoppingCart,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Cpu,
} from "lucide-react";
import { getActiveTraders } from "@/lib/utils";
import TypewriterText from "./TypewriterText";

const CANDLE_SCENARIOS = [
  {
    pair: "XAUUSD (GOLD)",
    profit: "+$50,105.80",
    winRate: "87%",
    candles: [
      [80, 560, 45, 535, 625, true],
      [165, 520, 55, 495, 595, true],
      [250, 535, 35, 515, 590, false],
      [335, 470, 65, 445, 555, true],
      [420, 420, 60, 395, 500, true],
      [505, 440, 40, 420, 495, false],
      [590, 365, 75, 340, 460, true],
      [675, 310, 70, 285, 400, true],
      [760, 330, 38, 308, 385, false],
      [845, 255, 75, 230, 350, true],
      [930, 200, 68, 175, 285, true],
      [1015, 218, 35, 198, 270, false],
      [1100, 150, 72, 125, 240, true],
      [1185, 105, 65, 80, 185, true],
      [1270, 65, 60, 42, 140, true],
    ],
  },
  {
    pair: "EURUSD",
    profit: "+$24,890.45",
    winRate: "90%",
    candles: [
      [80, 580, 40, 555, 640, true],
      [165, 595, 32, 575, 645, false],
      [250, 530, 68, 505, 615, true],
      [335, 480, 58, 455, 555, true],
      [420, 498, 35, 480, 550, false],
      [505, 425, 72, 400, 515, true],
      [590, 375, 62, 350, 455, true],
      [675, 392, 34, 372, 442, false],
      [760, 315, 78, 290, 410, true],
      [845, 260, 66, 235, 345, true],
      [930, 278, 36, 258, 330, false],
      [1015, 200, 76, 175, 295, true],
      [1100, 145, 68, 120, 230, true],
      [1185, 110, 55, 85, 180, true],
      [1270, 72, 58, 48, 145, true],
    ],
  },
  {
    pair: "GBPUSD",
    profit: "+$82,450.25",
    winRate: "80%",
    candles: [
      [80, 550, 55, 525, 625, true],
      [165, 500, 60, 475, 580, true],
      [250, 520, 42, 500, 580, false],
      [335, 455, 68, 430, 540, true],
      [420, 472, 36, 452, 525, false],
      [505, 395, 78, 370, 490, true],
      [590, 340, 65, 315, 425, true],
      [675, 360, 40, 340, 415, false],
      [760, 285, 76, 260, 380, true],
      [845, 230, 65, 205, 315, true],
      [930, 245, 34, 225, 295, false],
      [1015, 175, 72, 150, 265, true],
      [1100, 130, 60, 105, 205, true],
      [1185, 92, 55, 68, 165, true],
      [1270, 55, 58, 35, 130, true],
    ],
  },
  {
    pair: "AUDGBP",
    profit: "+$1,12,640.90",
    winRate: "90%",
    candles: [
      [80, 590, 42, 565, 650, true],
      [165, 540, 58, 515, 615, true],
      [250, 555, 32, 535, 605, false],
      [335, 485, 70, 460, 575, true],
      [420, 430, 64, 405, 510, true],
      [505, 448, 38, 428, 502, false],
      [590, 370, 78, 345, 465, true],
      [675, 315, 68, 290, 400, true],
      [760, 332, 35, 312, 385, false],
      [845, 250, 80, 225, 348, true],
      [930, 195, 66, 170, 280, true],
      [1015, 150, 58, 125, 225, true],
      [1100, 165, 32, 145, 212, false],
      [1185, 102, 65, 78, 182, true],
      [1270, 60, 58, 38, 135, true],
    ],
  },
  {
    pair: "EURJPY",
    profit: "+$64,320.60",
    winRate: "87%",
    candles: [
      [80, 565, 48, 540, 630, true],
      [165, 580, 34, 560, 630, false],
      [250, 515, 68, 490, 600, true],
      [335, 460, 62, 435, 540, true],
      [420, 478, 38, 458, 532, false],
      [505, 405, 74, 380, 495, true],
      [590, 350, 64, 325, 432, true],
      [675, 368, 36, 348, 420, false],
      [760, 290, 78, 265, 385, true],
      [845, 235, 68, 210, 320, true],
      [930, 252, 35, 232, 302, false],
      [1015, 180, 74, 155, 270, true],
      [1100, 132, 62, 108, 210, true],
      [1185, 95, 55, 72, 165, true],
      [1270, 58, 56, 36, 130, true],
    ],
  },
];

export default function HeroSection() {
  const activeTraders = getActiveTraders();
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 500, y: 300 });
  const [isHovered, setIsHovered] = useState(false);
  const [chartIndex, setChartIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setChartIndex((prev) => (prev + 1) % CANDLE_SCENARIOS.length);
    }, 20200);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const currentScenario = CANDLE_SCENARIOS[chartIndex];

  const maPath = currentScenario.candles
    .map((c, idx) => `${idx === 0 ? "M" : "L"}${c[0] + 14},${c[1]}`)
    .join(" ");

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full mt-16 lg:mt-28 overflow-hidden bg-[#FAF7F0] text-zinc-900 dark:bg-[#050507] dark:text-white pt-14 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32 transition-colors duration-300"
    >
      {/* Motion Graphics Keyframes (Subtle 45% Peak Opacity on Floating Badges) */}
      <style jsx global>{`
        @keyframes candlePopUp {
          0% {
            opacity: 0;
            transform: translateY(35px) scaleY(0.2);
          }
          6% {
            opacity: 1;
            transform: translateY(0px) scaleY(1);
          }
          93% {
            opacity: 1;
            transform: translateY(0px) scaleY(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-10px) scaleY(0.95);
          }
        }

        @keyframes trendLineFlow {
          0% {
            stroke-dashoffset: 1800;
            opacity: 0;
          }
          3% {
            opacity: 0.75;
          }
          15% {
            stroke-dashoffset: 0;
            opacity: 0.75;
          }
          93% {
            stroke-dashoffset: 0;
            opacity: 0.75;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        @keyframes centerGoldPopup {
          0% {
            opacity: 0;
            transform: translate(-50%, -40%) scale(0.88);
          }
          8% {
            opacity: 0;
            transform: translate(-50%, -40%) scale(0.88);
          }
          14% {
            opacity: 0.45;
            transform: translate(-50%, -50%) scale(1);
          }
          93% {
            opacity: 0.45;
            transform: translate(-50%, -50%) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -60%) scale(0.92);
          }
        }

        @keyframes topWinRatePopup {
          0% {
            opacity: 0;
            transform: translateY(14px) scale(0.92);
          }
          10% {
            opacity: 0;
            transform: translateY(14px) scale(0.92);
          }
          16% {
            opacity: 0.45;
            transform: translateY(0px) scale(1);
          }
          93% {
            opacity: 0.45;
            transform: translateY(0px) scale(1);
          }
          100% {
            opacity: 0;
            transform: translateY(-12px) scale(0.92);
          }
        }

        .candle-motion-item {
          transform-box: fill-box;
          transform-origin: bottom center;
          opacity: 0;
          animation: candlePopUp 20s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .trend-ma-line {
          stroke-dasharray: 1800;
          animation: trendLineFlow 20s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .center-gold-badge {
          opacity: 0;
          animation: centerGoldPopup 20s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .top-profit-badge {
          opacity: 0;
          animation: topWinRatePopup 20s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes laserSlide {
          0% {
            transform: translateX(-100%);
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0.2;
          }
        }

        .bottom-laser-beam {
          animation: laserSlide 4s ease-in-out infinite;
        }
      `}</style>

      {/* Trading Terminal Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-45"
        style={{
          backgroundSize: "52px 52px",
          backgroundImage:
            "linear-gradient(to right, rgba(217, 119, 6, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(217, 119, 6, 0.08) 1px, transparent 1px)",
        }}
      />

      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0.4,
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.16), transparent 70%)`,
        }}
      />

      {/* Forex Motion Graphics Candlestick Layer (Lowered Subtle Opacity) */}
      <div
        key={chartIndex}
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <svg
          className="w-full h-full opacity-20 dark:opacity-25"
          viewBox="0 0 1380 700"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="bullCandleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="45%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="bearCandleGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#9F1239" stopOpacity="0.65" />
            </linearGradient>
            <linearGradient id="maGlowStroke" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FEF08A" stopOpacity="1" />
            </linearGradient>
          </defs>

          {currentScenario.candles.map((candle, idx) => {
            const [x, bodyY, bodyH, wickTop, wickBottom, isBullish] = candle;
            const delay = `${idx * 0.11}s`;
            return (
              <g
                key={idx}
                className="candle-motion-item"
                style={{ animationDelay: delay }}
              >
                <line
                  x1={x + 14}
                  y1={wickTop}
                  x2={x + 14}
                  y2={wickBottom}
                  stroke={isBullish ? "#34D399" : "#FB7185"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <rect
                  x={x}
                  y={bodyY}
                  width="28"
                  height={bodyH}
                  rx="4"
                  fill={isBullish ? "url(#bullCandleGrad)" : "url(#bearCandleGrad)"}
                  stroke={isBullish ? "#FDE68A" : "#FDA4AF"}
                  strokeOpacity="0.45"
                  strokeWidth="1"
                />
              </g>
            );
          })}

          <path
            className="trend-ma-line"
            d={maPath}
            stroke="url(#maGlowStroke)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Top Floating Profit Percentage Badge (Subtle 45% Opacity) */}
        <div
          key={`win-${chartIndex}`}
          className="top-profit-badge hidden md:flex items-center gap-2 absolute top-[14%] right-[36%] px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-400/35 backdrop-blur-md shadow-[0_0_16px_rgba(16,185,129,0.18)]"
        >
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-extrabold tracking-wider text-emerald-300">
            ▲ {currentScenario.winRate} Profit
          </span>
        </div>

        {/* Middle Point Decimal Profit Badge Highlighted in Gold (Subtle 45% Opacity) */}
        <div
          key={`pair-${chartIndex}`}
          className="center-gold-badge hidden md:flex items-center gap-3 absolute top-1/2 left-1/2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#1A1405]/60 via-[#261C06]/60 to-[#1A1405]/60 border border-amber-400/40 backdrop-blur-xl shadow-[0_0_20px_rgba(245,158,11,0.2)]"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-70"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
          </span>
          <div className="flex items-center gap-2 font-mono">
            <span className="text-base lg:text-lg font-black text-amber-300 tracking-tight">
              {currentScenario.profit}
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-400/30">
              {currentScenario.pair}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="w-full lg:flex lg:items-center lg:justify-between gap-12">
          
          {/* Left Side */}
          <div className="w-full lg:w-[58%] space-y-6 text-center">
            
            {/* 3 Authority Badges Row (Radar Ping / Blinking Ripple Icons, No Extra Circles) */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              
              {/* Badge 1: MyFxBook & FXBlue Verified AI */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/90 dark:bg-zinc-900/95 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.2)] backdrop-blur-md">
                <span className="relative inline-flex items-center justify-center w-3.5 h-3.5 shrink-0">
                  <Sparkles className="animate-ping absolute inline-flex w-full h-full text-amber-500 dark:text-amber-400 opacity-80" />
                  <Sparkles className="relative inline-flex w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                </span>
                <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-amber-900 dark:text-amber-300">
                  MyFxBook &amp; FXBlue Verified AI
                </span>
              </div>

              {/* Badge 2: FTMO & Prop Firm Ready */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 dark:bg-emerald-950/70 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)] backdrop-blur-md">
                <span className="relative inline-flex items-center justify-center w-3.5 h-3.5 shrink-0">
                  <ShieldCheck
                    style={{ animationDelay: "0.4s" }}
                    className="animate-ping absolute inline-flex w-full h-full text-emerald-500 dark:text-emerald-400 opacity-80"
                  />
                  <ShieldCheck className="relative inline-flex w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </span>
                <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-emerald-900 dark:text-emerald-300">
                  FTMO &amp; Prop Firm Ready
                </span>
              </div>

              {/* Badge 3: 4D Nano AI • Platform MT4 & MT5 */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/90 dark:bg-sky-950/70 border border-sky-500/40 shadow-[0_0_20px_rgba(14,165,233,0.2)] backdrop-blur-md">
                <span className="relative inline-flex items-center justify-center w-3.5 h-3.5 shrink-0">
                  <Cpu
                    style={{ animationDelay: "0.8s" }}
                    className="animate-ping absolute inline-flex w-full h-full text-sky-500 dark:text-sky-400 opacity-80"
                  />
                  <Cpu className="relative inline-flex w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                </span>
                <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-sky-900 dark:text-sky-300">
                  4D Nano AI • Platform MT4 &amp; MT5
                </span>
              </div>

            </div>

            {/* Original Dynamic Typewriter Heading */}
            <div className="text-zinc-900 dark:text-white dark:[&_*]:!text-white">
              <TypewriterText />
            </div>

            {/* Centered Subtitle Above the Stats Card */}
            <p className="text-zinc-700 dark:text-zinc-300 text-base md:text-lg font-medium max-w-2xl text-center mx-auto leading-relaxed">
              No guesswork. No stress. Just proven, institutional-grade automated Forex &amp; Gold trading engineered for consistent growth.
            </p>

            {/* Centered Gradient-Bordered Glassmorphism Live Performance Snapshot */}
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-r from-amber-500/50 via-amber-300/60 to-amber-500/50 dark:from-amber-500/40 dark:via-zinc-700/40 dark:to-amber-500/40 max-w-2xl mx-auto shadow-xl dark:shadow-2xl">
              <div className="bg-white/95 dark:bg-[#0B0B0F]/90 backdrop-blur-xl rounded-2xl p-4 sm:p-5 grid grid-cols-3 gap-3 sm:gap-5 text-center">
                <div className="border-r border-amber-200 dark:border-zinc-800/80 pr-2">
                  <p className="text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                    Active Traders
                  </p>
                  <p className="text-xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mt-1">
                    {activeTraders}+
                  </p>
                </div>
                <div className="border-r border-amber-200 dark:border-zinc-800/80 px-2">
                  <p className="text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                    Verified Win Rate
                  </p>
                  <p className="text-xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                    87%
                  </p>
                </div>
                <div className="pl-2">
                  <p className="text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                    Monthly Returns
                  </p>
                  <p className="text-xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">
                    30-120%
                  </p>
                </div>
              </div>
            </div>

            {/* Centered Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link href="/pricing" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-64 h-14 rounded-xl bg-gradient-to-r from-amber-300 via-amber-500 to-yellow-600 hover:brightness-110 text-black font-extrabold text-base shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:shadow-[0_0_45px_rgba(245,158,11,0.6)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2.5"
                >
                  <span>Buy Now</span>
                  <ShoppingCart className="w-5 h-5" />
                </Button>
              </Link>

              <a
                href="https://t.me/bdspecialea"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-64 h-14 rounded-xl bg-white hover:bg-amber-50 text-zinc-900 dark:bg-zinc-900/90 dark:hover:bg-zinc-800/90 dark:text-white border-amber-500/40 dark:border-zinc-700/80 hover:border-amber-500 dark:hover:border-amber-400/60 shadow-sm dark:hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] font-semibold text-base transition-all duration-300 flex items-center justify-center gap-2.5"
                >
                  <span>Join Telegram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="22"
                    height="22"
                    className="fill-sky-500 dark:fill-sky-400"
                  >
                    <path d="M41.4193 7.30899C41.4193 7.30899 45.3046 5.79399 44.9808 9.47328C44.8729 10.9883 43.9016 16.2908 43.1461 22.0262L40.5559 39.0159C40.5559 39.0159 40.3401 41.5048 38.3974 41.9377C36.4547 42.3705 33.5408 40.4227 33.0011 39.9898C32.5694 39.6652 24.9068 34.7955 22.2086 32.4148C21.4531 31.7655 20.5897 30.4669 22.3165 28.9519L33.6487 18.1305C34.9438 16.8319 36.2389 13.8019 30.8426 17.4812L15.7331 27.7616C15.7331 27.7616 14.0063 28.8437 10.7686 27.8698L3.75342 25.7055C3.75342 25.7055 1.16321 24.0823 5.58815 22.459C16.3807 17.3729 29.6555 12.1786 41.4193 7.30899Z" />
                  </svg>
                </Button>
              </a>
            </div>
          </div>

          {/* Right Side: Interactive Glowing Bento Grid */}
          <div className="w-full lg:w-[42%] mt-12 lg:mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              
              <div className="flex flex-col gap-4">
                <div className="rounded-3xl bg-white/95 dark:bg-[#0D0D12]/90 backdrop-blur-md border border-amber-500/35 dark:border-amber-500/25 hover:border-amber-400/70 shadow-lg dark:hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all duration-300 text-center p-6 flex flex-col items-center justify-center">
                  <p className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">
                    Active Traders
                  </p>
                  <h4 className="text-3xl font-extrabold text-zinc-900 dark:text-white my-1.5">
                    {Math.floor((activeTraders / 1000) * 10) / 10}K+
                  </h4>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold text-sm mt-1">
                    <span>87%</span>
                    <Image
                      src={increaseUpProfitIcon}
                      alt="Increase Up Profit Icon"
                      className="w-4 h-4 object-contain"
                    />
                  </div>
                </div>

                {/* BlackDiamond Product Image Card */}
                <div className="relative rounded-3xl overflow-hidden border border-amber-500/40 dark:border-amber-500/30 hover:border-amber-400/80 shadow-lg dark:hover:shadow-[0_0_35px_rgba(245,158,11,0.25)] transition-all duration-300 bg-white/80 dark:bg-zinc-900/60 p-2 group">
                  <Image
                    className="rounded-2xl w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    src={BlackDiamond}
                    alt="BlackDiamond Special AI"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-amber-500/20 rounded-xl px-3 py-2 flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-400">BlackDiamond AI</span>
                    <span className="text-[10px] text-zinc-300 flex items-center gap-1">
                      <span className="relative inline-flex items-center justify-center w-3.5 h-3.5">
                        <ShieldCheck className="animate-ping absolute inline-flex w-full h-full text-emerald-400 opacity-80" />
                        <ShieldCheck className="relative inline-flex w-3.5 h-3.5 text-emerald-400" />
                      </span>{" "}
                      Prop Safe
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column of Bento (Tall Mockup Image) */}
              <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 dark:border-zinc-800 hover:border-amber-500/60 shadow-lg dark:hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] transition-all duration-300 bg-white/80 dark:bg-zinc-900/60 p-2 group">
                <Image
                  className="rounded-2xl w-full h-full min-h-[380px] object-cover group-hover:scale-105 transition-transform duration-500"
                  src={Mockup}
                  alt="BlackDiamond Trading Mockup"
                />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Bottom Glowing Laser Lighting Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/70 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-12 bg-amber-500/20 blur-2xl pointer-events-none" />
      <div className="bottom-laser-beam absolute bottom-0 left-0 w-1/2 h-[3px] bg-gradient-to-r from-transparent via-yellow-300 to-transparent shadow-[0_0_20px_#F59E0B] pointer-events-none" />
    </section>
  );
}