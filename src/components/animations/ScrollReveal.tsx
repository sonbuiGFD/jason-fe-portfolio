"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";

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
 * Elements already in viewport on page load will animate immediately.
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

  // Animation variants
  const animations = {
    "fade-up": {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
    },
    "fade-in": {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    "scale-in": {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
    },
    "slide-left": {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
    },
    "slide-right": {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
    },
  };

  const selectedAnimation = animations[animation];

  // If user prefers reduced motion, skip animation
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={selectedAnimation.initial}
      whileInView={selectedAnimation.animate}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1], // Custom easing for smooth animation
      }}
      viewport={{
        once: true, // Animate only once when scrolling into view
        margin: "0px", // Trigger immediately when element enters viewport
        amount: 0.1, // Trigger when 10% of element is visible
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
