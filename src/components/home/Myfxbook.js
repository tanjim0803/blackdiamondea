"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, ShieldCheck, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const myfxbook01Item = Array.from({ length: 4 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    id: i + 1,
    item: `/assets/home/myfxbook-01/BlackDiamond-EaV8-00-Pro-Myfxbook-${num}.webp`,
    alt: `BlackDiamond EA Verified Portfolio 01 - ${num}`,
  };
});

const myfxbook02Item = Array.from({ length: 4 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    id: i + 1,
    item: `/assets/home/myfxbook-02/Black-Diamond-Special-Ea-${num}.webp`,
    alt: `BlackDiamond Special EA Verified Portfolio 02 - ${num}`,
  };
});

const myfxbook03Item = Array.from({ length: 4 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");
  return {
    id: i + 1,
    item: `/assets/home/myfxbook-03/Black-Diamond-Special-Ea-${num}.webp`,
    alt: `BlackDiamond Special EA Verified Portfolio 03 - ${num}`,
  };
});

function AnimatedModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex,
}) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setCurrentIndex((prev) => (prev + 1) % images.length);
      if (e.key === "ArrowLeft")
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, images.length, setCurrentIndex]);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark Blurred Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/92 backdrop-blur-md z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Fullscreen Image Viewer */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="relative w-full max-w-5xl flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                size="icon"
                className="absolute -top-12 right-0 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-400/50 z-50 cursor-pointer rounded-full transition-all"
                onClick={onClose}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Previous Image */}
              <button
                onClick={prevImage}
                aria-label="Previous image"
                className="absolute left-2 sm:-left-12 p-2.5 rounded-full bg-zinc-900/90 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-400/40 z-50 cursor-pointer transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="max-h-[85vh] rounded-2xl p-1.5 bg-gradient-to-b from-amber-400/50 to-amber-600/30 shadow-[0_0_50px_rgba(245,158,11,0.3)]"
              >
                <Image
                  src={images[currentIndex]}
                  alt="Full Verified Statement"
                  width={1200}
                  height={1600}
                  className="max-h-[82vh] w-auto object-contain rounded-xl bg-[#0B0B10]"
                />
              </motion.div>

              {/* Next Image */}
              <button
                onClick={nextImage}
                aria-label="Next image"
                className="absolute right-2 sm:-right-12 p-2.5 rounded-full bg-zinc-900/90 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-400/40 z-50 cursor-pointer transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function PortfolioBlock({ badgeText, titlePrefix, highlightText, items }) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = items.map((item) => item.item);

  const plugin = useRef(
    Autoplay({
      delay: 3200,
      stopOnInteraction: false,
    })
  );

  return (
    <div className="space-y-6">
      {/* Compact Portfolio Heading */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/90 dark:bg-emerald-950/70 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-900 dark:text-emerald-300">
            {badgeText}
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          {titlePrefix}{" "}
          <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 dark:from-amber-200 dark:via-amber-400 dark:to-yellow-500 bg-clip-text text-transparent">
            {highlightText}
          </span>
        </h2>
      </div>

      <AnimatedModal
        isOpen={open}
        onClose={() => setOpen(false)}
        images={images}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      {/* Carousel Container */}
      <div className="flex justify-center mx-8 sm:mx-14 md:mx-16">
        <Carousel plugins={[plugin.current]} className="w-full">
          <CarouselContent>
            {items.map((feedback, index) => (
              <CarouselItem
                key={feedback.id}
                className="basis-full lg:basis-1/2"
              >
                <div className="p-1">
                  <Card className="group relative overflow-hidden rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/45 via-amber-400/20 to-amber-500/45 dark:from-amber-500/45 dark:via-zinc-800/70 dark:to-amber-500/35 hover:from-amber-400 hover:to-yellow-500 border-0 shadow-md hover:shadow-[0_0_30px_rgba(245,158,11,0.28)] transition-all duration-300">
                    <CardContent className="rounded-2xl bg-white/95 dark:bg-[#0B0B10]/95 backdrop-blur-xl p-3 flex flex-col items-center justify-center">
                      <div
                        onClick={() => {
                          setCurrentIndex(index);
                          setOpen(true);
                        }}
                        className="relative w-full overflow-hidden rounded-xl cursor-pointer"
                      >
                        <Image
                          src={feedback.item}
                          alt={feedback.alt}
                          width={600}
                          height={700}
                          className="w-full object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-300 h-[210px] sm:h-[270px] md:h-[310px] xl:h-[340px]"
                        />

                        {/* Subtle Hover Inspect Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-black font-bold text-xs shadow-lg">
                            <ZoomIn className="w-3.5 h-3.5" />
                            View Full Proof
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Luxury Gold Manual Arrows */}
          <CarouselPrevious className="-left-9 sm:-left-12 bg-white/95 hover:bg-amber-400 text-zinc-900 hover:text-black dark:bg-[#14120D] dark:hover:bg-amber-400 dark:text-amber-300 dark:hover:text-black border border-amber-500/45 shadow-md cursor-pointer transition-all" />
          <CarouselNext className="-right-9 sm:-right-12 bg-white/95 hover:bg-amber-400 text-zinc-900 hover:text-black dark:bg-[#14120D] dark:hover:bg-amber-400 dark:text-amber-300 dark:hover:text-black border border-amber-500/45 shadow-md cursor-pointer transition-all" />
        </Carousel>
      </div>
    </div>
  );
}

export default function Myfxbook() {
  return (
    <section className="relative w-full overflow-hidden bg-[#FAF7F0] text-zinc-900 dark:bg-[#050507] dark:text-white py-10 md:py-12 lg:py-14 transition-colors duration-300">
      {/* Subtle Cyber Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-45 dark:opacity-35"
        style={{
          backgroundSize: "48px 48px",
          backgroundImage:
            "linear-gradient(to right, rgba(217, 119, 6, 0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(217, 119, 6, 0.06) 1px, transparent 1px)",
        }}
      />

      {/* Ambient Top Center Gold Glow */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-2/3 h-36 bg-amber-500/10 blur-3xl rounded-full" />

      <div className="container relative z-10 mx-auto px-4 space-y-12 md:space-y-14">
        <PortfolioBlock
          badgeText="Live Audited Account #01"
          titlePrefix="Verified Portfolio 01 |"
          highlightText="Myfxbook"
          items={myfxbook01Item}
        />

        <div className="h-[1px] max-w-4xl mx-auto bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

        <PortfolioBlock
          badgeText="Live Audited Account #02"
          titlePrefix="Verified Portfolio 02 |"
          highlightText="Myfxbook"
          items={myfxbook02Item}
        />

        <div className="h-[1px] max-w-4xl mx-auto bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

        <PortfolioBlock
          badgeText="Live Audited Account #03"
          titlePrefix="Verified Portfolio 03 |"
          highlightText="Myfxbook"
          items={myfxbook03Item}
        />
      </div>

      {/* Bottom Subtle Gold Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent pointer-events-none" />
    </section>
  );
}