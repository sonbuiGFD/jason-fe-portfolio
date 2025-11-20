"use client";

import { useEffect, useState } from "react";
import HeroGraphic from "./HeroGraphic";
import HeroGraphicMobile from "./HeroGraphicMobile";

import "./style.scss";

function SectionHero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches);
    };
    handleResize(mediaQuery);
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <section className="hero">
      {isMobile ? <HeroGraphicMobile /> : <HeroGraphic />}
    </section>
  );
}

export default SectionHero;
