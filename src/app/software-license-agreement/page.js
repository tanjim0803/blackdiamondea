"use client";

import React, { useState, useRef } from "react";
import {
  Plus,
  Minus,
  FileCheck2,
  Sparkles,
  ChevronsUpDown,
} from "lucide-react";

const LICENSE_SECTIONS = [
  {
    number: "01",
    title: "License Grant",
    content: (
      <>
        <p>
          Subject to compliance with this Agreement, BlackDiamondEA grants you a
          limited, non-exclusive, non-transferable, and revocable license to
          install and use the purchased software.
        </p>
        <p>
          Ownership of the software is not transferred to you. Only the right to
          use the software under this Agreement is granted.
        </p>
      </>
    ),
  },
  {
    number: "02",
    title: "License Activation",
    content: (
      <>
        <p>
          Each purchased license is issued for the specific trading account(s)
          or activation limits specified at the time of purchase.
        </p>
        <p>License activation may require verification of:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Trading Account Number</li>
          <li>Broker Information</li>
          <li>Hardware Identifier</li>
          <li>VPS Identifier</li>
          <li>Email Address</li>
        </ul>
        <p>
          BlackDiamondEA reserves the right to verify ownership before
          activating or modifying a license.
        </p>
      </>
    ),
  },
  {
    number: "03",
    title: "Permitted Use",
    content: (
      <>
        <p>You may:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Install the software on your authorized computer or VPS.</li>
          <li>
            Use the software only with your own licensed trading account(s).
          </li>
          <li>Receive updates when included with your license.</li>
          <li>Contact customer support for technical assistance.</li>
        </ul>
      </>
    ),
  },
  {
    number: "04",
    title: "Prohibited Use",
    content: (
      <>
        <p>You may not:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Copy or duplicate the software.</li>
          <li>Reverse engineer, decompile, or disassemble the software.</li>
          <li>Modify or alter the software.</li>
          <li>Share license files or activation keys.</li>
          <li>
            Sell, rent, lease, sublicense, or redistribute the software.
          </li>
          <li>Upload the software to file-sharing websites.</li>
          <li>Circumvent licensing or security protections.</li>
          <li>Allow unauthorized users to access your licensed copy.</li>
          <li>Use the software for illegal or fraudulent activities.</li>
        </ul>
        <p>
          Any violation of these restrictions may result in immediate
          termination of your license.
        </p>
      </>
    ),
  },
  {
    number: "05",
    title: "VPS Usage",
    content: (
      <>
        <p>
          Unless otherwise stated by your purchased license, installation on a
          Virtual Private Server (VPS) is permitted for your own trading
          activities.
        </p>
        <p>You remain fully responsible for:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>VPS security</li>
          <li>Internet connectivity</li>
          <li>Server maintenance</li>
          <li>Software updates</li>
          <li>Trading activity</li>
        </ul>
        <p>BlackDiamondEA is not responsible for VPS downtime or failures.</p>
      </>
    ),
  },
  {
    number: "06",
    title: "License Transfer",
    content: (
      <>
        <p>Licenses are personal and non-transferable.</p>
        <p>
          License transfers to another individual, organization, or trading
          account are not permitted unless expressly approved in writing by
          BlackDiamondEA.
        </p>
      </>
    ),
  },
  {
    number: "07",
    title: "Updates and Improvements",
    content: (
      <>
        <p>We may release:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Bug fixes</li>
          <li>Performance improvements</li>
          <li>Security updates</li>
          <li>Feature enhancements</li>
          <li>Compatibility updates</li>
        </ul>
        <p>
          Some updates may be provided free of charge, while major upgrades or
          new versions may require an additional purchase.
        </p>
      </>
    ),
  },
  {
    number: "08",
    title: "Technical Support",
    content: (
      <div className="space-y-4">
        <p>
          Technical support is provided only to customers holding a valid
          license.
        </p>

        <div className="rounded-xl p-4 bg-amber-50/60 dark:bg-[#12121A] border border-amber-500/20 space-y-2">
          <h4 className="text-base font-extrabold text-zinc-900 dark:text-amber-300">
            Support includes assistance with:
          </h4>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Installation</li>
            <li>Activation</li>
            <li>Basic configuration</li>
            <li>Technical troubleshooting</li>
          </ul>
        </div>

        <div className="rounded-xl p-4 bg-amber-50/60 dark:bg-[#12121A] border border-amber-500/20 space-y-2">
          <h4 className="text-base font-extrabold text-zinc-900 dark:text-amber-300">
            Support does not include:
          </h4>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>Trading advice</li>
            <li>Investment recommendations</li>
            <li>Account management</li>
            <li>Broker disputes</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    number: "09",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          The software, algorithms, trading logic, source code, documentation,
          trademarks, graphics, and related materials remain the exclusive
          property of BlackDiamondEA.
        </p>
        <p>
          No ownership rights are transferred through the purchase of a license.
        </p>
      </>
    ),
  },
  {
    number: "10",
    title: "Monitoring and Compliance",
    content: (
      <>
        <p>
          BlackDiamondEA reserves the right to verify license authenticity and
          investigate suspected misuse, fraud, piracy, or unauthorized
          distribution.
        </p>
        <p>Failure to comply with this Agreement may result in:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>License suspension</li>
          <li>License revocation</li>
          <li>Account termination</li>
          <li>Permanent ban from future purchases</li>
        </ul>
      </>
    ),
  },
  {
    number: "11",
    title: "Disclaimer of Warranty",
    content: (
      <>
        <p>
          The software is provided on an &quot;AS IS&quot; and &quot;AS
          AVAILABLE&quot; basis.
        </p>
        <p>BlackDiamondEA makes no warranties regarding:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Profitability</li>
          <li>Continuous operation</li>
          <li>Compatibility with every broker</li>
          <li>Error-free performance</li>
          <li>Uninterrupted service</li>
        </ul>
        <p>Use of the software is entirely at your own risk.</p>
      </>
    ),
  },
  {
    number: "12",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the fullest extent permitted by law, BlackDiamondEA shall not be
          liable for:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Trading losses</li>
          <li>Loss of profits</li>
          <li>Missed opportunities</li>
          <li>Broker execution issues</li>
          <li>VPS failures</li>
          <li>Internet outages</li>
          <li>Hardware failures</li>
          <li>Software incompatibilities</li>
          <li>Data loss</li>
          <li>Indirect or consequential damages</li>
        </ul>
      </>
    ),
  },
  {
    number: "13",
    title: "License Termination",
    content: (
      <>
        <p>
          BlackDiamondEA reserves the right to terminate any license immediately
          if:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>This Agreement is violated.</li>
          <li>Payment fraud or chargebacks occur.</li>
          <li>Unauthorized distribution is detected.</li>
          <li>License sharing is discovered.</li>
          <li>The software is used for unlawful purposes.</li>
        </ul>
        <p>
          Upon termination, you must immediately cease using the software and
          delete all copies in your possession.
        </p>
      </>
    ),
  },
  {
    number: "14",
    title: "Governing Law",
    content: (
      <>
        <p>
          This Agreement shall be governed by and interpreted in accordance with
          the applicable laws governing BlackDiamondEA.
        </p>
        <p>
          Any disputes arising from this Agreement shall be resolved in the
          appropriate courts with competent jurisdiction.
        </p>
      </>
    ),
  },
  {
    number: "15",
    title: "Changes to This Agreement",
    content: (
      <>
        <p>
          BlackDiamondEA may modify this Software License Agreement at any
          time.
        </p>
        <p>
          The latest version will be published on our website and becomes
          effective immediately upon publication.
        </p>
        <p>
          Continued use of the software after any update constitutes acceptance
          of the revised Agreement.
        </p>
      </>
    ),
  },
  {
    number: "16",
    title: "Contact Us",
    content: (
      <p>
        If you have any questions regarding this Software License Agreement,
        please contact us using the official contact information available on
        the BlackDiamondEA website.
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

export default function SoftwareLicenseAgreement() {
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

  const allExpanded = openIndices.length === LICENSE_SECTIONS.length;

  const toggleAll = () => {
    if (allExpanded) {
      setOpenIndices([]);
    } else {
      setOpenIndices(LICENSE_SECTIONS.map((_, i) => i));
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
              End-User Software &amp; IP Terms
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Software License{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
              Agreement
            </span>
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
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
              This Software License Agreement (&quot;Agreement&quot;) is entered
              into between{" "}
              <strong className="text-zinc-900 dark:text-amber-300">
                BlackDiamondEA
              </strong>{" "}
              (&quot;Company&quot;, &quot;Licensor&quot;, &quot;we&quot;,
              &quot;our&quot;, or &quot;us&quot;) and the individual or entity
              (&quot;User&quot;, &quot;Customer&quot;, &quot;Licensee&quot;, or
              &quot;you&quot;) purchasing, downloading, installing, or using our
              software.
            </p>
            <p>
              By purchasing, downloading, installing, activating, or using any
              BlackDiamondEA software, you agree to be legally bound by this
              Agreement.
            </p>
          </div>
        </div>

        {/* Expand / Collapse All Bar */}
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Agreement Clauses ({LICENSE_SECTIONS.length})
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
          {LICENSE_SECTIONS.map((item, idx) => (
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