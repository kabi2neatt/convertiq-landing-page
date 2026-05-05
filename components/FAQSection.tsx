// components/FAQSection.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What does ConvertIQ Media do?",
    a: "ConvertIQ Media helps service businesses generate more qualified leads through Google Ads campaign optimization, landing page improvements, website design, and conversion tracking.",
  },
  {
    q: "Who do you work with?",
    a: "We primarily work with local service businesses such as roofing, plumbing, HVAC, landscaping, construction, and professional service companies.",
  },
  {
    q: "Do you manage Google Ads campaigns?",
    a: "Yes. We handle campaign setup, keyword targeting, negative keywords, ad copy, budget structure, conversion tracking, and ongoing optimization.",
  },
  {
    q: "Can you audit my existing Google Ads account?",
    a: "Yes. We identify wasted ad spend, weak keywords, poor landing pages, missing tracking, and opportunities to improve lead quality.",
  },
  {
    q: "How long does it take to see results?",
    a: "Most campaigns start generating useful data within the first few weeks. Stronger optimization usually happens over 30–90 days depending on budget, competition, and offer quality.",
  },
  {
    q: "Do you guarantee leads?",
    a: "No ethical agency can guarantee a fixed number of leads. What we guarantee is a structured, tracking-first system designed to improve lead quality and reduce wasted spend.",
  },
];

function FAQItem({
  faq,
  index,
}: {
  faq: (typeof faqs)[number];
  index: number;
}) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 45, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] shadow-[0_30px_120px_rgba(37,99,235,0.14)] backdrop-blur-xl"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left md:px-7"
      >
        <span className="text-base font-black text-white md:text-lg">
          {faq.q}
        </span>

        <motion.span animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown size={22} className="text-purple-200" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div className="border-t border-white/10 px-5 pb-6 pt-4 text-sm leading-7 text-white/70 md:px-7 md:text-base">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-black px-4 py-24 text-white md:px-6 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_35%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.14),transparent_38%)]" />

      <div className="relative mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex rounded-full border border-purple-400/25 bg-white/[0.04] px-5 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-purple-200 md:text-xs">
            FAQ
          </div>

          <h2 className="text-4xl font-black leading-[0.92] tracking-[-0.07em] md:text-7xl">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
              Questions.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 md:text-lg">
            Common questions about Google Ads, lead generation, website demos,
            and working with ConvertIQ Media.
          </p>
        </motion.div>

        <div className="grid gap-4">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.q} faq={faq} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}