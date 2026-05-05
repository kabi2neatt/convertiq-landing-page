"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  BriefcaseBusiness,
  ChevronLeft,
  ChevronRight,
  Home,
  Wrench,
} from "lucide-react";
import { useRef } from "react";

const cards = [
  {
    icon: Wrench,
    eyebrow: "01",
    title: "Trades & Contractors",
    text: "Roofers, plumbers, HVAC, electricians, and contractors that want quote requests from people actively searching.",
    image: "/Roofing.jpg",
  },
  {
    icon: Home,
    eyebrow: "02",
    title: "Home Services",
    text: "Landscapers, cleaners, pest control, repairs, and maintenance businesses that need steady booked jobs.",
    image: "/landscaping.jpg",
  },
  {
    icon: BriefcaseBusiness,
    eyebrow: "03",
    title: "Professional Services",
    text: "Clinics, accountants, agencies, consultants, and local firms that need qualified consultation requests.",
    image: "/lawyer.jpg",
  },
];

export function WhoWeHelp() {
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const scrollSectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: scrollSectionRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-18%"]);
  const headingY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0.65]);

  const scrollMobile = (direction: "left" | "right") => {
    if (!mobileScrollRef.current) return;

    mobileScrollRef.current.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="who-we-help"
      ref={scrollSectionRef}
      className="relative overflow-hidden bg-black px-6 py-32 text-white md:py-44"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.24),transparent_35%),radial-gradient(circle_at_bottom,rgba(37,99,235,0.12),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="mx-auto max-w-5xl text-center"
        >
          <div className="mb-6 inline-flex rounded-full border border-purple-400/25 bg-white/[0.04] px-5 py-2 text-xs font-bold uppercase tracking-[0.28em] text-purple-200">
            Who We Help
          </div>

          <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-8xl">
            Built for local businesses that need{" "}
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
              more qualified leads.
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-white/60 md:text-xl">
            We work best with businesses where every call, quote request, or
            booked appointment can turn into real revenue.
          </p>
        </motion.div>

        {/* Mobile controls */}
        <div className="mt-12 flex justify-center gap-3 md:hidden">
          <button
            onClick={() => scrollMobile("left")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => scrollMobile("right")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Mobile horizontal scroll */}
        <div
          ref={mobileScrollRef}
          className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-6 md:hidden"
        >
          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 70, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.12,
                  ease: "easeOut",
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="group relative min-w-[85%] snap-center overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-[0_30px_100px_rgba(79,70,229,0.12)] backdrop-blur-xl"
              >
                <IndustryCardContent card={card} Icon={Icon} />
              </motion.div>
            );
          })}
        </div>

        {/* Desktop scroll-linked animation */}
        <div className="relative mt-20 hidden overflow-visible md:block">
          <motion.div style={{ x }} className="flex w-max gap-8 will-change-transform">
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 80, rotateX: 8 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.14,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, margin: "-120px" }}
                  whileHover={{
                    y: -16,
                    scale: 1.03,
                    rotateX: 0,
                  }}
                  className="group relative h-[420px] w-[420px] overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-7 shadow-[0_30px_100px_rgba(79,70,229,0.12)] backdrop-blur-xl transition"
                >
                  <IndustryCardContent card={card} Icon={Icon} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function IndustryCardContent({
  card,
  Icon,
}: {
  card: {
    eyebrow: string;
    title: string;
    text: string;
    image: string;
  };
  Icon: React.ElementType;
}) {
  return (
    <>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.18),transparent_35%)] opacity-0 transition duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-300/60 to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-10 flex items-center justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600/30 to-purple-600/30 text-purple-100 ring-1 ring-white/10 transition duration-300 group-hover:scale-110 group-hover:ring-purple-300/40">
            <Icon size={25} />
          </div>

          <div className="h-20 w-32 overflow-hidden rounded-2xl border border-white/10">
            <img
              src={card.image}
              alt={card.title}
              className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-125 group-hover:opacity-100"
            />
          </div>
        </div>

        <div className="mb-4 text-xs font-bold text-purple-300">
          {card.eyebrow}
        </div>

        <h3 className="text-3xl font-black leading-none tracking-[-0.04em] md:text-4xl">
          {card.title}
        </h3>

        <p className="mt-6 text-base font-medium leading-8 text-white/62">
          {card.text}
        </p>
      </div>
    </>
  );
}