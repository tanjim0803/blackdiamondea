"use client";

import React, { useState, useRef } from "react";
import {
  Plus,
  Minus,
  ShieldCheck,
  Sparkles,
  ChevronsUpDown,
} from "lucide-react";

const PRIVACY_SECTIONS = [
  {
    number: "01",
    title: "Information We Collect",
    content: (
      <div className="space-y-4">
        <p>We may collect the following types of information:</p>

        <div className="rounded-xl p-4 bg-amber-50/60 dark:bg-[#12121A] border border-amber-500/20 space-y-2">
          <h4 className="text-base font-extrabold text-zinc-900 dark:text-amber-300">
            Personal Information
          </h4>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Full Name</li>
            <li>Email Address</li>
            <li>Phone Number (if provided)</li>
            <li>Billing Address</li>
            <li>Country</li>
            <li>
              Payment Information (processed securely by third-party payment
              providers)
            </li>
          </ul>
        </div>

        <div className="rounded-xl p-4 bg-amber-50/60 dark:bg-[#12121A] border border-amber-500/20 space-y-2">
          <h4 className="text-base font-extrabold text-zinc-900 dark:text-amber-300">
            Technical Information
          </h4>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>IP Address</li>
            <li>Browser Type</li>
            <li>Device Information</li>
            <li>Operating System</li>
            <li>Language Preferences</li>
            <li>Time Zone</li>
            <li>Website Usage Data</li>
          </ul>
        </div>

        <div className="rounded-xl p-4 bg-amber-50/60 dark:bg-[#12121A] border border-amber-500/20 space-y-2">
          <h4 className="text-base font-extrabold text-zinc-900 dark:text-amber-300">
            Technical &amp; Support Information
          </h4>
          <p>If required for technical support, we may collect:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>MT4/MT5 Account Number</li>
            <li>Broker Name</li>
            <li>VPS Information</li>
            <li>Trading Logs</li>
            <li>Error Reports</li>
          </ul>
          <p className="pt-1 font-medium text-zinc-800 dark:text-amber-200/90">
            We never request your trading account password or investor password
            unless absolutely necessary for support purposes.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use your information to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Process orders</li>
          <li>Deliver digital products</li>
          <li>Verify payments</li>
          <li>Provide customer support</li>
          <li>Improve our website</li>
          <li>Improve software performance</li>
          <li>Respond to inquiries</li>
          <li>Detect fraud and abuse</li>
          <li>Comply with legal obligations</li>
        </ul>
      </>
    ),
  },
  {
    number: "03",
    title: "Cookies",
    content: (
      <>
        <p>
          Our website may use cookies and similar technologies to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Improve user experience</li>
          <li>Remember user preferences</li>
          <li>Analyze website traffic</li>
          <li>Improve website performance</li>
          <li>Measure marketing effectiveness</li>
        </ul>
        <p>
          You may disable cookies through your browser settings; however,
          certain features of the website may not function properly.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Payment Information",
    content: (
      <>
        <p>
          Payments are processed by secure third-party payment providers.
        </p>
        <p>We do not store your:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Credit Card Number</li>
          <li>Debit Card Number</li>
          <li>CVV</li>
          <li>Banking Passwords</li>
        </ul>
        <p>
          Payment information is handled according to the security standards of
          the payment processor.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "Data Sharing",
    content: (
      <>
        <p>
          We do not sell, rent, or trade your personal information.
        </p>
        <p>
          Your information may only be shared with trusted third parties when
          necessary, including:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Payment processors</li>
          <li>Hosting providers</li>
          <li>Email service providers</li>
          <li>Technical support providers</li>
          <li>Legal authorities when required by law</li>
        </ul>
      </>
    ),
  },
  {
    number: "06",
    title: "Data Security",
    content: (
      <>
        <p>
          We implement appropriate technical and organizational measures to
          protect your information against:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Unauthorized access</li>
          <li>Data loss</li>
          <li>Alteration</li>
          <li>Misuse</li>
          <li>Disclosure</li>
        </ul>
        <p>
          However, no method of internet transmission or electronic storage is
          100% secure.
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "Data Retention",
    content: (
      <>
        <p>
          We retain personal information only for as long as necessary to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide our services</li>
          <li>Maintain customer accounts</li>
          <li>Comply with legal obligations</li>
          <li>Resolve disputes</li>
          <li>Enforce agreements</li>
        </ul>
        <p>After this period, information may be securely deleted.</p>
      </>
    ),
  },
  {
    number: "08",
    title: "Your Rights",
    content: (
      <>
        <p>Depending on your location, you may have the right to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Access your personal information</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your data</li>
          <li>Restrict processing</li>
          <li>Object to certain processing activities</li>
          <li>Request a copy of your personal data</li>
        </ul>
        <p>After this period, information may be securely deleted.</p>
      </>
    ),
  },
  {
    number: "09",
    title: "Third-Party Services",
    content: (
      <>
        <p>
          Our website may contain links or integrations with third-party
          services, including:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>MetaTrader</li>
          <li>Trading Brokers</li>
          <li>Payment Providers</li>
          <li>Google Analytics</li>
          <li>Cloudflare</li>
        </ul>
        <p>
          We are not responsible for the privacy practices of third-party
          websites or services.
        </p>
      </>
    ),
  },
  {
    number: "10",
    title: "Children's Privacy",
    content: (
      <>
        <p>
          Our services are intended only for individuals who are at least 18
          years old.
        </p>
        <p>
          We do not knowingly collect personal information from children.
        </p>
        <p>
          If we become aware that a child has submitted personal information, we
          will promptly delete it.
        </p>
      </>
    ),
  },
  {
    number: "11",
    title: "International Data Transfers",
    content: (
      <>
        <p>
          Your information may be processed or stored in countries outside your
          country of residence.
        </p>
        <p>
          By using our services, you consent to such transfers where permitted
          by applicable law.
        </p>
      </>
    ),
  },
  {
    number: "12",
    title: "Changes to This Privacy Policy",
    content: (
      <>
        <p>We may update this Privacy Policy from time to time.</p>
        <p>
          Any changes will become effective immediately after publication on
          this website.
        </p>
        <p>
          Continued use of our services after updates constitutes acceptance of
          the revised Privacy Policy.
        </p>
      </>
    ),
  },
  {
    number: "13",
    title: "Contact Us",
    content: (
      <p>
        If you have any questions regarding this Privacy Policy or how we
        process your personal information, please contact us using the official
        contact details provided on the BlackDiamondEA website.
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

export default function PrivacyPolicy() {
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

  const allExpanded = openIndices.length === PRIVACY_SECTIONS.length;

  const toggleAll = () => {
    if (allExpanded) {
      setOpenIndices([]);
    } else {
      setOpenIndices(PRIVACY_SECTIONS.map((_, i) => i));
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
              Data Protection &amp; Client Confidentiality
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Privacy{" "}
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
              At{" "}
              <strong className="text-zinc-900 dark:text-amber-300">
                BlackDiamondEA
              </strong>{" "}
              (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;), we respect your privacy and are committed to
              protecting your personal information.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, store, and
              protect your information when you visit our website, purchase our
              products, or use our services.
            </p>
            <p>
              By accessing or using our website, you agree to the collection and
              use of information in accordance with this Privacy Policy.
            </p>
          </div>
        </div>

        {/* Expand / Collapse All Bar */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Policy Sections ({PRIVACY_SECTIONS.length})
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
          {PRIVACY_SECTIONS.map((item, idx) => (
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