"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Globe2,
  HelpCircle,
  LayoutDashboard,
  Users,
  ShieldCheck,
  ClipboardCheck,
  Zap,
  FileText,
} from "lucide-react";

const CALENDLY_URL = "https://calendly.com/kabir-convertiq-media/30min";

function MagneticButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || !ref.current) return;

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current.style.transform = `translate(${x * 0.14}px, ${y * 0.14}px)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  const items = [
    {
      href: "#who-we-help",
      icon: Users,
      title: "Who We Help",
      desc: "Local service businesses ready for more calls.",
    },
    {
      href: "#services",
      icon: Globe2,
      title: "Our Services",
      desc: "Web design, Google Ads, funnels, and tracking.",
    },
    {
      href: "#process",
      icon: LayoutDashboard,
      title: "Our Process",
      desc: "How we turn traffic into booked jobs.",
    },
    {
      href: "#case-study",
      icon: BarChart3,
      title: "Case Study",
      desc: "See how wasted spend becomes qualified leads.",
    },
    {
      href: "#why-us",
      icon: ShieldCheck,
      title: "Why Us?",
      desc: "Why ConvertIQ is built for local lead gen.",
    },
    {
      href: "#faq",
      icon: HelpCircle,
      title: "FAQ",
      desc: "Common questions before booking.",
    },
    {
      href: "/privacy-policy",
      icon: FileText,
      title: "Privacy Policy",
      desc: "How submitted information is handled.",
    },
  ];

  return (
    <header className="fixed left-0 top-0 z-[1000] w-full border-b border-white/10 bg-black/85 backdrop-blur-xl">
      <div className="mx-auto flex h-[88px] max-w-7xl items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-center">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-blue-500/20 blur-2xl"
              animate={{
                opacity: [0.2, 0.5, 0.2],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <Image
              src="/convertiqmedia.png"
              alt="ConvertIQ Media"
              width={160}
              height={70}
              className="relative z-10 h-[64px] w-auto object-contain"
              priority
            />
          </motion.div>
        </Link>

        <nav className="hidden items-center gap-8 text-[15px] font-semibold text-white md:flex">
          <Link href="#home" className="transition hover:text-purple-300">
            Home
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button className="flex items-center gap-2 text-[15px] font-semibold transition hover:text-purple-300">
              Navigation
              <motion.span animate={{ rotate: open ? 180 : 0 }}>⌄</motion.span>
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 14, scale: 0.96 }}
                  transition={{ duration: 0.22 }}
                  className="absolute left-1/2 top-full mt-6 w-[760px] -translate-x-1/2 overflow-hidden rounded-3xl border border-white/10 bg-black/90 p-3 shadow-[0_30px_120px_rgba(79,70,229,0.32)] backdrop-blur-2xl"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(79,70,229,0.28),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_35%)]" />

                  <div className="relative grid grid-cols-3 gap-2">
                    {items.map((item) => {
                      const Icon = item.icon;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="group rounded-2xl border border-white/5 bg-white/[0.035] p-4 transition hover:border-purple-400/40 hover:bg-white/[0.07]"
                        >
                          <div className="flex gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 text-purple-200 ring-1 ring-white/10 transition group-hover:scale-105">
                              <Icon size={18} />
                            </div>

                            <div>
                              <div className="text-[14px] font-bold text-white">
                                {item.title}
                              </div>
                              <p className="mt-1 text-xs leading-5 text-white/55">
                                {item.desc}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="relative mt-3 rounded-2xl border border-purple-400/20 bg-purple-500/10 p-4">
                    <div className="text-sm font-bold text-white">
                      Want us to review your funnel?
                    </div>
                    <p className="mt-1 text-xs text-white/55">
                      Book a free call and we’ll show you where leads are being
                      lost.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <MagneticButton>
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("open-convertiq-form", {
                    detail: { type: "demo" },
                  })
                );
              }}
              className="block rounded-xl bg-[#1600b8] px-7 py-3 text-[14px] font-semibold text-white shadow-[0_0_30px_rgba(37,99,235,0.3)] transition hover:bg-blue-700"
            >
              Get A Free Demo
            </button>
          </MagneticButton>

          <MagneticButton>
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("open-convertiq-form", {
                    detail: { type: "audit" },
                  })
                );
              }}
              className="block rounded-xl bg-[#8b45d9] px-7 py-3 text-[14px] font-semibold text-white shadow-[0_0_30px_rgba(168,85,247,0.3)] transition hover:bg-purple-500"
            >
              Free Google Ads Audit
            </button>
          </MagneticButton>

          <MagneticButton>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl bg-[#38bdf8] px-7 py-3 text-[14px] font-semibold text-black shadow-[0_0_30px_rgba(56,189,248,0.35)] transition hover:bg-sky-300"
            >
              Book Call
            </a>
          </MagneticButton>
        </nav>

        <MagneticButton className="md:hidden">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg bg-[#38bdf8] px-5 py-2.5 text-[13px] font-semibold text-black shadow-[0_0_20px_rgba(56,189,248,0.3)]"
          >
            Book Call
          </a>
        </MagneticButton>
      </div>
    </header>
  );
}