"use client";

import { useEffect, useState } from "react";

const words = [
  "Trade Smarter",
  "Win Bigger",
  "Low-Risk",
  "100% Automatic System",
];

export default function TypewriterText() {
  const [text, setText] = useState("Trade Smarter");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    // Slower, calmer typing & deleting cadence so it never feels jarring
    let speed = isDeleting ? 65 : 125;

    // Hold each completed phrase steady for 10 full seconds
    if (!isDeleting && text === currentWord) {
      speed = 10000;
    }

    // Gentle pause before the next phrase begins
    if (isDeleting && text === "") {
      speed = 750;
    }

    const timer = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }

      setText(
        isDeleting
          ? currentWord.substring(0, text.length - 1)
          : currentWord.substring(0, text.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <h1 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[52px] font-extrabold text-center tracking-tight leading-[1.2] text-zinc-900 dark:text-white">
      <span className="block">BlackDiamond SpecialEa</span>

      {/* Fixed-height slot prevents any vertical jump when text clears or wraps */}
      <span className="mt-1.5 sm:mt-2 min-h-[2.6em] sm:min-h-[1.35em] flex items-center justify-center">
        <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
          {text}
        </span>
        <span
          aria-hidden="true"
          className="inline-block w-[3px] h-7 sm:h-9 lg:h-11 ml-1.5 rounded-full bg-amber-500 dark:bg-amber-400 opacity-85 animate-pulse"
        />
      </span>
    </h1>
  );
}