"use client";

import { useEffect, useState } from "react";

const words = [
  "Trade Smarter",
  "Win Bigger",
  "Low-Risk",
  "100% Automatic System",
];

export default function TypewriterText() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    let speed = isDeleting ? 50 : 100;

    // Pause when a word is fully typed
    if (!isDeleting && text === currentWord) {
      speed = 1800;
    }

    // Pause before typing the next word
    if (isDeleting && text === "") {
      speed = 500;
    }

    const timer = setTimeout(() => {
      // Finished typing
      if (!isDeleting && text === currentWord) {
        setIsDeleting(true);
        return;
      }

      // Finished deleting
      if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }

      setText(
        isDeleting
          ? currentWord.substring(0, text.length - 1)
          : currentWord.substring(0, text.length + 1),
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex]);

  return (
    <>
      <h1 className="text-primary text-3xl md:text-[40px] lg:text-[56px] md:leading-15 lg:leading-20  font-extrabold text-center">
        BlackDiamond SpecialEa <br/> {" "}
        <span className="text-secondary">
          {text}
          <span className="animate-pulse">|</span>
        </span>
      </h1>
    </>
  );
}
