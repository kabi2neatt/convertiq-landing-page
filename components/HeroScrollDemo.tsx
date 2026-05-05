"use client";

import React, { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

const CALENDLY_URL = "https://calendly.com/kabir-convertiq-media/30min";

const clientLogos = [
  "/Clients/Summit Roofing.png",
  "/Clients/Clearflow Plumbing.png",
  "/Clients/Multi Logo.png",
  "/Clients/mrgutter.png",
];

function TallyModal({
  open,
  onClose,
  type,
}: {
  open: boolean;
  onClose: () => void;
  type: "demo" | "audit";
}) {
  const touchStartY = React.useRef<number | null>(null);
  const touchStartX = React.useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;

    if (typeof window !== "undefined" && (window as any).Tally) {
      setTimeout(() => (window as any).Tally.loadEmbeds(), 100);
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const isDemo = type === "demo";

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0]?.clientY ?? null;
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null || touchStartX.current === null) return;

    const endY = e.changedTouches[0]?.clientY ?? touchStartY.current;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;

    const deltaY = endY - touchStartY.current;
    const deltaX = Math.abs(endX - touchStartX.current);

    if (deltaY > 150 && deltaX < 80) onClose();

    touchStartY.current = null;
    touchStartX.current = null;
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-[9999999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            onClick={onClose}
            className="fixed bottom-6 left-1/2 z-[10000000] -translate-x-1/2 rounded-full bg-white px-8 py-4 text-sm font-black text-black shadow-[0_10px_50px_rgba(0,0,0,0.65)] transition hover:scale-105"
          >
            Close Form
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            className="relative h-[82vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_40px_160px_rgba(37,99,235,0.35)]"
          >
            <div className="h-full overflow-y-auto p-3 pb-24 md:p-5 md:pb-28">
              <iframe
                data-tally-src={
                  isDemo
                    ? "https://tally.so/embed/rj2APX?hideTitle=1&dynamicHeight=1"
                    : "https://tally.so/embed/eq9eaJ?hideTitle=1&dynamicHeight=1"
                }
                loading="lazy"
                width="100%"
                height={isDemo ? 1335 : 1274}
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title={isDemo ? "Free Website Demo Request" : "Google Ads Audit"}
                className="w-full rounded-2xl bg-black"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeroButton({
  children,
  variant = "purple",
  onClick,
  href,
}: {
  children: React.ReactNode;
  variant?: "sky" | "purple" | "blue";
  onClick?: () => void;
  href?: string;
}) {
  const styles = {
    sky: "bg-[#38bdf8] text-black shadow-[0_0_35px_rgba(56,189,248,0.45)] hover:bg-[#7dd3fc]",
    purple:
      "bg-[#8b45d9] text-white shadow-[0_0_35px_rgba(168,85,247,0.32)] hover:bg-purple-500",
    blue: "bg-[#1600b8] text-white shadow-[0_0_35px_rgba(37,99,235,0.3)] hover:bg-blue-700",
  };

  const className = `w-full rounded-xl px-5 py-3 text-center text-[13px] font-black transition md:w-auto md:px-6 md:py-4 md:text-sm ${styles[variant]}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -4, scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={className}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}

function FixedMobileNavbar() {
  const [open, setOpen] = useState(false);

  const openForm = (type: "demo" | "audit") => {
    setOpen(false);
    window.dispatchEvent(
      new CustomEvent("open-convertiq-form", { detail: { type } })
    );
  };

  const close = () => setOpen(false);

  return (
    <div className="fixed left-3 right-3 top-[calc(env(safe-area-inset-top)+0.6rem)] z-[999999] md:hidden">
      <div className="rounded-3xl border border-white/10 bg-black/68 p-1.5 shadow-[0_18px_70px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
        <div className="flex items-center justify-between gap-2">
          <a href="#home" onClick={close} className="shrink-0">
            <img
              src="/convertiqmedia.png"
              alt="ConvertIQ Media"
              className="h-11 w-11 rounded-sm bg-white object-contain p-1"
            />
          </a>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-2xl bg-[#38bdf8] px-5 py-2.5 text-sm font-black text-black shadow-[0_0_28px_rgba(56,189,248,0.55)]"
          >
            Book Call
          </a>
        </div>

        <div className="mt-1.5 grid grid-cols-2 gap-1.5">
          <a
            href="#home"
            onClick={close}
            className="rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-2.5 text-center text-sm font-black text-white backdrop-blur-xl"
          >
            Home
          </a>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="rounded-2xl border border-white/10 bg-white/[0.07] px-3 py-2.5 text-center text-sm font-black text-white backdrop-blur-xl"
          >
            Navigation ↓
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/95 p-2 text-left shadow-[0_25px_90px_rgba(0,0,0,0.75)]"
            >
              <a
                href="#services"
                onClick={close}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-white/90 hover:bg-white/10"
              >
                Services
              </a>

              <a
                href="#case-study"
                onClick={close}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-white/90 hover:bg-white/10"
              >
                Case Study
              </a>

              <a
                href="#why-us"
                onClick={close}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-white/90 hover:bg-white/10"
              >
                Why ConvertIQ
              </a>

              <a
                href="#faq"
                onClick={close}
                className="block rounded-xl px-4 py-3 text-sm font-bold text-white/90 hover:bg-white/10"
              >
                FAQ
              </a>

              <button
                type="button"
                onClick={() => openForm("demo")}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-white/90 hover:bg-white/10"
              >
                Free Website Demo
              </button>

              <button
                type="button"
                onClick={() => openForm("audit")}
                className="block w-full rounded-xl px-4 py-3 text-left text-sm font-bold text-white/90 hover:bg-white/10"
              >
                Free Google Ads Audit
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function HeroContent({
  progress,
  isMobile = false,
}: {
  progress: MotionValue<number>;
  isMobile?: boolean;
}) {
  const [activeForm, setActiveForm] = useState<"demo" | "audit" | null>(null);
  const repeatedClientLogos = Array(12).fill(clientLogos).flat();
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleOpenForm = (event: Event) => {
      const customEvent = event as CustomEvent<{ type: "demo" | "audit" }>;

      if (customEvent.detail?.type === "demo") setActiveForm("demo");
      if (customEvent.detail?.type === "audit") setActiveForm("audit");
    };

    window.addEventListener("open-convertiq-form", handleOpenForm);
    return () => window.removeEventListener("open-convertiq-form", handleOpenForm);
  }, []);

  const videoY = useTransform(progress, [0, 1], [18, -70]);
  const videoScale = useTransform(progress, [0, 1], [1.08, 1.28]);

  const contentY = useTransform(
    progress,
    [0, 0.35, 0.7, 1],
    isMobile ? [0, -35, -75, -105] : [0, 0, 0, 0]
  );

  const contentScale = useTransform(
    progress,
    [0, 0.45, 1],
    isMobile ? [1, 0.96, 0.9] : [1, 1, 1]
  );

  const badgeOpacity = useTransform(
    progress,
    [0, 0.25],
    isMobile ? [1, 0.1] : [1, 1]
  );
  const badgeY = useTransform(
    progress,
    [0, 0.25],
    isMobile ? [0, -24] : [0, 0]
  );

  const headlineY = useTransform(
    progress,
    [0, 0.5, 1],
    isMobile ? [0, -8, -18] : [0, 0, 0]
  );

  const headlineScale = useTransform(
    progress,
    [0, 0.5, 1],
    isMobile ? [1, 0.98, 0.94] : [1, 1, 1]
  );

  const headlineOpacity = useTransform(
    progress,
    [0, 1],
    isMobile ? [1, 0.98] : [1, 1]
  );

  const subOpacity = useTransform(
    progress,
    [0.12, 0.3, 0.72],
    isMobile ? [0, 1, 0.85] : [1, 1, 1]
  );
  const subY = useTransform(
    progress,
    [0.12, 0.3],
    isMobile ? [26, 0] : [0, 0]
  );

  const ctaOpacity = useTransform(
    progress,
    [0.28, 0.48, 0.82],
    isMobile ? [0, 1, 0.9] : [1, 1, 1]
  );
  const ctaY = useTransform(
    progress,
    [0.28, 0.48],
    isMobile ? [30, 0] : [0, 0]
  );

  const trustOpacity = useTransform(
    progress,
    [0.5, 0.68, 0.9],
    isMobile ? [0, 1, 0.85] : [1, 1, 1]
  );
  const trustY = useTransform(
    progress,
    [0.5, 0.68],
    isMobile ? [24, 0] : [0, 0]
  );

  const systemCardOpacity = useTransform(
    progress,
    [0.62, 0.82],
    isMobile ? [0, 1] : [0, 0]
  );
  const systemCardY = useTransform(
    progress,
    [0.62, 0.82],
    isMobile ? [70, 0] : [70, 70]
  );
  const systemCardScale = useTransform(
    progress,
    [0.62, 0.82],
    isMobile ? [0.9, 1] : [0.9, 0.9]
  );

  const logoOpacity = useTransform(
    progress,
    [0.82, 1],
    isMobile ? [0, 1] : [1, 1]
  );
  const logoY = useTransform(
    progress,
    [0.82, 1],
    isMobile ? [40, 0] : [0, 0]
  );

  return (
    <>
      <div
        className="relative h-full w-full overflow-hidden rounded-none md:rounded-2xl"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setMouse({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          });
        }}
      >
        <motion.video
          src="/vsl.mp4"
          style={{ y: videoY, scale: videoScale }}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-black/20 md:bg-black/35" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.08),rgba(0,0,0,0.52)_48%,rgba(0,0,0,0.86))]" />

        <motion.div
          animate={{ left: `${mouse.x}%`, top: `${mouse.y}%` }}
          transition={{ type: "spring", stiffness: 70, damping: 24 }}
          className="pointer-events-none absolute z-10 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/12 blur-[80px] md:h-[360px] md:w-[360px] md:blur-[100px]"
        />

        <div className="relative z-20 flex h-full flex-col items-center justify-start px-4 pt-[14.75rem] text-center md:justify-center md:px-6 md:pt-0">
          <motion.div
            style={{ y: contentY, scale: contentScale }}
            className="flex flex-col items-center"
          >
            <motion.div
              style={{ opacity: badgeOpacity, y: badgeY }}
              className="mb-3 inline-flex rounded-full border border-purple-400/30 bg-purple-500/20 px-3 py-1 text-[10px] font-bold text-purple-100 backdrop-blur md:mb-5 md:px-4 md:py-1.5 md:text-xs"
            >
              Trusted by local businesses across Ontario
            </motion.div>

            <motion.h1
              style={{ y: headlineY, scale: headlineScale, opacity: headlineOpacity }}
              className="max-w-5xl text-[1.85rem] font-black leading-[0.94] tracking-[-0.065em] text-white brightness-110 drop-shadow-[0_6px_28px_rgba(0,0,0,0.75)] min-[390px]:text-[2.02rem] md:text-6xl md:leading-[0.95] lg:text-7xl"
            >
              Generate More Calls &<br />
              Booked Jobs — With<br />
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                High-Intent Google Ads
              </span>
            </motion.h1>

            <motion.p
              style={{ opacity: subOpacity, y: subY }}
              className="mt-3 max-w-[330px] text-[12.5px] font-semibold leading-6 text-white/90 drop-shadow-[0_3px_18px_rgba(0,0,0,0.8)] md:mt-6 md:max-w-2xl md:text-base md:leading-7"
            >
              We build your website, launch your ads, and create a system that
              consistently brings in qualified leads.
            </motion.p>

            <motion.div
              style={{ opacity: ctaOpacity, y: ctaY }}
              className="mt-3 grid w-full max-w-[300px] gap-2.5 md:mt-8 md:flex md:max-w-none md:flex-row md:items-center md:justify-center md:gap-4"
            >
              <HeroButton href={CALENDLY_URL} variant="sky">
                Book Free Strategy Call ↗
              </HeroButton>

              <HeroButton onClick={() => setActiveForm("demo")} variant="blue">
                Website Demo ↓
              </HeroButton>

              <HeroButton onClick={() => setActiveForm("audit")} variant="purple">
                Quick Audit ↓
              </HeroButton>
            </motion.div>

            <motion.div
              style={{ opacity: trustOpacity, y: trustY }}
              className="mt-4 inline-flex max-w-[330px] flex-wrap items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-2.5 text-[10.5px] font-bold text-white/90 backdrop-blur-xl md:mt-10 md:max-w-none md:gap-3 md:rounded-full md:px-5 md:py-3 md:text-xs"
            >
              <span className="text-yellow-300">★★★★★</span>
              <span>5 Stars on Google</span>
              <span className="hidden h-1 w-1 rounded-full bg-white/35 md:block" />
              <span className="text-white/70 md:text-white/85">
                Trusted by 25+ home service businesses
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            style={{
              opacity: systemCardOpacity,
              y: systemCardY,
              scale: systemCardScale,
            }}
            className="absolute bottom-24 left-4 right-4 z-30 rounded-3xl border border-white/10 bg-black/45 p-4 text-left text-white shadow-[0_30px_120px_rgba(37,99,235,0.28)] backdrop-blur-xl md:hidden"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.22em] text-blue-200">
              The ConvertIQ System
            </p>
            <h3 className="mt-2 text-xl font-black leading-tight tracking-[-0.04em]">
              Website + Ads + Tracking = Booked Jobs
            </h3>
            <p className="mt-2 text-xs font-medium leading-6 text-white/72">
              Scroll through the hero to see the offer, proof, and client logos
              reveal before the page releases.
            </p>
          </motion.div>

          <motion.div
            style={{ opacity: logoOpacity, y: logoY }}
            className="absolute bottom-5 left-4 right-4 z-30 overflow-hidden border-y border-white/10 py-2 md:static md:mt-8 md:w-full md:max-w-6xl md:py-4"
          >
            <div className="client-marquee-track flex w-max items-center gap-0">
              {repeatedClientLogos.map((src, i) => (
                <div
                  key={`${src}-${i}`}
                  className="client-logo-float flex items-center justify-center px-1.5 md:px-2"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <img
                    src={src}
                    alt="Client logo"
                    className="h-11 w-auto object-contain opacity-95 transition duration-500 hover:scale-105 hover:opacity-100 md:h-[6.8rem]"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <TallyModal
        open={activeForm !== null}
        type={activeForm ?? "demo"}
        onClose={() => setActiveForm(null)}
      />
    </>
  );
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

function MobileHeroScroll() {
  const progressRaw = useMotionValue(0);
  const progressValue = React.useRef(0);
  const touchStartY = React.useRef<number | null>(null);
  const [released, setReleased] = useState(false);

  const progress = useSpring(progressRaw, {
    stiffness: 55,
    damping: 18,
    mass: 0.22,
  });

  useEffect(() => {
    if (released) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverscroll = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "none";

    const clamp = (value: number) => Math.min(1, Math.max(0, value));

    const advance = (delta: number) => {
      const next = clamp(progressValue.current + delta / 1450);
      progressValue.current = next;
      progressRaw.set(next);

      if (next >= 1) {
        setReleased(true);

        window.setTimeout(() => {
          document.body.style.overflow = originalBodyOverflow;
          document.documentElement.style.overscrollBehavior = originalHtmlOverscroll;

          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }, 120);
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (touchStartY.current === null) return;
      e.preventDefault();

      const currentY = e.touches[0]?.clientY ?? touchStartY.current;
      const delta = touchStartY.current - currentY;

      if (Math.abs(delta) > 2) {
        advance(delta);
        touchStartY.current = currentY;
      }
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      advance(e.deltaY);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overscrollBehavior = originalHtmlOverscroll;
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("wheel", onWheel);
    };
  }, [released, progressRaw]);

  return (
    <section id="home" className="relative h-[100svh] overflow-hidden bg-black text-white">
      <FixedMobileNavbar />
      <HeroContent progress={progress} isMobile />
    </section>
  );
}

export function HeroScrollDemo() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileHeroScroll />;
  }

  return (
    <section id="home" className="relative overflow-hidden bg-black text-white">
      <ContainerScroll>
        {(progress) => <HeroContent progress={progress} isMobile={false} />}
      </ContainerScroll>
    </section>
  );
}
