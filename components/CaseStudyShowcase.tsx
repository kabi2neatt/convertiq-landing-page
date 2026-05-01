"use client";

import React, { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
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

const fixes = [
  "Campaign structure rebuilt",
  "Conversion tracking fixed",
  "Landing page alignment improved",
  "Budget waste reduced",
];

const stats = [
  {
    value: "92",
    label: "Leads Generated",
    text: "High-intent inquiries generated from targeted Google search traffic.",
  },
  {
    value: "$32",
    label: "Average CPL",
    text: "Lower acquisition costs through tighter structure and smarter targeting.",
  },
  {
    value: "$25k",
    label: "Saved",
    text: "Reduced budget leakage by eliminating poor targeting and inefficient spend.",
  },
  {
    value: "Higher",
    label: "Lead Quality",
    text: "More qualified calls and form submissions from people ready to book.",
  },
];

const storyCards = [
  {
    title: "The Problem",
    text: "The account was losing budget to weak keyword targeting, poor campaign structure, and incomplete tracking.",
    icon: Target,
  },
  {
    title: "What We Changed",
    text: "We rebuilt the campaign structure, refined targeting, improved ad messaging, and fixed conversion tracking.",
    icon: ShieldCheck,
  },
  {
    title: "The Outcome",
    text: "Lead volume improved, wasted spend dropped, and the client could clearly see what was driving booked jobs.",
    icon: TrendingUp,
  },
];

function RevealCard({
  children,
  index,
  progress,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  progress: MotionValue<number>;
  className?: string;
}) {
  const start = 0.1 + index * 0.035;
  const end = start + 0.11;

  const y = useTransform(progress, [start, end], [70, 0]);
  const rotateX = useTransform(progress, [start, end], [14, 0]);
  const rotateY = useTransform(
    progress,
    [start, end],
    [index % 2 === 0 ? -7 : 7, 0]
  );
  const scale = useTransform(progress, [start, end], [0.94, 1]);

  return (
    <motion.div
      style={{
        y,
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
}

function AnimatedChart({ progress }: { progress: MotionValue<number> }) {
  const heights = ["34%", "48%", "62%", "76%", "90%"];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-200">
          Lead Flow
        </p>
        <BarChart3 className="text-blue-200/70" size={16} />
      </div>

      <div className="flex h-28 items-end gap-3">
        {heights.map((height, index) => {
          const scaleY = useTransform(
            progress,
            [0.22 + index * 0.035, 0.38 + index * 0.035],
            [0.08, 1]
          );

          return (
            <motion.div
              key={height}
              style={{ height, scaleY, transformOrigin: "bottom" }}
              className="flex-1 rounded-t-xl bg-gradient-to-t from-blue-700 via-blue-500 to-blue-300 shadow-[0_0_24px_rgba(59,130,246,0.35)]"
            />
          );
        })}
      </div>
    </div>
  );
}

function CounterTile({
  value,
  label,
  icon: Icon,
  index,
  progress,
}: {
  value: string;
  label: string;
  icon: React.ElementType;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.34 + index * 0.035;
  const end = start + 0.12;

  const y = useTransform(progress, [start, end], [35, 0]);
  const scale = useTransform(progress, [start, end], [0.9, 1]);

  return (
    <motion.div
      style={{ y, scale }}
      className="rounded-2xl border border-white/10 bg-black/35 p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <Icon size={16} className="text-blue-200" />
        <ArrowUpRight size={14} className="text-emerald-300" />
      </div>

      <div className="text-2xl font-black tracking-[-0.05em] text-white">
        {value}
      </div>

      <div className="mt-1 text-[11px] font-bold text-white/65">{label}</div>
    </motion.div>
  );
}

export function CaseStudyShowcase() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.08], [55, 0]);
  const headingScale = useTransform(scrollYProgress, [0, 0.08], [0.94, 1]);

  const mainY = useTransform(scrollYProgress, [0.08, 0.22], [85, 0]);
  const mainScale = useTransform(scrollYProgress, [0.08, 0.22], [0.92, 1]);
  const mainRotate = useTransform(scrollYProgress, [0.08, 0.22], [10, 0]);

  const glowX = useTransform(scrollYProgress, [0, 1], ["-20%", "120%"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="case-study"
      ref={ref}
      className="relative h-[300vh] bg-black text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.22),transparent_32%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.18),transparent_34%)]" />

        <motion.div
          style={{ x: glowX }}
          className="pointer-events-none absolute top-0 h-full w-[35vw] -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent blur-xl"
        />

        <div className="relative mx-auto flex h-screen max-w-7xl flex-col justify-center px-6 pt-24 pb-8">
          <motion.div
            style={{ y: headingY, scale: headingScale }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-white/[0.04] px-4 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-blue-200">
              <Sparkles size={13} />
              Case Study
            </div>

            <h2 className="text-4xl font-black leading-[0.9] tracking-[-0.07em] md:text-6xl">
              From wasted spend to{" "}
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                qualified leads.
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-white/65 md:text-base">
              A look at how a properly structured Google Ads system can generate
              more qualified leads while cutting wasted ad spend.
            </p>
          </motion.div>

          <motion.div
            style={{
              y: mainY,
              scale: mainScale,
              rotateX: mainRotate,
              transformStyle: "preserve-3d",
            }}
            className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_0.9fr]"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#10131b]/95 p-6 shadow-[0_40px_160px_rgba(37,99,235,0.2)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.2),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.14),transparent_36%)]" />

              <div className="relative">
                <div className="mb-4 inline-flex rounded-full border border-blue-300/20 bg-blue-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">
                  Roofing Client Example
                </div>

                <h3 className="max-w-3xl text-3xl font-black leading-[0.95] tracking-[-0.05em] md:text-4xl">
                  From wasted spend to consistent qualified leads
                </h3>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-white/72">
                  We restructured the account, tightened keyword targeting,
                  improved conversion tracking, and aligned the landing page
                  experience with search intent.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {fixes.map((fix, index) => (
                    <RevealCard key={fix} index={index} progress={scrollYProgress}>
                      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3 text-xs font-bold text-white/85">
                        <CheckCircle2 size={16} className="text-emerald-300" />
                        {fix}
                      </div>
                    </RevealCard>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#10131b]/95 p-5 shadow-[0_40px_160px_rgba(168,85,247,0.14)] backdrop-blur-xl">
              <AnimatedChart progress={scrollYProgress} />

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-blue-200">
                  Performance Snapshot
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <CounterTile value="92" label="Leads" icon={PhoneCall} index={0} progress={scrollYProgress} />
                  <CounterTile value="$32" label="Avg CPL" icon={DollarSign} index={1} progress={scrollYProgress} />
                  <CounterTile value="$25k" label="Saved" icon={ShieldCheck} index={2} progress={scrollYProgress} />
                  <CounterTile value="↑" label="Lead Quality" icon={TrendingUp} index={3} progress={scrollYProgress} />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-5 grid gap-4 md:grid-cols-4">
            {stats.map((stat, index) => (
              <RevealCard key={stat.label} index={index + 5} progress={scrollYProgress}>
                <div className="min-h-[120px] rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_25px_100px_rgba(37,99,235,0.12)] backdrop-blur-xl">
                  <div className="text-3xl font-black tracking-[-0.06em] text-white">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-black text-white">
                    {stat.label}
                  </div>
                  <p className="mt-2 text-[11px] leading-5 text-white/68">
                    {stat.text}
                  </p>
                </div>
              </RevealCard>
            ))}
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {storyCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <RevealCard key={card.title} index={index + 9} progress={scrollYProgress}>
                  <div className="min-h-[118px] rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl transition hover:-translate-y-2 hover:bg-white/[0.065]">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-200">
                        <Icon size={17} />
                      </div>
                      <h4 className="text-xl font-black tracking-[-0.04em]">
                        {card.title}
                      </h4>
                    </div>
                    <p className="text-[11px] leading-5 text-white/68">
                      {card.text}
                    </p>
                  </div>
                </RevealCard>
              );
            })}
          </div>

          <div className="mx-auto mt-4 h-1.5 w-full max-w-4xl overflow-hidden rounded-full bg-white/10">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-400 shadow-[0_0_22px_rgba(168,85,247,0.75)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}