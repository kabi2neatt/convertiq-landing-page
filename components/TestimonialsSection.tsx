"use client";

import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useRef } from "react";

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
      "They built us a clean, high-converting website and implemented Google and Meta ad campaigns that brought in immediate results. What we appreciate most is their focus on ROI.",
  },
  {
    name: "Calleja Plumbing",
    company: "Plumbing Company",
    quote:
      "The new site looks professional, loads fast, and actually converts visitors into leads. We’ve already seen an increase in calls and form submissions.",
  },
  {
    name: "Mr. Gutter Services",
    company: "Exterior Services",
    quote:
      "ConvertIQ Media helped us launch Meta Ads and redesign our online presence. The ads looked professional, the landing page was clean, and we started getting messages and leads within the first couple weeks.",
  },
  {
    name: "Muskoka Roofing",
    company: "Roofing Company",
    quote:
      "They cleaned everything up, explained the targeting properly, and the leads coming in were way more relevant. Definitely recommend them for local lead generation.",
  },
  {
    name: "Ready Roofers",
    company: "Roofing Company",
    quote:
      "The site was modern, fast, mobile-friendly, and actually looked like a real company website — not some basic template. Super easy process and great communication.",
  },
];

function TestimonialCard({
  testimonial,
  index,
  progress,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = 0.08 + index * 0.045;
  const end = Math.min(start + 0.25, 0.95);

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [80, 0]);
  const scale = useTransform(progress, [start, end], [0.92, 1]);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative flex min-h-[310px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.018] p-6 backdrop-blur-xl transition hover:border-cyan-400/30"
    >
      <Quote size={26} className="absolute right-5 top-5 text-purple-300/25" />

      <div className="mb-4 flex gap-1 text-yellow-300">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
        ))}
      </div>

      <p className="text-sm font-medium leading-7 text-white/80">
        “{testimonial.quote}”
      </p>

      <div className="mt-auto flex items-center gap-3 border-t border-white/10 pt-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/40 to-purple-500/40 text-sm font-black text-white ring-1 ring-white/10">
          {testimonial.name.charAt(0)}
        </div>

        <div>
          <div className="text-sm font-black text-white">{testimonial.name}</div>
          <div className="text-xs font-semibold text-white/55">
            {testimonial.company}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
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

  const headingY = useTransform(progress, [0, 0.22], [70, 0]);
  const headingOpacity = useTransform(progress, [0, 0.18], [0, 1]);

  return (
    <section
    id="testimonials"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-24 text-white md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,0.14),transparent_38%),radial-gradient(circle_at_50%_100%,rgba(168,85,247,0.12),transparent_42%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          style={{ y: headingY, opacity: headingOpacity }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex rounded-full border border-sky-400/25 bg-white/[0.04] px-4 py-1.5 text-xs font-black uppercase tracking-[0.28em] text-sky-200">
            5-star client feedback
          </div>

          <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.06em] md:text-6xl">
            Built for businesses that need leads, not excuses.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/65">
            Real feedback from local service businesses and brands we’ve helped
            with websites, ads, funnels, and online growth.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.name}-${index}`}
              testimonial={testimonial}
              index={index}
              progress={progress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}