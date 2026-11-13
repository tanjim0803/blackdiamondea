"use client";

import React, { useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogoIcon from "../../../public/logo.gif";
import {
  Lock,
  Eye,
  EyeOff,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Mail,
} from "lucide-react";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const token = searchParams.get("token") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!email || !token) {
      setError("Invalid or missing reset token/email!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://app.blackdiamondea.info/reset-password.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            token: token,
            new_password: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setMessage(data.message || "Password updated successfully!");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Failed to connect to the server. Please check your network.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-auto w-full max-w-lg rounded-3xl p-[1.5px] bg-gradient-to-b from-amber-400/60 via-amber-500/25 to-amber-400/50 dark:from-amber-400/50 dark:via-zinc-800/80 dark:to-amber-500/40 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
      <div className="rounded-3xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl overflow-hidden transition-colors duration-300">
        {/* Top Shimmer Line */}
        <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

        <div className="p-7 sm:p-9 pb-6 space-y-5">
          {/* Header & Logo */}
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
                Security Credential Update
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Reset Your{" "}
                <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
                  Password
                </span>
              </h1>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-50/80 dark:bg-[#12121A] border border-amber-500/25 text-xs text-zinc-700 dark:text-zinc-300">
                <Mail className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span>Resetting password for:</span>
                <strong className="font-bold text-zinc-900 dark:text-amber-300 break-all">
                  {email || "Unknown Email"}
                </strong>
              </div>
            </div>
          </div>

          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/35 to-transparent" />

          {/* Success Alert */}
          {message && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-medium space-y-2.5">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />
                <span>{message}</span>
              </div>
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 hover:underline"
              >
                <span>Proceed to Sign In</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Error Alert */}
          {error && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* New Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="newPassword"
                className="block text-xs sm:text-sm font-bold text-zinc-800 dark:text-amber-200"
              >
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  placeholder="Enter new password"
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-amber-50/40 dark:bg-[#12121A] border border-amber-500/35 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  aria-label={
                    showNewPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-300 cursor-pointer"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="block text-xs sm:text-sm font-bold text-zinc-800 dark:text-amber-200"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Confirm new password"
                  className="w-full h-11 pl-10 pr-10 rounded-xl bg-amber-50/40 dark:bg-[#12121A] border border-amber-500/35 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-300 cursor-pointer"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-600 hover:brightness-110 text-black font-extrabold text-sm shadow-[0_0_22px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(251,191,36,0.75)] transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              <span>{loading ? "Updating..." : "Update Password"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Bottom Navigation Footer */}
        <div className="px-7 py-4 border-t border-amber-500/20 bg-amber-500/5 dark:bg-[#08080C]/90 flex items-center justify-between text-xs sm:text-sm">
          <Link
            href="/login"
            className="inline-flex items-center gap-1 font-semibold text-zinc-600 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>

          <Link
            href="/change-password"
            className="font-bold text-amber-700 hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-200 underline-offset-4 hover:underline"
          >
            Request New Link
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
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
        <Suspense
          fallback={
            <div className="m-auto w-full max-w-lg rounded-3xl p-10 text-center bg-white/95 dark:bg-[#0B0B10]/95 border border-amber-500/35 text-sm font-bold text-amber-700 dark:text-amber-300">
              Loading secure reset session...
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>
      </div>
    </section>
  );
}