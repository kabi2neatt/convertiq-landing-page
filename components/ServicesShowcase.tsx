"use client";

import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { BarChart3, LayoutDashboard, LineChart, MonitorSmartphone, Zap } from "lucide-react";
import { useLockedSectionProgress } from "@/components/useLockedSectionProgress";

const services = [
  ["Google Ads Management", BarChart3, "High-intent campaigns designed to generate calls, form submissions, and booked jobs."],
  ["Website Design & Development", LayoutDashboard, "Fast, mobile-first websites built to convert traffic into quote requests."],
  ["Conversion Tracking & Reporting", LineChart, "Full tracking so you know exactly what is driving leads and where to scale."],
  ["Landing Page Optimization", MonitorSmartphone, "Improve structure, messaging, and CTAs so more visitors become qualified leads."],
  ["Lead Follow-Up Automation", Zap, "Faster follow-up systems that reduce missed opportunities and improve bookings."],
] as const;

function ServiceCard({ service, index, progress, mobile = false }: { service: (typeof services)[number]; index: number; progress: MotionValue<number>; mobile?: boolean }) {
  const [title, Icon, text] = service;
  const start = mobile ? 0.07 + index * 0.13 : 0.1 + index * 0.08;
  const mid = start + (mobile ? 0.09 : 0.1);
  const end = Math.min(start + (mobile ? 0.18 : 0.2), 0.92);
  const opacity = useTransform(progress, [start, mid, end], [0, 1, mobile && index !== services.length - 1 ? 0 : 1]);
  const y = useTransform(progress, [start, mid, end], [90, 0, mobile && index !== services.length - 1 ? -70 : 0]);
  const scale = useTransform(progress, [start, mid, end], [0.88, 1, mobile && index !== services.length - 1 ? 0.94 : 1]);
  const rotate = useTransform(progress, [start, mid], [index % 2 === 0 ? -7 : 7, 0]);

  return (
    <motion.div style={{ opacity, y, scale, rotate }} className={mobile ? "absolute inset-0" : ""}>
      <div className="relative h-full min-h-[340px] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#141824] p-6 shadow-[0_35px_120px_rgba(37,99,235,0.2)] backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.24),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_38%)]" />
        <div className="relative">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/55 to-purple-600/55 text-white ring-1 ring-white/15"><Icon size={22} /></div>
            <span className="text-xs font-black text-white/35">{String(index + 1).padStart(2, "0")}</span>
          </div>
          <h3 className="text-2xl font-black leading-tight tracking-[-0.05em]">{title}</h3>
          <p className="mt-4 text-sm leading-7 text-white/70">{text}</p>
          <div className="mt-6 h-px w-full bg-gradient-to-r from-blue-400/50 via-purple-400/30 to-transparent" />
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.22em] text-white/35">Built for local lead generation</p>
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesShowcase() {
  const { ref, progress } = useLockedSectionProgress({ speed: 0.00108 });
  const headingOpacity = useTransform(progress, [0, 0.1], [0, 1]);
  const headingY = useTransform(progress, [0, 0.1], [70, 0]);
  const gridY = useTransform(progress, [0.12, 0.28], [90, 0]);
  const gridScale = useTransform(progress, [0.12, 0.28], [0.92, 1]);
  const progressWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="services" ref={ref as React.RefObject<HTMLElement>} className="relative min-h-screen bg-black text-white">
      <div className="flex min-h-screen items-center overflow-visible px-5 py-20 md:px-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.2),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_32%)]" />
        <div className="relative mx-auto w-full max-w-7xl">
          <motion.div style={{ opacity: headingOpacity, y: headingY }} className="mx-auto max-w-4xl text-center">
            <div className="mb-4 inline-flex rounded-full border border-blue-400/25 bg-white/[0.04] px-5 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-blue-200 md:text-xs">Our Services</div>
            <h2 className="text-4xl font-black leading-[0.92] tracking-[-0.07em] md:text-6xl">Everything needed to turn search into <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">qualified leads.</span></h2>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-white/60 md:text-base">Website, ads, tracking, landing pages, and follow-up systems built around calls, quotes, and booked jobs.</p>
          </motion.div>
          <div className="relative mt-9 h-[390px] md:hidden">{services.map((service, index) => <ServiceCard key={service[0]} service={service} index={index} progress={progress} mobile />)}</div>
          <motion.div style={{ y: gridY, scale: gridScale }} className="mt-9 hidden md:block">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.slice(0, 3).map((service, index) => <ServiceCard key={service[0]} service={service} index={index} progress={progress} />)}</div>
            <div className="mt-5 flex justify-center gap-5">{services.slice(3).map((service, index) => <div key={service[0]} className="w-full max-w-[405px]"><ServiceCard service={service} index={index + 3} progress={progress} /></div>)}</div>
          </motion.div>
          <div className="mx-auto mt-6 h-1.5 max-w-3xl overflow-hidden rounded-full bg-white/10"><motion.div style={{ width: progressWidth }} className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-400" /></div>
        </div>
      </div>
    </section>
  );
}
