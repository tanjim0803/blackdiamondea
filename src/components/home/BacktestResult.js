"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import BlackDiamondEaV9_eurusd_Fix__no_01 from "../../../public/assets/home/backtest-result/BlackDiamondEaV9_eurusd_Fix_ no 01.png";
import BlackDiamondEaV9_eurusd_Fix__no_02 from "../../../public/assets/home/backtest-result/BlackDiamondEaV9_eurusd_Per_no 02.png";
import BlackDiamondEaV9_eurusd_Fix__no_03 from "../../../public/assets/home/backtest-result/BlackDiamondEaV9_gbpusd_no 03.png";
import BlackDiamondEaV9_eurusd_Fix__no_04 from "../../../public/assets/home/backtest-result/BlackDiamondEaV9_usdjpy_no 04.png";
import BlackDiamondEaV9_eurusd_Fix__no_05 from "../../../public/assets/home/backtest-result/BlackDiamondEaV9_usdchf_no 05.png";
import BlackDiamondEaV9_eurusd_Fix__no_06 from "../../../public/assets/home/backtest-result/BlackDiamondEaV9_audusd_no 06.png";
import PerformanceCover from "../../../public/assets/home/backtest-result/blackdiamond back test result.webp";
import { X, ChevronLeft, ChevronRight, Award, ZoomIn } from "lucide-react";

export default function BacktestResult() {
  const [activeIndex, setActiveIndex] = useState(null);
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 500, y: 300 });
  const [isHovered, setIsHovered] = useState(false);

  const backtestCards = [
    {
      id: 1,
      cover: PerformanceCover,
      result: BlackDiamondEaV9_eurusd_Fix__no_01,
      alt: "EURUSD Fix Result 1",
      label: "EURUSD • Fix Lot",
    },
    {
      id: 2,
      cover: PerformanceCover,
      result: BlackDiamondEaV9_eurusd_Fix__no_02,
      alt: "EURUSD Per Result 2",
      label: "EURUSD • Auto Risk",
    },
    {
      id: 3,
      cover: PerformanceCover,
      result: BlackDiamondEaV9_eurusd_Fix__no_03,
      alt: "GBPUSD Result 3",
      label: "GBPUSD • 99% Quality",
    },
    {
      id: 4,
      cover: PerformanceCover,
      result: BlackDiamondEaV9_eurusd_Fix__no_04,
      alt: "USDJPY Result 4",
      label: "USDJPY • 99% Quality",
    },
    {
      id: 5,
      cover: PerformanceCover,
      result: BlackDiamondEaV9_eurusd_Fix__no_05,
      alt: "USDCHF Result 5",
      label: "USDCHF • 99% Quality",
    },
    {
      id: 6,
      cover: PerformanceCover,
      result: BlackDiamondEaV9_eurusd_Fix__no_06,
      alt: "AUDUSD Result 6",
      label: "AUDUSD • 99% Quality",
    },
  ];

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const showNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % backtestCards.length);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setActiveIndex(
      (prev) => (prev - 1 + backtestCards.length) % backtestCards.length
    );
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight")
        setActiveIndex((prev) => (prev + 1) % backtestCards.length);
      if (e.key === "ArrowLeft")
        setActiveIndex(
          (prev) => (prev - 1 + backtestCards.length) % backtestCards.length
        );
      if (e.key === "Escape") setActiveIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, backtestCards.length]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden bg-[#FAF7F0] text-zinc-900 dark:bg-[#050507] dark:text-white py-10 md:py-12 lg:py-14 transition-colors duration-300"
    >
      {/* Subtle Background Image (হালকাভাবে দৃশ্যমান ব্যাকগ্রাউন্ড ইমেজ) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Image
          src={PerformanceCover}
          alt="Backtest Background"
          fill
          className="object-cover object-center opacity-12 dark:opacity-20 scale-105"
        />
        {/* Soft Theme Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F0]/85 via-[#FAF7F0]/65 to-[#FAF7F0]/90 dark:from-[#050507]/85 dark:via-[#050507]/65 dark:to-[#050507]/90" />
      </div>

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
        <div className="max-w-3xl mx-auto text-center space-y-2.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.18)]">
            <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
              99.90% Real Tick Modeling Quality
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            BlackDiamond_SpecialEa V9.5{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              Backtest Result 99% Quality
            </span>
          </h2>
        </div>

        {/* 3D Flip Cards Grid Area */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6">
          {backtestCards.map((card, index) => (
            <div
              key={card.id}
              className="w-full flex justify-center items-center"
            >
              <div className="group h-80 sm:h-88 w-full max-w-[360px] perspective-[1000px]">
                <div className="relative h-full w-full transition-all duration-1000 transform-3d group-hover:transform-[rotateY(180deg)]">
                  {/* Front Side */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-lg dark:shadow-[0_12px_35px_rgba(0,0,0,0.85)] backface-hidden border border-amber-500/50 dark:border-amber-400/45 bg-white dark:bg-[#0B0B10] cursor-pointer">
                    <Image
                      src={card.cover}
                      alt="Performance Cover"
                      fill
                      className="object-cover"
                    />
                    {/* Bottom Gold Tag */}
                    <div className="absolute bottom-3 left-3 right-3 px-3.5 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-amber-400/35 flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300 tracking-wide">
                        {card.label}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-300">
                        Hover to Flip ↻
                      </span>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.3)] border border-amber-400/70 transform-[rotateY(180deg)] backface-hidden bg-[#0B0B10]">
                    <div
                      className="relative w-full h-full cursor-zoom-in"
                      onClick={() => setActiveIndex(index)}
                    >
                      <Image
                        src={card.result}
                        alt={card.alt}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/25 hover:bg-black/10 transition-colors flex items-end justify-center pb-3">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-black font-bold text-xs shadow-lg">
                          <ZoomIn className="w-3.5 h-3.5" />
                          Click to Enlarge
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Subtle Gold Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent pointer-events-none" />

      {/* FULL SCREEN SLIDER LIGHTBOX */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-between bg-black/92 backdrop-blur-md p-4 md:p-10 cursor-zoom-out select-none"
          onClick={() => setActiveIndex(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-amber-300 hover:text-black bg-amber-500/20 hover:bg-amber-400 border border-amber-400/50 p-2.5 rounded-full transition-all cursor-pointer z-50"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(null);
            }}
          >
            <X className="size-6" />
          </button>

          {/* Left Sliding Button */}
          <button
            className="text-amber-300 hover:text-black bg-zinc-900/90 hover:bg-amber-400 border border-amber-400/40 p-3 rounded-full transition-all cursor-pointer ml-2 md:ml-4 z-50"
            onClick={showPrev}
          >
            <ChevronLeft className="size-6 md:size-8" />
          </button>

          {/* Main Active Slide Image Container */}
          <div
            className="relative w-full h-full max-w-4xl max-h-[80vh] mx-4 rounded-2xl border border-amber-400/40 bg-[#0B0B10]/90 p-2 shadow-[0_0_50px_rgba(245,158,11,0.25)] transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={backtestCards[activeIndex].result}
              alt={backtestCards[activeIndex].alt}
              fill
              className="object-contain rounded-xl p-2"
              priority
            />

            {/* Image Counter */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-zinc-900/90 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold">
              {backtestCards[activeIndex].label} ({activeIndex + 1} /{" "}
              {backtestCards.length})
            </div>
          </div>

          {/* Right Sliding Button */}
          <button
            className="text-amber-300 hover:text-black bg-zinc-900/90 hover:bg-amber-400 border border-amber-400/40 p-3 rounded-full transition-all cursor-pointer mr-2 md:mr-4 z-50"
            onClick={showNext}
          >
            <ChevronRight className="size-6 md:size-8" />
          </button>
        </div>
      )}
    </section>
  );
}