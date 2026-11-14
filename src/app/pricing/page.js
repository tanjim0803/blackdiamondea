"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Check,
  Sparkles,
  Crown,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

const plans = [
  {
    name: "Essential Duo",
    subtitle: "For Individual Live Traders",
    price: 312,
    previous_price: 410,
    price_off: 30,
    popular: false,
    features: [
      "Unlimited Licence (For 1 User)",
      "5 Special Indicator",
      "Inside code more powerful",
      "Specially use for Live Account",
      "Fixed & Percentage Both Trading system",
      "Demo Licence Activation",
      "1 special set file with low-risk settings",
      "Special Set File for day Trader",
      "Special set file for Live Account",
      "70% to 80% trading ACCURACY",
      "Max Profit return limited 15% to 20%",
      "Max DD 10 to 15%",
      "Free Update for Life Time",
      "EndLess lifetime support",
    ],
  },
  {
    name: "Elite Challenger",
    subtitle: "Best for Prop Firms & FTMO",
    price: 730,
    previous_price: 949,
    price_off: 30,
    popular: true,
    features: [
      "Unlimited Licence (For 3 User)",
      "20 Special Indicator",
      "Inside code more upgraded & Powerful",
      "Specially for Live & Prop/FTMO CHALLENGE",
      "Fixed & Percentage Both Trading system",
      "Unlimited demo account",
      "2 special set file with low-risk settings",
      "Special set file for Day, swing, scalping, Long Trader",
      "Special Set File for LONG & SHORT Trade",
      "Special secnce for activated trade",
      "85% to 95% trading ACCURACY",
      "Market tracker enable fully",
      "Every time change open trading POSITION",
      "Max profit return 20% to 50%",
      "Max DD 3 to 4% for prop/FTMO CHALLENGE",
      "Max dd 7 to 12% for live account",
      "Lifetime free upgrade",
      "EndLess lifetime Support",
    ],
  },
  {
    name: "Ultimate Enterprise",
    subtitle: "Institutional & Multi-Account Desk",
    price: 2499,
    previous_price: 3250,
    price_off: 30,
    popular: false,
    features: [
      "Unlimited Licence (For Unlimited USER)",
      "40 Special Indicator",
      "Inside code more upgraded, Powerful more ELEGANT",
      "Specially for any types of Live & Prop/FTMO CHALLENGE or other account",
      "Fixed & Percentage Both Trading system",
      "unlimited demo account",
      "7 special set file with low-risk settings",
      "Special set file for Day, swing, scalping, Long Trader",
      "Special Set File for LONG & SHORT Trade",
      "Special secnce for activated trade",
      "95% trading ACCURACY mostly",
      "Market tracker enable fully",
      "Every time change open trading POSITION",
      "Max profit return 80% to 120%",
      "Max DD 3 to 4% for prop/FTMO CHALLENGE",
      "Max dd 7 to 12% for live account",
      "Lifetime free upgrade",
      "EndLess lifetime Support",
    ],
  },
];

function PricingCard({ plan }) {
  const cardRef = useRef(null);
  const [cardMouse, setCardMouse] = useState({ x: 200, y: 150 });
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
      className="group relative flex flex-col rounded-3xl p-[1.5px] bg-gradient-to-b from-amber-500/45 via-amber-400/20 to-amber-500/45 dark:from-amber-500/40 dark:via-zinc-800/80 dark:to-amber-500/35 hover:from-amber-300 hover:via-amber-500 hover:to-yellow-500 shadow-lg hover:shadow-[0_0_40px_rgba(245,158,11,0.28)] hover:-translate-y-1.5 transition-all duration-300"
    >
      {/* Floating Popular Crown Badge */}
      {plan.popular && (
        <div className="absolute -top-4 inset-x-0 mx-auto w-fit z-20 flex items-center gap-1.5 px-4 py-1 rounded-full bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 text-black text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(251,191,36,0.6)]">
          <Crown className="w-3.5 h-3.5 fill-black" />
          <span>Most Popular</span>
        </div>
      )}

      {/* Discount Pill Badge */}
      <div className="absolute -top-3.5 right-5 z-20 px-3 py-1 rounded-full bg-rose-600 text-white text-xs font-extrabold tracking-wide shadow-md">
        {plan.price_off}% OFF
      </div>

      <div className="relative flex flex-col h-full rounded-3xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl p-6 sm:p-7 overflow-hidden transition-colors duration-300">
        {/* Interactive Card Hover Reflection */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: cardHovered ? 1 : 0,
            background: `radial-gradient(380px circle at ${cardMouse.x}px ${cardMouse.y}px, rgba(245, 158, 11, 0.16), transparent 70%)`,
          }}
        />

        {/* Plan Header */}
        <div className="relative z-10 text-center space-y-2 pt-2">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            {plan.subtitle}
          </p>

          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
            {plan.name}
          </h3>

          {/* Price Display */}
          <div className="py-3 flex items-baseline justify-center gap-2.5">
            <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-zinc-900 dark:text-white">
              ${plan.price}
            </span>
            <span className="text-base sm:text-lg font-mono font-semibold text-zinc-400 line-through decoration-rose-500 decoration-2">
              ${plan.previous_price}
            </span>
          </div>

          <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
            One-Time Payment • Lifetime License
          </p>

          {/* Uniform Hover-Activated Gold CTA Button */}
          <div className="pt-3">
            <Button
              asChild
              className="w-full h-11 rounded-xl bg-amber-50 hover:bg-amber-400 group-hover:bg-gradient-to-r group-hover:from-amber-300 group-hover:via-amber-400 group-hover:to-yellow-600 text-zinc-900 group-hover:text-black dark:bg-[#161208] dark:text-amber-200 dark:group-hover:text-black border border-amber-500/50 group-hover:border-amber-300 font-extrabold text-sm group-hover:shadow-[0_0_24px_rgba(245,158,11,0.5)] transition-all duration-300 cursor-pointer"
            >
              <Link
                href={`/checkout?product=${encodeURIComponent(
                  plan.name
                )}&price=${plan.price}`}
                className="flex items-center justify-center gap-2"
              >
                <span>Buy Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative z-10 h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/35 to-transparent my-6" />

        {/* Features List */}
        <ul className="relative z-10 space-y-3 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 grow">
          {plan.features.map((item, index) => (
            <li key={index} className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3 h-3 text-amber-600 dark:text-amber-400 stroke-[3]" />
              </span>
              <span className="leading-snug font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Pricing() {
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
      className="relative w-full min-h-screen overflow-hidden bg-[#FAF7F0] text-zinc-900 dark:bg-[#050507] dark:text-white pt-36 sm:pt-40 lg:pt-48 pb-16 transition-colors duration-300"
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

      <div className="container relative z-10 mx-auto px-4 space-y-10 lg:space-y-12">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40 shadow-[0_0_18px_rgba(245,158,11,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
              Limited-Time 30% Institutional Discount
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              Special System Plan
            </span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-medium">
            Unlock BlackDiamond Special EA V9.00 with lifetime updates,
            low-drawdown preset files, and 24/7 VIP support.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Instant Digital Delivery</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
              <Zap className="w-4 h-4" />
              <span>MT4 &amp; MT5 Compatible</span>
            </span>
          </div>
        </div>

        {/* 3-Column Pricing Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 pt-2">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}