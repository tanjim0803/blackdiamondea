"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import Link from "next/link";
import { Handshake, ArrowUpRight } from "lucide-react";
import markets4YouForexBroker from "../../../public/assets/home/partners/Markets4you-Forex-Broker.webp";
import avaTradeForexBroker from "../../../public/assets/home/partners/AvaTrade-Forex-Broker.webp";
import exnessLogo from "../../../public/assets/home/partners/exness_logo.webp";
import roboforexBestBroker from "../../../public/assets/home/partners/roboforex-best-broker.webp";
import icMarketsForexBroker from "../../../public/assets/home/partners/ICMarkets-Forex-Broker.webp";
import fbsForexBroker from "../../../public/assets/home/partners/FBS-Forex-Broker.webp";
import vantageFullLogo from "../../../public/assets/home/partners/vantage-full-logo.webp";
import xbtfxLogo from "../../../public/assets/home/partners/xbtfx-logo.webp";

const PARTNERS = [
  {
    name: "Exness",
    logo: exnessLogo,
    href: "https://one.exness.link/a/of0mf0mf",
    bgLight: false,
  },
  {
    name: "RoboForex",
    logo: roboforexBestBroker,
    href: "https://my.roboforex.com/en/?a=vuhy",
    bgLight: true,
  },
  {
    name: "IC Markets",
    logo: icMarketsForexBroker,
    href: "https://one.exness.link/a/of0mf0mf",
    bgLight: false,
  },
  {
    name: "AvaTrade",
    logo: avaTradeForexBroker,
    href: "https://my.roboforex.com/en/?a=vuhy",
    bgLight: false,
  },
  {
    name: "Markets4you",
    logo: markets4YouForexBroker,
    href: "https://one.exness.link/a/of0mf0mf",
    bgLight: false,
  },
  {
    name: "FBS",
    logo: fbsForexBroker,
    href: "https://my.roboforex.com/en/?a=vuhy",
    bgLight: false,
  },
  {
    name: "Vantage",
    logo: vantageFullLogo,
    href: "https://one.exness.link/a/of0mf0mf",
    bgLight: false,
  },
  {
    name: "XBTFX",
    logo: xbtfxLogo,
    href: "https://my.roboforex.com/en/?a=vuhy",
    bgLight: false,
  },
];

export default function OurPartners() {
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
      className="relative w-full overflow-hidden bg-[url('/assets/home/usd.webp')] bg-cover bg-center bg-no-repeat bg-fixed transition-colors duration-300"
    >
      {/* Dual Theme Overlay with Compact Padding */}
      <div className="relative w-full bg-[#FAF7F0]/92 dark:bg-[#050507]/90 backdrop-blur-sm py-8 md:py-10 lg:py-12 transition-colors duration-300">
        
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

        <div className="container relative z-10 mx-auto px-4 space-y-6 lg:space-y-8">
          
          {/* Compact Section Header */}
          <div className="max-w-3xl mx-auto text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40 shadow-[0_0_18px_rgba(245,158,11,0.18)]">
              <Handshake className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
                ECN &amp; Low-Spread Liquidity Partners
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Our{" "}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
                Partners
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
              Recommended Tier-1 regulated brokers optimized for ultra-fast BlackDiamond EA execution.
            </p>
          </div>

          {/* Uniform 4x2 Luxury Partner Cards Grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {PARTNERS.map((partner, idx) => (
              <Link
                key={idx}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/45 via-amber-400/20 to-amber-500/45 dark:from-amber-500/40 dark:via-zinc-800/70 dark:to-amber-500/30 hover:from-amber-400 hover:to-yellow-500 shadow-md hover:shadow-[0_0_30px_rgba(245,158,11,0.28)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-24 sm:h-28 rounded-2xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-xl px-4 py-3 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300">
                  
                  {/* Top-Right Subtle Arrow */}
                  <ArrowUpRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all absolute top-2.5 right-2.5" />

                  {/* Broker Logo */}
                  <div
                    className={`flex items-center justify-center rounded-lg px-2 py-1 ${
                      partner.bgLight ? "bg-white/95" : ""
                    }`}
                  >
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      className="max-h-12 sm:max-h-14 w-auto object-contain rounded-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* Bottom Subtle Gold Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}