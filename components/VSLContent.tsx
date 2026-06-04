"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  MousePointerClick,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { eventId, trackServerEvent } from "@/lib/meta";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
    Calendly?: unknown;
  }
}

const META_PIXEL_ID = "1727624242014302";

function loadMetaPixel() {
  if (typeof window === "undefined") return;
  if (window.fbq) return;

  type FbqFunction = ((...args: unknown[]) => void) & {
    callMethod?: (...args: unknown[]) => void;
    queue: unknown[][];
    loaded: boolean;
    version: string;
  };

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as FbqFunction;

  fbq.queue = [];
  fbq.loaded = true;
  fbq.version = "2.0";

  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  window.fbq("init", META_PIXEL_ID);
  window.fbq("track", "PageView");
}

function trackMetaEvent(
  eventName: "ViewContent" | "Lead" | "Schedule",
  customData?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  const id = eventId(eventName);
  window.fbq?.("track", eventName, customData || {}, { eventID: id });
  void trackServerEvent(eventName, id, customData);
}

const trustPoints = [
  "Google Ads Setup + Optimization",
  "Meta Ads Strategy + Tracking",
  "Landing Page & Funnel Review",
  "No-Pressure Discovery Call",
];

const callBenefits = [
  "Answer a few quick qualification questions first",
  "Review your ads, funnel, landing page, offer, and tracking",
  "Identify what is working, what is not, and what to fix",
  "Get custom growth recommendations for your business",
  "Book instantly if your business is the right fit",
];

const problems = [
  {
    icon: MousePointerClick,
    title: "Meta Lead Forms Generate Junk Leads",
    text: "Instant forms are easy to submit because Meta pre-fills the user's information. That usually means more tire-kickers, low-intent prospects, and people who forget they even filled it out.",
  },
  {
    icon: Target,
    title: "Clicks Do Not Equal Customers",
    text: "Traffic means nothing if visitors do not become calls, booked appointments, quote requests, or real sales opportunities.",
  },
  {
    icon: ShieldCheck,
    title: "Most Campaigns Lack Proper Tracking",
    text: "Without clean tracking, you are guessing which ads, keywords, offers, and landing pages are actually creating qualified leads.",
  },
];

const callTopics = [
  "Your current lead generation process",
  "Google Ads opportunities",
  "Meta Ads opportunities",
  "Website conversion improvements",
  "Landing page optimization",
  "Lead qualification strategy",
  "Tracking and attribution setup",
  "Next-step growth recommendations",
];

const testimonials = [
  {
    name: "John L.",
    company: "Master Roofing Ontario LTD",
    quote:
      "They rebuilt our website and helped us launch Google Ads that actually generate leads. Within a few weeks, we started seeing consistent inquiries coming in.",
  },
  {
    name: "Muskoka Roofing",
    company: "Roofing Company",
    quote:
      "Started running Google Ads with ConvertIQ Media after wasting money with another company and the difference was noticeable almost immediately.",
  },
  {
    name: "Mr. Gutter Services",
    company: "Exterior Services",
    quote:
      "The ads looked professional, the landing page was clean, and we started getting messages and leads within the first couple weeks.",
  },
];

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 34, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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
      className="fixed left-0 right-0 top-0 z-[80] h-[3px] bg-gradient-to-r from-blue-400 via-purple-400 to-fuchsia-400"
    />
  );
}

function CalendlyEmbed() {
  const hasTrackedLead = useRef(false);
  const hasTrackedSchedule = useRef(false);

  useEffect(() => {
    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]'
    );

    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const onMessage = (event: MessageEvent) => {
      const data = event.data as { event?: string } | undefined;
      if (!data?.event?.startsWith("calendly.")) return;

      if (data.event === "calendly.routing_form_submission" && !hasTrackedLead.current) {
        hasTrackedLead.current = true;
        trackMetaEvent("Lead", {
          content_name: "ConvertIQ Routing Form Submission",
          funnel_step: "calendly_routing_form_submitted",
        });
      }

      if (data.event === "calendly.event_scheduled" && !hasTrackedSchedule.current) {
        hasTrackedSchedule.current = true;
        trackMetaEvent("Schedule", {
          content_name: "ConvertIQ Google Meta Ads Discovery Call",
          funnel_step: "calendly_booked",
        });
      }
    };

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div
      className="calendly-inline-widget h-[700px] min-w-[320px] bg-[#111827] md:h-[760px]"
      data-url="https://calendly.com/d/cvx7-fwc-j7k?hide_gdpr_banner=1&background_color=111827&text_color=535353"
    />
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden bg-black px-4 pb-20 pt-24 text-white md:px-6 md:pb-28 md:pt-28"
    >
      <div className="pointer-events-none absolute inset-0 -z-30 bg-[linear-gradient(180deg,#05050a_0%,#090912_42%,#000_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_10%,rgba(37,99,235,0.32),transparent_34%),radial-gradient(circle_at_82%_16%,rgba(168,85,247,0.28),transparent_36%),radial-gradient(circle_at_50%_72%,rgba(56,189,248,0.14),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.55)_78%)]" />

      <div className="mx-auto max-w-7xl">
        <FadeUp className="text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-purple-100 shadow-[0_0_45px_rgba(168,85,247,0.18)] backdrop-blur md:text-xs">
            <Sparkles size={14} className="text-purple-300" />
            Free discovery call
          </div>

          <h1 className="mx-auto max-w-5xl text-[2.5rem] font-black leading-[0.9] tracking-[-0.075em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Book a FREE{" "}
            <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-fuchsia-300 bg-clip-text text-transparent">
              Google/Meta Ads
            </span>{" "}
            Discovery Call
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm font-medium leading-7 text-white/72 sm:text-base md:text-lg md:leading-8">
            Stop chasing low-quality Meta lead form submissions. Answer a few quick qualification questions, then book a call to review your ads, landing page, offer, and tracking.
          </p>
        </FadeUp>

        <FadeUp delay={0.12} className="mx-auto mt-10 max-w-6xl">
          <div className="relative overflow-hidden rounded-[2rem] border border-sky-400/25 bg-gradient-to-br from-blue-500/[0.12] via-white/[0.035] to-purple-500/[0.12] p-2 shadow-[0_35px_140px_rgba(59,130,246,0.25)] backdrop-blur-xl md:rounded-[2.4rem] md:p-3">
            <div className="pointer-events-none absolute -inset-16 bg-[radial-gradient(circle_at_22%_12%,rgba(56,189,248,0.2),transparent_38%),radial-gradient(circle_at_88%_78%,rgba(168,85,247,0.2),transparent_42%)]" />

            <div className="relative grid overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/35 lg:grid-cols-[390px_1fr] md:rounded-[2rem]">
              <div className="relative overflow-hidden border-b border-white/10 p-6 text-left lg:border-b-0 lg:border-r lg:border-white/10 md:p-8">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(56,189,248,0.13),transparent_42%),radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.14),transparent_42%)]" />

                <div className="relative">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-200 ring-1 ring-purple-300/25">
                    <CalendarDays size={25} />
                  </div>

                  <div className="text-[10px] font-black uppercase tracking-[0.25em] text-sky-200/70">
                    Qualification + booking
                  </div>

                  <h2 className="mt-3 text-3xl font-black leading-[0.95] tracking-[-0.055em] text-white md:text-4xl">
                    Free Google/Meta Ads Discovery Call
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/65">
                    Complete the short form first. If your business is a fit, you’ll immediately see available times to book.
                  </p>

                  <div className="mt-6 grid gap-3">
                    {callBenefits.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-sm font-semibold leading-6 text-white/72"
                      >
                        <CheckCircle2 size={16} className="mt-1 shrink-0 text-emerald-300" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                    <div className="mb-2 flex gap-0.5 text-yellow-300">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <p className="text-xs font-bold leading-5 text-white/58">
                      Trusted by service businesses looking for better leads, stronger funnels, and cleaner tracking.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#111827]">
                <CalendlyEmbed />
              </div>
            </div>
          </div>

          <div className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-3">
            {trustPoints.map((point) => (
              <motion.div
                key={point}
                whileHover={{ y: -3, scale: 1.03 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-[11px] font-bold text-white/70 backdrop-blur md:text-xs"
              >
                <CheckCircle2 size={14} className="text-emerald-300" />
                {point}
              </motion.div>
            ))}
          </div>

          <a
            href="#why"
            className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-5 py-3 text-xs font-black text-white/75 backdrop-blur transition hover:bg-white/[0.09]"
          >
            Scroll down to see how we can help
            <ArrowDown size={16} />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section
      id="why"
      className="relative overflow-hidden border-t border-white/10 bg-black px-4 py-20 text-white md:px-6 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.13),transparent_36%),radial-gradient(circle_at_82%_72%,rgba(168,85,247,0.15),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-purple-400/25 bg-white/[0.04] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-purple-200 md:text-xs">
            Why this page exists
          </div>

          <h2 className="text-[1.9rem] font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">
            Meta instant forms are easy to submit. That’s exactly the problem.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-base md:leading-8">
            A qualification-first landing page creates more intent before someone books with you, which helps filter out junk leads and improves call quality.
          </p>
        </FadeUp>

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
          {problems.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeUp key={item.title} delay={index * 0.09}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative min-h-[290px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:border-purple-300/30 md:p-7"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_40%)] opacity-0 transition duration-500 group-hover:opacity-100" />

                  <div className="relative">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/35 to-purple-500/35 text-white shadow-[0_0_28px_rgba(59,130,246,0.3)] ring-1 ring-white/15">
                      <Icon size={23} />
                    </div>

                    <h3 className="text-xl font-black tracking-[-0.04em]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/68">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CallTopicsSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black px-4 py-20 text-white md:px-6 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.13),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.12),transparent_42%)]" />

      <div className="relative mx-auto max-w-6xl">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-sky-400/25 bg-white/[0.04] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-sky-200 md:text-xs">
            What we’ll cover
          </div>

          <h2 className="text-[1.9rem] font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">
            You’ll leave with a clear picture of what to fix next.
          </h2>
        </FadeUp>

        <div className="mt-10 grid gap-3 md:mt-14 md:grid-cols-2">
          {callTopics.map((topic, index) => (
            <FadeUp key={topic} delay={index * 0.045}>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-300/15">
                  <CheckCircle2 size={18} />
                </div>

                <p className="text-sm font-bold leading-6 text-white/75 md:text-base">
                  {topic}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    {
      icon: CalendarDays,
      title: "Complete the qualification form",
      text: "Answer a few quick questions so we know what type of business you run and where your revenue is at.",
    },
    {
      icon: BarChart3,
      title: "Book your discovery call",
      text: "If your business is a fit, Calendly will automatically show available times to book.",
    },
    {
      icon: TrendingUp,
      title: "Get clear next steps",
      text: "We review your ads, funnel, landing page, tracking, and growth opportunities on the call.",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black px-4 py-20 text-white md:px-6 md:py-28">
      <div className="relative mx-auto max-w-7xl">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-purple-400/25 bg-white/[0.04] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-purple-200 md:text-xs">
            Simple process
          </div>

          <h2 className="text-[1.9rem] font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">
            No fluff. Just a focused call about getting better leads.
          </h2>
        </FadeUp>

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <FadeUp key={step.title} delay={index * 0.08}>
                <motion.div
                  whileHover={{ y: -7, scale: 1.015 }}
                  className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.018] p-6 backdrop-blur-xl md:p-7"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-200 ring-1 ring-sky-300/15">
                      <Icon size={22} />
                    </div>

                    <div className="text-5xl font-black tracking-[-0.08em] text-white/[0.08]">
                      0{index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-black tracking-[-0.04em]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/65">
                    {step.text}
                  </p>
                </motion.div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black px-4 py-20 text-white md:px-6 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.14),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.12),transparent_42%)]" />

      <div className="relative mx-auto max-w-7xl">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-sky-400/25 bg-white/[0.04] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-sky-200 md:text-xs">
            Client feedback
          </div>

          <h2 className="text-[1.9rem] font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">
            Built for businesses that want leads, not excuses.
          </h2>
        </FadeUp>

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeUp key={testimonial.name} delay={index * 0.08}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative flex min-h-[285px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.018] p-6 backdrop-blur-xl"
              >
                <Quote size={26} className="absolute right-5 top-5 text-purple-300/25" />

                <div className="mb-4 flex gap-0.5 text-yellow-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>

                <p className="text-sm font-medium leading-7 text-white/82">
                  “{testimonial.quote}”
                </p>

                <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40 text-sm font-black text-white ring-1 ring-white/10">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <div className="text-sm font-black text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-xs font-semibold text-white/55">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black px-4 py-20 text-white md:px-6 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),transparent_45%),radial-gradient(circle_at_bottom,rgba(37,99,235,0.18),transparent_45%)]" />

      <FadeUp className="relative mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 text-center shadow-[0_35px_120px_rgba(59,130,246,0.18)] backdrop-blur-xl md:p-12">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-400/15 text-purple-200 ring-1 ring-purple-300/20">
          <Zap size={25} />
        </div>

        <h2 className="text-[2rem] font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">
          Ready to generate better leads?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-lg md:leading-8">
          Go back to the qualification form, answer a few quick questions, and book your free Google/Meta Ads discovery call.
        </p>

        <a
          href="#hero"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#38bdf8] px-7 py-4 text-sm font-black text-black shadow-[0_0_45px_rgba(56,189,248,0.45)] transition hover:bg-[#7dd3fc]"
        >
          <CalendarDays size={18} />
          Go to form
        </a>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] font-semibold text-white/60 md:text-xs">
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-300" />
            No pressure
          </span>
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-300" />
            Free review
          </span>
          <span className="inline-flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-300" />
            Clear next steps
          </span>
        </div>
      </FadeUp>
    </section>
  );
}

function StickyMobileCTA() {
  return (
    <motion.a
      href="#hero"
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-black/78 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 shadow-[0_-20px_60px_rgba(59,130,246,0.18)] backdrop-blur-xl md:hidden"
    >
      <div className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#38bdf8] px-5 py-4 text-[13px] font-black text-black shadow-[0_0_35px_rgba(56,189,248,0.45)]">
        Start Qualification Form
        <CalendarDays size={17} />
      </div>
    </motion.a>
  );
}

export function VSLContent() {
  useEffect(() => {
    loadMetaPixel();

    trackMetaEvent("ViewContent", {
      content_name: "ConvertIQ Google Meta Ads Discovery Call Routing Form Landing Page",
      funnel_step: "landing_page_view",
    });
  }, []);

  return (
    <div className="relative bg-black text-white">
      <PageScrollBar />
      <StickyMobileCTA />
      <Hero />
      <ProblemSection />
      <CallTopicsSection />
      <ProcessSection />
      <Testimonials />
      <FinalCTA />
    </div>
  );
}
