"use client";

import React, { useState, useRef } from "react";
import {
  Plus,
  Minus,
  ShieldCheck,
  Sparkles,
  ChevronsUpDown,
} from "lucide-react";

const AML_SECTIONS = [
  {
    number: "01",
    title: "Purpose",
    content: (
      <>
        <p>The purpose of this Policy is to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Prevent money laundering and terrorist financing.</li>
          <li>Protect BlackDiamondEA from fraudulent activity.</li>
          <li>Verify the identity of customers when necessary.</li>
          <li>
            Comply with applicable laws and regulations where required.
          </li>
          <li>Maintain a secure business environment.</li>
        </ul>
      </>
    ),
  },
  {
    number: "02",
    title: "Scope",
    content: (
      <>
        <p>
          This Policy applies to all customers who purchase, subscribe to, or
          otherwise use BlackDiamondEA products and services.
        </p>
        <p>
          It also applies to all payment methods accepted through our website.
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "Customer Identification (KYC)",
    content: (
      <>
        <p>
          To protect our business and customers, we may request identity
          verification before or after processing an order.
        </p>
        <p>Verification may include one or more of the following:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Full legal name</li>
          <li>Residential address</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>
            Government-issued photo identification (Passport, National ID Card,
            or Driver&apos;s License)
          </li>
          <li>
            Proof of address (such as a recent utility bill or bank statement)
          </li>
          <li>Payment verification where appropriate</li>
        </ul>
        <p>
          Verification requirements may vary depending on the nature of the
          transaction and applicable legal obligations.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Identity Verification",
    content: (
      <>
        <p>
          BlackDiamondEA reserves the right to verify customer identity whenever
          we reasonably believe verification is necessary.
        </p>
        <p>Verification may be requested if:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Suspicious activity is detected.</li>
          <li>Multiple payment attempts occur.</li>
          <li>High-value purchases are made.</li>
          <li>Fraud prevention checks require additional information.</li>
          <li>A payment processor requests verification.</li>
          <li>
            Applicable laws or regulations require identity confirmation.
          </li>
        </ul>
        <p>
          Failure to complete verification may result in delayed or cancelled
          orders.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Prohibited Activities",
    content: (
      <>
        <p>
          Customers must not use BlackDiamondEA products or services for any
          unlawful purpose, including but not limited to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Money laundering</li>
          <li>Terrorist financing</li>
          <li>Fraud</li>
          <li>Identity theft</li>
          <li>Payment fraud</li>
          <li>Chargeback abuse</li>
          <li>Use of stolen payment methods</li>
          <li>Sanctions evasion</li>
          <li>Any activity prohibited under applicable law</li>
        </ul>
      </>
    ),
  },
  {
    number: "06",
    title: "Payment Monitoring",
    content: (
      <>
        <p>
          We reserve the right to review transactions for unusual or suspicious
          activity.
        </p>
        <p>Examples include:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Multiple failed payment attempts</li>
          <li>Repeated purchases using different payment methods</li>
          <li>Transactions with inconsistent customer information</li>
          <li>Unusual purchasing patterns</li>
          <li>Payments flagged by our payment providers</li>
        </ul>
        <p>
          Where appropriate, we may request additional verification before
          completing an order.
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "Refusal or Cancellation of Orders",
    content: (
      <>
        <p>
          BlackDiamondEA reserves the right to refuse, suspend, or cancel any
          order if we reasonably suspect:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Fraudulent activity</li>
          <li>False identity information</li>
          <li>Unauthorized payment methods</li>
          <li>Violation of this Policy</li>
          <li>Violation of applicable laws or regulations</li>
        </ul>
        <p>
          We are not obligated to disclose the specific reasons for
          security-related decisions where doing so could compromise fraud
          prevention measures.
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "Record Retention",
    content: (
      <>
        <p>
          Where required by law or for legitimate business purposes, we may
          retain customer identification and transaction records for an
          appropriate period.
        </p>
        <p>
          Records are stored securely and accessed only by authorized personnel.
        </p>
      </>
    ),
  },
  {
    number: "09",
    title: "Data Protection",
    content: (
      <>
        <p>
          Any personal information collected for AML or KYC purposes will be
          processed in accordance with our Privacy Policy.
        </p>
        <p>
          We implement reasonable administrative, technical, and organizational
          safeguards to protect customer information.
        </p>
      </>
    ),
  },
  {
    number: "10",
    title: "Reporting Suspicious Activity",
    content: (
      <>
        <p>
          Where required by applicable law, BlackDiamondEA may report suspicious
          transactions or activities to competent governmental or regulatory
          authorities.
        </p>
        <p>
          We may also cooperate with law enforcement agencies and payment service
          providers during investigations.
        </p>
      </>
    ),
  },
  {
    number: "11",
    title: "International Compliance",
    content: (
      <>
        <p>
          Customers are responsible for ensuring that their purchase and use of
          our products comply with the laws and regulations of their country or
          jurisdiction.
        </p>
        <p>
          BlackDiamondEA reserves the right to restrict or refuse service in
          jurisdictions where providing our products would violate applicable
          laws or sanctions.
        </p>
      </>
    ),
  },
  {
    number: "12",
    title: "Policy Updates",
    content: (
      <>
        <p>
          We reserve the right to amend or update this AML &amp; KYC Policy at
          any time.
        </p>
        <p>
          Any changes become effective immediately upon publication on our
          website.
        </p>
        <p>
          Your continued use of our products and services constitutes acceptance
          of the updated Policy.
        </p>
      </>
    ),
  },
  {
    number: "13",
    title: "Contact Us",
    content: (
      <p>
        If you have any questions regarding this AML &amp; KYC Policy, please
        contact us using the official contact information provided on the
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
          <div className="relative z-10 px-5 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-amber-500/20 text-sm sm:text-[15px] text-zinc-700 dark:text-zinc-300 space-y-3 leading-relaxed animate-in fade-in duration-200">
            {item.content}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AntiMoneyLaunderingPolicy() {
  // Open first section by default; track open indices in an array so multiple can be opened
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

  const allExpanded = openIndices.length === AML_SECTIONS.length;

  const toggleAll = () => {
    if (allExpanded) {
      setOpenIndices([]);
    } else {
      setOpenIndices(AML_SECTIONS.map((_, i) => i));
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-screen overflow-hidden bg-[#FAF7F0] text-zinc-900 dark:bg-[#050507] dark:text-white pt-28 lg:pt-36 pb-14 transition-colors duration-300"
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
              Regulatory Compliance &amp; Security
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Anti-Money Laundering (AML) &amp;{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              Know Your Customer (KYC) Policy
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Effective Date: <strong className="text-zinc-900 dark:text-amber-300">August 4, 2026</strong>
            </span>
            <span>•</span>
            <span>
              Last Updated: <strong className="text-zinc-900 dark:text-amber-300">August 4, 2026</strong>
            </span>
          </div>
        </div>

        {/* Intro Summary Card */}
        <div className="rounded-2xl p-[1px] bg-gradient-to-r from-amber-500/40 via-amber-300/50 to-amber-500/40 dark:from-amber-500/35 dark:via-zinc-700/60 dark:to-amber-500/35 shadow-md">
          <div className="rounded-2xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-xl p-5 sm:p-6 space-y-3 text-sm sm:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
            <p>
              <strong className="text-zinc-900 dark:text-amber-300">
                BlackDiamondEA
              </strong>{" "}
              (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;) is committed to maintaining the highest standards
              of integrity, transparency, and regulatory compliance. This
              Anti-Money Laundering (AML) and Know Your Customer (KYC) Policy
              outlines the measures we take to help prevent our website,
              products, and services from being used for money laundering,
              terrorist financing, fraud, or other unlawful activities.
            </p>
            <p>
              By purchasing or using our products and services, you agree to
              comply with this Policy.
            </p>
          </div>
        </div>

        {/* Expand / Collapse All Bar */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Policy Sections ({AML_SECTIONS.length})
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
          {AML_SECTIONS.map((item, idx) => (
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