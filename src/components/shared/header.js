"use client";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo.gif";
import { ThemeToggleButton } from "./theme-toggle-button";
import GoogleTranslate from "./google-translate";
import StickyHeader from "./sticky-header";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import MobileMenu from "./mobile-menu";
import LoginIcon from "./login-icon";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import LogoutIcon from "./login-icon";
import {
  CloudDownload,
  Sparkles,
  LineChart,
  CalendarDays,
  Flame,
  ArrowUpRight,
} from "lucide-react";
import FreeOfferPopup from "../popup/FreeOfferPopup";
import { useState, useRef } from "react";

export const Header = () => {
  const [isFreePopupOpen, setIsFreePopupOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [user] = useAuthState(auth);

  const navRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 300, y: 40 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      {/* Dual Theme CSS for Google Translate & Theme Dropdown */}
      <style jsx global>{`
        /* Light / Cream Mode Utility Controls */
        .luxury-utility-controls .goog-te-gadget,
        .luxury-utility-controls .goog-te-gadget span {
          color: #78350f !important;
        }
        .luxury-utility-controls .goog-te-combo {
          background-color: #fffdf9 !important;
          color: #18181b !important;
          border: 1px solid rgba(217, 119, 6, 0.45) !important;
          border-radius: 8px !important;
          padding: 5px 10px !important;
          font-size: 13px !important;
          font-weight: 600 !important;
          outline: none !important;
          cursor: pointer !important;
          transition: all 0.25s ease !important;
        }
        .luxury-utility-controls button {
          background: rgba(245, 158, 11, 0.12) !important;
          border: 1px solid rgba(217, 119, 6, 0.4) !important;
          color: #92400e !important;
          border-radius: 8px !important;
          transition: all 0.25s ease !important;
        }

        /* Dark Mode Utility Controls */
        .dark .luxury-utility-controls .goog-te-gadget,
        .dark .luxury-utility-controls .goog-te-gadget span,
        .dark .luxury-utility-controls select,
        .dark .luxury-utility-controls button,
        .dark .luxury-utility-controls svg {
          color: #fde68a !important;
          fill: #fde68a !important;
        }
        .dark .luxury-utility-controls .goog-te-combo {
          background-color: #12100b !important;
          color: #ffffff !important;
          border: 1px solid rgba(245, 158, 11, 0.55) !important;
          box-shadow: 0 0 15px rgba(245, 158, 11, 0.18) !important;
        }
        .dark .luxury-utility-controls .goog-te-combo:hover {
          border-color: #fbbf24 !important;
          box-shadow: 0 0 22px rgba(251, 191, 36, 0.45) !important;
        }
        .dark .luxury-utility-controls .goog-te-combo option {
          background-color: #09090b !important;
          color: #ffffff !important;
        }
        .dark .luxury-utility-controls button {
          background: rgba(245, 158, 11, 0.1) !important;
          border: 1px solid rgba(245, 158, 11, 0.45) !important;
          color: #fde68a !important;
        }
        .dark .luxury-utility-controls button:hover {
          background: rgba(245, 158, 11, 0.22) !important;
          border-color: #fbbf24 !important;
          box-shadow: 0 0 20px rgba(251, 191, 36, 0.45) !important;
        }

        /* Theme Dropdown Menu (Light / Dark / System) */
        [data-radix-popper-content-wrapper] [role="menu"] {
          background-color: #fffdf9 !important;
          border: 1px solid rgba(217, 119, 6, 0.4) !important;
          border-radius: 14px !important;
          padding: 6px !important;
          box-shadow: 0 14px 35px rgba(0, 0, 0, 0.15) !important;
        }
        [data-radix-popper-content-wrapper] [role="menuitem"] {
          color: #18181b !important;
          font-weight: 600 !important;
          font-size: 13.5px !important;
          border-radius: 9px !important;
          padding: 8px 12px !important;
          cursor: pointer !important;
        }
        [data-radix-popper-content-wrapper] [role="menuitem"]:hover,
        [data-radix-popper-content-wrapper] [role="menuitem"][data-highlighted] {
          background: rgba(245, 158, 11, 0.18) !important;
          color: #92400e !important;
        }

        .dark [data-radix-popper-content-wrapper] [role="menu"] {
          background-color: #0d0b08 !important;
          border: 1px solid rgba(251, 191, 36, 0.45) !important;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.92), 0 0 25px rgba(245, 158, 11, 0.2) !important;
          backdrop-filter: blur(20px) !important;
        }
        .dark [data-radix-popper-content-wrapper] [role="menuitem"] {
          color: #ffffff !important;
        }
        .dark [data-radix-popper-content-wrapper] [role="menuitem"]:hover,
        .dark [data-radix-popper-content-wrapper] [role="menuitem"][data-highlighted] {
          background: linear-gradient(90deg, rgba(245, 158, 11, 0.28), rgba(217, 119, 6, 0.18)) !important;
          color: #fde68a !important;
          box-shadow: inset 0 0 0 1px rgba(251, 191, 36, 0.45) !important;
        }
        .dark [data-radix-popper-content-wrapper] [role="menuitem"] svg {
          color: #fbbf24 !important;
        }
      `}</style>

      <div className="relative w-full">
        <FreeOfferPopup
          isOpen={isFreePopupOpen}
          setIsOpen={setIsFreePopupOpen}
        />
      </div>

      <StickyHeader>
        <nav
          ref={navRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full overflow-visible shadow-lg dark:shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
        >
          {/* Interactive Cursor Spotlight Glow */}
          <div
            className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.18), transparent 70%)`,
            }}
          />

          {/* Top Brand & Utility Bar */}
          <div className="relative bg-gradient-to-r from-[#FAF7F0] via-[#F3ECE0] to-[#FAF7F0] dark:from-[#060608] dark:via-[#120E06] dark:to-[#060608] backdrop-blur-2xl py-2.5 lg:py-3.5 border-b border-amber-500/25 transition-colors duration-300">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent pointer-events-none" />

            <div className="container relative z-30 my-0 mx-auto px-4 flex justify-between items-center gap-4">
              <div className="w-32 md:w-48 transition-transform duration-300 hover:scale-[1.03]">
                <Link href="/" className="flex items-center">
                  <Image
                    src={Logo}
                    alt="BlackDiamond Logo"
                    priority
                    className="dark:drop-shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                  />
                </Link>
              </div>

              <div className="luxury-utility-controls flex items-center gap-3 sm:gap-4">
                <div className="flex items-center font-semibold">
                  <GoogleTranslate />
                </div>

                <div className="hidden lg:flex items-center gap-2">
                  <ThemeToggleButton />
                </div>

                <div className="lg:hidden">
                  <MobileMenu />
                </div>
              </div>
            </div>
          </div>

          {/* Luxury Navigation Bar */}
          <div className="relative hidden lg:block py-3.5 bg-gradient-to-r from-[#F5EFE4]/95 via-[#EFE6D5]/95 to-[#F5EFE4]/95 dark:from-[#0A0805]/95 dark:via-[#1C1406]/95 dark:to-[#0A0805]/95 backdrop-blur-2xl border-b border-amber-500/35 dark:border-amber-400/40 shadow-md dark:shadow-[0_10px_35px_rgba(245,158,11,0.16)] transition-colors duration-300">
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/80 dark:via-amber-400/90 to-transparent pointer-events-none" />

            <div className="container relative z-30 my-0 mx-auto px-4 flex flex-wrap items-center justify-between gap-6">
              {/* Left Side Navigation Links */}
              <div className="size-fit">
                <ul className="flex items-center gap-8 xl:gap-10">
                  <li>
                    <Link
                      href="/"
                      className={`relative py-1.5 text-[15px] tracking-wider transition-all duration-300 ${
                        pathname === "/"
                          ? "text-amber-700 dark:text-amber-300 font-extrabold dark:drop-shadow-[0_0_12px_rgba(251,191,36,0.75)]"
                          : "text-zinc-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-300 font-semibold"
                      }`}
                    >
                      Home
                      {pathname === "/" && (
                        <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600 shadow-[0_0_10px_#FBBF24]" />
                      )}
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/brokers"
                      className={`relative py-1.5 text-[15px] tracking-wider transition-all duration-300 ${
                        pathname === "/brokers"
                          ? "text-amber-700 dark:text-amber-300 font-extrabold dark:drop-shadow-[0_0_12px_rgba(251,191,36,0.75)]"
                          : "text-zinc-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-300 font-semibold"
                      }`}
                    >
                      Brokers
                      {pathname === "/brokers" && (
                        <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600 shadow-[0_0_10px_#FBBF24]" />
                      )}
                    </Link>
                  </li>

                  <li>
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger className="bg-transparent hover:bg-amber-500/15 focus:bg-amber-500/15 data-[state=open]:bg-amber-500/15 rounded-lg px-2.5 py-1.5 text-zinc-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-300 data-[state=open]:text-amber-700 dark:data-[state=open]:text-amber-300 duration-200 text-[15px] font-semibold tracking-wider cursor-pointer">
                            <span>Live Chart</span>
                          </NavigationMenuTrigger>

                          <NavigationMenuContent className="bg-[#FFFDF9] dark:bg-[#0D0B08]/95 backdrop-blur-2xl border border-amber-500/35 dark:border-amber-400/40 rounded-2xl shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                            <ul className="w-[240px] p-2 space-y-1">
                              <li>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href="/live-forex-chart"
                                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                                      pathname === "/live-forex-chart"
                                        ? "bg-amber-500/20 text-amber-800 dark:text-amber-200 font-bold border border-amber-400/40"
                                        : "text-zinc-700 dark:text-zinc-100 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300"
                                    }`}
                                  >
                                    <LineChart className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                                    <span>Live Forex Chart</span>
                                  </Link>
                                </NavigationMenuLink>
                              </li>

                              <li>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href="/economic-calendar"
                                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                                      pathname === "/economic-calendar"
                                        ? "bg-amber-500/20 text-amber-800 dark:text-amber-200 font-bold border border-amber-400/40"
                                        : "text-zinc-700 dark:text-zinc-100 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300"
                                    }`}
                                  >
                                    <CalendarDays className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                    <span>Economic Calendar</span>
                                  </Link>
                                </NavigationMenuLink>
                              </li>

                              <li>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href="/forex-heat-map"
                                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                                      pathname === "/forex-heat-map"
                                        ? "bg-amber-500/20 text-amber-800 dark:text-amber-200 font-bold border border-amber-400/40"
                                        : "text-zinc-700 dark:text-zinc-100 hover:bg-amber-500/15 hover:text-amber-700 dark:hover:text-amber-300"
                                    }`}
                                  >
                                    <Flame className="w-4 h-4 text-rose-500 dark:text-rose-400" />
                                    <span>Forex Heat Map</span>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </li>

                  <li>
                    <Link
                      href="/contact-us"
                      className={`relative py-1.5 text-[15px] tracking-wider transition-all duration-300 ${
                        pathname === "/contact-us"
                          ? "text-amber-700 dark:text-amber-300 font-extrabold dark:drop-shadow-[0_0_12px_rgba(251,191,36,0.75)]"
                          : "text-zinc-800 dark:text-white hover:text-amber-600 dark:hover:text-amber-300 font-semibold"
                      }`}
                    >
                      Contact
                      {pathname === "/contact-us" && (
                        <span className="absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600 shadow-[0_0_10px_#FBBF24]" />
                      )}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Right Side Luxury Glowing Action Buttons */}
              <div className="flex items-center gap-3.5">
                <Button
                  onClick={() => setIsFreePopupOpen(true)}
                  className="h-10 px-5 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-600 hover:brightness-110 text-black font-extrabold text-sm tracking-wide shadow-[0_0_25px_rgba(251,191,36,0.45)] hover:shadow-[0_0_40px_rgba(251,191,36,0.85)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-black animate-pulse" />
                  <span>Get Free AI</span>
                  <CloudDownload className="w-4 h-4" />
                </Button>

                <a
                  href="https://t.me/bdspecialea"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="h-10 px-4 rounded-xl bg-white/90 hover:bg-amber-50 text-zinc-900 dark:bg-[#11100D] dark:hover:bg-amber-500/15 dark:text-amber-100 dark:hover:text-white border-amber-500/45 hover:border-amber-400 shadow-sm dark:shadow-[0_0_15px_rgba(245,158,11,0.15)] font-semibold text-sm tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>Join Telegram Channel</span>
                    <ArrowUpRight className="w-4 h-4 text-amber-600 dark:text-amber-300" />
                  </Button>
                </a>

                {user ? (
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className="h-10 px-4 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:hover:bg-rose-900/80 dark:text-rose-200 border-rose-500/50 font-semibold text-sm transition-all duration-300 cursor-pointer flex items-center gap-1.5"
                  >
                    <LogoutIcon className="text-rose-600 dark:text-rose-300 w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                ) : (
                  <Link href="/login">
                    <Button
                      variant="outline"
                      className="h-10 px-5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 dark:bg-[#1A1407] dark:hover:bg-amber-500/25 dark:text-amber-200 dark:hover:text-white border-amber-500/60 dark:border-amber-400/60 font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer flex items-center gap-1.5"
                    >
                      <LoginIcon className="text-amber-700 dark:text-amber-300 w-4 h-4" />
                      <span>Login</span>
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </StickyHeader>
    </>
  );
};