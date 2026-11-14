"use client";

import React, { useState, useRef } from "react";
import { CalendarDays, ShieldCheck, Radio, Sparkles } from "lucide-react";

export default function EconomicCalendar() {
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
              Real-Time Macro &amp; Volatility Feed
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Economic{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              Calendar
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-medium">
            Track global central bank decisions, NFP releases, CPI data, and
            high-impact Forex market events in real time.
          </p>
        </div>

        {/* Institutional Terminal Frame for Myfxbook Economic Calendar */}
        <div className="max-w-6xl mx-auto rounded-3xl p-[1.5px] bg-gradient-to-b from-amber-400/60 via-amber-500/25 to-amber-400/50 dark:from-amber-400/50 dark:via-zinc-800/80 dark:to-amber-500/40 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          <div className="rounded-3xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl overflow-hidden">
            {/* Terminal Top Bar */}
            <div className="px-5 py-3.5 border-b border-amber-500/25 bg-amber-500/5 dark:bg-[#0E0D0A] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <CalendarDays className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span className="text-xs sm:text-sm font-extrabold text-zinc-900 dark:text-amber-200">
                  Global Economic Events Schedule
                </span>
              </div>

              <div className="flex items-center gap-4 text-[11px] font-bold">
                <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <Radio className="w-3.5 h-3.5 animate-pulse" />
                  <span>LIVE FEED</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Built-in News Filter Protected</span>
                </span>
              </div>
            </div>

            {/* Clean White Container for Myfxbook Iframe Readability */}
            <div className="w-full bg-white">
              <iframe
                title="Myfxbook Economic Calendar"
                className="w-full min-h-[780px] lg:min-h-screen block border-0"
                src="https://widget.myfxbook.com/widget/calendar.html?lang=en&impacts=0,1,2,3&symbols=AED,AFN,ALL,AMD,ANG,AOA,ARS,AUD,AWG,AZN,BAM,BBD,BDT,BGN,BHD,BIF,BMD,BND,BOB,BRL,BSD,BTN,BWP,BYN,BZD,CAD,CDF,CHF,CLP,CNY,COP,CRC,CUC,CVE,CZK,DJF,DKK,DOP,DZD,EGP,ERN,ETB,EUR,FJD,FKP,GBP,GEL,GHS,GIP,GMD,GNF,GTQ,GYD,HKD,HNL,HRK,HTG,HUF,IDR,ILS,INR,IQD,IRR,ISK,JMD,JOD,JPY,KES,KGS,KHR,KMF,KPW,KRW,KWD,KYD,KZT,LAK,LBP,LKR,LRD,LSL,LYD,MAD,MDL,MGA,MKD,MMK,MNT,MOP,MRO,MUR,MVR,MWK,MXN,MYR,MZN,NAD,NGN,NIO,NOK,NPR,NZD,OMR,PAB,PEN,PGK,PHP,PKR,PLN,PYG,QAR,RON,RSD,RUB,RWF,SAR,SBD,SCR,SDG,SEK,SGD,SHP,SLL,SOS,SRD,SSP,STD,SYP,SZL,THB,TJS,TMT,TND,TOP,TRY,TTD,TWD,TZS,UAH,UGX,USD,UYU,UZS,VEF,VND,VUV,WST,XAF,XCD,XOF,XPF,YER,ZAR,ZMW"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}