"use client";

import React, { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import {
  BarChart3,
  Bolt,
  MapPin,
  Search,
  Target,
  TrendingUp,
} from "lucide-react";

const reasons = [
  {
    icon: MapPin,
    title: "Tracking-First Setup",
    text: "Every campaign starts with proper conversion tracking so you know exactly what is driving calls, form submissions, and booked jobs.",
  },
  {
    icon: Target,
    title: "Local Intent Focus",
    text: "We target people actively searching for your services in the exact areas you want to serve, helping you attract better qualified leads.",
  },
  {
    icon: BarChart3,
    title: "Transparent Reporting",
    text: "Clear reporting and performance visibility so you always know where your budget is going, what is working, and what needs improving.",
  },
  {
    icon: Search,
    title: "Search-Term Discipline",
    text: "Ongoing search term reviews and negative keyword management help cut wasted spend and keep campaigns focused on high-intent traffic.",
  },
  {
    icon: TrendingUp,
    title: "ROI-Focused Strategy",
    text: "Every decision is made around lead quality, cost per lead, and real business outcomes — not vanity metrics.",
  },
  {
    icon: Bolt,
    title: "Continuous Optimization",
    text: "We monitor, adjust, and optimize regularly so your campaigns keep improving instead of being left to run on autopilot.",
  },
];

const certifications = [
  {
    title: "Google Ads Search Certification",
    text: "Certified in search campaign strategy, keyword targeting, ad structure, and performance optimization.",
  },
  {
    title: "Google Ads AI-Powered Performance Ads Certification",
    text: "Certified in modern campaign strategy, automation, and AI-assisted performance optimization.",
  },
];

function OrbitCard({
  reason,
  index,
  progress,
}: {
  reason: (typeof reasons)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const Icon = reason.icon;

  const start = 0.12 + index * 0.075;
  const end = start + 0.18;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [90, 0]);
  const scale = useTransform(progress, [start, end], [0.82, 1]);
  const rotate = useTransform(
    progress,
    [start, end],
    [index % 2 === 0 ? -8 : 8, 0]
  );

  return (
    <motion.div
      style={{ opacity, y, scale, rotate }}
      className="group relative overflow-hidden rounded-[2rem] border border-blue-300/20 bg-[#202943] p-6 shadow-[0_30px_120px_rgba(37,99,235,0.3)] backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-blue-300/50 hover:bg-[#263252] hover:shadow-[0_40px_150px_rgba(79,70,229,0.42)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_30%,rgba(59,130,246,0.12)_65%,rgba(168,85,247,0.1))]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(96,165,250,0.32),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(192,132,252,0.24),transparent_42%)] opacity-100" />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-200/90 to-transparent" />

      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-400/25 blur-3xl transition group-hover:bg-purple-400/35" />

      <div className="relative">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/65 to-purple-500/65 text-white ring-1 ring-white/25 shadow-[0_0_28px_rgba(59,130,246,0.35)] transition duration-300 group-hover:scale-110 group-hover:ring-blue-200/70">
          <Icon size={22} />
        </div>

        <h3 className="text-2xl font-black leading-tight tracking-[-0.04em] text-white">
          {reason.title}
        </h3>

        <p className="mt-4 text-sm font-medium leading-7 text-white/85">
          {reason.text}
        </p>
      </div>
    </motion.div>
  );
}

function CertificationCard({
  item,
  index,
  progress,
}: {
  item: (typeof certifications)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.68 + index * 0.08;
  const end = start + 0.16;

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [70, 0]);
  const scale = useTransform(progress, [start, end], [0.9, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="group relative overflow-hidden rounded-[2rem] border border-blue-300/30 bg-[#1f2d50] p-7 text-center shadow-[0_30px_120px_rgba(37,99,235,0.3)] backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-blue-300/60 hover:bg-[#263866]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.38),transparent_42%)] opacity-100" />

      <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-700 text-2xl font-black text-white shadow-[0_0_42px_rgba(37,99,235,0.75)]">
        G
      </div>

      <h3 className="relative text-2xl font-black leading-tight tracking-[-0.04em] text-white">
        {item.title}
      </h3>

      <p className="relative mx-auto mt-4 max-w-md text-sm leading-7 text-white/82">
        {item.text}
      </p>
    </motion.div>
  );
}

export function WhyConvertIQ() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.12], [70, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);

  const centerScale = useTransform(
    scrollYProgress,
    [0.08, 0.45, 0.85],
    [0.7, 1.08, 0.92]
  );
  const centerRotate = useTransform(scrollYProgress, [0.08, 0.85], [-18, 18]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 220]);

  const gridY = useTransform(scrollYProgress, [0.12, 0.35], [80, 0]);
  const gridScale = useTransform(scrollYProgress, [0.12, 0.35], [0.92, 1]);

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="why-us"
      ref={ref}
      className="relative h-[360vh] bg-black text-white"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 py-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_34%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.14),transparent_35%)]" />

        <motion.div
          style={{ rotate: ringRotate }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
        />

        <motion.div
          style={{ rotate: ringRotate }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/10"
        />

        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div
            style={{ opacity: headingOpacity, y: headingY }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-5 inline-flex rounded-full border border-purple-400/25 bg-white/[0.04] px-5 py-2 text-xs font-black uppercase tracking-[0.28em] text-purple-200">
              Why ConvertIQ Media?
            </div>

            <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl">
              A tracking-first system built to generate{" "}
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                qualified leads.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/72 md:text-lg">
              Not just clicks. Not vanity metrics. A full system designed around
              phone calls, quote requests, and booked jobs.
            </p>
          </motion.div>

          <div className="relative mt-12">
            <motion.div
              style={{ scale: centerScale, rotate: centerRotate }}
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/20 bg-blue-500/[0.035] shadow-[0_0_90px_rgba(59,130,246,0.22)] backdrop-blur-xl lg:flex"
            >
              <div className="m-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600/35 to-purple-600/35 text-center text-sm font-black uppercase tracking-[0.2em] text-white/75">
                Lead<br />System
              </div>
            </motion.div>

            <motion.div
              style={{ y: gridY, scale: gridScale }}
              className="relative z-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              {reasons.map((reason, index) => (
                <OrbitCard
                  key={reason.title}
                  reason={reason}
                  index={index}
                  progress={scrollYProgress}
                />
              ))}
            </motion.div>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:px-36">
            {certifications.map((item, index) => (
              <CertificationCard
                key={item.title}
                item={item}
                index={index}
                progress={scrollYProgress}
              />
            ))}
          </div>

          <div className="mx-auto mt-7 h-1.5 max-w-4xl overflow-hidden rounded-full bg-white/10">
            <motion.div
              style={{ width: progressWidth }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-400 shadow-[0_0_18px_rgba(168,85,247,0.65)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}