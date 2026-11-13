"use client";

import React, { useState, useRef } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  const btnRef = useRef(null);
  const [spot, setSpot] = useState({ x: 17, y: 17 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setSpot({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={btnRef}
          variant="outline"
          size="icon"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          aria-label="Toggle theme"
          className="group relative w-8.5 h-8.5 p-0 rounded-lg overflow-hidden bg-white/95 dark:bg-[#0B0B10]/95 hover:bg-amber-50/90 dark:hover:bg-[#14120B] backdrop-blur-xl text-amber-600 dark:text-amber-300 border border-amber-500/45 hover:border-amber-300 shadow-[0_2px_10px_rgba(0,0,0,0.22)] hover:shadow-[0_0_22px_rgba(251,191,36,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-all duration-300 cursor-pointer"
        >
          {/* Interactive Cursor-Tracking Hover Light Effect */}
          <span
            className="pointer-events-none absolute inset-0 transition-opacity duration-200"
            style={{
              opacity: hovered ? 1 : 0,
              background: `radial-gradient(26px circle at ${spot.x}px ${spot.y}px, rgba(251, 191, 36, 0.55), transparent 75%)`,
            }}
          />

          {/* Ambient Hover Ring Shimmer */}
          <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 bg-gradient-to-tr from-amber-500/10 via-amber-300/20 to-transparent transition-opacity duration-300" />

          <Sun className="relative z-10 h-4 w-4 scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90 group-hover:scale-110 group-hover:rotate-12" />
          <Moon className="absolute z-10 h-4 w-4 scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0 group-hover:scale-110 group-hover:-rotate-12" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="relative min-w-[136px] p-1.5 rounded-xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl border border-amber-500/45 shadow-[0_12px_36px_rgba(0,0,0,0.55),0_0_24px_rgba(245,158,11,0.2)] text-zinc-800 dark:text-zinc-200 z-50 overflow-hidden"
      >
        {/* Top Golden Light Line */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/90 to-transparent" />

        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all duration-200 ${
            theme === "light"
              ? "bg-amber-400/20 text-amber-700 dark:text-amber-300 shadow-[inset_0_0_12px_rgba(245,158,11,0.25)]"
              : "hover:bg-amber-400/15 hover:text-amber-700 dark:hover:text-amber-300 hover:shadow-[0_0_14px_rgba(245,158,11,0.28)]"
          }`}
        >
          <span className="flex items-center gap-2">
            <Sun className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Light</span>
          </span>
          {theme === "light" && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.9)]" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all duration-200 my-0.5 ${
            theme === "dark"
              ? "bg-amber-400/20 text-amber-700 dark:text-amber-300 shadow-[inset_0_0_12px_rgba(245,158,11,0.25)]"
              : "hover:bg-amber-400/15 hover:text-amber-700 dark:hover:text-amber-300 hover:shadow-[0_0_14px_rgba(245,158,11,0.28)]"
          }`}
        >
          <span className="flex items-center gap-2">
            <Moon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Dark</span>
          </span>
          {theme === "dark" && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all duration-200 ${
            theme === "system"
              ? "bg-amber-400/20 text-amber-700 dark:text-amber-300 shadow-[inset_0_0_12px_rgba(245,158,11,0.25)]"
              : "hover:bg-amber-400/15 hover:text-amber-700 dark:hover:text-amber-300 hover:shadow-[0_0_14px_rgba(245,158,11,0.28)]"
          }`}
        >
          <span className="flex items-center gap-2">
            <Monitor className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>System</span>
          </span>
          {theme === "system" && (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ThemeToggleButton;