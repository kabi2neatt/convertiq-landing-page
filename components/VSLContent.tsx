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
const CALENDLY_URL = "https://calendly.com/kabir-convertiq-media/30min";

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
  "Google Ads setup + optimization",
  "Meta Ads strategy + tracking",
  "Landing page and funnel review",
  "No-pressure discovery call",
];

const problems = [
  {
    icon: MousePointerClick,
    title: "Meta lead forms bring in too many junk leads",
    text: "Instant forms are easy to submit, which usually means more tire-kickers, wrong-fit prospects, and people who forget they even opted in.",
  },
  {
    icon: Target,
    title: "Clicks do not matter if they do not become calls",
    text: "We look at your offer, landing page, tracking, and follow-up so you can focus on real opportunities instead of vanity metrics.",
  },
  {
    icon: ShieldCheck,
    title: "Better qualification before the call",
    text: "Sending traffic to a real landing page creates more intent before someone books time with you.",
  },
];

const discoveryItems = [
  "Where your current funnel is leaking leads",
  "Whether Google Ads, Meta Ads, or both make sense for your business",
  "What needs to be fixed before scaling your ad spend",
  "How to improve lead quality and reduce wasted follow-up time",
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
  const hasTrackedSchedule = useRef(false);

  useEffect(() => {
    const existing = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');

    if (!existing) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const onMessage = (event: MessageEvent) => {
      const isCalendlyEvent =
        typeof event.data === "object" &&
        event.data !== null &&
        "event" in event.data &&
        String((event.data as { event?: string }).event).startsWith("calendly.");

      if (!isCalendlyEvent) return;

      const eventName = String((event.data as { event?: string }).event);

      if (eventName === "calendly.event_scheduled" && !hasTrackedSchedule.current) {
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
      className="calendly-inline-widget h-[760px] min-w-[320px] overflow-hidden rounded-[1.5rem] bg-white md:h-[820px] md:rounded-[2rem]"
      data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&primary_color=38bdf8`}
    />
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-black px-4 pb-14 pt-24 text-white md:px-6 md:pb-20 md:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_18%_12%,rgba(37,99,235,0.25),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(168,85,247,0.24),transparent_36%),linear-gradient(180deg,#05050a_0%,#080812_48%,#000_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.5)),radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_78%)]" />

      <div className="mx-auto max-w-7xl">
        <FadeUp className="text-center">
          <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/15 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-purple-100 backdrop-blur md:text-xs">
            <Sparkles size={14} className="text-purple-300" />
            Free discovery call
          </div>

          <h1 className="mx-auto max-w-5xl text-[2.55rem] font-black leading-[0.9] tracking-[-0.075em] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Book a FREE{" "}
            <span className="bg-gradient-to-r from-blue-200 via-purple-200 to-fuchsia-300 bg-clip-text text-transparent">
              Google/Meta Ads
            </span>{" "}
            Discovery Call
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm font-medium leading-7 text-white/72 sm:text-base md:text-lg md:leading-8">
            Stop chasing low-quality Meta lead form submissions. Book a call and we’ll review your ads, landing page, offer, and tracking to see how you can generate better qualified leads.
          </p>

          <div className="mx-auto mt-7 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {trustPoints.map((point) => (
              <div
                key={point}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-[11px] font-bold text-white/70 backdrop-blur md:text-xs"
              >
                <CheckCircle2 size={14} className="text-emerald-300" />
                {point}
              </div>
            ))}
          </div>

          <a
            href="#book-call"
            className="mx-auto mt-9 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-5 py-3 text-xs font-black text-white/75 backdrop-blur transition hover:bg-white/[0.09]"
          >
            Book directly below
            <ArrowDown size={16} />
          </a>
        </FadeUp>
      </div>
    </section>
  );
}

function BookingSection() {
  return (
    <section id="book-call" className="relative overflow-hidden bg-black px-4 py-12 text-white md:px-6 md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.16),transparent_36%),radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.12),transparent_42%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <FadeUp>
          <div className="sticky top-8 rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-[0_35px_120px_rgba(59,130,246,0.14)] backdrop-blur-xl md:p-8">
            <div className="mb-4 inline-flex rounded-full border border-sky-400/25 bg-sky-400/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] text-sky-200">
              30-minute call
            </div>

            <h2 className="text-3xl font-black leading-[0.95] tracking-[-0.06em] md:text-5xl">
              Let’s see if your ads are set up to bring real customers.
            </h2>

            <p className="mt-5 text-sm leading-7 text-white/66 md:text-base md:leading-8">
              Pick a time directly on the calendar. No extra button, no instant form, no back-and-forth.
            </p>

            <div className="mt-6 grid gap-3">
              {discoveryItems.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/24 p-3 text-sm font-semibold leading-6 text-white/72"
                >
                  <CheckCircle2 size={17} className="mt-1 shrink-0 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-2 shadow-[0_35px_120px_rgba(56,189,248,0.18)] backdrop-blur-xl md:p-3">
            <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.18),transparent_42%)]" />
            <div className="relative">
              <CalendlyEmbed />
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

function ProblemSection() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black px-4 py-20 text-white md:px-6 md:py-28">
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
            This landing page creates more intent before someone books with you, which should reduce junk leads and improve call quality.
          </p>
        </FadeUp>

        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-3">
          {problems.map((item, index) => {
            const Icon = item.icon;

            return (
              <FadeUp key={item.title} delay={index * 0.09}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative min-h-[280px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition hover:border-purple-300/30 md:p-7"
                >
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.16),transparent_40%)] opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/35 to-purple-500/35 text-white shadow-[0_0_28px_rgba(59,130,246,0.3)] ring-1 ring-white/15">
                      <Icon size={23} />
                    </div>

                    <h3 className="text-xl font-black tracking-[-0.04em]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-white/68">{item.text}</p>
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

function ProcessSection() {
  const steps = [
    {
      icon: CalendarDays,
      title: "Book your discovery call",
      text: "Choose a time that works for you directly through Calendly.",
    },
    {
      icon: BarChart3,
      title: "We review your current setup",
      text: "We look at your ads, funnel, landing page, tracking, and offer.",
    },
    {
      icon: TrendingUp,
      title: "You leave with clear next steps",
      text: "You’ll know what to fix, what to test, and whether working together makes sense.",
    },
  ];

  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black px-4 py-20 text-white md:px-6 md:py-28">
      <div className="relative mx-auto max-w-7xl">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-sky-400/25 bg-white/[0.04] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-sky-200 md:text-xs">
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
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.018] p-6 backdrop-blur-xl md:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-200 ring-1 ring-sky-300/15">
                      <Icon size={22} />
                    </div>
                    <div className="text-5xl font-black tracking-[-0.08em] text-white/[0.08]">
                      0{index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-black tracking-[-0.04em]">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{step.text}</p>
                </div>
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
          <div className="mb-4 inline-flex rounded-full border border-purple-400/25 bg-white/[0.04] px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.28em] text-purple-200 md:text-xs">
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
                    <div className="text-sm font-black text-white">{testimonial.name}</div>
                    <div className="text-xs font-semibold text-white/55">{testimonial.company}</div>
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

function FinalReminder() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-black px-4 py-20 text-white md:px-6 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),transparent_45%),radial-gradient(circle_at_bottom,rgba(37,99,235,0.18),transparent_45%)]" />

      <FadeUp className="relative mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 text-center shadow-[0_35px_120px_rgba(59,130,246,0.18)] backdrop-blur-xl md:p-12">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-400/15 text-purple-200 ring-1 ring-purple-300/20">
          <Zap size={25} />
        </div>

        <h2 className="text-[2rem] font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">
          Want better leads from your ads?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-lg md:leading-8">
          Scroll back up, pick a time, and book your free Google/Meta Ads discovery call.
        </p>

        <a
          href="#book-call"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-[#38bdf8] px-7 py-4 text-sm font-black text-black shadow-[0_0_45px_rgba(56,189,248,0.45)] transition hover:bg-[#7dd3fc]"
        >
          <CalendarDays size={18} />
          Go to calendar
        </a>
      </FadeUp>
    </section>
  );
}

function StickyMobileCTA() {
  return (
    <motion.a
      href="#book-call"
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.45, ease: "easeOut" }}
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-white/10 bg-black/78 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 shadow-[0_-20px_60px_rgba(59,130,246,0.18)] backdrop-blur-xl md:hidden"
    >
      <div className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#38bdf8] px-5 py-4 text-[13px] font-black text-black shadow-[0_0_35px_rgba(56,189,248,0.45)]">
        Book Free Discovery Call
        <CalendarDays size={17} />
      </div>
    </motion.a>
  );
}

export function VSLContent() {
  useEffect(() => {
    loadMetaPixel();
    trackMetaEvent("ViewContent", {
      content_name: "ConvertIQ Google Meta Ads Discovery Call Landing Page",
      funnel_step: "landing_page_view",
    });
  }, []);

  return (
    <div className="relative bg-black text-white">
      <PageScrollBar />
      <StickyMobileCTA />
      <Hero />
      <BookingSection />
      <ProblemSection />
      <ProcessSection />
      <Testimonials />
      <FinalReminder />
    </div>
  );
}
