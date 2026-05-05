"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  DollarSign,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { useLockedSectionProgress } from "@/components/useLockedSectionProgress";

const fixes = [
  "Campaign structure rebuilt",
  "Conversion tracking fixed",
  "Landing page alignment improved",
  "Budget waste reduced",
];

const stats = [
  { value: "92", label: "Leads", text: "High-intent inquiries generated from targeted search traffic.", icon: PhoneCall },
  { value: "$32", label: "Avg CPL", text: "Lower acquisition costs through smarter targeting.", icon: DollarSign },
  { value: "$25k", label: "Saved", text: "Reduced budget leakage from inefficient spend.", icon: ShieldCheck },
  { value: "Higher", label: "Quality", text: "More qualified calls and form submissions.", icon: TrendingUp },
];

const storyCards = [
  { title: "The Problem", text: "The account was losing budget to weak keyword targeting, poor campaign structure, and incomplete tracking.", icon: Target },
  { title: "What We Changed", text: "We rebuilt the campaign structure, refined targeting, improved ad messaging, and fixed conversion tracking.", icon: ShieldCheck },
  { title: "The Outcome", text: "Lead volume improved, wasted spend dropped, and the client could clearly see what was driving booked jobs.", icon: TrendingUp },
];

function RevealItem({ children, index, progress }: { children: React.ReactNode; index: number; progress: MotionValue<number> }) {
  const start = 0.1 + index * 0.045;
  const end = Math.min(start + 0.13, 1);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [45, 0]);
  const scale = useTransform(progress, [start, end], [0.94, 1]);
  return <motion.div style={{ opacity, y, scale }}>{children}</motion.div>;
}

function StatTile({ stat, index, progress }: { stat: (typeof stats)[number]; index: number; progress: MotionValue<number> }) {
  const Icon = stat.icon;
  const start = 0.44 + index * 0.07;
  const end = Math.min(start + 0.13, 1);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [38, 0]);
  const scale = useTransform(progress, [start, end], [0.9, 1]);

  return (
    <motion.div style={{ opacity, y, scale }} className="rounded-xl border border-white/10 bg-white/[0.055] p-3 shadow-[0_25px_100px_rgba(37,99,235,0.12)] backdrop-blur-xl md:rounded-2xl md:p-4">
      <div className="mb-2 flex items-center justify-between md:mb-3">
        <Icon size={15} className="text-blue-200" />
        <ArrowUpRight size={13} className="text-emerald-300" />
      </div>
      <div className="text-xl font-black tracking-[-0.05em] text-white md:text-3xl">{stat.value}</div>
      <div className="mt-1 text-[10px] font-black text-white md:text-xs">{stat.label}</div>
      <p className="mt-2 hidden text-[11px] leading-5 text-white/68 md:block">{stat.text}</p>
    </motion.div>
  );
}

function AnimatedChart({ progress }: { progress: MotionValue<number> }) {
  const scale1 = useTransform(progress, [0.24, 0.4], [0.08, 1]);
  const scale2 = useTransform(progress, [0.27, 0.43], [0.08, 1]);
  const scale3 = useTransform(progress, [0.3, 0.46], [0.08, 1]);
  const scale4 = useTransform(progress, [0.33, 0.49], [0.08, 1]);
  const scale5 = useTransform(progress, [0.36, 0.52], [0.08, 1]);
  const bars = [["34%", scale1], ["48%", scale2], ["62%", scale3], ["76%", scale4], ["90%", scale5]] as const;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-200">Lead Flow</p>
        <BarChart3 className="text-blue-200/70" size={16} />
      </div>
      <div className="flex h-24 items-end gap-3 md:h-28">
        {bars.map(([height, scaleY], index) => (
          <motion.div key={index} style={{ height, scaleY, transformOrigin: "bottom" }} className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-700 via-blue-500 to-blue-300 shadow-[0_0_24px_rgba(59,130,246,0.35)]" />
        ))}
      </div>
    </div>
  );
}

export function CaseStudyShowcase() {
  const { ref, progress } = useLockedSectionProgress({ speed: 0.00112 });

  const headingY = useTransform(progress, [0, 0.09], [50, 0]);
  const headingScale = useTransform(progress, [0, 0.09], [0.96, 1]);
  const headingOpacity = useTransform(progress, [0, 0.09], [0, 1]);
  const mainY = useTransform(progress, [0.1, 0.24], [70, 0]);
  const mainScale = useTransform(progress, [0.1, 0.24], [0.94, 1]);
  const mainRotate = useTransform(progress, [0.1, 0.24], [8, 0]);
  const glowX = useTransform(progress, [0, 1], ["-20%", "120%"]);
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="case-study" ref={ref as React.RefObject<HTMLElement>} className="relative min-h-screen bg-black text-white">
      <div className="min-h-screen overflow-visible">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.18),transparent_34%)]" />
        <motion.div style={{ x: glowX }} className="pointer-events-none absolute top-0 h-full w-[35vw] -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent blur-xl" />

        <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 pb-16 pt-24 md:px-6 md:pb-20 md:pt-28">
          <motion.div style={{ y: headingY, scale: headingScale, opacity: headingOpacity }} className="mx-auto max-w-4xl text-center">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-white/[0.04] px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-blue-200 md:mb-3 md:px-4 md:py-2 md:text-[10px] md:tracking-[0.28em]">
              <Sparkles size={12} />
              Case Study
            </div>
            <h2 className="text-[2rem] font-black leading-[0.9] tracking-[-0.065em] md:text-6xl">
              From wasted spend to <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">qualified leads.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xs leading-5 text-white/65 md:mt-4 md:text-base md:leading-6">
              A properly structured Google Ads system can generate better leads while reducing wasted ad spend.
            </p>
          </motion.div>

          <motion.div style={{ y: mainY, scale: mainScale, rotateX: mainRotate, transformStyle: "preserve-3d" }} className="mt-6 grid gap-4 lg:grid-cols-[1.35fr_0.9fr] md:mt-8 md:gap-5">
            <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#10131b]/95 p-4 shadow-[0_40px_160px_rgba(37,99,235,0.2)] backdrop-blur-xl md:rounded-[1.75rem] md:p-6">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.2),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_36%)]" />
              <div className="relative">
                <div className="mb-3 inline-flex rounded-full border border-blue-300/20 bg-blue-500/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.17em] text-blue-100 md:mb-4 md:px-4 md:py-2 md:text-[10px]">
                  Roofing Client Example
                </div>
                <h3 className="max-w-3xl text-xl font-black leading-[0.95] tracking-[-0.05em] md:text-4xl">
                  From wasted spend to consistent qualified leads
                </h3>
                <p className="mt-3 max-w-3xl text-xs leading-6 text-white/72 md:mt-5 md:text-sm md:leading-7">
                  We restructured the account, tightened keyword targeting, improved conversion tracking, and aligned the landing page with search intent.
                </p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2 md:mt-5 md:gap-3">
                  {fixes.map((fix, index) => (
                    <RevealItem key={fix} index={index} progress={progress}>
                      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.055] px-3 py-2 text-[10px] font-bold text-white/85 md:gap-3 md:rounded-2xl md:px-4 md:py-3 md:text-xs">
                        <CheckCircle2 size={14} className="text-emerald-300" />
                        {fix}
                      </div>
                    </RevealItem>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative hidden overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#10131b]/95 p-5 shadow-[0_40px_160px_rgba(168,85,247,0.14)] backdrop-blur-xl md:block">
              <AnimatedChart progress={progress} />
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-blue-200">Performance Snapshot</p>
                <div className="grid grid-cols-2 gap-3">
                  {stats.map((stat, index) => <StatTile key={stat.label} stat={stat} index={index} progress={progress} />)}
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-4 grid grid-cols-4 gap-2 md:hidden">
            {stats.map((stat, index) => <StatTile key={stat.label} stat={stat} index={index} progress={progress} />)}
          </div>

          <div className="mt-5 hidden gap-4 md:grid md:grid-cols-3">
            {storyCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <RevealItem key={card.title} index={index + 8} progress={progress}>
                  <div className="min-h-[105px] rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl transition hover:-translate-y-2 hover:bg-white/[0.065]">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/15 text-blue-200">
                        <Icon size={16} />
                      </div>
                      <h4 className="text-lg font-black tracking-[-0.04em]">{card.title}</h4>
                    </div>
                    <p className="text-[11px] leading-5 text-white/68">{card.text}</p>
                  </div>
                </RevealItem>
              );
            })}
          </div>

          <div className="mx-auto mt-5 h-1.5 w-full max-w-4xl overflow-hidden rounded-full bg-white/10 md:mt-6">
            <motion.div style={{ width: progressWidth }} className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
