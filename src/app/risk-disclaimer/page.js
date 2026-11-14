"use client";

import React, { useState, useRef } from "react";
import {
  Plus,
  Minus,
  ShieldAlert,
  Sparkles,
  ChevronsUpDown,
} from "lucide-react";

const RISK_SECTIONS = [
  {
    number: "01",
    title: "High-Risk Investment Warning",
    content: (
      <>
        <p>
          Trading in Forex, CFDs, Futures, Commodities, Stocks,
          Cryptocurrencies, and other leveraged financial instruments involves
          substantial risk.
        </p>
        <p>
          Trading is highly speculative and may not be suitable for every
          investor.
        </p>
        <p>You may lose part or all of your invested capital.</p>
        <p className="font-semibold text-zinc-900 dark:text-amber-300">
          Only trade with funds that you can afford to lose.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "No Guarantee of Profit",
    content: (
      <>
        <p>BlackDiamondEA does not guarantee:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Profitable trading results</li>
          <li>Consistent returns</li>
          <li>Financial success</li>
          <li>Winning trades</li>
          <li>Future account growth</li>
        </ul>
        <p>
          Any examples, screenshots, statistics, backtests, forward tests, or
          demonstrations are provided for informational purposes only.
        </p>
        <p>Individual trading results will vary.</p>
      </>
    ),
  },
  {
    number: "03",
    title: "Past Performance",
    content: (
      <>
        <p>
          Past performance is not a reliable indicator of future performance.
        </p>
        <p>
          Historical results, simulations, and previous trading records should
          never be interpreted as guarantees of future profitability.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Hypothetical Performance",
    content: (
      <>
        <p>
          Any hypothetical, simulated, or backtested trading results have
          inherent limitations.
        </p>
        <p>
          Because such results do not represent actual trading, they may
          overestimate or underestimate market conditions, liquidity, slippage,
          spreads, execution quality, or other trading factors.
        </p>
        <p>Actual results may differ significantly.</p>
      </>
    ),
  },
  {
    number: "05",
    title: "Automated Trading Risk",
    content: (
      <>
        <p>
          BlackDiamondEA software is designed to automate certain trading
          activities.
        </p>
        <p>
          However, automated trading carries additional risks, including but not
          limited to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Internet failures</li>
          <li>VPS interruptions</li>
          <li>Broker execution delays</li>
          <li>Slippage</li>
          <li>Spread widening</li>
          <li>Server outages</li>
          <li>Platform crashes</li>
          <li>Price gaps</li>
          <li>Connection failures</li>
          <li>Market volatility</li>
        </ul>
        <p>Users should continuously monitor their trading accounts.</p>
      </>
    ),
  },
  {
    number: "06",
    title: "Broker Responsibility",
    content: (
      <>
        <p>Execution quality depends on your selected broker.</p>
        <p>BlackDiamondEA is not responsible for:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Broker pricing</li>
          <li>Order execution</li>
          <li>Requotes</li>
          <li>Slippage</li>
          <li>Delayed execution</li>
          <li>Stop-out events</li>
          <li>Broker restrictions</li>
          <li>Liquidity issues</li>
        </ul>
      </>
    ),
  },
  {
    number: "07",
    title: "User Responsibility",
    content: (
      <>
        <p>You are solely responsible for:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Your trading decisions</li>
          <li>Risk management</li>
          <li>Position sizing</li>
          <li>Broker selection</li>
          <li>VPS maintenance</li>
          <li>Internet connectivity</li>
          <li>Monitoring open positions</li>
          <li>Compliance with local laws and regulations</li>
        </ul>
      </>
    ),
  },
  {
    number: "08",
    title: "Educational Purpose",
    content: (
      <>
        <p>
          The software, documentation, tutorials, videos, and educational
          materials provided by BlackDiamondEA are intended for educational and
          informational purposes only.
        </p>
        <p>
          Nothing provided by BlackDiamondEA should be interpreted as financial,
          investment, legal, or tax advice.
        </p>
      </>
    ),
  },
  {
    number: "09",
    title: "Third-Party Services",
    content: (
      <>
        <p>
          BlackDiamondEA may work with or integrate third-party services such as:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>MetaTrader</li>
          <li>VPS providers</li>
          <li>Forex brokers</li>
          <li>Payment processors</li>
          <li>Analytics platforms</li>
        </ul>
        <p>
          We are not responsible for the services, availability, policies, or
          actions of any third party.
        </p>
      </>
    ),
  },
  {
    number: "10",
    title: "Regulatory Compliance",
    content: (
      <>
        <p>
          Users are responsible for ensuring that the use of our software
          complies with the laws and regulations applicable in their country or
          jurisdiction.
        </p>
        <p>
          BlackDiamondEA makes no representation that its products are legal or
          appropriate for use in every country.
        </p>
      </>
    ),
  },
  {
    number: "11",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by applicable law, BlackDiamondEA
          shall not be liable for any direct, indirect, incidental, special,
          consequential, or punitive damages arising from:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Trading losses</li>
          <li>Loss of profits</li>
          <li>Missed trading opportunities</li>
          <li>Data loss</li>
          <li>Software interruptions</li>
          <li>Broker failures</li>
          <li>VPS failures</li>
          <li>Internet outages</li>
          <li>Hardware failures</li>
          <li>Financial losses of any kind</li>
        </ul>
        <p>Your use of our products is entirely at your own risk.</p>
      </>
    ),
  },
  {
    number: "12",
    title: "Acceptance of Risk",
    content: (
      <>
        <p>
          By purchasing, downloading, installing, or using any BlackDiamondEA
          product or service, you expressly acknowledge that:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>You understand the risks of financial market trading.</li>
          <li>
            You accept full responsibility for your trading activities.
          </li>
          <li>
            You release BlackDiamondEA from liability for trading outcomes or
            financial losses resulting from the use of its products and
            services.
          </li>
        </ul>
      </>
    ),
  },
  {
    number: "13",
    title: "Changes to This Disclaimer",
    content: (
      <>
        <p>
          BlackDiamondEA reserves the right to modify or update this Risk
          Disclaimer at any time without prior notice.
        </p>
        <p>The latest version will always be available on our website.</p>
        <p>
          Your continued use of our products and services constitutes acceptance
          of any revised version.
        </p>
      </>
    ),
  },
  {
    number: "14",
    title: "Contact Us",
    content: (
      <p>
        If you have any questions regarding this Risk Disclaimer, please contact
        us using the official contact information published on the
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

export default function RiskDisclaimer() {
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

  const allExpanded = openIndices.length === RISK_SECTIONS.length;

  const toggleAll = () => {
    if (allExpanded) {
      setOpenIndices([]);
    } else {
      setOpenIndices(RISK_SECTIONS.map((_, i) => i));
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
              Financial Market Risk Disclosure
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Risk{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              Disclaimer
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400" />
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
              Please read this Risk Disclaimer carefully before purchasing,
              downloading, installing, or using any products or services
              provided by{" "}
              <strong className="text-zinc-900 dark:text-amber-300">
                BlackDiamondEA
              </strong>{" "}
              (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;).
            </p>
            <p>
              By accessing our website or using our software, you acknowledge
              that you have read, understood, and accepted all risks described in
              this disclaimer.
            </p>
          </div>
        </div>

        {/* Expand / Collapse All Bar */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Disclaimer Sections ({RISK_SECTIONS.length})
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
          {RISK_SECTIONS.map((item, idx) => (
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