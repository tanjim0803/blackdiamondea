"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import LogoIcon from "../../../public/logo.gif";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { sendResetPassword } from "@/lib/firebase";
import {
  KeyRound,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";

export default function ChangePassword() {
  const navigate = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 500, y: 250 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    if (!email) {
      setStatusMessage({
        type: "error",
        text: "Please enter your registered email address.",
      });
      return;
    }

    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    try {
      await sendResetPassword(email);
      setStatusMessage({
        type: "success",
        text: "Password reset link sent! Please check your email inbox or spam folder.",
      });
    } catch (err) {
      setStatusMessage({
        type: "error",
        text:
          err?.message ||
          "Unable to send reset email. Please verify your email and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-screen overflow-hidden bg-[#FAF7F0] text-zinc-900 dark:bg-[#050507] dark:text-white pt-36 sm:pt-40 lg:pt-48 pb-16 flex items-center justify-center transition-colors duration-300"
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

      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0.35,
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.16), transparent 70%)`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        {/* Luxury Gold-Bordered Card */}
        <div className="m-auto w-full max-w-lg rounded-3xl p-[1.5px] bg-gradient-to-b from-amber-400/60 via-amber-500/25 to-amber-400/50 dark:from-amber-400/50 dark:via-zinc-800/80 dark:to-amber-500/40 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          <form
            onSubmit={handleChangePassword}
            className="rounded-3xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl overflow-hidden transition-colors duration-300"
          >
            {/* Top Shimmer Line */}
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

            <div className="p-7 sm:p-9 pb-6 space-y-5">
              {/* Brand Logo & Security Pill */}
              <div className="flex flex-col items-center text-center space-y-3">
                <Link href="/" aria-label="go home" className="inline-block">
                  <Image
                    src={LogoIcon}
                    alt="BlackDiamondEA Logo"
                    className="rounded-md w-44 sm:w-48 h-auto object-contain"
                  />
                </Link>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40">
                  <KeyRound className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
                    Account Recovery
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    Change{" "}
                    <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
                      Password
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Enter your registered email address and we&apos;ll send you a
                    secure password reset link.
                  </p>
                </div>
              </div>

              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/35 to-transparent" />

              {/* Status Feedback Alert */}
              {statusMessage.text && (
                <div
                  className={`flex items-start gap-2.5 p-3.5 rounded-xl border text-xs sm:text-sm font-medium ${
                    statusMessage.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
                      : "bg-rose-500/10 border-rose-500/40 text-rose-700 dark:text-rose-300"
                  }`}
                >
                  {statusMessage.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Email Input Field */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-bold text-zinc-800 dark:text-amber-200"
                  >
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      type="email"
                      required
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your registered email"
                      className="pl-10 h-11 rounded-xl bg-amber-50/50 dark:bg-[#12121A] border-amber-500/35 focus-visible:ring-amber-400 text-zinc-900 dark:text-white placeholder:text-zinc-400"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-600 hover:brightness-110 text-black font-extrabold text-sm shadow-[0_0_22px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(251,191,36,0.75)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>
                    {loading ? "Sending Reset Link..." : "Reset Password"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Bottom Navigation Footer */}
            <div className="px-7 py-4 border-t border-amber-500/20 bg-amber-500/5 dark:bg-[#08080C]/90 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-sm">
              <Link
                href="/login"
                className="inline-flex items-center gap-1 font-semibold text-zinc-600 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </Link>

              <p className="text-zinc-600 dark:text-zinc-400">
                {"Don't"} have an account?{" "}
                <Link
                  href="/register"
                  className="font-bold text-amber-700 hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-200 underline-offset-4 hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}