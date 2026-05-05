"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  CalendarDays,
  CheckCircle2,
  Play,
  Pause,
  Sparkles,
  Target,
  TrendingUp,
  Volume2,
  VolumeX,
  Quote,
  Zap,
  ShieldCheck,
} from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { useLockedSectionProgress } from "@/components/useLockedSectionProgress";


const CALENDLY_URL = "https://calendly.com/kabir-convertiq-media/30min";

// Swap these once your real VSL is rendered. Place the files in /public.
const VIDEO_SRC = "/vsl-full.mp4";
const VIDEO_POSTER = "/vsl-poster.jpg";

const clientLogos = [
  "/clients/Summit Roofing.png",
  "/clients/Clearflow Plumbing.png",
  "/clients/Multi Logo.png",
  "/clients/mrgutter.png",
];

const benefits = [
  {
    icon: Target,
    title: "Where your ad spend is leaking",
    text: "Spot the exact campaigns, keywords, and landing-page steps quietly burning your budget every month.",
  },
  {
    icon: ShieldCheck,
    title: "The 3 tracking layers most businesses miss",
    text: "Why call tracking, form attribution, and offline conversions are the difference between guessing and growing.",
  },
  {
    icon: Zap,
    title: "How to turn clicks into booked jobs",
    text: "The exact landing-page structure we use to convert paid traffic into calls and quote requests.",
  },
  {
    icon: TrendingUp,
    title: "Why ROAS isn't your real metric",
    text: "How to measure what actually matters — cost per qualified lead, booked jobs, and lifetime customer value.",
  },
];

const testimonials = [
  {
    name: "Marcus T.",
    role: "Owner, Summit Roofing",
    quote:
      "We went from 4 inbound calls a week to nearly 4 a day. Their tracking setup finally showed us which keywords were actually closing jobs.",
    stars: 5,
  },
  {
    name: "Priya K.",
    role: "Operations, Clearflow Plumbing",
    quote:
      "Within 6 weeks our cost per booked job dropped by more than half. The dashboards alone are worth it.",
    stars: 5,
  },
  {
    name: "David R.",
    role: "Founder, Mr. Gutter",
    quote:
      "Straightforward team, no fluff. They rebuilt our landing page and now we actually know where every lead came from.",
    stars: 5,
  },
];

const finalCtaChecks = [
  "30-minute strategy call",
  "Free funnel and tracking review",
  "No-pressure, no-obligation",
];

/* ─────────────────────────────────────────────────────────────────────────
   Magnetic CTA — self-contained version of your existing MagneticButton.
   ───────────────────────────────────────────────────────────────────────── */
type CTAVariant = "sky" | "purple" | "blue";

function MagneticCTA({
  href,
  children,
  variant = "purple",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: CTAVariant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const styles: Record<CTAVariant, string> = {
    sky: "bg-[#38bdf8] text-black shadow-[0_0_45px_rgba(56,189,248,0.5)] hover:bg-[#7dd3fc]",
    purple:
      "bg-[#8b45d9] text-white shadow-[0_0_45px_rgba(168,85,247,0.45)] hover:bg-purple-500",
    blue: "bg-[#1600b8] text-white shadow-[0_0_45px_rgba(37,99,235,0.4)] hover:bg-blue-700",
  };

  const handleMove = (e: React.MouseEvent) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    node.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };

  const handleLeave = () => {
    const node = ref.current;
    if (node) node.style.transform = "translate(0px, 0px)";
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className={className}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[13px] font-black tracking-tight transition md:px-9 md:py-4 md:text-sm ${styles[variant]}`}
      >
        {children}
      </a>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HERO SCROLL — everything (badge, headline, subheadline, video placeholder,
   CTA, trust line) lives INSIDE the ContainerScroll frame, with each piece
   tied to the frame's scroll progress. Mirrors HeroScrollDemo.
   ───────────────────────────────────────────────────────────────────────── */
function HeroFrameContent({ progress }: { progress: MotionValue<number> }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Background motion inside the hero frame
  const bgScale = useTransform(progress, [0, 1], [1.04, 1.14]);
  const bgY = useTransform(progress, [0, 1], [12, -30]);

  // Keep the headline visible immediately, then subtly lift it as the video arrives.
  const headlineY = useTransform(progress, [0, 0.18, 0.72], [20, 0, -6]);
  const headlineScale = useTransform(progress, [0, 0.2, 0.72], [0.96, 1, 0.98]);

  const subOpacity = useTransform(progress, [0.05, 0.2], [0, 1]);
  const subY = useTransform(progress, [0.05, 0.2], [18, 0]);

  // Video appears early so visitors immediately know there is something to watch.
  const videoOpacity = useTransform(progress, [0.12, 0.28], [0, 1]);
  const videoY = useTransform(progress, [0.12, 0.28], [42, 0]);
  const videoScale = useTransform(progress, [0.12, 0.32, 0.88], [0.84, 1, 1.04]);

  const watchPulseOpacity = useTransform(progress, [0.26, 0.45, 0.9], [0, 1, 1]);
  const watchPulseScale = useTransform(progress, [0.26, 0.45, 0.9], [0.85, 1, 1.04]);

  const ctaOpacity = useTransform(progress, [0.62, 0.78], [0, 1]);
  const ctaY = useTransform(progress, [0.62, 0.78], [24, 0]);

  const trustOpacity = useTransform(progress, [0.78, 1], [0, 1]);
  const trustY = useTransform(progress, [0.78, 1], [18, 0]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;

    if (v.paused) {
      void v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;

    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  return (
    <div className="relative h-full w-full overflow-hidden rounded-2xl">
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_24%_24%,rgba(124,58,237,0.4),transparent_48%),radial-gradient(circle_at_72%_78%,rgba(37,99,235,0.33),transparent_52%),linear-gradient(180deg,#0a0a12_0%,#05050a_100%)]"
      />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.02),rgba(0,0,0,0.58))]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_78%)]" />

      <motion.div
        animate={{ opacity: [0.12, 0.24, 0.12], scale: [1, 1.1, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-[58%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/20 blur-[90px] md:h-[520px] md:w-[520px] md:blur-[140px]"
      />

      <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 py-6 text-center md:px-8 md:py-10">
        <motion.div
          style={{ y: headlineY, scale: headlineScale }}
          className="flex flex-col items-center"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-purple-100 backdrop-blur md:mb-5 md:px-4 md:py-1.5 md:text-xs">
            <Sparkles size={12} className="text-purple-300" />
            Free Training
          </div>

          <h1 className="max-w-5xl text-[1.85rem] font-black leading-[0.94] tracking-[-0.065em] text-white min-[390px]:text-[2.05rem] md:text-5xl md:leading-[0.95] lg:text-6xl">
            Watch how we generate <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-300 bg-clip-text text-transparent">
              30+ qualified leads a month
            </span>{" "}
            <br className="hidden md:block" />
            for local service businesses.
          </h1>

          <motion.p
            style={{ opacity: subOpacity, y: subY }}
            className="mt-3 max-w-[340px] text-[12.5px] font-medium leading-6 text-white/75 md:mt-5 md:max-w-2xl md:text-base md:leading-7"
          >
            Watch the short walkthrough below — it breaks down the exact
            tracking-first Google Ads system we use to turn clicks into booked
            jobs.
          </motion.p>
        </motion.div>

        <motion.div
          style={{ opacity: videoOpacity, y: videoY, scale: videoScale }}
          className="relative mt-5 w-full max-w-[345px] md:mt-8 md:max-w-3xl"
        >
          <motion.div
            style={{ opacity: watchPulseOpacity, scale: watchPulseScale }}
            className="pointer-events-none absolute -inset-4 rounded-[1.8rem] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.48),transparent_62%)] blur-2xl md:-inset-8"
          />

          <div className="relative overflow-hidden rounded-xl border border-white/15 bg-black shadow-[0_35px_120px_rgba(59,130,246,0.35),0_18px_70px_rgba(168,85,247,0.24)] md:rounded-2xl">
            <div className="pointer-events-none absolute inset-0 z-10 rounded-xl ring-1 ring-inset ring-white/10 md:rounded-2xl" />

            <div className="relative aspect-video w-full">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                src={VIDEO_SRC}
                poster={VIDEO_POSTER}
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
              />

              {!isPlaying && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Play video"
                  className="absolute inset-0 z-20 flex items-center justify-center bg-gradient-to-b from-black/34 via-black/12 to-black/62 backdrop-blur-[1px] transition"
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 35px rgba(255,255,255,0.35)",
                        "0 0 75px rgba(255,255,255,0.62)",
                        "0 0 35px rgba(255,255,255,0.35)",
                      ],
                    }}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_0_50px_rgba(255,255,255,0.5)] md:h-20 md:w-20"
                  >
                    <span className="absolute inset-0 animate-ping rounded-full bg-white/25" />
                    <Play
                      size={22}
                      className="relative ml-0.5 md:hidden"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                    <Play
                      size={30}
                      className="relative ml-1 hidden md:block"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  </motion.div>

                  <span className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/65 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-white/95 backdrop-blur md:bottom-5 md:px-4 md:py-1.5 md:text-[11px]">
                    Tap to watch
                  </span>

                  <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/55 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/80 backdrop-blur md:left-5 md:top-5 md:text-[10px]">
                    2 min video
                  </span>
                </button>
              )}

              {isPlaying && (
                <div className="absolute bottom-2 right-2 z-20 flex gap-1.5 md:bottom-4 md:right-4 md:gap-2">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute" : "Mute"}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75 md:h-10 md:w-10"
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>

                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label="Pause"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75 md:h-10 md:w-10"
                  >
                    <Pause size={14} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY }}
          className="mt-4 md:mt-7"
        >
          <MagneticCTA href={CALENDLY_URL} variant="sky">
            <CalendarDays size={16} />
            Book a Free Strategy Call
          </MagneticCTA>
        </motion.div>

        <motion.div
          style={{ opacity: trustOpacity, y: trustY }}
          className="mt-3 inline-flex max-w-[330px] flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-2 text-[10.5px] font-bold text-white/80 backdrop-blur-xl md:mt-5 md:max-w-none md:gap-3 md:rounded-full md:px-5 md:py-2.5 md:text-xs"
        >
          <span className="text-yellow-300">★★★★★</span>
          <span>5 Stars on Google</span>
          <span className="hidden h-1 w-1 rounded-full bg-white/35 md:block" />
          <span className="text-white/65 md:text-white/80">
            Trusted by 25+ home service businesses
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function HeroScroll() {
  return (
    <section
      id="vsl-hero"
      className="relative overflow-hidden bg-black text-white"
    >
      <ContainerScroll>
        {(progress) => <HeroFrameContent progress={progress} />}
      </ContainerScroll>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   TRUSTED-BY — taller banner, regular CSS marquee (not scroll-tied).
   ───────────────────────────────────────────────────────────────────────── */
const MARQUEE_CSS = `
@keyframes vsl-marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.vsl-marquee-track {
  animation: vsl-marquee-scroll 55s linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .vsl-marquee-track { animation: none; }
}
`;

function TrustedBy() {
  const repeated = Array(12).fill(clientLogos).flat() as string[];

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="relative border-y border-white/10 bg-black/40 py-14 md:py-20"
    >
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_CSS }} />

      <p className="mx-auto mb-8 text-center text-[10px] font-black uppercase tracking-[0.32em] text-white/45 md:mb-12 md:text-xs">
        Trusted by local service businesses
      </p>

      <div className="overflow-hidden">
        <div className="vsl-marquee-track flex w-max items-center">
          {repeated.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="flex shrink-0 items-center justify-center px-7 md:px-12"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="Client logo"
                className="h-20 w-auto object-contain opacity-75 transition duration-300 hover:opacity-100 md:h-32"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   BENEFITS — every card is scroll-linked individually.
   ───────────────────────────────────────────────────────────────────────── */
function BenefitCard({
  benefit,
  index,
  progress,
}: {
  benefit: (typeof benefits)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const Icon = benefit.icon;

  const start = 0.1 + index * 0.12;
  const end = Math.min(start + 0.28, 0.95);

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [120, 0]);
  const scale = useTransform(progress, [start, end], [0.85, 1]);
  const rotate = useTransform(
    progress,
    [start, end],
    [index % 2 === 0 ? -5 : 5, 0]
  );
  const x = useTransform(
    progress,
    [start, end],
    [index % 2 === 0 ? -40 : 40, 0]
  );

  return (
    <motion.div
      style={{ opacity, y, scale, rotate, x }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:border-purple-300/30 md:rounded-3xl md:p-7"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_40%)] opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="relative flex gap-4 md:gap-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/35 to-purple-500/35 text-white shadow-[0_0_28px_rgba(59,130,246,0.3)] ring-1 ring-white/15 md:h-14 md:w-14 md:rounded-2xl">
          <Icon size={20} className="md:hidden" />
          <Icon size={24} className="hidden md:block" />
        </div>

        <div className="flex-1">
          <h3 className="text-base font-black tracking-[-0.03em] md:text-xl">
            {benefit.title}
          </h3>
          <p className="mt-2 text-[13px] leading-6 text-white/70 md:text-[15px] md:leading-7">
            {benefit.text}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Benefits() {
 const { ref, progress } = useLockedSectionProgress(0.00115);

  const headingY = useTransform(progress, [0, 0.18], [70, 0]);
  const headingOpacity = useTransform(progress, [0, 0.18], [0, 1]);
  const headingScale = useTransform(progress, [0, 0.18], [0.92, 1]);

  const progressBarWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative h-screen overflow-hidden bg-black px-4 py-16 text-white md:px-6 md:py-20"
    >
      <div className="flex h-full items-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_38%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.12),transparent_38%)]" />

        <div className="relative mx-auto w-full max-w-6xl">
          <motion.div
            style={{ y: headingY, opacity: headingOpacity, scale: headingScale }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-4 inline-flex rounded-full border border-purple-400/25 bg-white/[0.04] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-purple-200 md:mb-5 md:text-xs">
              What you&apos;ll learn
            </div>

            <h2 className="text-[1.85rem] font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">
              Everything inside this short training.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65 md:mt-6 md:text-base md:leading-8">
              No fluff. No theory. Just the exact playbook we use with our local
              service clients.
            </p>
          </motion.div>

          <div className="mt-8 grid gap-3 md:mt-14 md:grid-cols-2 md:gap-6">
            {benefits.map((b, i) => (
              <BenefitCard
                key={b.title}
                benefit={b}
                index={i}
                progress={progress}
              />
            ))}
          </div>

          <div className="mx-auto mt-8 h-1 max-w-2xl overflow-hidden rounded-full bg-white/10 md:mt-14">
            <motion.div
              style={{ width: progressBarWidth }}
              className="h-full rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-fuchsia-400"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   TESTIMONIALS — cards drift in opposite x-directions and rotate as you
   scroll past, plus a parallax background gradient.
   ───────────────────────────────────────────────────────────────────────── */
function TestimonialCard({
  testimonial,
  index,
  progress,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.15 + index * 0.13;
  const end = Math.min(start + 0.3, 0.95);

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [120, 0]);
  const scale = useTransform(progress, [start, end], [0.85, 1]);
  const xFrom = index === 0 ? -90 : index === 2 ? 90 : 0;
  const x = useTransform(progress, [start, end], [xFrom, 0]);
  const rotate = useTransform(
    progress,
    [start, end],
    [index === 1 ? 0 : index === 0 ? -8 : 8, 0]
  );

  return (
    <motion.div
      style={{ opacity, y, scale, x, rotate }}
      whileHover={{ y: -10, scale: 1.03 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.015] p-5 backdrop-blur-xl md:rounded-3xl md:p-7"
    >
      <Quote
        size={28}
        className="absolute right-4 top-4 text-purple-300/30 md:right-6 md:top-6"
      />

      <div className="mb-3 text-yellow-300">{"★".repeat(testimonial.stars)}</div>

      <p className="text-[13.5px] font-medium leading-7 text-white/85 md:text-[15px] md:leading-8">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40 text-sm font-black text-white ring-1 ring-white/10">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-black text-white">{testimonial.name}</div>
          <div className="text-[11px] font-semibold text-white/55 md:text-xs">
            {testimonial.role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 23,
    mass: 0.42,
  });

  const headingY = useTransform(progress, [0, 0.3], [70, 0]);
  const headingOpacity = useTransform(progress, [0, 0.2], [0, 1]);
  const bgY = useTransform(progress, [0, 1], [0, -80]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/10 px-4 py-20 md:px-6 md:py-28"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.14),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.12),transparent_42%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex rounded-full border border-sky-400/25 bg-white/[0.04] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-sky-200 md:text-xs">
            What clients say
          </div>

          <h2 className="text-[1.85rem] font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">
            Real results from real local businesses.
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3 md:gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.name}
              testimonial={t}
              index={i}
              progress={progress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FINAL CTA — scale-up + headline parallax + gradient ring rotation.
   ───────────────────────────────────────────────────────────────────────── */
function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 23,
    mass: 0.42,
  });

  const cardScale = useTransform(progress, [0.1, 0.55], [0.85, 1]);
  const cardY = useTransform(progress, [0.1, 0.55], [80, 0]);
  const cardOpacity = useTransform(progress, [0.1, 0.45], [0, 1]);

  const headingY = useTransform(progress, [0.15, 0.6], [40, 0]);
  const headingScale = useTransform(progress, [0.15, 0.6], [0.95, 1]);

  const ctaY = useTransform(progress, [0.3, 0.7], [40, 0]);
  const ctaOpacity = useTransform(progress, [0.3, 0.65], [0, 1]);

  const ringRotate = useTransform(progress, [0, 1], [0, 180]);
  const ringScale = useTransform(progress, [0.1, 0.6], [0.7, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/10 px-4 py-20 md:px-6 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),transparent_45%),radial-gradient(circle_at_bottom,rgba(37,99,235,0.18),transparent_45%)]" />

      <motion.div
        style={{ rotate: ringRotate, scale: ringScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 md:block"
      />
      <motion.div
        style={{ rotate: ringRotate, scale: ringScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/15 md:block"
      />

      <motion.div
        style={{ y: cardY, scale: cardScale, opacity: cardOpacity }}
        className="relative mx-auto max-w-4xl text-center"
      >
        <motion.h2
          style={{ y: headingY, scale: headingScale }}
          className="text-[2rem] font-black leading-[0.95] tracking-[-0.06em] md:text-6xl"
        >
          Ready to see what your funnel{" "}
          <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
            could be doing?
          </span>
        </motion.h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 md:mt-6 md:text-lg md:leading-8">
          Book a free 30-minute strategy call. We&apos;ll review your ads, your
          tracking, and where leads are leaking — and tell you exactly what to
          fix first.
        </p>

        <motion.div
          style={{ y: ctaY, opacity: ctaOpacity }}
          className="mt-7 flex flex-col items-center gap-5 md:mt-10"
        >
          <MagneticCTA href={CALENDLY_URL} variant="purple">
            <CalendarDays size={18} />
            Book My Free Strategy Call
          </MagneticCTA>

          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] font-semibold text-white/65 md:text-xs">
            {finalCtaChecks.map((c) => (
              <li key={c} className="flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-300" />
                {c}
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   Page wrapper + global scroll progress bar at the very top.
   ───────────────────────────────────────────────────────────────────────── */
function PageScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    mass: 0.4,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-blue-400 via-purple-400 to-fuchsia-400"
    />
  );
}

export function VSLContent() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.hash) return;

    const el = document.querySelector(window.location.hash);
    if (!el) return;

    const timer = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-black text-white">
      <PageScrollBar />
      <HeroScroll />
      <TrustedBy />
      <Benefits />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}
