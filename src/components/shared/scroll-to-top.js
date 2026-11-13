"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // window.innerHeight / 4 calculates exactly 25vh
      if (window.scrollY > window.innerHeight / 4) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to Top"
      className="group fixed bottom-36 right-5 z-50 w-11 h-11 rounded-full flex items-center justify-center bg-white/95 dark:bg-[#0B0B10]/95 hover:bg-gradient-to-br hover:from-amber-300 hover:via-amber-400 hover:to-yellow-600 backdrop-blur-xl text-zinc-900 dark:text-amber-300 hover:text-black border border-amber-500/45 hover:border-amber-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_0_24px_rgba(245,158,11,0.55)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      <ArrowUp className="w-4 h-4 stroke-[2.5] transition-transform duration-300 group-hover:-translate-y-0.5" />
    </button>
  );
}