"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Captions,
  CheckCircle2,
  MousePointerClick,
  Pause,
  PhoneCall,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Volume2,
  VolumeX,
  Zap,
} from "lucide-react";
import { useLockedSectionProgress } from "@/components/useLockedSectionProgress";

/*
  SETUP
  1) Put your portrait UGC video in /public as: /vsl-ugc-portrait.mp4
  2) Put a poster image in /public as: /vsl-ugc-poster.jpg
  3) Optional captions file in /public as: /vsl-captions.vtt
  4) Replace TYPEFORM_URL with your real Typeform link.

  Typeform → Calendly setup:
  - Collect name, email, phone, company, website, industry in Typeform.
  - At the end of Typeform, redirect to Calendly.
  - In Typeform, use your actual field variables to prefill Calendly:
    https://calendly.com/kabir-convertiq-media/30min?name={{name}}&email={{email}}&a1={{phone}}&a2={{company}}
*/

const TYPEFORM_URL = "https://form.typeform.com/to/YOUR_TYPEFORM_ID";
const CALENDLY_URL = "https://calendly.com/kabir-convertiq-media/30min";
const VIDEO_SRC = "/vsl-ugc-portrait.mp4";
const VIDEO_POSTER = "/vsl-ugc-poster.jpg";
const CAPTIONS_SRC = "/vsl-captions.vtt";

const clientLogos = [
  "/clients/Summit Roofing.png",
  "/clients/Clearflow Plumbing.png",
  "/clients/Multi Logo.png",
  "/clients/mrgutter.png",
];

const benefits = [
  {
    icon: Target,
    title: "Why your ads are getting clicks, not customers",
    text: "See the gaps that cause local businesses to waste budget on traffic that never turns into booked jobs.",
  },
  {
    icon: ShieldCheck,
    title: "The tracking setup most agencies skip",
    text: "Learn how call tracking, form attribution, and CRM visibility separate real growth from vanity metrics.",
  },
  {
    icon: Zap,
    title: "How we turn your website into a lead machine",
    text: "We break down the landing-page structure built to convert cold traffic into quote requests and phone calls.",
  },
  {
    icon: TrendingUp,
    title: "How we scale based on booked jobs, not clicks",
    text: "Understand the numbers that matter: cost per qualified lead, booked calls, close rate, and ROI.",
  },
];

const testimonials = [
  {
    name: "John L.",
    company: "Master Roofing Ontario LTD",
    quote:
      "We’ve had a great experience working with ConvertIQ Media. They rebuilt our website and helped us launch Google Ads that actually generate leads. Within a few weeks, we started seeing consistent inquiries coming in. Communication is clear and they focus on results, not just impressions or clicks. Highly recommend.",
  },
  {
    name: "Joao Roofing",
    company: "Roofing Company",
    quote:
      "We partnered with ConvertIQ Media for both web design and digital marketing, and the results have exceeded expectations. They built us a clean, high-converting website and implemented Google and Meta ad campaigns that brought in immediate results. What we appreciate most is their focus on ROI—they’re constantly optimizing and improving performance. If you’re serious about scaling your business, these are the guys to work with.",
  },
  {
    name: "Ezpinoza Roofing",
    company: "Roofing Company",
    quote:
      "As a roofing company, we needed more consistent leads and ConvertIQ Media delivered. Our phone has been ringing more and we’re booking more jobs than before. They understand the home service space really well and know what works.",
  },
  {
    name: "Alma Web Pro",
    company: "Web Services",
    quote:
      "ConvertIQ Media has been great to work with. The team is professional, responsive, and clearly understands digital marketing and online growth. They take the time to explain things properly, provide helpful guidance, and deliver quality work with attention to detail. I really appreciate their communication and the effort they put into helping businesses improve their online presence. Highly recommended for anyone looking for a reliable marketing partner.",
  },
  {
    name: "Calleja Plumbing",
    company: "Plumbing Company",
    quote:
      "We hired ConvertIQ Media to redesign our website and the difference is night and day. The new site looks professional, loads fast, and actually converts visitors into leads. We’ve already seen an increase in calls and form submissions. Super smooth process from start to finish.",
  },
  {
    name: "Ready Roofers",
    company: "Roofing Company",
    quote:
      "Worked with ConvertIQ Media for a custom website demo for my business and honestly didn’t expect it to look this good. The site was modern, fast, mobile-friendly, and actually looked like a real company website — not some basic template. They even tailored everything specifically to my services and local area. Super easy process and great communication throughout.",
  },
  {
    name: "Muskoka Roofing",
    company: "Roofing Company",
    quote:
      "Started running Google Ads with ConvertIQ Media after wasting money with another company and the difference was noticeable almost immediately. They cleaned everything up, explained the targeting properly, and the leads coming in were way more relevant. Definitely recommend them if you want someone who actually understands local lead generation.",
  },
  {
    name: "Mr. Gutter Services",
    company: "Exterior Services",
    quote:
      "ConvertIQ Media helped us launch Meta Ads and redesign our online presence. The ads looked professional, the landing page was clean, and we started getting messages/leads within the first couple weeks. What stood out most was how responsive and hands-on they were during the whole process. Great experience overall.",
  },
];

const finalCtaChecks = [
  "Free funnel and website review",
  "No-pressure strategy call",
  "Clear next steps before you spend more on ads",
];

type CTAVariant = "sky" | "purple" | "blue";

function MagneticCTA({ href, children, variant = "purple", className = "" }: { href: string; children: React.ReactNode; variant?: CTAVariant; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const styles: Record<CTAVariant, string> = {
    sky: "bg-[#38bdf8] text-black shadow-[0_0_45px_rgba(56,189,248,0.5)] hover:bg-[#7dd3fc]",
    purple: "bg-[#8b45d9] text-white shadow-[0_0_45px_rgba(168,85,247,0.45)] hover:bg-purple-500",
    blue: "bg-[#1600b8] text-white shadow-[0_0_45px_rgba(37,99,235,0.4)] hover:bg-blue-700",
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        node.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.14}px, ${(e.clientY - rect.top - rect.height / 2) * 0.14}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
      }}
      whileHover={{ scale: 1.045 }}
      whileTap={{ scale: 0.965 }}
      transition={{ type: "spring", stiffness: 240, damping: 18 }}
      className={className}
    >
      <a href={href} target="_blank" rel="noopener noreferrer" className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-[13px] font-black tracking-tight transition md:w-auto md:px-9 md:text-sm ${styles[variant]}`}>
        {children}
      </a>
    </motion.div>
  );
}

function SquareVSLVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [showUnmute, setShowUnmute] = useState(false);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 80%", "end 30%"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", async (value) => {
      const v = videoRef.current;
      if (!v) return;

      if (value > 0.18 && v.paused) {
        try {
          v.muted = true;
          setIsMuted(true);
          await v.play();
          setIsPlaying(true);
          setShowUnmute(true);
        } catch {
          // Browser blocked autoplay. The play button still works.
        }
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      try {
        await v.play();
      } catch {
        v.muted = true;
        setIsMuted(true);
        await v.play();
      }
      setIsPlaying(true);
      setShowUnmute(true);
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
    if (!v.muted) setShowUnmute(false);
  };

  const toggleCaptions = () => {
    const next = !captionsOn;
    setCaptionsOn(next);
    const v = videoRef.current;
    if (!v) return;
    Array.from(v.textTracks).forEach((track) => (track.mode = next ? "showing" : "hidden"));
  };

  return (
    <div ref={wrapRef} className="relative mx-auto w-full max-w-[390px] sm:max-w-[460px] md:max-w-[560px] lg:max-w-[620px]">
      <div className="pointer-events-none absolute -inset-4 rounded-[2.2rem] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.45),transparent_62%)] blur-2xl md:-inset-7" />
      <div className="pointer-events-none absolute -inset-1 rounded-[2rem] bg-gradient-to-br from-blue-400/40 via-purple-400/30 to-fuchsia-400/30 opacity-70 blur" />

      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/15 bg-black shadow-[0_35px_120px_rgba(59,130,246,0.35),0_18px_70px_rgba(168,85,247,0.24)] md:rounded-[2rem]">
        <div className="relative aspect-square w-full">
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            playsInline
            muted={isMuted}
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            <track src={CAPTIONS_SRC} kind="captions" srcLang="en" label="English" default />
          </video>

          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-28 bg-gradient-to-b from-black/55 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-36 bg-gradient-to-t from-black/70 to-transparent" />

          <div className="absolute left-3 top-3 z-30 flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-white/85 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_16px_rgba(248,113,113,0.9)]" />
            VSL Training
          </div>

          {showUnmute && isMuted && isPlaying && (
            <button
              type="button"
              onClick={toggleMute}
              className="absolute left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-2xl border border-sky-300/35 bg-black/72 px-5 py-3 text-sm font-black text-white shadow-[0_0_45px_rgba(56,189,248,0.38)] backdrop-blur-xl transition hover:bg-black/90"
            >
              <Volume2 size={18} className="text-sky-200" />
              Tap to unmute
            </button>
          )}

          {!isPlaying && (
            <button type="button" onClick={togglePlay} aria-label="Play video" className="absolute inset-0 z-40 flex items-center justify-center bg-gradient-to-b from-black/35 via-black/10 to-black/70 backdrop-blur-[1px] transition">
              <motion.div animate={{ boxShadow: ["0 0 35px rgba(255,255,255,0.35)", "0 0 75px rgba(255,255,255,0.62)", "0 0 35px rgba(255,255,255,0.35)"] }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white text-black shadow-[0_0_50px_rgba(255,255,255,0.5)] md:h-20 md:w-20">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/25" />
                <Play size={28} className="relative ml-1" fill="currentColor" strokeWidth={0} />
              </motion.div>
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/95 backdrop-blur">Tap to watch</span>
            </button>
          )}

          <div className="absolute bottom-4 right-4 z-50 flex gap-2">
            <button type="button" onClick={toggleCaptions} aria-label="Toggle captions" className={`flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition md:h-10 md:w-10 ${captionsOn ? "border-sky-300/40 bg-sky-400/25 text-sky-100" : "border-white/20 bg-black/55 text-white"}`}>
              <Captions size={15} />
            </button>
            <button type="button" onClick={toggleMute} aria-label={isMuted ? "Unmute" : "Mute"} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75 md:h-10 md:w-10">
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
            <button type="button" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur-md transition hover:bg-black/75 md:h-10 md:w-10">
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="vsl-hero" className="relative isolate overflow-hidden bg-black px-4 pb-14 pt-24 text-white sm:pt-28 md:px-6 md:pb-24 md:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_18%,rgba(37,99,235,0.24),transparent_34%),radial-gradient(circle_at_80%_18%,rgba(168,85,247,0.22),transparent_36%),linear-gradient(180deg,#05050a_0%,#080812_48%,#000_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.12),rgba(0,0,0,0.42)),radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.42)_78%)]" />

      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }} className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12 lg:gap-16">
        <div className="text-center md:text-left">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-purple-100 backdrop-blur md:mx-0 md:mb-5 md:px-4 md:text-xs">
            <Sparkles size={13} className="text-purple-300" /> Free video training
          </div>

          <h1 className="mx-auto max-w-3xl text-[2.35rem] font-black leading-[0.9] tracking-[-0.075em] text-white min-[390px]:text-[2.65rem] sm:text-6xl md:mx-0 md:text-6xl lg:text-7xl">
            Stop wasting money on ads that don’t turn into <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-fuchsia-300 bg-clip-text text-transparent">booked jobs.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm font-medium leading-7 text-white/72 sm:text-base md:mx-0 md:mt-6 md:text-lg md:leading-8">
            Watch the short VSL to see how ConvertIQ builds high-converting websites, Google Ads, Meta Ads, and tracking systems for local service businesses that want more qualified leads.
          </p>

          <div className="mx-auto mt-6 grid max-w-xl gap-3 text-left md:mx-0 md:mt-7">
            {[
              { icon: MousePointerClick, text: "See why your current funnel leaks leads before they ever call." },
              { icon: BarChart3, text: "Learn what to track before scaling Google or Meta Ads." },
              { icon: PhoneCall, text: "Apply only if you want more quote requests, calls, and booked jobs." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.text} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3 backdrop-blur-xl">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-400/15 text-sky-200 ring-1 ring-sky-300/15"><Icon size={17} /></div>
                  <p className="text-[13px] font-semibold leading-6 text-white/76 md:text-sm">{item.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center md:mt-8">
            <MagneticCTA href={TYPEFORM_URL} variant="sky"><CalendarDays size={17} /> Watch & Apply Now</MagneticCTA>
            <a href="#what-you-learn" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.045] px-6 py-4 text-[13px] font-black text-white/82 backdrop-blur transition hover:bg-white/[0.08]">See what you’ll learn <ArrowRight size={16} /></a>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-[11.5px] font-bold text-white/62 md:justify-start">
            <span className="inline-flex items-center gap-1.5 text-yellow-300">★★★★★</span>
            <span>5-star client feedback</span>
            <span className="hidden h-1 w-1 rounded-full bg-white/35 sm:block" />
            <span>No fluff. Just the funnel, tracking, and ads strategy.</span>
          </div>
        </div>

        <SquareVSLVideo />
      </motion.div>
    </section>
  );
}

const MARQUEE_CSS = `
@keyframes vsl-marquee-scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.vsl-marquee-track { animation: vsl-marquee-scroll 55s linear infinite; }
@media (prefers-reduced-motion: reduce) { .vsl-marquee-track { animation: none; } }
`;

function TrustedBy() {
  const repeated = Array(12).fill(clientLogos).flat() as string[];
  return (
    <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }} className="relative border-y border-white/10 bg-black/40 py-12 md:py-18">
      <style dangerouslySetInnerHTML={{ __html: MARQUEE_CSS }} />
      <p className="mx-auto mb-7 text-center text-[10px] font-black uppercase tracking-[0.32em] text-white/45 md:mb-10 md:text-xs">Trusted by local service businesses</p>
      <div className="overflow-hidden">
        <div className="vsl-marquee-track flex w-max items-center">
          {repeated.map((src, i) => (
            <div key={`${src}-${i}`} className="flex shrink-0 items-center justify-center px-7 md:px-12">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="Client logo" className="h-16 w-auto object-contain opacity-75 transition duration-300 hover:opacity-100 md:h-28" />
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function BenefitCard({ benefit, index, progress }: { benefit: (typeof benefits)[number]; index: number; progress: MotionValue<number> }) {
  const Icon = benefit.icon;
  const start = 0.1 + index * 0.12;
  const end = Math.min(start + 0.28, 0.95);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [95, 0]);
  const scale = useTransform(progress, [start, end], [0.9, 1]);
  const x = useTransform(progress, [start, end], [index % 2 === 0 ? -26 : 26, 0]);

  return (
    <motion.div style={{ opacity, y, scale, x }} whileHover={{ y: -8, scale: 1.02 }} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition hover:border-purple-300/30 md:rounded-3xl md:p-7">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_40%)] opacity-0 transition duration-500 group-hover:opacity-100" />
      <div className="relative flex gap-4 md:gap-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/35 to-purple-500/35 text-white shadow-[0_0_28px_rgba(59,130,246,0.3)] ring-1 ring-white/15 md:h-14 md:w-14 md:rounded-2xl"><Icon size={21} /></div>
        <div><h3 className="text-base font-black tracking-[-0.03em] md:text-xl">{benefit.title}</h3><p className="mt-2 text-[13px] leading-6 text-white/70 md:text-[15px] md:leading-7">{benefit.text}</p></div>
      </div>
    </motion.div>
  );
}

function Benefits() {
  const { ref, progress } = useLockedSectionProgress({ speed: 0.00115 });
  const headingY = useTransform(progress, [0, 0.18], [70, 0]);
  const headingOpacity = useTransform(progress, [0, 0.18], [0, 1]);
  const headingScale = useTransform(progress, [0, 0.18], [0.92, 1]);
  const progressBarWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section id="what-you-learn" ref={ref as React.RefObject<HTMLElement>} className="relative min-h-screen overflow-visible bg-black px-4 py-20 text-white md:px-6 md:py-28">
      <div className="flex min-h-screen items-center overflow-visible">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.14),transparent_38%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.12),transparent_38%)]" />
        <div className="relative mx-auto w-full max-w-6xl">
          <motion.div style={{ y: headingY, opacity: headingOpacity, scale: headingScale }} className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex rounded-full border border-purple-400/25 bg-white/[0.04] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-purple-200 md:mb-5 md:text-xs">What you&apos;ll learn</div>
            <h2 className="text-[1.85rem] font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">The exact system behind better leads.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65 md:mt-6 md:text-base md:leading-8">No fluff. No theory. Just the funnel, website, tracking, and ad strategy we use for local service clients.</p>
          </motion.div>
          <div className="mt-8 grid gap-3 md:mt-14 md:grid-cols-2 md:gap-6">{benefits.map((b, i) => <BenefitCard key={b.title} benefit={b} index={i} progress={progress} />)}</div>
          <div className="mx-auto mt-8 h-1 max-w-2xl overflow-hidden rounded-full bg-white/10 md:mt-14"><motion.div style={{ width: progressBarWidth }} className="h-full rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-fuchsia-400" /></div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index, progress }: { testimonial: (typeof testimonials)[number]; index: number; progress: MotionValue<number> }) {
  const row = Math.floor(index / 4);
  const start = 0.08 + row * 0.16 + (index % 4) * 0.035;
  const end = Math.min(start + 0.26, 0.95);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [88, 0]);
  const scale = useTransform(progress, [start, end], [0.9, 1]);
  const x = useTransform(progress, [start, end], [index % 2 === 0 ? -28 : 28, 0]);

  return (
    <motion.div style={{ opacity, y, scale, x }} whileHover={{ y: -8, scale: 1.02 }} className="relative flex min-h-[300px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.018] p-5 backdrop-blur-xl md:min-h-[365px] md:rounded-3xl md:p-6">
      <Quote size={24} className="absolute right-4 top-4 text-purple-300/25" />
      <div className="mb-3 flex gap-0.5 text-yellow-300">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill="currentColor" strokeWidth={0} />)}</div>
      <p className="line-clamp-[9] text-[13px] font-medium leading-6 text-white/84 md:line-clamp-[11] md:text-[13.5px] md:leading-7">“{testimonial.quote}”</p>
      <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40 text-sm font-black text-white ring-1 ring-white/10">{testimonial.name.charAt(0)}</div>
        <div><div className="text-sm font-black text-white">{testimonial.name}</div><div className="text-[11px] font-semibold text-white/55 md:text-xs">{testimonial.company}</div></div>
      </div>
    </motion.div>
  );
}

function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 23, mass: 0.42 });
  const headingY = useTransform(progress, [0, 0.25], [70, 0]);
  const headingOpacity = useTransform(progress, [0, 0.2], [0, 1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-white/10 bg-black px-4 py-20 text-white md:px-6 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.14),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.12),transparent_42%)]" />
      <div className="relative mx-auto max-w-7xl">
        <motion.div style={{ y: headingY, opacity: headingOpacity }} className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-sky-400/25 bg-white/[0.04] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-sky-200 md:text-xs">5-star client results</div>
          <h2 className="text-[1.85rem] font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">Built for businesses that need leads, not excuses.</h2>
        </motion.div>
        <div className="mt-10 grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 md:mt-14 lg:grid-cols-4 md:gap-5">{testimonials.map((t, i) => <TestimonialCard key={`${t.name}-${i}`} testimonial={t} index={i} progress={progress} />)}</div>
      </div>
    </section>
  );
}

function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.45 });

  const headingOpacity = useTransform(progress, [0.05, 0.2], [0, 1]);
  const headingY = useTransform(progress, [0.05, 0.2], [70, 0]);
  const cardY = useTransform(progress, [0.18, 0.42], [90, 0]);
  const cardOpacity = useTransform(progress, [0.18, 0.38], [0, 1]);
  const lineWidth = useTransform(progress, [0.32, 0.72], ["0%", "100%"]);

  const metrics = [
    { value: "32+", label: "qualified leads generated", detail: "within the first campaign cycle" },
    { value: "$90", label: "approx. cost per lead", detail: "after campaign restructure" },
    { value: "47%", label: "better page engagement", detail: "from faster landing-page flow" },
  ];

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-white/10 bg-black px-4 py-20 text-white md:px-6 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(168,85,247,0.18),transparent_38%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div style={{ opacity: headingOpacity, y: headingY }} className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-purple-400/25 bg-white/[0.04] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-purple-200 md:text-xs">
            Mini case study
          </div>
          <h2 className="text-[1.9rem] font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">
            From wasted clicks to a lead system they could actually track.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/65 md:mt-6 md:text-base md:leading-8">
            A simple breakdown of how we restructure the funnel: better landing page, cleaner tracking, stronger offer, and ads optimized around qualified leads instead of random clicks.
          </p>
        </motion.div>

        <motion.div style={{ opacity: cardOpacity, y: cardY }} className="mt-10 grid gap-4 md:mt-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-6">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-xl md:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-400/15 text-red-200 ring-1 ring-red-300/20">
                <BarChart3 size={21} />
              </div>
              <div>
                <div className="text-sm font-black uppercase tracking-[0.18em] text-white/45">Before</div>
                <h3 className="text-xl font-black tracking-[-0.04em] md:text-2xl">The problem</h3>
              </div>
            </div>
            <ul className="space-y-3 text-sm leading-7 text-white/72">
              <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" /> Ads were generating clicks, but lead quality was inconsistent.</li>
              <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" /> Landing page did not clearly explain the offer or push users to take action.</li>
              <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" /> Tracking was too weak to know which keywords, ads, or pages were creating real opportunities.</li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-500/[0.12] via-white/[0.045] to-purple-500/[0.12] p-5 backdrop-blur-xl md:p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/20">
                <TrendingUp size={21} />
              </div>
              <div>
                <div className="text-sm font-black uppercase tracking-[0.18em] text-white/45">After</div>
                <h3 className="text-xl font-black tracking-[-0.04em] md:text-2xl">What we changed</h3>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  style={{ opacity: useTransform(progress, [0.28 + i * 0.08, 0.46 + i * 0.08], [0, 1]), y: useTransform(progress, [0.28 + i * 0.08, 0.46 + i * 0.08], [50, 0]) }}
                  className="rounded-2xl border border-white/10 bg-black/24 p-4"
                >
                  <div className="text-3xl font-black tracking-[-0.06em] text-white md:text-4xl">{metric.value}</div>
                  <div className="mt-1 text-[12px] font-black leading-4 text-sky-100">{metric.label}</div>
                  <div className="mt-2 text-[11px] leading-5 text-white/50">{metric.detail}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-full bg-white/10">
              <motion.div style={{ width: lineWidth }} className="h-1.5 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-fuchsia-400" />
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {["Rebuilt landing page", "Fixed conversion tracking", "Optimized ads around leads"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3 text-[12px] font-bold text-white/75">
                  <CheckCircle2 size={15} className="text-emerald-300" /> {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 23, mass: 0.42 });
  const cardScale = useTransform(progress, [0.1, 0.55], [0.88, 1]);
  const cardY = useTransform(progress, [0.1, 0.55], [70, 0]);
  const cardOpacity = useTransform(progress, [0.1, 0.45], [0, 1]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden border-t border-white/10 bg-black px-4 py-20 text-white md:px-6 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),transparent_45%),radial-gradient(circle_at_bottom,rgba(37,99,235,0.18),transparent_45%)]" />
      <motion.div style={{ y: cardY, scale: cardScale, opacity: cardOpacity }} className="relative mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 text-center shadow-[0_35px_120px_rgba(59,130,246,0.18)] backdrop-blur-xl md:p-12">
        <h2 className="text-[2rem] font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">Ready to see what your funnel <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">could be doing?</span></h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 md:mt-6 md:text-lg md:leading-8">Apply first, then book your free strategy call. Your Typeform answers should be passed into Calendly so you do not have to re-enter the same information.</p>
        <div className="mt-7 flex flex-col items-center gap-5 md:mt-10">
          <MagneticCTA href={TYPEFORM_URL} variant="purple"><CalendarDays size={18} /> Apply & Book My Free Call</MagneticCTA>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] font-semibold text-white/65 md:text-xs">{finalCtaChecks.map((c) => <li key={c} className="flex items-center gap-2"><CheckCircle2 size={14} className="text-emerald-300" />{c}</li>)}</ul>
        </div>
      </motion.div>
    </section>
  );
}

function PageScrollBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 25, mass: 0.4 });
  return <motion.div style={{ scaleX, transformOrigin: "0% 50%" }} className="fixed left-0 right-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-blue-400 via-purple-400 to-fuchsia-400" />;
}

export function VSLContent() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.location.hash) return;
    const el = document.querySelector(window.location.hash);
    if (!el) return;
    const timer = window.setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-black text-white">
      <PageScrollBar />
      <Hero />
      <TrustedBy />
      <Benefits />
      <Testimonials />
      <CaseStudy />
      <FinalCTA />
    </div>
  );
}
