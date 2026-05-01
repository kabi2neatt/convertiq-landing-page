"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

type ContainerScrollProps = {
  children:
    | React.ReactNode
    | ((progress: MotionValue<number>) => React.ReactNode);
};

export const ContainerScroll = ({ children }: ContainerScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  const smoothProgress = useSpring(progress, {
    stiffness: 95,
    damping: 24,
    mass: 0.4,
  });

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const isHeroActive = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (!isHeroActive) return;

      const current = progress.get();
      const scrollingDown = event.deltaY > 0;
      const scrollingUp = event.deltaY < 0;

      const isComplete = current >= 0.98;
      const isAtStart = current <= 0.02;

      const shouldLockScroll =
        (scrollingDown && !isComplete) || (scrollingUp && !isAtStart);

      if (!shouldLockScroll) return;

      event.preventDefault();

      const next = Math.min(1, Math.max(0, current + event.deltaY * 0.0012));

      if (next >= 0.98) {
        progress.set(1);
        return;
      }

      if (next <= 0.02) {
        progress.set(0);
        return;
      }

      progress.set(next);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [progress]);

  const rotateX = useTransform(smoothProgress, [0, 1], [18, 0]);
  const scale = useTransform(smoothProgress, [0, 0.9, 1], [0.72, 1.025, 1]);
  const y = useTransform(smoothProgress, [0, 1], [40, 0]);
  const borderRadius = useTransform(smoothProgress, [0, 1], [42, 0]);
  const padding = useTransform(smoothProgress, [0, 1], [14, 0]);
  const frameWidth = useTransform(smoothProgress, [0, 1], ["82vw", "100vw"]);
  const frameHeight = useTransform(smoothProgress, [0, 1], ["62vh", "100vh"]);

  const glowOpacity = useTransform(
    smoothProgress,
    [0, 0.7, 1],
    [0.35, 0.75, 0.15]
  );

  return (
    <section ref={containerRef} className="relative h-screen bg-black">
      <div className="flex h-screen items-center justify-center overflow-hidden">
        <div
          className="relative flex h-full w-full items-center justify-center"
          style={{ perspective: "1600px" }}
        >
          <Card
            rotateX={rotateX}
            scale={scale}
            y={y}
            borderRadius={borderRadius}
            padding={padding}
            frameWidth={frameWidth}
            frameHeight={frameHeight}
            glowOpacity={glowOpacity}
          >
            {typeof children === "function" ? children(smoothProgress) : children}
          </Card>
        </div>
      </div>
    </section>
  );
};

export const Card = ({
  rotateX,
  scale,
  y,
  borderRadius,
  padding,
  frameWidth,
  frameHeight,
  glowOpacity,
  children,
}: {
  rotateX: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
  borderRadius: MotionValue<number>;
  padding: MotionValue<number>;
  frameWidth: MotionValue<string>;
  frameHeight: MotionValue<string>;
  glowOpacity: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX,
        scale,
        y,
        width: frameWidth,
        height: frameHeight,
        borderRadius,
        padding,
        transformOrigin: "center center",
        boxShadow:
          "0 50px 160px rgba(59,130,246,0.24), 0 25px 100px rgba(168,85,247,0.18)",
      }}
      className="relative overflow-hidden border border-white/15 bg-white/[0.045] backdrop-blur-xl"
    >
      <motion.div
        style={{ opacity: glowOpacity }}
        className="pointer-events-none absolute -inset-20 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.35),transparent_45%)] blur-3xl"
      />

      <motion.div
        style={{ borderRadius }}
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_28%,rgba(59,130,246,0.12)_55%,transparent_78%)]"
      />

      <div className="relative h-full w-full overflow-hidden rounded-[inherit] border border-white/10 bg-black/70 shadow-[inset_0_0_50px_rgba(255,255,255,0.05)]">
        {children}
      </div>
    </motion.div>
  );
};