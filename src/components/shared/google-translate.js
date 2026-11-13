"use client";

import React, { useEffect, useState, useRef, useMemo } from "react";
import { createPortal } from "react-dom";
import { Search, Check, X } from "lucide-react";

const ALL_LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "bn", label: "Bengali", native: "বাংলা" },
  { code: "ar", label: "Arabic", native: "العربية" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "ur", label: "Urdu", native: "اردو" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "pt", label: "Portuguese", native: "Português" },
  { code: "ru", label: "Russian", native: "Русский" },
  { code: "tr", label: "Turkish", native: "Türkçe" },
  { code: "id", label: "Indonesian", native: "Bahasa Indonesia" },
  { code: "ms", label: "Malay", native: "Bahasa Melayu" },
  { code: "ja", label: "Japanese", native: "日本語" },
  { code: "ko", label: "Korean", native: "한국어" },
  { code: "zh-CN", label: "Chinese (Simplified)", native: "简体中文" },
  { code: "zh-TW", label: "Chinese (Traditional)", native: "繁體中文" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "nl", label: "Dutch", native: "Nederlands" },
  { code: "pl", label: "Polish", native: "Polski" },
  { code: "vi", label: "Vietnamese", native: "Tiếng Việt" },
  { code: "th", label: "Thai", native: "ไทย" },
  { code: "fa", label: "Persian", native: "فارسی" },
  { code: "ta", label: "Tamil", native: "தமிழ்" },
  { code: "te", label: "Telugu", native: "తెలుగు" },
  { code: "mr", label: "Marathi", native: "मराठी" },
  { code: "gu", label: "Gujarati", native: "ગુજરાતી" },
  { code: "pa", label: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "ne", label: "Nepali", native: "नेपाली" },
  { code: "si", label: "Sinhala", native: "සිංහල" },
  { code: "my", label: "Myanmar (Burmese)", native: "မြန်မာ" },
  { code: "km", label: "Khmer", native: "ខ្មែរ" },
  { code: "lo", label: "Lao", native: "ລາວ" },
  { code: "tl", label: "Filipino", native: "Filipino" },
  { code: "sw", label: "Swahili", native: "Kiswahili" },
  { code: "am", label: "Amharic", native: "አማርኛ" },
  { code: "ha", label: "Hausa", native: "Hausa" },
  { code: "yo", label: "Yoruba", native: "Yorùbá" },
  { code: "ig", label: "Igbo", native: "Igbo" },
  { code: "zu", label: "Zulu", native: "isiZulu" },
  { code: "af", label: "Afrikaans", native: "Afrikaans" },
  { code: "el", label: "Greek", native: "Ελληνικά" },
  { code: "he", label: "Hebrew", native: "עברית" },
  { code: "sv", label: "Swedish", native: "Svenska" },
  { code: "no", label: "Norwegian", native: "Norsk" },
  { code: "da", label: "Danish", native: "Dansk" },
  { code: "fi", label: "Finnish", native: "Suomi" },
  { code: "cs", label: "Czech", native: "Čeština" },
  { code: "sk", label: "Slovak", native: "Slovenčina" },
  { code: "hu", label: "Hungarian", native: "Magyar" },
  { code: "ro", label: "Romanian", native: "Română" },
  { code: "bg", label: "Bulgarian", native: "Български" },
  { code: "uk", label: "Ukrainian", native: "Українська" },
  { code: "sr", label: "Serbian", native: "Српски" },
  { code: "hr", label: "Croatian", native: "Hrvatski" },
  { code: "sl", label: "Slovenian", native: "Slovenščina" },
  { code: "lt", label: "Lithuanian", native: "Lietuvių" },
  { code: "lv", label: "Latvian", native: "Latviešu" },
  { code: "et", label: "Estonian", native: "Eesti" },
  { code: "ka", label: "Georgian", native: "ქართული" },
  { code: "hy", label: "Armenian", native: "Հայերեն" },
  { code: "az", label: "Azerbaijani", native: "Azərbaycan" },
  { code: "kk", label: "Kazakh", native: "Қазақ" },
  { code: "uz", label: "Uzbek", native: "Oʻzbek" },
  { code: "tg", label: "Tajik", native: "Тоҷикӣ" },
  { code: "ky", label: "Kyrgyz", native: "Кыргызча" },
  { code: "mn", label: "Mongolian", native: "Монгол" },
  { code: "ps", label: "Pashto", native: "پښتو" },
  { code: "ku", label: "Kurdish", native: "Kurdî" },
  { code: "sq", label: "Albanian", native: "Shqip" },
  { code: "mk", label: "Macedonian", native: "Македонски" },
  { code: "bs", label: "Bosnian", native: "Bosanski" },
  { code: "is", label: "Icelandic", native: "Íslenska" },
  { code: "ga", label: "Irish", native: "Gaeilge" },
  { code: "cy", label: "Welsh", native: "Cymraeg" },
  { code: "mt", label: "Maltese", native: "Malti" },
  { code: "ca", label: "Catalan", native: "Català" },
  { code: "eu", label: "Basque", native: "Euskara" },
  { code: "gl", label: "Galician", native: "Galego" },
  { code: "la", label: "Latin", native: "Latina" },
];

export default function GoogleTranslate() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const [spot, setSpot] = useState({ x: 17, y: 17 });
  const [hovered, setHovered] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, right: 0 });

  const btnRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    // Prevent React removeChild / insertBefore crash when Google Translate wraps text
    if (typeof Node === "function" && Node.prototype && !window.__gtDomPatched) {
      window.__gtDomPatched = true;

      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function (child) {
        if (child && child.parentNode !== this) {
          return child;
        }
        return originalRemoveChild.apply(this, arguments);
      };

      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function (newNode, referenceNode) {
        if (referenceNode && referenceNode.parentNode !== this) {
          if (newNode instanceof Node) {
            return this.appendChild(newNode);
          }
          return newNode;
        }
        return originalInsertBefore.apply(this, arguments);
      };
    }

    const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (match && match[1]) {
      setSelectedLang(match[1]);
    }

    if (!window.__googleTranslateLoaded) {
      window.__googleTranslateLoaded = true;

      window.googleTranslateElementInit = () => {
        const el = document.getElementById("google_translate_element");
        if (!el || el.children.length) return;

        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };

      if (!document.querySelector('script[src*="translate.google.com"]')) {
        const script = document.createElement("script");
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, []);

  const filteredLanguages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ALL_LANGUAGES;
    return ALL_LANGUAGES.filter(
      (lang) =>
        lang.label.toLowerCase().includes(q) ||
        lang.native.toLowerCase().includes(q) ||
        lang.code.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const updatePosition = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setMenuPos({
      top: rect.bottom + 8,
      right: Math.max(12, window.innerWidth - rect.right),
    });
  };

  const toggleMenu = () => {
    if (!open) {
      updatePosition();
      setSearchQuery("");
      setTimeout(() => searchInputRef.current?.focus(), 60);
    }
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!open) return;

    const handleOutside = (e) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    document.addEventListener("mousedown", handleOutside);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [open]);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    setSpot({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSelectLanguage = (langCode) => {
    setSelectedLang(langCode);
    setOpen(false);
    setSearchQuery("");

    if (langCode === "en") {
      document.cookie =
        "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname}`;
    } else {
      document.cookie = `googtrans=/en/${langCode}; path=/;`;
    }

    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
      combo.value = langCode;
      combo.dispatchEvent(new Event("change"));
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="relative inline-flex items-center">
      {/* Hidden Native Google Translate Engine */}
      <div
        id="google_translate_element"
        className="sr-only pointer-events-none opacity-0 w-0 h-0 overflow-hidden"
        aria-hidden="true"
      />

      {/* Crystal-Clear World Earth / Globe Trigger Button */}
      <button
        ref={btnRef}
        type="button"
        onClick={toggleMenu}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Select Language"
        title="Select Language"
        className="group relative inline-flex items-center justify-center w-8.5 h-8.5 rounded-lg overflow-hidden bg-white/95 dark:bg-[#0B0B10]/95 hover:bg-amber-50/90 dark:hover:bg-[#14120B] backdrop-blur-xl text-amber-600 dark:text-amber-300 border border-amber-500/45 hover:border-amber-300 shadow-[0_2px_10px_rgba(0,0,0,0.22)] hover:shadow-[0_0_22px_rgba(251,191,36,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-all duration-300 cursor-pointer"
      >
        {/* Cursor-Tracking Hover Light Effect */}
        <span
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(26px circle at ${spot.x}px ${spot.y}px, rgba(251, 191, 36, 0.55), transparent 75%)`,
          }}
        />

        {/* High-Clarity World Earth SVG Icon with Continents */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 w-[18px] h-[18px] transition-transform duration-300 group-hover:scale-110"
        >
          {/* Outer Earth Circle */}
          <circle
            cx="12"
            cy="12"
            r="9.25"
            stroke="currentColor"
            strokeWidth="1.9"
          />
          {/* Continents Landmass */}
          <path
            d="M8.2 4.3C8.5 5.4 9.6 6.1 9.4 7.2C9.2 8.2 7.8 8.5 7.5 9.6C7.2 10.7 8.4 11.6 8.3 12.8C8.2 14.1 6.8 14.9 7.1 16.2C7.3 17.1 8.2 17.8 8.7 18.6"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.6 4.8C14.9 5.7 13.7 6.3 13.9 7.4C14.1 8.5 15.5 8.8 15.9 9.8C16.3 10.8 15.2 11.9 15.4 13.1C15.6 14.3 16.9 15.1 16.5 16.5C16.2 17.4 15.3 18.1 14.7 18.8"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Subtle Equator Curve */}
          <path
            d="M3.2 12.2C6.2 13.3 17.8 13.3 20.8 12.2"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeOpacity="0.65"
            strokeLinecap="round"
          />
        </svg>

        {/* Active Language Mini Badge */}
        {selectedLang !== "en" && (
          <span className="absolute -bottom-0.5 -right-0.5 z-10 px-1 rounded bg-amber-400 text-black text-[8px] font-extrabold uppercase leading-tight shadow-sm">
            {selectedLang.slice(0, 2)}
          </span>
        )}
      </button>

      {/* Portal Dropdown with Search Bar Rendered Above Everything (z-[9999]) */}
      {mounted &&
        open &&
        createPortal(
          <div
            ref={dropdownRef}
            translate="no"
            style={{
              position: "fixed",
              top: `${menuPos.top}px`,
              right: `${menuPos.right}px`,
            }}
            className="notranslate w-56 p-2 rounded-xl bg-white/98 dark:bg-[#0B0B10]/98 backdrop-blur-2xl border border-amber-500/50 shadow-[0_18px_48px_rgba(0,0,0,0.8),0_0_28px_rgba(245,158,11,0.3)] text-zinc-800 dark:text-zinc-200 z-[9999] overflow-hidden"
          >
            {/* Top Golden Shimmer Line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/90 to-transparent" />

            {/* Top Search Bar */}
            <div className="relative mb-2">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search language..."
                className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-zinc-100/90 dark:bg-[#14120B] border border-amber-500/35 focus:border-amber-400 focus:outline-none text-xs font-medium text-zinc-900 dark:text-amber-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-amber-400 cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Filtered Language List */}
            <div className="max-h-60 overflow-y-auto space-y-0.5 pr-0.5">
              {filteredLanguages.length > 0 ? (
                filteredLanguages.map((lang) => {
                  const isActive = selectedLang === lang.code;
                  return (
                    <button
                      key={lang.code}
                      type="button"
                      onClick={() => handleSelectLanguage(lang.code)}
                      className={`w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-amber-400/20 text-amber-800 dark:text-amber-300 shadow-[inset_0_0_12px_rgba(245,158,11,0.25)]"
                          : "hover:bg-amber-400/15 hover:text-amber-700 dark:hover:text-amber-300"
                      }`}
                    >
                      <span className="flex items-center gap-1.5 truncate">
                        <span className="text-zinc-900 dark:text-zinc-100">
                          {lang.native}
                        </span>
                        <span className="text-[10px] font-medium text-zinc-500 dark:text-zinc-400 truncate">
                          ({lang.label})
                        </span>
                      </span>
                      {isActive && (
                        <Check className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0" />
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="py-4 text-center text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  No language found
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}