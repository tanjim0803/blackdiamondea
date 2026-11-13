"use client";

import React, { useState, useRef } from "react";
import {
  Plus,
  Minus,
  Globe,
  Sparkles,
  ChevronsUpDown,
} from "lucide-react";

const WEBSITE_DISCLAIMER_SECTIONS = [
  {
    number: "01",
    title: "No Financial Advice",
    content: (
      <>
        <p>
          BlackDiamondEA is not a registered investment adviser, financial
          adviser, broker-dealer, commodity trading advisor (CTA), or portfolio
          manager.
        </p>
        <p>Nothing on this website should be interpreted as:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Financial advice</li>
          <li>Investment advice</li>
          <li>Trading advice</li>
          <li>Legal advice</li>
          <li>Tax advice</li>
          <li>Accounting advice</li>
        </ul>
        <p>
          Any trading or investment decision is made solely at your own
          discretion and risk.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "No Guarantee of Results",
    content: (
      <>
        <p>BlackDiamondEA does not guarantee:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Profits</li>
          <li>Winning trades</li>
          <li>Account growth</li>
          <li>Specific returns</li>
          <li>Consistent monthly income</li>
          <li>Financial success</li>
        </ul>
        <p>
          Every trader&apos;s results will differ depending on experience,
          market conditions, broker execution, risk management, and numerous
          other factors.
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "Educational Purpose Only",
    content: (
      <>
        <p>
          All information available on this website is provided solely for
          educational and informational purposes.
        </p>
        <p>
          Nothing contained on this website constitutes a recommendation to buy,
          sell, or hold any financial instrument.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Trading Risk",
    content: (
      <>
        <p>
          Trading Forex, CFDs, Futures, Stocks, Commodities, Cryptocurrencies,
          and other financial instruments involves substantial risk.
        </p>
        <p>You may lose all or part of your invested capital.</p>
        <p className="font-semibold text-zinc-900 dark:text-amber-300">
          Never trade with money that you cannot afford to lose.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Past Performance Disclaimer",
    content: (
      <>
        <p>
          Past performance, historical results, backtests, forward tests,
          screenshots, testimonials, or trading examples do not guarantee future
          performance.
        </p>
        <p>
          Future market conditions may produce significantly different results.
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "Hypothetical Performance",
    content: (
      <>
        <p>
          Any simulated, hypothetical, or backtested trading results displayed
          on this website have inherent limitations.
        </p>
        <p>
          Because these results are not based on actual live trading, they may
          not accurately reflect the impact of market conditions, liquidity,
          slippage, commissions, spreads, execution delays, or psychological
          factors.
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "Third-Party Services",
    content: (
      <>
        <p>
          BlackDiamondEA may reference or integrate third-party services,
          including:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Forex Brokers</li>
          <li>MetaTrader Platforms</li>
          <li>VPS Providers</li>
          <li>Payment Processors</li>
          <li>Analytics Services</li>
          <li>Cloud Hosting Providers</li>
        </ul>
        <p>
          We are not responsible for the products, services, policies,
          availability, security, or performance of any third-party provider.
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "Software Usage",
    content: (
      <>
        <p>
          Our Expert Advisors and software are tools designed to assist traders.
        </p>
        <p>Users remain fully responsible for:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Monitoring their trading accounts</li>
          <li>Managing risk</li>
          <li>Reviewing trade execution</li>
          <li>Maintaining internet connectivity</li>
          <li>Maintaining VPS availability</li>
          <li>Choosing compatible brokers</li>
        </ul>
        <p>
          Automated software should never be considered a substitute for
          responsible trading practices.
        </p>
      </>
    ),
  },
  {
    number: "09",
    title: "Website Availability",
    content: (
      <>
        <p>
          While we strive to keep our website available at all times, we do not
          guarantee uninterrupted access.
        </p>
        <p>The website may become temporarily unavailable due to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Scheduled maintenance</li>
          <li>Technical failures</li>
          <li>Server outages</li>
          <li>Internet disruptions</li>
          <li>Security incidents</li>
          <li>Third-party service interruptions</li>
        </ul>
      </>
    ),
  },
  {
    number: "10",
    title: "Accuracy of Information",
    content: (
      <>
        <p>
          We make reasonable efforts to ensure that the information published on
          our website is accurate and up to date.
        </p>
        <p>
          However, we do not warrant that all information is complete, accurate,
          reliable, or free from errors.
        </p>
        <p>Information may be updated or changed without prior notice.</p>
      </>
    ),
  },
  {
    number: "11",
    title: "External Links",
    content: (
      <>
        <p>
          Our website may contain links to external websites for your
          convenience.
        </p>
        <p>
          BlackDiamondEA does not control or endorse the content, services, or
          privacy practices of external websites and accepts no responsibility
          for them.
        </p>
      </>
    ),
  },
  {
    number: "12",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law, BlackDiamondEA
          shall not be liable for any direct, indirect, incidental,
          consequential, special, or punitive damages arising from:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Use of this website</li>
          <li>Use of our software</li>
          <li>Trading losses</li>
          <li>Lost profits</li>
          <li>Business interruption</li>
          <li>Data loss</li>
          <li>Technical failures</li>
          <li>Third-party services</li>
          <li>Delayed or failed trade execution</li>
        </ul>
        <p>
          Your use of this website and our products is entirely at your own
          risk.
        </p>
      </>
    ),
  },
  {
    number: "13",
    title: "Regulatory Compliance",
    content: (
      <>
        <p>
          Users are responsible for ensuring that their use of our website,
          software, and services complies with all applicable laws and
          regulations in their country or jurisdiction.
        </p>
        <p>
          BlackDiamondEA does not represent that its products are lawful or
          suitable in every jurisdiction.
        </p>
      </>
    ),
  },
  {
    number: "14",
    title: "Changes to This Disclaimer",
    content: (
      <>
        <p>
          We reserve the right to update or modify this Disclaimer at any time
          without prior notice.
        </p>
        <p>The latest version will always be published on our website.</p>
        <p>
          Continued use of the website after any update constitutes acceptance
          of the revised Disclaimer.
        </p>
      </>
    ),
  },
  {
    number: "15",
    title: "Contact Us",
    content: (
      <p>
        If you have any questions regarding this Website Disclaimer, please
        contact us using the official contact information available on the
        BlackDiamondEA website.
      </p>
    ),
  },
];

function DynamicPolicyCard({ item, isOpen, onToggle }) {
  const cardRef = useRef(null);
  const [cardMouse, setCardMouse] = useState({ x: 250, y: 40 });
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
      className={`group relative rounded-2xl p-[1px] transition-all duration-300 ${
        isOpen
          ? "bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 shadow-[0_0_30px_rgba(245,158,11,0.22)]"
          : "bg-gradient-to-b from-amber-500/40 via-amber-400/15 to-amber-500/40 dark:from-amber-500/35 dark:via-zinc-800/70 dark:to-amber-500/30 hover:from-amber-400 hover:to-yellow-500 hover:shadow-[0_0_25px_rgba(245,158,11,0.18)]"
      }`}
    >
      <div className="relative rounded-2xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl overflow-hidden transition-colors duration-300">
        {/* Interactive Card Hover Reflection Glow */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: cardHovered ? 1 : 0,
            background: `radial-gradient(380px circle at ${cardMouse.x}px ${cardMouse.y}px, rgba(245, 158, 11, 0.16), transparent 70%)`,
          }}
        />

        {/* Clickable Header Row */}
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="relative z-10 w-full px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer"
        >
          <div className="flex items-center gap-3.5">
            <span
              className={`px-2.5 py-1 rounded-lg font-mono text-xs font-black transition-all duration-300 ${
                isOpen
                  ? "bg-amber-400 text-black shadow-[0_0_12px_rgba(251,191,36,0.5)]"
                  : "bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/35 group-hover:bg-amber-400 group-hover:text-black"
              }`}
            >
              {item.number}
            </span>
            <h3 className="text-base sm:text-lg font-extrabold text-zinc-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-300 transition-colors">
              {item.title}
            </h3>
          </div>

          {/* Plus / Minus Dynamic Icon Button */}
          <span
            className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
              isOpen
                ? "bg-amber-400 text-black border-amber-300 rotate-180 shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                : "bg-amber-50 dark:bg-zinc-900/90 text-amber-700 dark:text-amber-300 border-amber-500/40 group-hover:bg-amber-400 group-hover:text-black group-hover:scale-110"
            }`}
          >
            {isOpen ? (
              <Minus className="w-4 h-4 stroke-[2.5]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[2.5]" />
            )}
          </span>
        </button>

        {/* Expandable Body Content */}
        {isOpen && (
          <div className="relative z-10 px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-amber-500/20 text-sm sm:text-[15px] text-zinc-700 dark:text-zinc-300 space-y-3 leading-relaxed">
            {item.content}
          </div>
        )}
      </div>
    </div>
  );
}

export default function WebsiteDisclaimer() {
  const [openIndices, setOpenIndices] = useState([0]);
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

  const toggleSection = (index) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const allExpanded = openIndices.length === WEBSITE_DISCLAIMER_SECTIONS.length;

  const toggleAll = () => {
    if (allExpanded) {
      setOpenIndices([]);
    } else {
      setOpenIndices(WEBSITE_DISCLAIMER_SECTIONS.map((_, i) => i));
    }
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

      {/* Interactive Background Cursor Spotlight Reflection */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0.35,
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.16), transparent 70%)`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4 max-w-4xl space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40 shadow-[0_0_18px_rgba(245,158,11,0.18)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
              Official Notice &amp; Information Policy
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Website{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              Disclaimer
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Effective Date:{" "}
              <strong className="text-zinc-900 dark:text-amber-300">
                August 4, 2026
              </strong>
            </span>
            <span>•</span>
            <span>
              Last Updated:{" "}
              <strong className="text-zinc-900 dark:text-amber-300">
                August 4, 2026
              </strong>
            </span>
          </div>
        </div>

        {/* Intro Summary Card */}
        <div className="rounded-2xl p-[1px] bg-gradient-to-r from-amber-500/40 via-amber-300/50 to-amber-500/40 dark:from-amber-500/35 dark:via-zinc-700/60 dark:to-amber-500/35 shadow-md">
          <div className="rounded-2xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-xl p-5 sm:p-6 space-y-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <p>
              The information, software, Expert Advisors (EAs), indicators,
              educational materials, documentation, videos, and all other
              content provided on{" "}
              <strong className="text-zinc-900 dark:text-amber-300">
                BlackDiamondEA
              </strong>{" "}
              (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;) are offered for general informational and
              educational purposes only.
            </p>
            <p>
              By accessing or using this website, you acknowledge and agree to
              the terms of this Disclaimer.
            </p>
          </div>
        </div>

        {/* Expand / Collapse All Bar */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Disclaimer Sections ({WEBSITE_DISCLAIMER_SECTIONS.length})
          </span>
          <button
            type="button"
            onClick={toggleAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/80 hover:bg-amber-400 text-amber-900 hover:text-black dark:bg-amber-500/15 dark:hover:bg-amber-400 dark:text-amber-300 dark:hover:text-black border border-amber-500/40 text-xs font-bold transition-all cursor-pointer"
          >
            <ChevronsUpDown className="w-3.5 h-3.5" />
            <span>{allExpanded ? "Collapse All" : "Expand All"}</span>
          </button>
        </div>

        {/* Dynamic Plus/Minus Cards List */}
        <div className="space-y-3">
          {WEBSITE_DISCLAIMER_SECTIONS.map((item, idx) => (
            <DynamicPolicyCard
              key={item.number}
              item={item}
              isOpen={openIndices.includes(idx)}
              onToggle={() => toggleSection(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}