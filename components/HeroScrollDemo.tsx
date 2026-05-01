"use client";

import React, { useState } from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const clientLogos = [
  "/clients/Summit Roofing.png",
  "/clients/Clearflow Plumbing.png",
  "/clients/Multi Logo.png",
];

function MagneticButton({
  href,
  children,
  variant = "purple",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "purple" | "blue" | "dark";
}) {
  const styles = {
    purple:
      "bg-[#8b45d9] shadow-[0_0_35px_rgba(168,85,247,0.32)] hover:bg-purple-500",
    blue:
      "bg-[#1600b8] shadow-[0_0_35px_rgba(37,99,235,0.3)] hover:bg-blue-700",
    dark: "bg-white/10 backdrop-blur hover:bg-white/15",
  };

  return (
    <motion.a
      href={href}
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`rounded-md px-7 py-4 text-sm font-bold text-white transition ${styles[variant]}`}
    >
      {children}
    </motion.a>
  );
}

function HeroContent({ progress }: { progress: MotionValue<number> }) {
  const repeatedClientLogos = Array(12).fill(clientLogos).flat();

  const videoY = useTransform(progress, [0, 1], [30, -40]);
  const videoScale = useTransform(progress, [0, 1], [1.08, 1.18]);

  const subOpacity = useTransform(progress, [0.15, 0.35], [0, 1]);
  const subY = useTransform(progress, [0.15, 0.35], [30, 0]);

  const ctaOpacity = useTransform(progress, [0.25, 0.5], [0, 1]);
  const ctaY = useTransform(progress, [0.25, 0.5], [30, 0]);

  const trustOpacity = useTransform(progress, [0.5, 0.7], [0, 1]);
  const trustY = useTransform(progress, [0.5, 0.7], [24, 0]);

  const logoOpacity = useTransform(progress, [0.8, 1], [0, 1]);
  const logoY = useTransform(progress, [0.8, 1], [38, 0]);

  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-2xl"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }}
    >
      <motion.video
        src="/vsl.mp4"
        style={{ y: videoY, scale: videoScale }}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.88))]" />

      {/* Cursor glow */}
      <motion.div
        animate={{
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
        }}
        transition={{ type: "spring", stiffness: 70, damping: 24 }}
        className="pointer-events-none absolute z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[100px]"
      />

      {/* Blue particle */}
      <motion.div
        animate={{ y: [0, 22, 0], opacity: [0.12, 0.28, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-[20%] right-[12%] z-10 h-36 w-36 rounded-full bg-blue-400/14 blur-3xl"
      />

      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        
        {/* 🔥 ALWAYS VISIBLE */}
        <div className="mb-5 inline-flex rounded-full border border-purple-400/30 bg-purple-500/20 px-4 py-1.5 text-xs font-bold text-purple-100 backdrop-blur">
          Trusted by local businesses across Ontario
        </div>

        <h1 className="max-w-5xl text-4xl font-black leading-[0.95] tracking-[-0.06em] text-white md:text-6xl lg:text-7xl">
          Generate More Calls &<br />
          Booked Jobs — With<br />
          <span className="bg-gradient-to-r from-white via-blue-100 to-purple-300 bg-clip-text text-transparent">
            High-Intent Google Ads
          </span>
        </h1>

        {/* Animated AFTER */}
        <motion.p
          style={{ opacity: subOpacity, y: subY }}
          className="mt-6 max-w-2xl text-sm font-medium leading-7 text-white/75 md:text-base"
        >
          We build your website, launch your ads, and create a system that
          consistently brings in qualified leads.
        </motion.p>

        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton href="#book-audit" variant="purple">
            Free Google Ads Audit ↗
          </MagneticButton>

          <MagneticButton href="#website-demo" variant="blue">
            Free Website Demo ↗
          </MagneticButton>

          <MagneticButton href="#quick-audit" variant="dark">
            Get a Quick Audit ↗
          </MagneticButton>
        </motion.div>

        <motion.div
          style={{ opacity: trustOpacity, y: trustY }}
          whileHover={{ scale: 1.04 }}
          className="mt-10 inline-flex flex-wrap items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.06] px-5 py-3 text-xs font-bold text-white/80 backdrop-blur-xl"
        >
          <span className="text-yellow-300">★★★★★</span>
          <span>5 Stars on Google</span>
          <span className="h-1 w-1 rounded-full bg-white/35" />
          <span>Trusted by 25+ home service businesses across the GTA</span>
        </motion.div>

        <motion.div
          style={{ opacity: logoOpacity, y: logoY }}
          className="mt-8 w-full max-w-6xl overflow-hidden border-y border-white/10 py-4"
        >
          <div className="client-marquee-track flex w-max items-center gap-0">
            {repeatedClientLogos.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="client-logo-float flex items-center justify-center px-2"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <img
                  src={src}
                  alt="Client logo"
                  className="h-[6rem] w-auto object-contain opacity-90 transition duration-500 hover:scale-105 hover:opacity-100 md:h-[6.8rem]"
                />
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export function HeroScrollDemo() {
  return (
    <section id="home" className="relative overflow-hidden bg-black text-white">
      <ContainerScroll>
        {(progress) => <HeroContent progress={progress} />}
      </ContainerScroll>
    </section>
  );
}