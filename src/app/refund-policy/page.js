"use client";

import React, { useState, useRef } from "react";
import {
  Plus,
  Minus,
  ShieldCheck,
  Sparkles,
  ChevronsUpDown,
} from "lucide-react";

const REFUND_SECTIONS = [
  {
    number: "01",
    title: "Digital Products",
    content: (
      <>
        <p>
          All products sold by BlackDiamondEA, including Expert Advisors (EAs),
          indicators, software, licenses, digital downloads, updates, and
          related services, are classified as digital products.
        </p>
        <p>
          Because digital products are delivered electronically and cannot be
          returned,{" "}
          <strong className="text-zinc-900 dark:text-amber-300">
            all sales are considered final
          </strong>{" "}
          unless otherwise stated in this policy.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "No Refund After Delivery",
    content: (
      <>
        <p>
          Once a license key, download link, software file, or digital product
          has been delivered, refunds will generally not be issued.
        </p>
        <p>
          This policy exists because digital products cannot be
          &quot;returned&quot; after delivery.
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "Refund Eligibility",
    content: (
      <>
        <p>
          A refund may only be considered under one of the following
          circumstances:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Duplicate payment for the same order.</li>
          <li>Accidental multiple charges.</li>
          <li>
            Failure to deliver the purchased product due to a verified technical
            issue on our side.
          </li>
          <li>
            A refund is required by applicable consumer protection laws.
          </li>
        </ul>
        <p>Any approved refund will be processed at our sole discretion.</p>
      </>
    ),
  },
  {
    number: "04",
    title: "Non-Refundable Situations",
    content: (
      <>
        <p>
          Refunds will not be provided for reasons including, but not limited
          to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>You changed your mind after purchase.</li>
          <li>You no longer wish to trade.</li>
          <li>You expected guaranteed profits.</li>
          <li>You experienced trading losses.</li>
          <li>Market conditions changed.</li>
          <li>Your broker is incompatible.</li>
          <li>Incorrect VPS configuration.</li>
          <li>Internet connection issues.</li>
          <li>Computer hardware or software problems.</li>
          <li>Failure to follow installation instructions.</li>
          <li>Lack of trading knowledge.</li>
          <li>Personal financial circumstances.</li>
        </ul>
      </>
    ),
  },
  {
    number: "05",
    title: "Trading Risk",
    content: (
      <>
        <p>
          Forex, CFDs, Futures, Commodities, Stocks, Cryptocurrencies, and
          other financial markets involve substantial risk.
        </p>
        <p>Trading losses are not grounds for a refund.</p>
        <p>
          BlackDiamondEA does not guarantee profits or specific trading
          performance.
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "Subscription Services",
    content: (
      <>
        <p>
          If any product is offered as a subscription, cancellation will stop
          future billing where applicable.
        </p>
        <p>
          Amounts already paid for the current subscription period are generally
          non-refundable unless required by law.
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "Chargebacks",
    content: (
      <>
        <p>
          Customers agree to contact BlackDiamondEA before initiating a payment
          dispute or chargeback.
        </p>
        <p>Fraudulent or abusive chargebacks may result in:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Permanent account suspension</li>
          <li>License termination</li>
          <li>Restriction from future purchases</li>
          <li>Legal action where permitted by law</li>
        </ul>
      </>
    ),
  },
  {
    number: "08",
    title: "Refund Processing",
    content: (
      <>
        <p>If a refund is approved:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Refunds will be issued using the original payment method whenever
            possible.
          </li>
          <li>
            Processing time may vary depending on the payment provider.
          </li>
          <li>
            Banking or payment processor delays are outside our control.
          </li>
        </ul>
      </>
    ),
  },
  {
    number: "09",
    title: "License Cancellation",
    content: (
      <>
        <p>
          If a refund is approved, BlackDiamondEA reserves the right to
          immediately:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Revoke software licenses</li>
          <li>Disable product activation</li>
          <li>Suspend customer accounts</li>
          <li>Terminate access to updates and support</li>
        </ul>
      </>
    ),
  },
  {
    number: "10",
    title: "Contact Us",
    content: (
      <>
        <p>
          If you believe your purchase qualifies for a refund under this policy,
          please contact our support team using the official contact information
          available on the BlackDiamondEA website.
        </p>
        <p>Please include:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Full Name</li>
          <li>Order Number</li>
          <li>Purchase Date</li>
          <li>Email Address</li>
          <li>Detailed explanation of your request</li>
        </ul>
        <p>
          Providing complete information helps us review your request more
          efficiently.
        </p>
      </>
    ),
  },
  {
    number: "11",
    title: "Changes to This Refund Policy",
    content: (
      <>
        <p>
          BlackDiamondEA reserves the right to modify this Refund Policy at any
          time.
        </p>
        <p>
          Updated versions become effective immediately upon publication on our
          website.
        </p>
        <p>
          Continued use of our products and services constitutes acceptance of
          the revised Refund Policy.
        </p>
      </>
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

export default function RefundPolicy() {
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

  const allExpanded = openIndices.length === REFUND_SECTIONS.length;

  const toggleAll = () => {
    if (allExpanded) {
      setOpenIndices([]);
    } else {
      setOpenIndices(REFUND_SECTIONS.map((_, i) => i));
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
              Billing &amp; Digital License Terms
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Refund{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
              Thank you for choosing{" "}
              <strong className="text-zinc-900 dark:text-amber-300">
                BlackDiamondEA
              </strong>
              .
            </p>
            <p>
              This Refund Policy explains the conditions under which refunds may
              or may not be granted for purchases made through our website.
            </p>
            <p>
              By purchasing any product or service from BlackDiamondEA, you
              acknowledge that you have read, understood, and agreed to this
              Refund Policy.
            </p>
          </div>
        </div>

        {/* Expand / Collapse All Bar */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Policy Sections ({REFUND_SECTIONS.length})
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
          {REFUND_SECTIONS.map((item, idx) => (
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