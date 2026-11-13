"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Home,
  Building2,
  LineChart,
  Calendar,
  Flame,
  Mail,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggleButton } from "./theme-toggle-button";
import LoginIconMobile from "./login-icon";

const CHART_SUBLINKS = [
  {
    label: "Live Forex Chart",
    href: "/live-forex-chart",
    icon: LineChart,
  },
  {
    label: "Economic Calendar",
    href: "/economic-calendar",
    icon: Calendar,
  },
  {
    label: "Forex Heat Map",
    href: "/forex-heat-map",
    icon: Flame,
  },
];

export default function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isChartActive = CHART_SUBLINKS.some((item) => pathname === item.href);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div className="flex items-center">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            aria-label="Open navigation menu"
            className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/90 dark:bg-[#0B0B10]/95 hover:bg-amber-50 dark:hover:bg-[#15130C] backdrop-blur-xl text-zinc-900 dark:text-amber-300 border border-amber-500/45 hover:border-amber-300 shadow-[0_2px_10px_rgba(0,0,0,0.2)] hover:shadow-[0_0_18px_rgba(251,191,36,0.5)] transition-all duration-300 cursor-pointer"
          >
            <Menu className="w-5 h-5 stroke-[2.25] transition-transform duration-300 group-hover:scale-110" />
          </button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[84%] max-w-[330px] p-0 flex flex-col justify-between bg-[#FAF7F0]/98 dark:bg-[#07070A]/98 backdrop-blur-2xl border-l border-amber-500/35 text-zinc-900 dark:text-white shadow-[-15px_0_45px_rgba(0,0,0,0.55)]"
        >
          {/* Top Brand Header */}
          <SheetHeader className="px-5 pt-5 pb-4 border-b border-amber-500/20 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/35 w-fit mb-1">
              <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 dark:text-amber-300">
                BlackDiamondEA
              </span>
            </div>
            <SheetTitle className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Navigation{" "}
              <span className="bg-gradient-to-r from-amber-600 to-yellow-500 dark:from-amber-200 dark:to-amber-400 bg-clip-text text-transparent">
                Menu
              </span>
            </SheetTitle>
          </SheetHeader>

          {/* Scrollable Navigation Links */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2 no-scrollbar">
            {/* Home */}
            <Link
              href="/"
              onClick={handleLinkClick}
              className={`group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                pathname === "/"
                  ? "bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-400/50 shadow-[0_0_16px_rgba(245,158,11,0.18)]"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300 border border-transparent"
              }`}
            >
              <span className="flex items-center gap-3">
                <Home className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Home</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all" />
            </Link>

            {/* Brokers */}
            <Link
              href="/brokers"
              onClick={handleLinkClick}
              className={`group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                pathname === "/brokers"
                  ? "bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-400/50 shadow-[0_0_16px_rgba(245,158,11,0.18)]"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300 border border-transparent"
              }`}
            >
              <span className="flex items-center gap-3">
                <Building2 className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Brokers</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all" />
            </Link>

            {/* Live Chart Accordion */}
            <Accordion
              type="single"
              collapsible
              defaultValue={isChartActive ? "live-chart" : undefined}
              className="w-full"
            >
              <AccordionItem value="live-chart" className="border-none">
                <AccordionTrigger
                  className={`px-3.5 py-3 rounded-xl text-sm font-bold hover:no-underline transition-all duration-200 cursor-pointer ${
                    isChartActive
                      ? "bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-400/50"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300 border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <LineChart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Live Chart</span>
                  </span>
                </AccordionTrigger>

                <AccordionContent className="pt-1.5 pb-1 pl-4 pr-1">
                  <div className="space-y-1 border-l-2 border-amber-500/35 pl-3">
                    {CHART_SUBLINKS.map((sub) => {
                      const SubIcon = sub.icon;
                      const active = pathname === sub.href;
                      return (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={handleLinkClick}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 ${
                            active
                              ? "bg-amber-400/20 text-amber-800 dark:text-amber-300"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300"
                          }`}
                        >
                          <SubIcon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>{sub.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Contact */}
            <Link
              href="/contact-us"
              onClick={handleLinkClick}
              className={`group flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                pathname === "/contact-us"
                  ? "bg-gradient-to-r from-amber-400/20 to-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-400/50 shadow-[0_0_16px_rgba(245,158,11,0.18)]"
                  : "text-zinc-700 dark:text-zinc-300 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300 border border-transparent"
              }`}
            >
              <span className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Contact</span>
              </span>
              <ChevronRight className="w-4 h-4 opacity-50 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all" />
            </Link>
          </div>

          {/* Bottom Action Footer: Theme Toggle + Gold Login CTA */}
          <SheetFooter className="p-4 border-t border-amber-500/25 bg-white/70 dark:bg-[#0B0B10]/90 backdrop-blur-xl">
            <div className="w-full flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ThemeToggleButton />
                <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                  Theme
                </span>
              </div>

              <Link
                href="/login"
                onClick={handleLinkClick}
                className="flex-1 max-w-[165px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 hover:from-amber-200 hover:to-yellow-400 text-black text-xs font-extrabold tracking-wide shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_28px_rgba(251,191,36,0.7)] transition-all duration-300"
              >
                <LoginIconMobile className="w-4 h-4 text-black" />
                <span>Client Login</span>
              </Link>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}