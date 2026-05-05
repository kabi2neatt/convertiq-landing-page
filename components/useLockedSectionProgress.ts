"use client";

import { useEffect, useRef } from "react";
import { MotionValue, useMotionValue, useSpring } from "framer-motion";

type Options = {
  speed?: number;
};

type LockItem = {
  ref: React.RefObject<HTMLElement | null>;
  raw: MotionValue<number>;
  speed: number;
};

const registry = new Set<LockItem>();
let globalListenersInstalled = false;
let touchY = 0;
let snapping = false;

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

function snapTo(el: HTMLElement) {
  if (snapping) return;

  snapping = true;

  window.scrollTo({
    top: el.offsetTop,
    behavior: "auto",
  });

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      snapping = false;
    });
  });
}

function getTarget(deltaY: number): LockItem | null {
  const items = Array.from(registry).filter((item) => item.ref.current);
  if (!items.length) return null;

  const vh = window.innerHeight;
  const goingDown = deltaY > 0;
  const scrollY = window.scrollY;

  const measured = items
    .map((item) => {
      const el = item.ref.current!;
      const rect = el.getBoundingClientRect();

      return {
        item,
        el,
        rect,
        topDistance: Math.abs(rect.top),
        offsetDistance: Math.abs(el.offsetTop - scrollY),
      };
    })
    .sort((a, b) => a.el.offsetTop - b.el.offsetTop);

  // 1) If a locked section is already occupying the viewport, it wins.
  const active = measured.find(({ rect }) => {
    return rect.top <= vh * 0.35 && rect.bottom >= vh * 0.65;
  });

  if (active) return active.item;

  // 2) Catch sections before the browser can blast past them.
  if (goingDown) {
    const next = measured.find(({ rect, el }) => {
      const sectionIsAhead = el.offsetTop >= scrollY - 4;
      const closeToViewport = rect.top > 0 && rect.top < vh * 1.25;
      return sectionIsAhead && closeToViewport;
    });

    if (next) return next.item;
  } else {
    const previous = [...measured].reverse().find(({ rect, el }) => {
      const sectionIsBehind = el.offsetTop <= scrollY + 4;
      const closeToViewport = rect.bottom < vh && rect.bottom > -vh * 0.25;
      return sectionIsBehind && closeToViewport;
    });

    if (previous) return previous.item;
  }

  // 3) Fallback: nearest section if it is not too far away.
  const nearest = measured
    .map((m) => ({
      ...m,
      distance: Math.min(m.topDistance, m.offsetDistance),
    }))
    .sort((a, b) => a.distance - b.distance)[0];

  if (nearest && nearest.distance < vh * 0.85) return nearest.item;

  return null;
}

function driveSection(item: LockItem, deltaY: number, event: Event) {
  const el = item.ref.current;
  if (!el) return;

  const current = item.raw.get();

  const goingDown = deltaY > 0;
  const goingUp = deltaY < 0;

  const complete = current >= 0.985;
  const atStart = current <= 0.015;

  // Let normal page scroll resume only when the section animation is fully done.
  if (goingDown && complete) return;
  if (goingUp && atStart) return;

  event.preventDefault();
  event.stopPropagation();

  snapTo(el);

  const velocity = Math.min(Math.abs(deltaY) / 900, 0.9);
  const power = item.speed + velocity * 0.00055;

  const next = clamp(current + deltaY * power);

  if (next >= 0.985) {
    item.raw.set(1);
    return;
  }

  if (next <= 0.015) {
    item.raw.set(0);
    return;
  }

  item.raw.set(next);
}

function installGlobalListeners() {
  if (globalListenersInstalled || typeof window === "undefined") return;
  globalListenersInstalled = true;

  const onWheel = (event: WheelEvent) => {
    const target = getTarget(event.deltaY);
    if (!target) return;

    driveSection(target, event.deltaY, event);
  };

  const onTouchStart = (event: TouchEvent) => {
    touchY = event.touches[0]?.clientY ?? 0;
  };

  const onTouchMove = (event: TouchEvent) => {
    const currentY = event.touches[0]?.clientY ?? touchY;
    const deltaY = (touchY - currentY) * 2.4;
    touchY = currentY;

    if (Math.abs(deltaY) < 0.5) return;

    const target = getTarget(deltaY);
    if (!target) return;

    driveSection(target, deltaY, event);
  };

  // capture=true is the key. This catches wheel/touch before the page scrolls past.
  window.addEventListener("wheel", onWheel, { passive: false, capture: true });
  window.addEventListener("touchstart", onTouchStart, {
    passive: true,
    capture: true,
  });
  window.addEventListener("touchmove", onTouchMove, {
    passive: false,
    capture: true,
  });
}

export function useLockedSectionProgress(options: Options = {}): {
  ref: React.RefObject<HTMLElement | null>;
  progress: MotionValue<number>;
} {
  const { speed = 0.00115 } = options;

  const ref = useRef<HTMLElement | null>(null);
  const raw = useMotionValue(0);

  const progress = useSpring(raw, {
    stiffness: 90,
    damping: 23,
    mass: 0.42,
  });

  useEffect(() => {
    installGlobalListeners();

    const item: LockItem = {
      ref,
      raw,
      speed,
    };

    registry.add(item);

    if (ref.current) {
      ref.current.dataset.lockedScrollSection = "true";
    }

    return () => {
      registry.delete(item);
    };
  }, [raw, speed]);

  return { ref, progress };
}