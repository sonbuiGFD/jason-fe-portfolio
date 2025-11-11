"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useState } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fade-up" | "fade-in" | "scale-in" | "slide-left" | "slide-right";
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * ScrollReveal Component
 *
 * Wraps content with scroll-triggered animations using Motion (Framer Motion).
 * Automatically respects user's prefers-reduced-motion setting.
 * Only animates after initial hydration to prevent blank screens and blinks.
 *
 * @example
 * ```tsx
 * <ScrollReveal animation="fade-up" delay={0.2}>
 *   <h2>Animated heading</h2>
 * </ScrollReveal>
 * ```
 */
export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.5,
  className = "",
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);

  // Wait for component to mount before enabling animations
  useEffect(() => {
    // Small delay to ensure hydration is complete
    const timer = setTimeout(() => setIsReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Animation variants
  const animations = {
    "fade-up": {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
    },
    "fade-in": {
      initial: { opacity: 0 },
      whileInView: { opacity: 1 },
    },
    "scale-in": {
      initial: { opacity: 0, scale: 0.95 },
      whileInView: { opacity: 1, scale: 1 },
    },
    "slide-left": {
      initial: { opacity: 0, x: -20 },
      whileInView: { opacity: 1, x: 0 },
    },
    "slide-right": {
      initial: { opacity: 0, x: 20 },
      whileInView: { opacity: 1, x: 0 },
    },
  };

  const selectedAnimation = animations[animation];

  // If user prefers reduced motion or animations not ready, render without motion
  if (shouldReduceMotion || !isReady) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.whileInView}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      viewport={{
        once: true,
        margin: "-50px",
        amount: 0.3,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
