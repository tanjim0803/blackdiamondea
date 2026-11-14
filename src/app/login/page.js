"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import LogoIcon from "../../../public/logo.gif";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  auth,
  loginWithEmailAndPassword,
  registerInWithGoogle,
} from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";

function getSafeRedirect(value) {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//")) return "/";
  if (/[\\\u0000-\u001f]/.test(value)) return "/";
  try {
    const url = new URL(value, "http://localhost");
    if (url.origin !== "http://localhost") return "/";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/";
  }
}

export default function Login() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirect(searchParams.get("redirect"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [user, loading] = useAuthState(auth);

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

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    return newErrors;
  };

  // Re-validate live after first submit attempt
  useEffect(() => {
    if (submitted) {
      setErrors(validate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password, submitted]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsLoggingIn(true);
    try {
      const loggedInUser = await loginWithEmailAndPassword(email, password);
      if (loggedInUser) {
        toast.success("Successfully logged in!");
        navigate.push(redirectTo);
      }
    } catch (err) {
      const firebaseErrors = {
        "email-not-verified":
          "Your email is not verified. Please check your inbox or spam folder.",
        "auth/invalid-credential":
          "Invalid email or password. Please try again.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/too-many-requests":
          "Too many failed attempts. Please try again later or reset your password.",
        "auth/user-disabled":
          "This account has been disabled. Please contact support.",
        "auth/network-request-failed":
          "Network error. Please check your connection and try again.",
      };

      const message =
        firebaseErrors[err.message] ||
        firebaseErrors[err.code] ||
        "Something went wrong. Please try again.";

      toast.error(message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const googleUser = await registerInWithGoogle();
      if (googleUser) {
        toast.success("Successfully logged in!");
        navigate.push(redirectTo);
      }
      return googleUser;
    } catch (err) {
      const firebaseErrors = {
        "auth/popup-closed-by-user":
          "Sign-in popup was closed. Please try again.",
        "auth/popup-blocked":
          "Popup was blocked by the browser. Please allow popups and try again.",
        "auth/account-exists-with-different-credential":
          "An account already exists with this email using a different sign-in method.",
        "auth/network-request-failed":
          "Network error. Please check your connection and try again.",
      };

      const message =
        firebaseErrors[err.code] || "Google sign-in failed. Please try again.";

      toast.error(message);
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
            onSubmit={handleLogin}
            noValidate
            className="rounded-3xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl overflow-hidden transition-colors duration-300"
          >
            {/* Top Shimmer Line */}
            <div className="h-[1.5px] w-full bg-gradient-to-r from-transparent via-amber-400/80 to-transparent" />

            <div className="p-7 sm:p-9 pb-6 space-y-5">
              {/* Brand Logo & Heading */}
              <div className="flex flex-col items-center text-center space-y-3">
                <Link href="/" aria-label="go home" className="inline-block">
                  <Image
                    src={LogoIcon}
                    alt="BlackDiamondEA Logo"
                    className="rounded-md w-44 sm:w-48 h-auto object-contain"
                  />
                </Link>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
                    Client Terminal Access
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    Sign In to{" "}
                    <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
                      BlackDiamondEA
                    </span>
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Welcome back! Sign in to manage your licenses and trading
                    tools.
                  </p>
                </div>
              </div>

              {/* Google Sign-In Button */}
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleLoginWithGoogle}
                  className="w-full h-11 rounded-xl bg-amber-50/60 hover:bg-amber-100/80 dark:bg-[#12121A] dark:hover:bg-[#1A1812] border-amber-500/35 hover:border-amber-400 text-zinc-900 dark:text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.1em"
                    height="1.1em"
                    viewBox="0 0 256 262"
                  >
                    <path
                      fill="#4285f4"
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                    />
                    <path
                      fill="#34a853"
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                    />
                    <path
                      fill="#fbbc05"
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
                    />
                    <path
                      fill="#eb4335"
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </Button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center py-1">
                <div className="grow border-t border-amber-500/25" />
                <span className="shrink mx-3 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Or sign in with email
                </span>
                <div className="grow border-t border-amber-500/25" />
              </div>

              {/* Email & Password Fields */}
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="email"
                    className="block text-xs sm:text-sm font-bold text-zinc-800 dark:text-amber-200"
                  >
                    Email
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
                      placeholder="Enter your email"
                      className={`pl-10 h-11 rounded-xl bg-amber-50/40 dark:bg-[#12121A] border-amber-500/35 focus-visible:ring-amber-400 text-zinc-900 dark:text-white placeholder:text-zinc-400 ${
                        errors.email
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs font-medium text-red-500 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="pwd"
                      className="text-xs sm:text-sm font-bold text-zinc-800 dark:text-amber-200"
                    >
                      Password
                    </Label>
                    <Link
                      href="/change-password"
                      className="text-xs font-semibold text-amber-700 hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-200 hover:underline underline-offset-4 transition-colors"
                    >
                      Forgot your Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      required
                      name="pwd"
                      id="pwd"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className={`pl-10 pr-10 h-11 rounded-xl bg-amber-50/40 dark:bg-[#12121A] border-amber-500/35 focus-visible:ring-amber-400 text-zinc-900 dark:text-white placeholder:text-zinc-400 ${
                        errors.password
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-600 dark:text-zinc-400 dark:hover:text-amber-300 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs font-medium text-red-500 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-600 hover:brightness-110 text-black font-extrabold text-sm shadow-[0_0_22px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(251,191,36,0.75)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span>{isLoggingIn ? "Signing In..." : "Sign In"}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Bottom Create Account Footer */}
            <div className="px-7 py-4 border-t border-amber-500/20 bg-amber-500/5 dark:bg-[#08080C]/90 text-center">
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
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
