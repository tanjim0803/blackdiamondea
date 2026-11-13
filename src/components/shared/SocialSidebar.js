"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";

export default function SocialSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef(null);

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/blackdiamondspecialea",
      hoverStyle:
        "hover:bg-[#1877F2] hover:border-[#1877F2] hover:text-white hover:shadow-[0_0_20px_rgba(24,119,242,0.6)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://m.youtube.com/channel/UCyIlCi-CjvQLoJur6jDaTMQ",
      hoverStyle:
        "hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white hover:shadow-[0_0_20px_rgba(255,0,0,0.6)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/blackdiamondea/",
      hoverStyle:
        "hover:bg-gradient-to-r hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-pink-400 hover:text-white hover:shadow-[0_0_20px_rgba(225,48,108,0.6)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: "X / Twitter",
      url: "https://twitter.com/blackdiamondea",
      hoverStyle:
        "hover:bg-gradient-to-r hover:from-amber-300 hover:via-amber-400 hover:to-yellow-500 hover:!text-black hover:border-amber-200 hover:shadow-[0_0_20px_rgba(251,191,36,0.65)]",
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  // Close drawer when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      {/* Continuous Vertical Glowing Light Sweep Keyframes */}
      <style jsx>{`
        @keyframes socialBeamSweep {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(250%);
            opacity: 0;
          }
        }
        .animate-social-beam {
          animation: socialBeamSweep 2.4s ease-in-out infinite;
        }
      `}</style>

      <aside
        ref={drawerRef}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        aria-label="Social Media Drawer"
        className={`fixed left-0 top-1/2 z-50 -translate-y-1/2 flex items-center transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-[calc(100%-32px)] opacity-75 hover:opacity-100"
        }`}
      >
        {/* Main Pop-Out Social Box */}
        <div className="relative w-44 sm:w-48 p-2.5 rounded-r-2xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl border border-l-0 border-amber-500/50 shadow-[0_14px_40px_rgba(0,0,0,0.65),0_0_25px_rgba(245,158,11,0.22)] space-y-1.5">
          {/* Top Golden Laser Accent */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/90 to-transparent" />

          <div className="px-2 pb-1 border-b border-amber-500/20 flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-400">
              Official Channels
            </span>
          </div>

          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${link.name}`}
              className={`group flex items-center justify-between px-2.5 py-2 rounded-xl border border-amber-500/25 bg-zinc-50/80 dark:bg-[#13110C] text-zinc-800 dark:text-amber-200 text-xs font-bold transition-all duration-200 ${link.hoverStyle}`}
            >
              <span className="flex items-center gap-2.5">
                <span className="transition-transform duration-200 group-hover:scale-110">
                  {link.icon}
                </span>
                <span>{link.name}</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          ))}
        </div>

        {/* Larger 32px Peeking Handle Tab with Continuous Vertical Glowing Light Sweep */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close social menu" : "Open social menu"}
          title="Social Media Channels"
          className="group relative -ml-[1px] overflow-hidden flex flex-col items-center justify-center gap-2 w-8 py-4 rounded-r-2xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-xl border border-l-0 border-amber-400/70 text-amber-600 dark:text-amber-300 shadow-[4px_0_24px_rgba(245,158,11,0.38)] hover:border-amber-300 hover:shadow-[6px_0_30px_rgba(251,191,36,0.65)] cursor-pointer transition-all duration-300"
        >
          {/* Continuous Vertical Flowing Golden Glow Beam (Top-to-Bottom) */}
          <span className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-transparent via-amber-400/50 to-transparent animate-social-beam" />

          {/* Right Edge Bright Laser Glow Line */}
          <span className="pointer-events-none absolute right-0 top-2 bottom-2 w-[2px] rounded-full bg-gradient-to-b from-transparent via-amber-300 to-transparent opacity-90" />

          {/* Larger, Clearly Visible Mini Social Icons */}
          <div className="relative z-10 flex flex-col items-center gap-2">
            {socialLinks.map((link, idx) => (
              <span
                key={idx}
                className="w-4 h-4 flex items-center justify-center scale-[0.82] text-amber-600 dark:text-amber-300 drop-shadow-[0_0_6px_rgba(245,158,11,0.55)]"
              >
                {link.icon}
              </span>
            ))}
          </div>

          <ChevronRight
            className={`relative z-10 w-4 h-4 text-amber-500 dark:text-amber-300 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </aside>
    </>
  );
}