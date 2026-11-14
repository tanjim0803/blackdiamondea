"use client";

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import SocialMedia from "@/components/shared/social-media";
import _24x7 from "../../../public/assets/footer/24x7.webp";
import OurPartners from "@/components/home/OurPartners";
import {
  Mail,
  Send,
  Headphones,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
} from "lucide-react";

export default function ContactUs() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("idle");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);
    setStatus("idle");

    const form = e.currentTarget;

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        form,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");
      form.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#FAF7F0] text-zinc-900 dark:bg-[#050507] dark:text-white transition-colors duration-300">
      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full overflow-hidden pt-36 sm:pt-40 lg:pt-48 pb-12 lg:pb-16"
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
            background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(245, 158, 11, 0.16), transparent 70%)`,
          }}
        />

        <div className="container relative z-10 mx-auto px-4 space-y-8 lg:space-y-10">
          {/* Page Header */}
          <div className="max-w-3xl mx-auto text-center space-y-2.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 dark:bg-amber-500/10 border border-amber-500/40 shadow-[0_0_18px_rgba(245,158,11,0.18)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-900 dark:text-amber-300">
                24/7 Institutional Support Desk
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Contact{" "}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
                Us
              </span>
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-zinc-700 dark:text-zinc-300 font-medium">
              We Provide Best Customer Support — reach out anytime for setup
              assistance, license inquiries, or technical help.
            </p>
          </div>

          {/* 2-Column Contact Layout */}
          <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* LEFT COLUMN: CONTACT INFORMATION (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col rounded-3xl p-[1px] bg-gradient-to-b from-amber-500/45 via-amber-400/20 to-amber-500/45 dark:from-amber-500/40 dark:via-zinc-800/70 dark:to-amber-500/30 shadow-lg">
              <div className="h-full rounded-3xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl p-6 sm:p-8 flex flex-col justify-between space-y-8 transition-colors duration-300">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                      <Headphones className="w-4 h-4" />
                      <span>Direct Assistance</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
                      Get in Touch
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                      We are committed to processing your inquiry promptly and
                      helping you get the best performance out of BlackDiamond
                      EA.
                    </p>
                  </div>

                  {/* Email Support Box */}
                  <div className="rounded-2xl p-4 bg-amber-50/70 dark:bg-[#12121A] border border-amber-500/30 flex items-center gap-4 hover:border-amber-400 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-200 via-amber-400 to-yellow-600 flex items-center justify-center text-black shadow-[0_0_18px_rgba(245,158,11,0.35)] shrink-0">
                      <Mail className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                        Email Support
                      </p>
                      <a
                        className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-300 transition-colors break-all"
                        href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=support@blackdiamondea.info"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        support@blackdiamondea.info
                      </a>
                    </div>
                  </div>
                </div>

                {/* Chat With Us & 24/7 Badge */}
                <div className="space-y-4 pt-4 border-t border-amber-500/20">
                  <div className="flex items-center gap-2 text-base font-extrabold text-zinc-900 dark:text-amber-300">
                    <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <h5>Chat with us</h5>
                  </div>

                  <div>
                    <SocialMedia />
                  </div>

                  <div className="pt-2">
                    <Image
                      className="w-52 sm:w-56 h-auto object-contain rounded-xl"
                      src={_24x7}
                      alt="24x7 Support"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: LUXURY CONTACT FORM (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col rounded-3xl p-[1px] bg-gradient-to-b from-amber-400/55 via-amber-500/25 to-amber-400/50 dark:from-amber-400/45 dark:via-zinc-800/80 dark:to-amber-500/35 shadow-xl">
              <form
                onSubmit={handleSubmit}
                className="h-full rounded-3xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-2xl p-6 sm:p-8 space-y-5 transition-colors duration-300"
              >
                <div className="border-b border-amber-500/20 pb-3">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white">
                    Send Us a Message
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-0.5">
                    Fill out the form below and our team will respond shortly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="user_name"
                      className="mb-1.5 block text-xs sm:text-sm font-bold text-zinc-800 dark:text-amber-200"
                    >
                      Name
                    </label>
                    <input
                      id="user_name"
                      name="user_name"
                      type="text"
                      required
                      className="w-full rounded-xl border border-amber-500/35 bg-amber-50/40 dark:bg-[#12121A] px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 transition-all"
                      placeholder="Enter your fullname"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="user_email"
                      className="mb-1.5 block text-xs sm:text-sm font-bold text-zinc-800 dark:text-amber-200"
                    >
                      Email
                    </label>
                    <input
                      id="user_email"
                      name="user_email"
                      type="email"
                      required
                      className="w-full rounded-xl border border-amber-500/35 bg-amber-50/40 dark:bg-[#12121A] px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-1.5 block text-xs sm:text-sm font-bold text-zinc-800 dark:text-amber-200"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    className="w-full rounded-xl border border-amber-500/35 bg-amber-50/40 dark:bg-[#12121A] px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-xs sm:text-sm font-bold text-zinc-800 dark:text-amber-200"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                    className="w-full rounded-xl border border-amber-500/35 bg-amber-50/40 dark:bg-[#12121A] px-4 py-3 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/40 transition-all"
                    placeholder="Write your message here..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-600 hover:brightness-110 px-5 text-black font-extrabold text-sm shadow-[0_0_22px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(251,191,36,0.75)] transition-all duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                  <Send className="w-4 h-4" />
                </button>

                {status === "success" && (
                  <div className="flex items-center gap-2 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs sm:text-sm font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Message sent successfully!</span>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex items-center gap-2 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs sm:text-sm font-semibold">
                    <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>Failed to send message. Please try again.</span>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Partners Section */}
      <OurPartners />
    </div>
  );
}