"use client";

import React from "react";

export default function SocialSidebar() {
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/blackdiamondspecialea",
      hoverBg: "hover:bg-[#1877F2]",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.8z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://m.youtube.com/channel/UCyIlCi-CjvQLoJur6jDaTMQ",
      hoverBg: "hover:bg-[#FF0000]",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/blackdiamondea/",
      hoverBg: "hover:bg-[#E1306C]",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
    {
      name: "X / Twitter",
      url: "https://twitter.com/blackdiamondea",
      hoverBg: "hover:bg-amber-400 hover:!text-black",
      icon: (
        <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed left-0 top-1/2 z-50 flex -translate-y-1/2 flex-col gap-1.5">
      {socialLinks.map((link, index) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className={`group flex h-10 w-10 sm:h-11 sm:w-11 items-center overflow-hidden rounded-r-xl border border-l-0 border-amber-500/45 bg-white/90 dark:bg-[#0B0B10]/90 backdrop-blur-xl text-zinc-800 dark:text-amber-300 shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:w-36 sm:hover:w-40 hover:pr-4 hover:text-white hover:border-amber-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.45)] transition-all duration-300 ease-out ${link.hoverBg}`}
        >
          {/* Icon Container */}
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110">
            {link.icon}
          </div>

          {/* Label reveals dynamically */}
          <span className="opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 font-bold text-xs sm:text-sm tracking-wide whitespace-nowrap pl-1">
            {link.name}
          </span>
        </a>
      ))}
    </div>
  );
}