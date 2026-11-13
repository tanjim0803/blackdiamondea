"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

import markets4YouForexBroker from "../../../public/assets/home/partners/Markets4you-Forex-Broker.webp";
import avaTradeForexBroker from "../../../public/assets/home/partners/AvaTrade-Forex-Broker.webp";
import exnessLogo from "../../../public/assets/home/partners/exness_logo.webp";
import roboforexBestBroker from "../../../public/assets/home/partners/roboforex-best-broker.webp";
import icMarketsForexBroker from "../../../public/assets/home/partners/ICMarkets-Forex-Broker.webp";
import fbsForexBroker from "../../../public/assets/home/partners/FBS-Forex-Broker.webp";
import vantageFullLogo from "../../../public/assets/home/partners/vantage-full-logo.webp";
import xbtfxLogo from "../../../public/assets/home/partners/xbtfx-logo.webp";

const BROKERS_LIST = [
  {
    name: "Exness",
    tag: "Instant Withdrawal",
    logo: exnessLogo,
    minDeposit: "$100",
    commission: "Zero / Raw",
    spread: "From 0.0 Pips",
    href: "https://one.exness.link/a/of0mf0mf",
    bgLight: false,
  },
  {
    name: "RoboForex",
    tag: "Cent & ECN Pro",
    logo: roboforexBestBroker,
    minDeposit: "$100",
    commission: "Zero / ECN",
    spread: "From 0.0 Pips",
    href: "https://my.roboforex.com/en/?a=vuhy",
    bgLight: true,
  },
  {
    name: "IC Markets",
    tag: "True ECN Liquidity",
    logo: icMarketsForexBroker,
    minDeposit: "$100",
    commission: "$3.5 / Lot",
    spread: "From 0.0 Pips",
    href: "https://one.exness.link/a/of0mf0mf",
    bgLight: false,
  },
  {
    name: "AvaTrade",
    tag: "Multi-Regulated",
    logo: avaTradeForexBroker,
    minDeposit: "$100",
    commission: "Zero",
    spread: "From 0.9 Pips",
    href: "https://my.roboforex.com/en/?a=vuhy",
    bgLight: false,
  },
  {
    name: "Markets4you",
    tag: "Fast Execution",
    logo: markets4YouForexBroker,
    minDeposit: "$100",
    commission: "-",
    spread: "-",
    href: "https://one.exness.link/a/of0mf0mf",
    bgLight: false,
  },
  {
    name: "FBS",
    tag: "High Leverage",
    logo: fbsForexBroker,
    minDeposit: "$100",
    commission: "-",
    spread: "-",
    href: "https://my.roboforex.com/en/?a=vuhy",
    bgLight: false,
  },
  {
    name: "Vantage",
    tag: "Raw ECN Spreads",
    logo: vantageFullLogo,
    minDeposit: "$100",
    commission: "-",
    spread: "-",
    href: "https://one.exness.link/a/of0mf0mf",
    bgLight: false,
  },
  {
    name: "XBTFX",
    tag: "Crypto & FX ECN",
    logo: xbtfxLogo,
    minDeposit: "$100",
    commission: "-",
    spread: "-",
    href: "https://my.roboforex.com/en/?a=vuhy",
    bgLight: false,
  },
];

function BrokerCard({ broker }) {
  const cardRef = useRef(null);
  const [cardMouse, setCardMouse] = useState({ x: 180, y: 120 });
  const [cardHovered, setCardHovered] = useState(false);

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCardMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleCardMouseMove}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
      className="group relative flex flex-col rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/40 via-amber-400/15 to-amber-500/40 dark:from-amber-500/35 dark:via-zinc-800/70 dark:to-amber-500/30 hover:from-amber-400 hover:to-yellow-500 shadow-md hover:shadow-[0_0_30px_rgba(245,158,11,0.25)] hover:-translate-y-1.5 transition-all duration-300"
    >
      <div className="relative flex flex-col h-full rounded-2xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl p-5 overflow-hidden transition-colors duration-300">
        {/* Interactive Card Hover Reflection */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: cardHovered ? 1 : 0,
            background: `radial-gradient(320px circle at ${cardMouse.x}px ${cardMouse.y}px, rgba(245, 158, 11, 0.16), transparent 70%)`,
          }}
        />

        {/* Top Tag Pill */}
        <div className="relative z-10 flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-[10px] font-extrabold uppercase tracking-wider text-amber-800 dark:text-amber-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
            {broker.tag}
          </span>
        </div>

        {/* Preserved Aspect Ratio Logo Display Box */}
        <div
          className={`relative z-10 h-24 w-full rounded-xl border border-amber-500/20 flex items-center justify-center p-4 mb-4 ${
            broker.bgLight ? "bg-white" : "bg-zinc-100/80 dark:bg-[#12121A]"
          }`}
        >
          <Image
            src={broker.logo}
            alt={broker.name}
            className="max-h-14 w-auto object-contain rounded-md group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Broker Name */}
        <h3 className="relative z-10 text-lg font-extrabold text-zinc-900 dark:text-white text-center mb-3">
          {broker.name}
        </h3>

        {/* Specifications Table */}
        <div className="relative z-10 space-y-2.5 text-xs sm:text-sm border-t border-amber-500/20 pt-3 mb-5 grow">
          <div className="flex items-center justify-between">
            <span className="font-medium text-zinc-600 dark:text-zinc-400">
              Min. Deposit:
            </span>
            <span className="font-mono font-bold text-zinc-900 dark:text-amber-300">
              {broker.minDeposit}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-zinc-600 dark:text-zinc-400">
              Commission:
            </span>
            <span className="font-mono font-semibold text-zinc-800 dark:text-zinc-200">
              {broker.commission}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-zinc-600 dark:text-zinc-400">
              EUR/USD Spread:
            </span>
            <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              {broker.spread}
            </span>
          </div>
        </div>

        {/* Uniform Gold CTA Button (Activates on Hover for ALL cards equally) */}
        <Link
          href={broker.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 mt-auto w-full"
        >
          <Button className="w-full h-10 rounded-xl bg-amber-50 hover:bg-amber-400 group-hover:bg-gradient-to-r group-hover:from-amber-300 group-hover:via-amber-400 group-hover:to-yellow-600 text-zinc-900 group-hover:text-black dark:bg-[#161208] dark:text-amber-200 dark:group-hover:text-black border border-amber-500/50 group-hover:border-amber-300 font-extrabold text-xs sm:text-sm group-hover:shadow-[0_0_20px_rgba(245,158,11,0.45)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5">
            <span>Open Live Account</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function Brokers() {
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

      <div className="container relative z-10 mx-auto px-4 space-y-8 lg:space-y-10">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40 shadow-[0_0_18px_rgba(245,158,11,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
              Verified EA-Compatible Liquidity
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Top Forex{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              Brokers
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-medium">
            Open an account with our trusted Tier-1 regulated partners for low
            spreads, fast ECN execution, and optimal BlackDiamond EA
            performance.
          </p>

          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 pt-1">
            <ShieldCheck className="w-4 h-4" />
            <span>100% Tested with BlackDiamond Special EA V9.5</span>
          </div>
        </div>

        {/* 4-Column Responsive Broker Cards Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {BROKERS_LIST.map((broker) => (
            <BrokerCard key={broker.name} broker={broker} />
          ))}
        </div>
      </div>
    </section>
  );
}