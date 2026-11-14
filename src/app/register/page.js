"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import LogoIcon from "../../../public/logo.gif";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  registerInWithGoogle,
  registerWithEmailAndPassword,
} from "@/lib/firebase";
import { toast } from "react-toastify";
import { showVerificationToast } from "@/components/popup/CustomToast";
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  UserPlus,
  Check,
} from "lucide-react";

// --- Password strength helper ---
function getPasswordStrength(password) {
  if (!password) return { score: 0, label: "", color: "" };
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: "Weak", color: "#ef4444" };
  if (score === 2) return { score, label: "Fair", color: "#f97316" };
  if (score === 3) return { score, label: "Good", color: "#eab308" };
  return { score, label: "Strong", color: "#22c55e" };
}

export default function Register() {
  const navigate = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

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

  const fullName = firstName + " " + lastName;
  const passwordStrength = getPasswordStrength(password);

  const formReset = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setErrors({});
    setSubmitted(false);
  };

  // Validate all fields, return error object
  const validate = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (passwordStrength.score < 3) {
      newErrors.password = "Please use a stronger password.";
    }
    if (!phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required.";
    return newErrors;
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    setSubmitted(true);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setIsRegistering(true);
    const savedName = fullName;
    const savedEmail = email;
    const savedPassword = password;
    const savedPhone = phoneNumber;
    formReset();
    try {
      await registerWithEmailAndPassword(
        savedName,
        savedEmail,
        savedPassword,
        savedPhone
      );
      showVerificationToast();
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please log in.");
      } else {
        toast.error("Something happening wrong. Try Again!");
      }
    } finally {
      setIsRegistering(false);
    }
  };

  const handleRegisterWithGoogle = async () => {
    try {
      const user = await registerInWithGoogle();
      if (user) {
        navigate.push("/");
      }
      return user;
    } catch (err) {
      throw err;
    }
  };

  // Re-validate on change if form was submitted once
  useEffect(() => {
    if (submitted) {
      setErrors(validate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName, email, password, phoneNumber, submitted]);

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
        <div className="m-auto w-full max-w-xl rounded-3xl p-[1.5px] bg-gradient-to-b from-amber-400/60 via-amber-500/25 to-amber-400/50 dark:from-amber-400/50 dark:via-zinc-800/80 dark:to-amber-500/40 shadow-xl dark:shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          <form
            onSubmit={handleRegister}
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
                  <UserPlus className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
                    New Client Registration
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    Create a{" "}
                    <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
                      BlackDiamondEA
                    </span>{" "}
                    Account
                  </h1>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Welcome! Create an account to access automated Forex &amp;
                    Gold trading solutions.
                  </p>
                </div>
              </div>

              {/* Google Sign-Up Button */}
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRegisterWithGoogle}
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
                  Or register with email
                </span>
                <div className="grow border-t border-amber-500/25" />
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="firstName"
                      className="block text-xs sm:text-sm font-bold text-zinc-800 dark:text-amber-200"
                    >
                      First Name
                    </Label>
                    <div className="relative">
                      <User className="w-4 h-4 text-amber-600 dark:text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <Input
                        type="text"
                        required
                        name="firstName"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                        className={`pl-10 h-11 rounded-xl bg-amber-50/40 dark:bg-[#12121A] border-amber-500/35 focus-visible:ring-amber-400 text-zinc-900 dark:text-white placeholder:text-zinc-400 ${
                          errors.firstName
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-xs font-medium text-red-500 mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="lastName"
                      className="block text-xs sm:text-sm font-bold text-zinc-800 dark:text-amber-200"
                    >
                      Last Name
                    </Label>
                    <div className="relative">
                      <User className="w-4 h-4 text-amber-600 dark:text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <Input
                        type="text"
                        required
                        name="lastName"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                        className={`pl-10 h-11 rounded-xl bg-amber-50/40 dark:bg-[#12121A] border-amber-500/35 focus-visible:ring-amber-400 text-zinc-900 dark:text-white placeholder:text-zinc-400 ${
                          errors.lastName
                            ? "border-red-500 focus-visible:ring-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-xs font-medium text-red-500 mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
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

                {/* Password + Strength Meter */}
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
                      placeholder="Create a strong password"
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

                  {/* Password strength meter */}
                  {password.length > 0 && (
                    <div className="mt-2 p-3 rounded-xl bg-amber-50/60 dark:bg-[#12121A] border border-amber-500/20 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex gap-1 flex-1">
                          {[1, 2, 3, 4].map((i) => (
                            <div
                              key={i}
                              className="h-1.5 flex-1 rounded-full transition-all duration-300"
                              style={{
                                backgroundColor:
                                  i <= passwordStrength.score
                                    ? passwordStrength.color
                                    : "rgba(161, 161, 170, 0.25)",
                              }}
                            />
                          ))}
                        </div>
                        <span
                          className="text-xs font-extrabold"
                          style={{ color: passwordStrength.color }}
                        >
                          {passwordStrength.label}
                        </span>
                      </div>

                      <ul className="text-xs text-zinc-600 dark:text-zinc-400 space-y-1 pt-0.5">
                        <li
                          className={`flex items-center gap-1.5 ${
                            password.length >= 8
                              ? "text-emerald-600 dark:text-emerald-400 font-medium"
                              : ""
                          }`}
                        >
                          <Check className="w-3 h-3" />
                          <span>At least 8 characters</span>
                        </li>
                        <li
                          className={`flex items-center gap-1.5 ${
                            /[A-Z]/.test(password)
                              ? "text-emerald-600 dark:text-emerald-400 font-medium"
                              : ""
                          }`}
                        >
                          <Check className="w-3 h-3" />
                          <span>One uppercase letter</span>
                        </li>
                        <li
                          className={`flex items-center gap-1.5 ${
                            /[0-9]/.test(password)
                              ? "text-emerald-600 dark:text-emerald-400 font-medium"
                              : ""
                          }`}
                        >
                          <Check className="w-3 h-3" />
                          <span>One number</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {errors.password && (
                    <p className="text-xs font-medium text-red-500 mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="phoneNumber"
                    className="block text-xs sm:text-sm font-bold text-zinc-800 dark:text-amber-200"
                  >
                    Phone Number
                  </Label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <Input
                      type="text"
                      required
                      name="phoneNumber"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter your phone number"
                      className={`pl-10 h-11 rounded-xl bg-amber-50/40 dark:bg-[#12121A] border-amber-500/35 focus-visible:ring-amber-400 text-zinc-900 dark:text-white placeholder:text-zinc-400 ${
                        errors.phoneNumber
                          ? "border-red-500 focus-visible:ring-red-500"
                          : ""
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="text-xs font-medium text-red-500 mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isRegistering}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-600 hover:brightness-110 text-black font-extrabold text-sm shadow-[0_0_22px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(251,191,36,0.75)] transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span>
                    {isRegistering ? "Creating Account..." : "Sign Up"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Bottom Sign In Footer */}
            <div className="px-7 py-4 border-t border-amber-500/20 bg-amber-500/5 dark:bg-[#08080C]/90 text-center">
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                Have an account?{" "}
                <Link
                  href="/login"
                  className="font-bold text-amber-700 hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-200 underline-offset-4 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}