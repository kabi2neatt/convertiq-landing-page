"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarDays, Mail, Phone } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/kabir-convertiq-media/30min";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-5 py-10 text-white md:px-6 md:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.14),transparent_32%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.1fr_0.9fr_0.9fr]">
        <div>
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [-1.5, 1.5, -1.5],
              scale: [1, 1.035, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-3xl bg-white p-3 shadow-[0_0_50px_rgba(56,189,248,0.24)]"
          >
            <motion.div
              className="absolute inset-0 rounded-3xl border border-sky-300/30"
              animate={{ scale: [1, 1.16, 1], opacity: [0.7, 0.15, 0.7] }}
              transition={{ duration: 3.2, repeat: Infinity }}
            />
            <Image
              src="/convertiqmedia.png"
              alt="ConvertIQ Media"
              width={180}
              height={180}
              className="relative z-10 h-full w-full object-contain"
            />
          </motion.div>

          <h3 className="text-2xl font-black tracking-[-0.04em]">
            ConvertIQ Media
          </h3>
          <p className="mt-3 max-w-md text-sm leading-7 text-white/60">
            High-intent Google Ads, conversion-focused websites, and tracking
            systems built for local service businesses.
          </p>
        </div>

        <div>
          <div className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-white/40">
            Navigation
          </div>

          <div className="grid gap-3 text-sm font-semibold text-white/70">
            <Link href="#home" className="transition hover:text-sky-300">
              Home
            </Link>
            <Link href="#services" className="transition hover:text-sky-300">
              Services
            </Link>
            <Link href="#case-study" className="transition hover:text-sky-300">
              Case Study
            </Link>
            <Link href="#why-us" className="transition hover:text-sky-300">
              Why Us
            </Link>
            <Link href="#contact" className="transition hover:text-sky-300">
              Contact
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-white/40">
            Contact
          </div>

          <div className="grid gap-3">
            <motion.a
              href="mailto:contact@convertiqmedia.info"
              whileHover={{ x: 6 }}
              className="flex items-center gap-3 break-words rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-sm font-semibold text-white/70 transition hover:border-sky-300/30 hover:text-sky-200"
            >
              <Mail size={17} className="shrink-0" />
              <span className="break-all">contact@convertiqmedia.info</span>
            </motion.a>

            <motion.a
              href="tel:+16477779147"
              whileHover={{ x: 6 }}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-3 text-sm font-semibold text-white/70 transition hover:border-sky-300/30 hover:text-sky-200"
            >
              <Phone size={17} />
              647-777-9147
            </motion.a>

            <motion.a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 6, scale: 1.02 }}
              className="flex items-center gap-3 rounded-2xl border border-sky-300/20 bg-sky-400/10 p-3 text-sm font-bold text-sky-100 transition hover:border-sky-300/50 hover:bg-sky-400/20"
            >
              <CalendarDays size={17} />
              Book a strategy call
            </motion.a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/40 md:mt-12 md:flex-row">
        <span>© {new Date().getFullYear()} ConvertIQ Media. All rights reserved.</span>
        <span>Built for calls, quote requests, and booked jobs.</span>
      </div>
    </footer>
  );
}
