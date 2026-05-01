"use client";

import React, { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import {
  BarChart3,
  MonitorSmartphone,
  LineChart,
  Zap,
  LayoutDashboard,
} from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "Google Ads Management",
    description:
      "We build and manage high-intent Google Ads campaigns designed to generate consistent calls, form submissions, and booked jobs.",
    bullets: [
      "Keyword research and targeting",
      "Campaign structure and setup",
      "Ad copywriting and testing",
      "Bid strategy optimization",
      "Ongoing campaign management",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Website Design & Development",
    description:
      "We build high-converting websites designed specifically for service businesses that rely on calls, quotes, and booked jobs.",
    bullets: [
      "Conversion-focused layouts",
      "Fast mobile-first design",
      "Service-specific page structure",
      "Trust elements & social proof",
      "Built to support ad campaigns",
    ],
  },
  {
    icon: LineChart,
    title: "Conversion Tracking & Reporting",
    description:
      "We implement full conversion tracking so you know exactly where your leads are coming from, what is driving results, and where to scale.",
    bullets: [
      "Conversion tracking setup",
      "Google Tag Manager configuration",
      "Call tracking integration",
      "Lead attribution setup",
      "Performance reporting dashboards",
    ],
  },
  {
    icon: MonitorSmartphone,
    title: "Landing Page Optimization",
    description:
      "We improve your landing page structure, messaging, and calls to action so more visitors turn into qualified leads.",
    bullets: [
      "Conversion-focused page layouts",
      "Message match optimization",
      "CTA improvements",
      "A/B testing recommendations",
      "Page speed improvements",
    ],
  },
  {
    icon: Zap,
    title: "Lead Follow-Up Automation",
    description:
      "We help businesses respond faster with automation systems that reduce missed opportunities and improve booking rates.",
    bullets: [
      "Instant lead follow-up",
      "SMS and email automation",
      "CRM integration",
      "Appointment booking workflows",
      "Missed lead recovery systems",
    ],
  },
];

function ServiceCard({
  service,
  index,
  progress,
}: {
  service: (typeof services)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const Icon = service.icon;

  const start = index * 0.08;
  const mid = start + 0.14;

  const y = useTransform(progress, [start, mid], [90, 0]);
  const rotateX = useTransform(progress, [start, mid], [18, 0]);
  const rotateY = useTransform(
    progress,
    [start, mid],
    [index % 2 === 0 ? -10 : 10, 0]
  );
  const scale = useTransform(progress, [start, mid], [0.88, 1]);

  return (
    <motion.div
      style={{
        y,
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
      }}
      className="relative transform-gpu"
    >
      <div className="group relative min-h-[330px] overflow-hidden rounded-[1.75rem] border border-white/12 bg-[#141824] p-6 shadow-[0_35px_120px_rgba(37,99,235,0.2)] backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-blue-300/40 hover:bg-[#181d2b] hover:shadow-[0_45px_140px_rgba(79,70,229,0.32)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_38%)]" />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/70 to-transparent" />

        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-blue-500/15 blur-3xl transition duration-500 group-hover:bg-purple-500/25" />

        <div className="relative" style={{ transform: "translateZ(32px)" }}>
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/50 to-purple-600/50 text-blue-100 ring-1 ring-white/15 transition duration-300 group-hover:scale-110 group-hover:ring-blue-300/50">
              <Icon size={22} />
            </div>

            <div className="text-xs font-bold text-white/40">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          <h3 className="text-2xl font-black leading-tight tracking-[-0.04em] text-white">
            {service.title}
          </h3>

          <p className="mt-4 text-sm leading-7 text-white/75">
            {service.description}
          </p>

          <ul className="mt-5 space-y-2.5 text-xs font-semibold text-white/90">
            {service.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesShowcase() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const headingY = useTransform(scrollYProgress, [0, 0.08], [50, 0]);
  const gridY = useTransform(scrollYProgress, [0.08, 0.2], [80, 0]);
  const gridRotateX = useTransform(scrollYProgress, [0.08, 0.25], [14, 0]);
  const gridScale = useTransform(scrollYProgress, [0.08, 0.25], [0.92, 1]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="services"
      ref={ref}
      className="relative h-[290vh] bg-black text-white"
    >
      <div className="sticky top-0 flex h-screen items-center overflow-hidden px-6 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_32%)]" />

        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div
            style={{ y: headingY }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-4 inline-flex rounded-full border border-blue-400/25 bg-white/[0.04] px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-blue-200">
              Our Services
            </div>

            <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">
              Everything needed to turn search traffic into{" "}
              <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                qualified leads.
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-white/60 md:text-base">
              Website, ads, tracking, optimization, and follow-up systems built
              around calls, quotes, and booked jobs.
            </p>
          </motion.div>

          <motion.div
            style={{
              y: gridY,
              rotateX: gridRotateX,
              scale: gridScale,
              perspective: 1400,
            }}
            className="mt-9"
          >
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 3).map((service, index) => (
                <ServiceCard
                  key={service.title}
                  service={service}
                  index={index}
                  progress={scrollYProgress}
                />
              ))}
            </div>

            <div className="mt-5 flex flex-col justify-center gap-5 md:flex-row">
              {services.slice(3, 5).map((service, index) => (
                <div key={service.title} className="w-full md:max-w-[405px]">
                  <ServiceCard
                    service={service}
                    index={index + 3}
                    progress={scrollYProgress}
                  />
                </div>
              ))}
            </div>
          </motion.div>

          <div className="mx-auto mt-6 h-1.5 max-w-3xl overflow-hidden rounded-full bg-white/10">
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