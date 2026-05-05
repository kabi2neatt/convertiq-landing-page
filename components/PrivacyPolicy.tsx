// components/PrivacyPolicy.tsx
"use client";

import { motion } from "framer-motion";

export function PrivacyPolicy() {
  return (
    <section
      id="privacy-policy"
      className="relative overflow-hidden bg-black px-4 py-24 text-white md:px-6 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.18),transparent_35%),radial-gradient(circle_at_bottom,rgba(168,85,247,0.14),transparent_38%)]" />

      <div className="relative mx-auto max-w-4xl">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <div className="mb-5 inline-flex rounded-full border border-purple-400/25 bg-white/[0.04] px-5 py-2 text-[10px] font-black uppercase tracking-[0.28em] text-purple-200 md:text-xs">
            Legal
          </div>

          <h1 className="text-4xl font-black leading-[0.92] tracking-[-0.07em] md:text-6xl">
            Privacy{" "}
            <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
              Policy
            </span>
          </h1>

          <p className="mt-4 text-sm text-white/60 md:text-base">
            Effective Date: March 2026
          </p>
        </motion.div>

        {/* CONTENT */}
        <div className="space-y-10 text-sm leading-7 text-white/70 md:text-base">
          <Section title="1. Information We Collect">
            Full name, email address, phone number, company name, job title,
            website URL, marketing data, and any information you provide through
            forms or consultations. We may also collect non-personal data like IP
            address, browser type, and usage data.
          </Section>

          <Section title="2. How We Use Your Information">
            We use your data to respond to inquiries, provide services, schedule
            consultations, improve our systems, communicate updates, and comply
            with legal requirements. We do not sell your data.
          </Section>

          <Section title="3. Lead Forms & Advertising Platforms">
            Data submitted via LinkedIn, Google, or similar platforms is used
            solely to contact you and is securely stored in our internal systems.
          </Section>

          <Section title="4. Cookies & Tracking">
            We use cookies, analytics tools, and conversion tracking to improve
            performance. You can disable cookies in your browser settings.
          </Section>

          <Section title="5. Data Security">
            We use secure systems, SSL encryption, and restricted access to
            protect your information. However, no system is 100% secure.
          </Section>

          <Section title="6. Disclosure">
            We may share data with trusted tools (CRM, analytics, email
            platforms) only for operations, or when required by law.
          </Section>

          <Section title="7. Data Retention">
            We retain your data only as long as necessary. You may request
            deletion at any time.
          </Section>

          <Section title="8. Your Rights (Canada)">
            You may request access, correction, deletion, or withdraw consent.
          </Section>

          <Section title="9. Third-Party Links">
            We are not responsible for external websites linked from our site.
          </Section>

          <Section title="10. Contact">
            ConvertIQ Media
            <br />
            Email: info@convert-iq-media.com
            <br />
            Website: https://convert-iq-media.com
          </Section>

          <Section title="11. Updates">
            This policy may be updated. Changes will be reflected here with a new
            effective date.
          </Section>
        </div>
      </div>
    </section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl"
    >
      <h3 className="mb-3 text-lg font-bold text-white">{title}</h3>
      <p>{children}</p>
    </motion.div>
  );
}