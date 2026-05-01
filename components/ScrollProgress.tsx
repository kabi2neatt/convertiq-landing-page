"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.35,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[9999] h-[3px] w-full origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-fuchsia-400 shadow-[0_0_18px_rgba(168,85,247,0.65)]"
    />
  );
}