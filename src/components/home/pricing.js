"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Crown,
  ShoppingCart,
  ShieldCheck,
} from "lucide-react";
import PaymentMethods from "./PaymentMethods";

export default function Pricing() {
  const [essentialExpanded, setEssentialExpanded] = useState(false);
  const [duoExpanded, setDuoExpanded] = useState(false);
  const [ultraExpanded, setUltraExpanded] = useState(false);

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

  const essentialFeatures = [
    "Unlimited Licence (For 1 User)",
    "5 Special Indicator",
    "inside code more powerful",
    "Specially use for Live Account",
    "Fixed & Percentage Both Trading system",
    "Demo Licence Activation",
    "1 special set file with low-risk settings",
    "Special Set File for day Trader",
    "Special set file for Live Account",
    "70% to 80% trading ACCURACY",
    "Max Profit return limited 30% to 50%",
    "Max DD 15 to 20%",
    "Free Update for 1 years",
    "EndLess lifetime support",
  ];

  const duoFeatures = [
    "Unlimited Licence (For 3 User)",
    "20 Special Indicator",
    "inside code more upgraded & Powerful",
    "SPECIALLY for Live & Prop/FTMO CHALLENGE",
    "Fixed & Percentage Both Trading system",
    "Unlimited demo account",
    "2 special set file with low-risk settings",
    "Special set file for Day, swing, scalping, Long Trader",
    "Special Set File for LONG & SHORT Trade",
    "Special secnce for activated trade",
    "85% to 95% trading ACCURACY",
    "Market tracker enable fully",
    "Every time change open trading POSITION",
    "Max profit return 80% to 120%",
    "Max DD 3 to 4% for prop/FTMO CHALLENGE",
    "Max dd 7 to 12% for live account",
    "Lifetime free upgrade",
    "EndLess lifetime Support",
  ];

  const ultraFeatures = [
    "Unlimited Licence (For Unlimited USER)",
    "40 Special Indicator",
    "inside code more upgraded, Powerful more ELEGANT",
    "SPECIALLY for any types of Live & Prop/FTMO CHALLENGE or other account",
    "Fixed & Percentage Both Trading system",
    "unlimited demo account",
    "7 special set file with low-risk settings",
    "Special set file for Day, swing, scalping, Long Trader",
    "Special Set File for LONG & SHORT Trade",
    "special secnce for activated trade",
    "95% trading ACCURACY mostly",
    "Market tracker enable fully",
    "every time change open trading POSITION",
    "Max profit return 80% to 120%",
    "Max DD 3 to 4% for prop/FTMO CHALLENGE",
    "Max dd 7 to 12% for live account",
    "lifetime free upgrade",
    "EndLess lifetime Support",
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full overflow-hidden bg-[#FAF7F0] text-zinc-900 dark:bg-[#050507] dark:text-white py-8 md:py-10 lg:py-12 transition-colors duration-300"
    >
      {/* Compact & Centered Luxury Styling for Payment Method Logos */}
      <style jsx global>{`
        .payment-logos-compact {
          margin-top: 0 !important;
          padding-top: 0.25rem !important;
          padding-bottom: 0.25rem !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          justify-content: center !important;
          text-align: center !important;
        }
        .payment-logos-compact img,
        .payment-logos-compact svg {
          max-height: 24px !important;
          width: auto !important;
          object-fit: contain !important;
          border-radius: 5px !important;
          transition: transform 0.25s ease, filter 0.25s ease !important;
        }
        .payment-logos-compact img:hover,
        .payment-logos-compact svg:hover {
          transform: scale(1.08) !important;
        }
        .payment-logos-compact h3,
        .payment-logos-compact h4,
        .payment-logos-compact p {
          font-size: 12px !important;
          margin-bottom: 0.4rem !important;
        }
      `}</style>

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

      <div className="container relative z-10 mx-auto px-4 space-y-7 lg:space-y-8">
        {/* Compact Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40 shadow-[0_0_18px_rgba(245,158,11,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
              Limited Time 30% Launch Offer
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
            Get Our{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              Special System Now
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 font-medium">
            Choose your institutional trading license — instant delivery with lifetime support.
          </p>
        </div>

        {/* 3 Luxury Pricing Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3 mx-auto max-w-6xl pt-5 items-stretch">
          
          {/* CARD 1: ESSENTIAL */}
          <div className="group relative flex flex-col rounded-3xl p-[1px] bg-gradient-to-b from-amber-500/45 via-amber-400/20 to-amber-500/45 dark:from-amber-500/40 dark:via-zinc-800/70 dark:to-amber-500/30 hover:from-amber-400 hover:to-yellow-500 shadow-lg hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:-translate-y-1 transition-all duration-300">
            <Card className="flex flex-col h-full rounded-3xl border-0 bg-white/95 dark:bg-[#0A0A0F]/95 backdrop-blur-2xl relative overflow-hidden">
              {/* Top-Left Red Corner Badge Inside Card */}
              <span className="absolute top-0 left-0 px-3.5 py-1 rounded-br-2xl bg-gradient-to-r from-red-600 to-rose-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md z-10">
                30% OFF
              </span>

              <CardHeader className="text-center pb-2 pt-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                  Starter Live Edition
                </p>
                <CardTitle className="text-xl font-extrabold text-zinc-900 dark:text-white mt-0.5">
                  BlackDiamond Essential
                </CardTitle>
                <div className="my-2.5 flex items-baseline justify-center gap-2.5 font-mono">
                  <span className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-amber-300">
                    $312
                  </span>
                  <span className="text-sm font-semibold text-zinc-400 line-through decoration-rose-500">
                    $410
                  </span>
                </div>
              </CardHeader>

              {/* Clean Gold Divider Line */}
              <div className="px-6 my-1">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/45 to-transparent" />
              </div>

              <CardContent className="space-y-3 grow px-5 pt-2.5">
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  {(essentialExpanded
                    ? essentialFeatures
                    : essentialFeatures.slice(0, 5)
                  ).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shrink-0">
                        <Check className="size-2.5 text-amber-600 dark:text-amber-400 stroke-[3]" />
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                {essentialFeatures.length > 5 && (
                  <button
                    onClick={() => setEssentialExpanded(!essentialExpanded)}
                    className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 pt-0.5 hover:underline cursor-pointer"
                  >
                    {essentialExpanded ? (
                      <>
                        Hide details <ChevronUp className="size-3.5" />
                      </>
                    ) : (
                      <>
                        View all features ({essentialFeatures.length}){" "}
                        <ChevronDown className="size-3.5" />
                      </>
                    )}
                  </button>
                )}
              </CardContent>

              <CardFooter className="mt-auto pt-3 pb-5 px-5">
                <Link href="/pricing" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full h-11 rounded-xl bg-amber-50 hover:bg-amber-400 text-zinc-900 hover:text-black dark:bg-[#161208] dark:hover:bg-amber-400 dark:text-amber-200 dark:hover:text-black border-amber-500/50 hover:border-amber-300 font-bold text-xs sm:text-sm shadow-sm hover:shadow-[0_0_25px_rgba(251,191,36,0.45)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Buy Essential</span>
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* CARD 2: DUO (MOST POPULAR HIGHLIGHTED) */}
          <div className="group relative flex flex-col rounded-3xl p-[2px] bg-gradient-to-b from-amber-200 via-amber-500 to-yellow-600 shadow-[0_0_40px_rgba(245,158,11,0.32)] hover:shadow-[0_0_60px_rgba(251,191,36,0.55)] hover:-translate-y-1.5 transition-all duration-300">
            {/* Larger, Eye-Catching Most Popular Floating Badge */}
            <span className="absolute -top-4.5 inset-x-0 mx-auto w-fit px-5 py-1.5 rounded-full bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 text-black text-xs sm:text-sm font-black uppercase tracking-wider shadow-[0_0_25px_rgba(251,191,36,0.85)] ring-2 ring-amber-200/70 flex items-center gap-1.5 z-20">
              <Crown className="w-4 h-4 text-black" />
              Most Popular
            </span>

            <Card className="flex flex-col h-full rounded-[22px] border-0 bg-gradient-to-b from-amber-50/95 via-white to-white dark:from-[#191307] dark:via-[#0D0B08] dark:to-[#08080B] backdrop-blur-2xl relative overflow-hidden">
              {/* Top-Left Red Corner Badge Inside Card */}
              <span className="absolute top-0 left-0 px-3.5 py-1 rounded-br-2xl bg-gradient-to-r from-red-600 to-rose-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md z-10">
                30% OFF
              </span>

              <CardHeader className="text-center pb-2 pt-9">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-300">
                  Live &amp; Prop / FTMO Edition
                </p>
                <CardTitle className="text-xl font-extrabold text-zinc-900 dark:text-white mt-0.5">
                  BlackDiamond Duo
                </CardTitle>
                <div className="my-2.5 flex items-baseline justify-center gap-2.5 font-mono">
                  <span className="text-4xl font-black bg-gradient-to-r from-amber-600 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
                    $730
                  </span>
                  <span className="text-sm font-semibold text-zinc-400 line-through decoration-rose-500">
                    $949
                  </span>
                </div>
              </CardHeader>

              {/* Clean Glowing Gold Divider Line */}
              <div className="px-6 my-1">
                <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-amber-400/75 to-transparent" />
              </div>

              <CardContent className="space-y-3 grow px-5 pt-2.5">
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-800 dark:text-zinc-200">
                  {(duoExpanded ? duoFeatures : duoFeatures.slice(0, 5)).map(
                    (item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="mt-0.5 w-4 h-4 rounded-full bg-amber-400/25 border border-amber-400 flex items-center justify-center shrink-0">
                          <Check className="size-2.5 text-amber-700 dark:text-amber-300 stroke-[3]" />
                        </span>
                        <span className="leading-snug font-medium">{item}</span>
                      </li>
                    )
                  )}
                </ul>

                {duoFeatures.length > 5 && (
                  <button
                    onClick={() => setDuoExpanded(!duoExpanded)}
                    className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1 pt-0.5 hover:underline cursor-pointer"
                  >
                    {duoExpanded ? (
                      <>
                        Hide details <ChevronUp className="size-3.5" />
                      </>
                    ) : (
                      <>
                        View all features ({duoFeatures.length}){" "}
                        <ChevronDown className="size-3.5" />
                      </>
                    )}
                  </button>
                )}
              </CardContent>

              <CardFooter className="mt-auto pt-3 pb-5 px-5">
                <Link href="/pricing" className="w-full">
                  <Button className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-600 hover:brightness-110 text-black font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:shadow-[0_0_40px_rgba(251,191,36,0.85)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2">
                    <span>Buy Duo Now</span>
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* CARD 3: ULTRA */}
          <div className="group relative flex flex-col rounded-3xl p-[1px] bg-gradient-to-b from-amber-500/45 via-amber-400/20 to-amber-500/45 dark:from-amber-500/40 dark:via-zinc-800/70 dark:to-amber-500/30 hover:from-amber-400 hover:to-yellow-500 shadow-lg hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] hover:-translate-y-1 transition-all duration-300">
            <Card className="flex flex-col h-full rounded-3xl border-0 bg-white/95 dark:bg-[#0A0A0F]/95 backdrop-blur-2xl relative overflow-hidden">
              {/* Top-Left Red Corner Badge Inside Card */}
              <span className="absolute top-0 left-0 px-3.5 py-1 rounded-br-2xl bg-gradient-to-r from-red-600 to-rose-500 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-md z-10">
                30% OFF
              </span>

              <CardHeader className="text-center pb-2 pt-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                  Unlimited Institutional VIP
                </p>
                <CardTitle className="text-xl font-extrabold text-zinc-900 dark:text-white mt-0.5">
                  BlackDiamond Ultra
                </CardTitle>
                <div className="my-2.5 flex items-baseline justify-center gap-2.5 font-mono">
                  <span className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-amber-300">
                    $2,499
                  </span>
                  <span className="text-sm font-semibold text-zinc-400 line-through decoration-rose-500">
                    $3,250
                  </span>
                </div>
              </CardHeader>

              {/* Clean Gold Divider Line */}
              <div className="px-6 my-1">
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/45 to-transparent" />
              </div>

              <CardContent className="space-y-3 grow px-5 pt-2.5">
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                  {(ultraExpanded
                    ? ultraFeatures
                    : ultraFeatures.slice(0, 5)
                  ).map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-0.5 w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shrink-0">
                        <Check className="size-2.5 text-amber-600 dark:text-amber-400 stroke-[3]" />
                      </span>
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>

                {ultraFeatures.length > 5 && (
                  <button
                    onClick={() => setUltraExpanded(!ultraExpanded)}
                    className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 pt-0.5 hover:underline cursor-pointer"
                  >
                    {ultraExpanded ? (
                      <>
                        Hide details <ChevronUp className="size-3.5" />
                      </>
                    ) : (
                      <>
                        View all features ({ultraFeatures.length}){" "}
                        <ChevronDown className="size-3.5" />
                      </>
                    )}
                  </button>
                )}
              </CardContent>

              <CardFooter className="mt-auto pt-3 pb-5 px-5">
                <Link href="/pricing" className="w-full">
                  <Button
                    variant="outline"
                    className="w-full h-11 rounded-xl bg-amber-50 hover:bg-amber-400 text-zinc-900 hover:text-black dark:bg-[#161208] dark:hover:bg-amber-400 dark:text-amber-200 dark:hover:text-black border-amber-500/50 hover:border-amber-300 font-bold text-xs sm:text-sm shadow-sm hover:shadow-[0_0_25px_rgba(251,191,36,0.45)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Buy Ultra VIP</span>
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* Centered & Compact Institutional Checkout Strip */}
        <div className="max-w-3xl mx-auto rounded-2xl p-[1px] bg-gradient-to-r from-transparent via-amber-500/45 to-transparent">
          <div className="rounded-2xl bg-white/85 dark:bg-[#0B0B10]/90 backdrop-blur-xl px-4 py-3 flex flex-col items-center justify-center text-center space-y-1.5 shadow-sm">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>256-Bit SSL Encrypted • Instant License Delivery</span>
            </div>
            <div className="payment-logos-compact w-full">
              <PaymentMethods />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subtle Gold Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent pointer-events-none" />
    </section>
  );
}