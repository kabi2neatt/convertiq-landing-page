"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { BarChart3, Bolt, MapPin, Search, Target, TrendingUp } from "lucide-react";
import { useLockedSectionProgress } from "@/components/useLockedSectionProgress";

const reasons = [
  { icon: MapPin, title: "Tracking-First Setup", text: "Every campaign starts with proper conversion tracking so you know exactly what is driving calls, form submissions, and booked jobs." },
  { icon: Target, title: "Local Intent Focus", text: "We target people actively searching for your services in the exact areas you want to serve, helping you attract better qualified leads." },
  { icon: BarChart3, title: "Transparent Reporting", text: "Clear reporting and performance visibility so you always know where your budget is going, what is working, and what needs improving." },
  { icon: Search, title: "Search-Term Discipline", text: "Ongoing search term reviews and negative keyword management help cut wasted spend and keep campaigns focused on high-intent traffic." },
  { icon: TrendingUp, title: "ROI-Focused Strategy", text: "Every decision is made around lead quality, cost per lead, and real business outcomes — not vanity metrics." },
  { icon: Bolt, title: "Continuous Optimization", text: "We monitor, adjust, and optimize regularly so your campaigns keep improving instead of being left to run on autopilot." },
];

const certifications = [
  { title: "Google Ads Search Certification", text: "Certified in search campaign strategy, keyword targeting, ad structure, and performance optimization." },
  { title: "Google Ads AI-Powered Performance Ads Certification", text: "Certified in modern campaign strategy, automation, and AI-assisted performance optimization." },
];

function ReasonCard({ reason, index, progress }: { reason: (typeof reasons)[number]; index: number; progress: MotionValue<number> }) {
  const Icon = reason.icon;
  const start = 0.08 + index * 0.105;
  const end = Math.min(start + 0.16, 1);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [60, 0]);
  const scale = useTransform(progress, [start, end], [0.88, 1]);
  const rotate = useTransform(progress, [start, end], [index % 2 === 0 ? -6 : 6, 0]);

  return (
    <motion.div style={{ opacity, y, scale, rotate }} className="group relative overflow-hidden rounded-[1.2rem] border border-blue-300/20 bg-[#202943] p-3 shadow-[0_30px_120px_rgba(37,99,235,0.25)] backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-blue-300/50 hover:bg-[#263252] md:rounded-[2rem] md:p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.32),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(192,132,252,0.24),transparent_42%)]" />
      <div className="relative">
        <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/65 to-purple-500/65 text-white ring-1 ring-white/25 shadow-[0_0_28px_rgba(59,130,246,0.35)] md:mb-5 md:h-12 md:w-12 md:rounded-2xl">
          <Icon size={16} className="md:hidden" />
          <Icon size={21} className="hidden md:block" />
        </div>
        <h3 className="text-[15px] font-black leading-tight tracking-[-0.035em] text-white md:text-2xl">{reason.title}</h3>
        <p className="mt-1.5 text-[10.5px] font-medium leading-5 text-white/78 md:mt-4 md:text-sm md:leading-7">{reason.text}</p>
      </div>
    </motion.div>
  );
}

function CertificationCard({ item, index, progress }: { item: (typeof certifications)[number]; index: number; progress: MotionValue<number> }) {
  const start = 0.72 + index * 0.09;
  const end = Math.min(start + 0.14, 1);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [55, 0]);
  const scale = useTransform(progress, [start, end], [0.92, 1]);

  return (
    <motion.div style={{ opacity, y, scale }} className="relative min-h-[125px] overflow-hidden rounded-[1.2rem] border border-blue-300/30 bg-gradient-to-br from-[#1f2d50] to-[#263866] p-3 text-center shadow-[0_30px_120px_rgba(37,99,235,0.28)] backdrop-blur-xl md:min-h-[230px] md:rounded-[2rem] md:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.38),transparent_42%)]" />
      <div className="relative mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-700 text-sm font-black text-white shadow-[0_0_42px_rgba(37,99,235,0.75)] md:mb-5 md:h-16 md:w-16 md:text-2xl">G</div>
      <h3 className="relative text-[14px] font-black leading-tight tracking-[-0.04em] text-white md:text-2xl">{item.title}</h3>
      <p className="relative mx-auto mt-1.5 max-w-md text-[10.5px] leading-5 text-white/80 md:mt-4 md:text-sm md:leading-7">{item.text}</p>
    </motion.div>
  );
}

export function WhyConvertIQ() {
  const { ref, progress, } = useLockedSectionProgress({ speed: 0.00108 });
  const headingY = useTransform(progress, [0, 0.1], [60, 0]);
  const headingOpacity = useTransform(progress, [0, 0.1], [0, 1]);
  const ringRotate = useTransform(progress, [0, 1], [0, 220]);
  const centerScale = useTransform(progress, [0.08, 0.45, 0.85], [0.7, 1.08, 0.92]);
  const centerRotate = useTransform(progress, [0.08, 0.85], [-18, 18]);
  const gridY = useTransform(progress, [0.12, 0.3], [65, 0]);
  const gridScale = useTransform(progress, [0.12, 0.3], [0.94, 1]);
  const certY = useTransform(progress, [0.6, 0.75, 1], [65, 0, 0]);
  const certScale = useTransform(progress, [0.6, 0.75, 1], [0.96, 1, 1]);
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="why-us" ref={ref as React.RefObject<HTMLElement>} className="relative h-screen bg-black text-white">
      <div className="flex h-screen items-center overflow-hidden px-4 py-12 md:px-6 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_34%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.14),transparent_35%)]" />
        <motion.div style={{ rotate: ringRotate }} className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 md:block" />
        <motion.div style={{ rotate: ringRotate }} className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/10 md:block" />
        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div style={{ opacity: headingOpacity, y: headingY }} className="mx-auto max-w-4xl text-center">
            <div className="mb-3 inline-flex rounded-full border border-purple-400/25 bg-white/[0.04] px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-purple-200 md:mb-5 md:px-5 md:py-2 md:text-xs md:tracking-[0.28em]">Why ConvertIQ Media?</div>
            <h2 className="text-[2rem] font-black leading-[0.92] tracking-[-0.065em] md:text-7xl md:leading-[0.95] md:tracking-[-0.06em]">
              A tracking-first system built to generate <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">qualified leads.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xs leading-6 text-white/72 md:mt-6 md:text-lg md:leading-7">Not just clicks. Not vanity metrics. A full system designed around phone calls, quote requests, and booked jobs.</p>
          </motion.div>

          <div className="relative mt-4 md:mt-10">
            <motion.div style={{ scale: centerScale, rotate: centerRotate }} className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/20 bg-blue-500/[0.035] shadow-[0_0_90px_rgba(59,130,246,0.22)] backdrop-blur-xl lg:flex">
              <div className="m-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600/35 to-purple-600/35 text-center text-sm font-black uppercase tracking-[0.2em] text-white/75">Lead<br />System</div>
            </motion.div>
            <motion.div style={{ y: gridY, scale: gridScale }} className="relative z-10 hidden gap-5 md:grid md:grid-cols-2 lg:grid-cols-3">
              {reasons.map((reason, index) => <ReasonCard key={reason.title} reason={reason} index={index} progress={progress} />)}
            </motion.div>
            <div className="relative z-10 grid grid-cols-2 gap-2 md:hidden">
              {reasons.map((reason, index) => <ReasonCard key={reason.title} reason={reason} index={index} progress={progress} />)}
            </div>
          </div>

          <motion.div style={{ y: certY, scale: certScale }} className="relative z-20 mt-3 flex justify-center md:mt-10">
            <div className="grid w-full max-w-4xl grid-cols-2 gap-2 md:grid-cols-2 md:gap-6">
              {certifications.map((item, index) => <CertificationCard key={item.title} item={item} index={index} progress={progress} />)}
            </div>
          </motion.div>

          <div className="mx-auto mt-3 h-1.5 max-w-4xl overflow-hidden rounded-full bg-white/10 md:mt-7">
            <motion.div style={{ width: progressWidth }} className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
