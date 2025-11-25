"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

import HeroGraphic from "./HeroGraphic";
import HeroGraphicMobile from "./HeroGraphicMobile";

import "./style.scss";

function SectionHero() {
  const [isMobile, setIsMobile] = useState(false);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const measureText = (
    fontSize: number,
    cloneTitle: HTMLHeadingElement
  ): number => {
    // Get computed styles from original element
    const originalStyles = window.getComputedStyle(titleRef.current!);
    const letterSpacing = parseFloat(originalStyles.letterSpacing) || 0;
    const fontWeight = originalStyles.fontWeight;
    const fontFamily = originalStyles.fontFamily;
    const text = titleRef.current!.textContent || "";
    cloneTitle.style.fontSize = `${fontSize}px`;
    void cloneTitle.offsetHeight; // Force reflow

    // Create canvas to measure text accurately
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) return cloneTitle.offsetWidth;

    context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const metrics = context.measureText(text);

    // Add letter-spacing for all characters (including the last one due to CSS behavior)
    const totalLetterSpacing = letterSpacing * text.length;

    return metrics.width + totalLetterSpacing;
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };
    handleResize(mediaQuery);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  useEffect(() => {
    const calculateFontSize = () => {
      if (!titleRef.current || !containerRef.current) return;

      const container = containerRef.current;
      const title = titleRef.current;
      // Get container's actual content width (excluding padding)
      const containerStyles = window.getComputedStyle(container);
      const paddingLeft = parseFloat(containerStyles.paddingLeft);
      const paddingRight = parseFloat(containerStyles.paddingRight);
      const containerWidth = container.offsetWidth - paddingLeft - paddingRight;

      // Create a clone element to measure text width without affecting the original
      const cloneTitle = title.cloneNode(true) as HTMLHeadingElement;
      cloneTitle.style.position = "absolute";
      cloneTitle.style.visibility = "hidden";
      cloneTitle.style.pointerEvents = "none";
      cloneTitle.style.whiteSpace = "nowrap";
      cloneTitle.style.zIndex = "-1";
      document.body.appendChild(cloneTitle);

      // Binary search to find the largest font size that fits
      let minFontSize = 10; // Start with minimum 10px
      let maxFontSize = 1000; // Max possible font size
      let optimalFontSize = minFontSize;

      // Binary search for optimal font size
      while (maxFontSize - minFontSize > 0.5) {
        const testFontSize = (minFontSize + maxFontSize) / 2;
        const textWidth = measureText(testFontSize, cloneTitle);

        if (textWidth <= containerWidth) {
          // Text fits, try larger
          optimalFontSize = testFontSize;
          minFontSize = testFontSize;
        } else {
          // Text too large, try smaller
          maxFontSize = testFontSize;
        }
      }
      // Remove clone element
      document.body.removeChild(cloneTitle);

      // Apply the calculated font size
      title.style.fontSize = `${optimalFontSize}px`;
    };

    // Initial calculation
    calculateFontSize();

    // Recalculate on window resize
    window.addEventListener("resize", calculateFontSize);

    return () => window.removeEventListener("resize", calculateFontSize);
  }, []);

  return (
    <section className="hero">
      <div className="hero__content">
        <div className="container-custom" ref={containerRef}>
          <p className="hero__subtitle">Crafting Digital Experiences</p>
          <Link href="/work" aria-label="View My Work" className="hero__btn">
            View My Work
          </Link>
          <h1 className="hero__title" ref={titleRef}>
            JASON
          </h1>
        </div>
      </div>
      {isMobile ? <HeroGraphicMobile /> : <HeroGraphic />}
    </section>
  );
}

export default SectionHero;
