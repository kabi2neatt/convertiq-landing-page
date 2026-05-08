"use client";

import React, { useRef } from "react";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";

const steps = [
  { label: "01", title: "Diagnose the funnel", text: "We review your website, ads, offer, tracking, and lead flow to find what is blocking booked jobs." },
  { label: "02", title: "Rebuild the landing page", text: "We create a conversion-focused page built around calls, quote requests, trust, speed, and clear offers." },
  { label: "03", title: "Launch high-intent ads", text: "We target people already searching for your services and send them to a page built to convert." },
  { label: "04", title: "Track and optimize", text: "We measure calls, forms, audits, and booked jobs so we can improve what actually creates revenue." },
];

function StepCard({ step, index, progress }: { step: (typeof steps)[number]; index: number; progress: MotionValue<number> }) {
  const start = index * 0.2;
  const mid = Math.min(start + 0.11, 0.9);
  const end = Math.min(start + 0.22, 1);
  const opacity = useTransform(progress, [start, mid, end], [0, 1, index === steps.length - 1 ? 1 : 0]);
  const y = useTransform(progress, [start, mid, end], [80, 0, index === steps.length - 1 ? 0 : -80]);
  const scale = useTransform(progress, [start, mid, end], [0.92, 1, index === steps.length - 1 ? 1 : 0.96]);

  return (
    <motion.div style={{ opacity, y, scale }} className="absolute inset-0 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_40px_140px_rgba(79,70,229,0.22)] backdrop-blur-xl md:p-9">
      <div className="mb-5 inline-flex rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm font-black text-purple-200">{step.label}</div>
      <h3 className="text-4xl font-black leading-[0.9] tracking-[-0.06em] md:text-6xl">{step.title}</h3>
      <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 md:text-lg md:leading-8">{step.text}</p>
      <div className="absolute bottom-6 left-6 right-6 text-sm font-bold text-white/35 md:bottom-9 md:left-9 md:right-9">Step {index + 1} of {steps.length}</div>
    </motion.div>
  );
}

export function StickyProcess() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.22,
  });
  const headingOpacity = useTransform(progress, [0, 0.1], [0, 1]);
  const headingY = useTransform(progress, [0, 0.1], [70, 0]);
  const cardY = useTransform(progress, [0.12, 0.25], [90, 0]);
  const cardScale = useTransform(progress, [0.12, 0.25], [0.92, 1]);
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="relative h-[220svh] bg-black text-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-5 py-20 md:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.22),transparent_34%),radial-gradient(circle_at_bottom,rgba(37,99,235,0.16),transparent_36%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-9 lg:grid-cols-[0.85fr_1.15fr]">
          <motion.div style={{ opacity: headingOpacity, y: headingY }} className="text-center lg:text-left">
            <div className="mb-5 inline-flex rounded-full border border-purple-400/25 bg-white/[0.04] px-5 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-purple-200 md:text-xs">Our Process</div>
            <h2 className="text-4xl font-black leading-[0.92] tracking-[-0.07em] md:text-7xl">How we turn traffic into <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">booked jobs.</span></h2>
            <p className="mt-5 text-sm leading-7 text-white/65 md:text-lg">A simple system that diagnoses leaks, rebuilds the page, launches high-intent traffic, and tracks what creates revenue.</p>
            <div className="mt-7 h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div style={{ width: progressWidth }} className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-400" /></div>
          </motion.div>
          <motion.div style={{ y: cardY, scale: cardScale }} className="relative h-[390px] md:h-[450px]">
            {steps.map((step, index) => <StepCard key={step.title} step={step} index={index} progress={progress} />)}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
