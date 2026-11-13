"use client";

import React, { useState, useRef } from "react";
import {
  Plus,
  Minus,
  ShieldCheck,
  Sparkles,
  ChevronsUpDown,
} from "lucide-react";

const COOKIE_SECTIONS = [
  {
    number: "01",
    title: "What Are Cookies?",
    content: (
      <>
        <p>
          Cookies are small text files that are stored on your computer,
          smartphone, tablet, or other device when you visit a website.
        </p>
        <p>
          Cookies help websites remember your preferences, improve performance,
          enhance security, and provide a better browsing experience.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "Types of Cookies We Use",
    content: (
      <div className="space-y-4">
        <div className="rounded-xl p-4 bg-amber-50/60 dark:bg-[#12121A] border border-amber-500/20 space-y-2">
          <h4 className="text-base font-extrabold text-zinc-900 dark:text-amber-300">
            Essential Cookies
          </h4>
          <p>
            These cookies are necessary for the operation of our website and
            cannot be disabled. They enable features such as:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Secure login</li>
            <li>Shopping cart functionality</li>
            <li>License verification</li>
            <li>Website security</li>
            <li>Page navigation</li>
          </ul>
          <p>
            Without these cookies, certain services may not function properly.
          </p>
        </div>

        <div className="rounded-xl p-4 bg-amber-50/60 dark:bg-[#12121A] border border-amber-500/20 space-y-2">
          <h4 className="text-base font-extrabold text-zinc-900 dark:text-amber-300">
            Performance and Analytics Cookies
          </h4>
          <p>
            These cookies help us understand how visitors interact with our
            website. They collect anonymous information such as:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Pages visited</li>
            <li>Time spent on pages</li>
            <li>Navigation paths</li>
            <li>Website performance</li>
            <li>Error reports</li>
          </ul>
          <p>This information helps us improve our website and services.</p>
        </div>

        <div className="rounded-xl p-4 bg-amber-50/60 dark:bg-[#12121A] border border-amber-500/20 space-y-2">
          <h4 className="text-base font-extrabold text-zinc-900 dark:text-amber-300">
            Functional Cookies
          </h4>
          <p>
            These cookies remember your preferences and settings, including:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Language selection</li>
            <li>Region</li>
            <li>Browser preferences</li>
            <li>Previously entered information</li>
          </ul>
          <p>These cookies improve your overall user experience.</p>
        </div>

        <div className="rounded-xl p-4 bg-amber-50/60 dark:bg-[#12121A] border border-amber-500/20 space-y-2">
          <h4 className="text-base font-extrabold text-zinc-900 dark:text-amber-300">
            Marketing Cookies
          </h4>
          <p>Marketing cookies may be used to:</p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Measure advertising performance</li>
            <li>Display relevant advertisements</li>
            <li>Track campaign effectiveness</li>
            <li>Limit repetitive advertisements</li>
          </ul>
          <p>
            These cookies may be placed by us or trusted third-party advertising
            partners.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Third-Party Cookies",
    content: (
      <>
        <p>
          Our website may use third-party services that place cookies on your
          device, including but not limited to:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Google Analytics</li>
          <li>Google Tag Manager</li>
          <li>Cloudflare</li>
          <li>Payment Processors</li>
          <li>Live Chat Providers</li>
          <li>Email Marketing Services</li>
        </ul>
        <p>
          Each third-party provider maintains its own privacy and cookie
          practices.
        </p>
      </>
    ),
  },
  {
    number: "04",
    title: "Why We Use Cookies",
    content: (
      <>
        <p>We use cookies to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Improve website functionality</li>
          <li>Maintain website security</li>
          <li>Authenticate users</li>
          <li>Process purchases</li>
          <li>Analyze website traffic</li>
          <li>Remember user preferences</li>
          <li>Improve software and services</li>
          <li>Detect fraudulent activity</li>
          <li>Enhance customer experience</li>
        </ul>
      </>
    ),
  },
  {
    number: "05",
    title: "Managing Cookies",
    content: (
      <>
        <p>Most web browsers allow you to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>View stored cookies</li>
          <li>Delete cookies</li>
          <li>Block cookies</li>
          <li>Receive notifications before cookies are stored</li>
        </ul>
        <p>
          Please note that disabling cookies may affect the functionality and
          performance of certain features on our website.
        </p>
      </>
    ),
  },
  {
    number: "06",
    title: "Cookie Retention",
    content: (
      <>
        <p>
          Some cookies are deleted automatically when you close your browser
          (Session Cookies).
        </p>
        <p>
          Others remain on your device for a defined period or until manually
          deleted (Persistent Cookies).
        </p>
        <p>The retention period depends on the purpose of each cookie.</p>
      </>
    ),
  },
  {
    number: "07",
    title: "Do Not Track",
    content: (
      <>
        <p>Some browsers offer a &quot;Do Not Track&quot; (DNT) feature.</p>
        <p>
          Currently, there is no universally accepted standard for responding to
          DNT signals, and our website may not respond differently when such
          signals are received.
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "Updates to This Cookie Policy",
    content: (
      <>
        <p>
          BlackDiamondEA may update this Cookie Policy from time to time.
        </p>
        <p>
          Any changes become effective immediately upon publication on our
          website.
        </p>
        <p>We encourage users to review this policy periodically.</p>
      </>
    ),
  },
  {
    number: "09",
    title: "Contact Us",
    content: (
      <p>
        If you have any questions regarding this Cookie Policy or our use of
        cookies, please contact us using the official contact information
        available on the BlackDiamondEA website.
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

export default function CookiePolicy() {
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

  const allExpanded = openIndices.length === COOKIE_SECTIONS.length;

  const toggleAll = () => {
    if (allExpanded) {
      setOpenIndices([]);
    } else {
      setOpenIndices(COOKIE_SECTIONS.map((_, i) => i));
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
              Transparency &amp; Browser Preferences
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Cookie{" "}
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
              This Cookie Policy explains how{" "}
              <strong className="text-zinc-900 dark:text-amber-300">
                BlackDiamondEA
              </strong>{" "}
              (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or
              &quot;us&quot;) uses cookies and similar technologies when you
              visit our website.
            </p>
            <p>
              By continuing to use our website, you consent to the use of
              cookies as described in this Cookie Policy, unless you disable them
              through your browser settings.
            </p>
          </div>
        </div>

        {/* Expand / Collapse All Bar */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Policy Sections ({COOKIE_SECTIONS.length})
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
          {COOKIE_SECTIONS.map((item, idx) => (
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