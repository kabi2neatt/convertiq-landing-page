"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Camera, Mail, Phone } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/kabir-convertiq-media/30min";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    setStatus("idle");
    setMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          source: "Quick Contact Section",
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success === true) {
        setStatus("success");
        setMessage("✅ Submitted — we’ll reach out soon.");
        form.reset();
        return;
      }

      setStatus("error");
      setMessage(data.error || "❌ Failed to submit. Check terminal for errors.");
    } catch (error) {
      console.error("Contact form submit error:", error);
      setStatus("error");
      setMessage("❌ Failed to submit. Check terminal for errors.");
    } finally {
      setLoading(false);
    }
  }

  const contactItems = [
    {
      href: "mailto:contact@convertiqmedia.info",
      icon: Mail,
      label: "Email",
      value: "contact@convertiqmedia.info",
      color: "sky",
    },
    {
      href: "tel:+16477779147",
      icon: Phone,
      label: "Phone",
      value: "647-777-9147",
      color: "sky",
    },
    {
      href: "https://www.instagram.com/convert_iq_media/",
      icon: Camera,
      label: "Instagram",
      value: "@convert_iq_media",
      color: "purple",
    },
    {
      href: CALENDLY_URL,
      icon: CalendarDays,
      label: "Book Online",
      value: "Book a 30-minute strategy call",
      color: "sky",
    },
  ];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-black px-5 py-20 text-white md:px-6 md:py-28"
    >
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[18%] h-72 w-72 rounded-full bg-sky-400/15 blur-[110px]"
        animate={{ y: [0, 35, 0], x: [0, 20, 0], opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="pointer-events-none absolute bottom-[10%] right-[8%] h-80 w-80 rounded-full bg-purple-500/15 blur-[120px]"
        animate={{ y: [0, -35, 0], x: [0, -20, 0], opacity: [0.3, 0.65, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 70, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true, margin: "-90px" }}
        className="relative mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_40px_160px_rgba(37,99,235,0.2)] backdrop-blur-xl md:grid-cols-[0.9fr_1.1fr] md:p-12"
      >
        <motion.div
          initial={{ opacity: 0, x: -45 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-6 inline-flex rounded-full border border-sky-300/25 bg-sky-400/10 px-5 py-2 text-xs font-black uppercase tracking-[0.24em] text-sky-200 md:mb-8"
          >
            Contact Us
          </motion.div>

          <div className="mb-7 flex flex-col items-start gap-5 sm:flex-row sm:items-center md:mb-8">
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-1.5, 1.5, -1.5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-white p-3 shadow-[0_0_55px_rgba(56,189,248,0.28)] md:h-36 md:w-36"
            >
              <motion.div
                className="absolute inset-0 rounded-3xl border border-sky-300/35"
                animate={{ scale: [1, 1.18, 1], opacity: [0.75, 0.18, 0.75] }}
                transition={{ duration: 3.2, repeat: Infinity }}
              />

              <Image
                src="/convertiqmedia.png"
                alt="ConvertIQ Media"
                width={400}
                height={420}
                className="relative z-10 h-full w-full rounded-xl object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.28 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.06em] md:text-5xl">
                Let’s build your lead system.
              </h2>
              <p className="mt-3 max-w-md text-sm leading-7 text-white/62">
                Send a quick request, book a call, or message us directly.
              </p>
            </motion.div>
          </div>

          <div className="grid gap-4">
            {contactItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: -38 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.34 + index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4 transition ${
                    item.color === "purple"
                      ? "hover:border-purple-300/40 hover:bg-purple-400/10"
                      : "hover:border-sky-300/40 hover:bg-sky-400/10"
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.12 }}
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                      item.color === "purple"
                        ? "bg-purple-400/15 text-purple-200"
                        : "bg-sky-400/15 text-sky-200"
                    }`}
                  >
                    <Icon size={20} />
                  </motion.div>

                  <div className="min-w-0">
                    <div className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">
                      {item.label}
                    </div>
                    <div
                      className={`break-words font-bold text-white ${
                        item.color === "purple"
                          ? "group-hover:text-purple-200"
                          : "group-hover:text-sky-200"
                      }`}
                    >
                      {item.value}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 45 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.18 }}
          viewport={{ once: true }}
          className="rounded-[1.75rem] border border-white/10 bg-black/45 p-5 shadow-[inset_0_0_60px_rgba(255,255,255,0.03)] md:p-7"
        >
          <motion.h3
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl font-black tracking-[-0.04em] text-white"
          >
            Quick Contact
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.36 }}
            viewport={{ once: true }}
            className="mt-2 text-sm text-white/60"
          >
            Leave your details and we’ll reach out shortly.
          </motion.p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {["name", "email", "phone"].map((field, index) => (
              <motion.input
                key={field}
                name={field}
                required
                type={field === "email" ? "email" : "text"}
                placeholder={
                  field === "name"
                    ? "Name"
                    : field === "email"
                    ? "Email"
                    : "Phone Number"
                }
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.44 + index * 0.07 }}
                viewport={{ once: true }}
                whileFocus={{ scale: 1.01 }}
                className="w-full rounded-md border border-white/10 bg-white/90 px-4 py-3 text-black outline-none transition focus:border-sky-400 focus:shadow-[0_0_25px_rgba(56,189,248,0.25)]"
              />
            ))}

            <motion.button
              type="submit"
              disabled={loading}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.66 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full rounded-md bg-[#38bdf8] py-3 font-bold text-black transition hover:bg-[#7dd3fc] hover:shadow-[0_0_28px_rgba(56,189,248,0.45)] disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </motion.button>
          </form>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`mt-5 rounded-xl border p-4 text-sm font-semibold ${
                status === "success"
                  ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                  : "border-white/10 bg-black/30 text-white"
              }`}
            >
              {message}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
