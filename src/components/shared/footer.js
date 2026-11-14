"use client";

import Image from "next/image";
import Link from "next/link";
import payments from "../../../public/assets/footer/payments.webp";
import securedByGoogle from "../../../public/assets/footer/Secured-by-Google.webp";
import dmcaProtected from "../../../public/assets/footer/dmca_protected.png";
import footerLogo from "../../../public/logo.gif";
import _24x7 from "../../../public/assets/footer/24x7.webp";
import SocialMedia from "./social-media";
import { ShieldAlert, Scale, Headphones } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-[#FAF7F0] text-zinc-800 dark:bg-[#050507] dark:text-zinc-200 border-t border-amber-500/30 transition-colors duration-300">
      {/* Top Glowing Gold Laser Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/80 to-transparent pointer-events-none" />

      {/* Subtle Cyber Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-30"
        style={{
          backgroundSize: "48px 48px",
          backgroundImage:
            "linear-gradient(to right, rgba(217, 119, 6, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(217, 119, 6, 0.06) 1px, transparent 1px)",
        }}
      />

      {/* Main Footer Content */}
      <div className="container relative z-10 mx-auto px-4 py-8 lg:py-10 lg:flex lg:gap-10">
        {/* Left Brand & Support Column */}
        <div className="w-full lg:w-[32%] space-y-4">
          <div className="w-36 md:w-48 transition-transform duration-300 hover:scale-[1.02]">
            <Link href="/" className="flex items-center">
              <Image
                src={footerLogo}
                alt="BlackDiamond EA Logo"
                className="dark:drop-shadow-[0_0_12px_rgba(245,158,11,0.25)]"
              />
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            Trade smarter with{" "}
            <span className="font-bold text-amber-700 dark:text-amber-300">
              BLACKDIAMONDEA
            </span>
            . We provide high-performance MT4 &amp; MT5 Expert Advisors (EAs)
            and advanced Forex trading solutions built with precision,
            reliability, and institutional risk discipline.
          </p>

          {/* Contact & 24/7 Support Card */}
          <div className="rounded-2xl p-4 bg-white/90 dark:bg-[#0B0B10]/90 border border-amber-500/25 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm font-extrabold text-zinc-900 dark:text-amber-300">
              <Headphones className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Contact &amp; VIP Support</span>
            </div>

            <SocialMedia />

            <div className="pt-1">
              <Image
                className="w-48 sm:w-52 h-auto object-contain rounded-lg"
                src={_24x7}
                alt="24x7 Support"
              />
            </div>
          </div>
        </div>

        {/* Right Risk & Legal Disclaimers Column */}
        <div className="w-full lg:w-[68%] mt-7 lg:mt-0 space-y-4">
          {/* Risk Disclaimer Box */}
          <div className="rounded-2xl p-4 sm:p-5 bg-white/90 dark:bg-[#0B0B10]/90 border border-amber-500/25 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <h5 className="text-sm sm:text-base font-extrabold text-zinc-900 dark:text-amber-300">
                Risk Disclaimer for BLACKDIAMONDEA Users
              </h5>
            </div>
            <div className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-300 space-y-2 leading-relaxed">
              <p>
                Trading Forex and other leveraged financial instruments carries
                a high level of risk and may result in the partial or total loss
                of your invested capital. Please ensure that you fully
                understand the risks involved and carefully consider your
                investment objectives, financial situation, and trading
                experience before participating in the financial markets.
              </p>
              <p>
                If you are uncertain whether trading is appropriate for you, we
                strongly recommend seeking independent financial advice from a
                qualified professional. Past performance, testimonials, and
                historical results are not reliable indicators of future
                performance. We do not guarantee any specific profits or
                outcomes, and individual trading results may vary.
              </p>
            </div>
          </div>

          {/* Legal Disclaimer Box */}
          <div className="rounded-2xl p-4 sm:p-5 bg-white/90 dark:bg-[#0B0B10]/90 border border-amber-500/25 shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <h5 className="text-sm sm:text-base font-extrabold text-zinc-900 dark:text-amber-300">
                Legal Disclaimer
              </h5>
            </div>
            <div className="text-xs sm:text-[13px] text-zinc-600 dark:text-zinc-300 space-y-2 leading-relaxed">
              <p>
                This website is not affiliated with, endorsed by, or associated
                with MetaQuotes, Facebook, Google, TikTok, or any other
                third-party companies mentioned herein. All product names,
                trademarks, logos, and brand names are the property of their
                respective owners and are used solely for identification
                purposes.
              </p>
              <p>
                The information provided on this website is for educational and
                informational purposes only and should not be considered
                financial, investment, tax, or legal advice. Always consult with
                a qualified professional before making any trading or investment
                decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Policy Navigation Strip */}
      <div className="relative z-10 py-3.5 border-t border-amber-500/20 bg-amber-500/5 dark:bg-[#08080C]/90">
        <div className="container mx-auto px-4 flex justify-center gap-x-6 gap-y-2 flex-wrap text-xs sm:text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          <Link
            href="/website-disclaimer"
            className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            Website Disclaimer
          </Link>
          <Link
            href="/risk-disclaimer"
            className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            Risk Disclaimer
          </Link>
          <Link
            href="/refund-policy"
            className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            Refund Policy
          </Link>
          <Link
            href="/cookie-policy"
            className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            Cookie Policy
          </Link>
          <Link
            href="/software-license-agreement"
            className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            Software License Agreement
          </Link>
          <Link
            href="/anti-money-laundering-policy"
            className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            Anti-Money Laundering (AML) Policy
          </Link>
        </div>
      </div>

      {/* Bottom Copyright & Security Badges Bar */}
      <div className="relative z-10 w-full border-t border-amber-500/20 py-4 bg-[#F3ECE0]/60 dark:bg-[#040406]">
        <div className="container mx-auto px-4 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <span className="font-bold text-zinc-800 dark:text-amber-300">
              {new Date().getFullYear()} © BLACKDIAMONDEA
            </span>
            <span>|</span>
            <Link
              href="/privacy-policy"
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
            >
              Privacy Policy
            </Link>
            <span>|</span>
            <Link
              href="/terms-condition"
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
            >
              Terms &amp; Condition
            </Link>
            <span>|</span>
            <Link
              href="/faq"
              className="hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
            >
              FAQs
            </Link>
          </div>

          <div className="flex justify-center gap-4 md:gap-6 items-center flex-wrap">
            <div className="px-3 py-1.5 rounded-xl bg-white/95 dark:bg-zinc-900/90 border border-amber-500/25 shadow-sm">
              <Image
                src={payments}
                alt="Payments"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/95 dark:bg-zinc-900/90 border border-amber-500/25 shadow-sm">
              <Image
                src={securedByGoogle}
                alt="Secured by Google"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/95 dark:bg-zinc-900/90 border border-amber-500/25 shadow-sm">
              <Image
                src={dmcaProtected}
                alt="DMCA Protected"
                className="h-6 sm:h-7 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}