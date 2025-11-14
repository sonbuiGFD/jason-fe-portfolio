"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

function SectionHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLightOn, setIsLightOn] = useState(true);

  // Green dots parallax (faster movement)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  // Black background parallax (slower movement for depth)
  const bgMouseX = useMotionValue(0);
  const bgMouseY = useMotionValue(0);
  const bgSpringX = useSpring(bgMouseX, { stiffness: 100, damping: 25 });
  const bgSpringY = useSpring(bgMouseY, { stiffness: 100, damping: 25 });

  // Tree parallax (medium movement for mid-ground depth)
  const tree1MouseX = useMotionValue(0);
  const tree1MouseY = useMotionValue(0);
  const tree1SpringX = useSpring(tree1MouseX, { stiffness: 120, damping: 28 });
  const tree1SpringY = useSpring(tree1MouseY, { stiffness: 120, damping: 28 });

  // Second tree parallax (medium movement for mid-ground depth)
  const tree2MouseX = useMotionValue(0);
  const tree2MouseY = useMotionValue(0);
  const tree2SpringX = useSpring(tree2MouseX, { stiffness: 130, damping: 28 });
  const tree2SpringY = useSpring(tree2MouseY, { stiffness: 130, damping: 28 });

  // Add after existing motion values
  const eyeX = useMotionValue(0);
  const eyeY = useMotionValue(0);
  const eyeSpringX = useSpring(eyeX, { stiffness: 200, damping: 20 });
  const eyeSpringY = useSpring(eyeY, { stiffness: 200, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      // Calculate mouse position relative to container center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) / rect.width;
      const y = (e.clientY - centerY) / rect.height;

      // Set the motion values for green dots (faster, more dramatic movement)
      mouseX.set(x * 80);
      mouseY.set(y * 80);

      // Set the motion values for trees (medium speed for mid-ground depth)
      tree1MouseX.set(x * 60);
      tree1MouseY.set(y * 60);
      tree2MouseX.set(x * 55);
      tree2MouseY.set(y * 55);

      // Set the motion values for black bg (slower for depth, scaled to prevent white space)
      bgMouseX.set(x * 40);
      bgMouseY.set(y * 40);

      // Calculate angle and constrain movement
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 100, 3); // Max 3px movement

      eyeX.set(Math.cos(angle) * distance);
      eyeY.set(Math.sin(angle) * distance);
    };

    const handleMouseLeave = () => {
      // Reset to center when mouse leaves
      mouseX.set(0);
      mouseY.set(0);
      tree1MouseX.set(0);
      tree1MouseY.set(0);
      tree2MouseX.set(0);
      tree2MouseY.set(0);
      bgMouseX.set(0);
      bgMouseY.set(0);
      eyeX.set(0);
      eyeY.set(0);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [
    mouseX,
    mouseY,
    tree1MouseX,
    tree1MouseY,
    tree2MouseX,
    tree2MouseY,
    bgMouseX,
    bgMouseY,
    eyeX,
    eyeY,
  ]);

  return (
    <div
      ref={containerRef}
      id="hero__graphic"
      className="hero__graphic min-h-screen"
    >
      <svg
        className="hero__svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 1921.05 1078.43"
      >
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="875.4"
            y1="712.76"
            x2="980.61"
            y2="712.76"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#383643" />
            <stop offset=".97" stopColor="#000" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-2"
            x1="926.89"
            y1="650.39"
            x2="1018.27"
            y2="650.39"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#5ec6ab" />
            <stop offset=".81" stopColor="#279e88" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-3"
            x1="1095.5"
            y1="530.82"
            x2="1089.17"
            y2="837.81"
            xlinkHref="#linear-gradient-2"
          />
          <linearGradient
            id="linear-gradient-4"
            x1="1034.03"
            y1="581.68"
            x2="1067.26"
            y2="498.6"
            xlinkHref="#linear-gradient"
          />
          <linearGradient
            id="linear-gradient-5"
            x1="929.03"
            y1="389.1"
            x2="943.67"
            y2="354.88"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#232323" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-6"
            x1="922.5"
            y1="450.34"
            x2="1236.86"
            y2="450.34"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".08" stopColor="#edcab7" />
            <stop offset=".32" stopColor="#ebb89d" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-7"
            x1="1015.21"
            y1="321.01"
            x2="1014.42"
            y2="452.13"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#1c1c1c" />
            <stop offset=".65" stopColor="#413537" />
            <stop offset=".92" stopColor="#896265" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-8"
            x1="927.8"
            y1="347.84"
            x2="965.03"
            y2="347.84"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#353535" />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-9"
            x1="940.53"
            y1="344.39"
            x2="965.03"
            y2="344.39"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#353535" />
            <stop offset=".9" stopColor="#000" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-10"
            x1="942.44"
            y1="339.41"
            x2="993.17"
            y2="344.06"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".46" stopColor="#353535" />
            <stop offset=".88" stopColor="#000" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-11"
            x1="1066.54"
            y1="463.55"
            x2="1116.61"
            y2="463.55"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".25" stopColor="#ebb89d" />
            <stop offset=".76" stopColor="#ffa897" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-12"
            x1="1094.14"
            y1="513.44"
            x2="1098.36"
            y2="425.88"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".39" stopColor="#ebb89d" />
            <stop offset=".76" stopColor="#e28574" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-13"
            x1="944.96"
            y1="488.18"
            x2="978.72"
            y2="444.4"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".25" stopColor="#ebb89d" />
            <stop offset=".76" stopColor="#e79d84" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-14"
            x1="952.77"
            y1="615.07"
            x2="882.75"
            y2="796.66"
            xlinkHref="#linear-gradient"
          />
          <linearGradient
            id="linear-gradient-15"
            x1="927.68"
            y1="577.98"
            x2="989.96"
            y2="577.98"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".1" stopColor="#edcab7" />
            <stop offset=".45" stopColor="#ebb89d" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-16"
            x1="1347.29"
            y1="758.52"
            x2="1451.9"
            y2="758.52"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#434053" />
            <stop offset=".82" stopColor="#000" />
          </linearGradient>
          <linearGradient
            id="linear-gradient-17"
            x1="1215.01"
            y1="754.8"
            x2="1178.47"
            y2="849.56"
            xlinkHref="#linear-gradient"
          />
          <clipPath id="clippath">
            <rect
              className="cls-1"
              x=".53"
              y="208.1"
              width="299.87"
              height="407.47"
            />
          </clipPath>
          <clipPath id="clippath-1">
            <rect className="cls-1" width="1921.05" height="1078.43" />
          </clipPath>
          <linearGradient
            id="linear-gradient-18"
            x1="834.32"
            y1="774.18"
            x2="946.08"
            y2="774.18"
            xlinkHref="#linear-gradient-15"
          />
          <linearGradient
            id="linear-gradient-19"
            x1="1004.09"
            y1="799.67"
            x2="1208.51"
            y2="619.45"
            xlinkHref="#linear-gradient"
          />
          <linearGradient
            id="linear-gradient-20"
            x1="1119.15"
            y1="716.75"
            x2="1157.13"
            y2="595.7"
            xlinkHref="#linear-gradient-2"
          />
        </defs>
        <g id="ART_BROART_3" data-name="ART BROART 3">
          <g id="GHẾ">
            <path
              className="cls-25"
              d="M1134.19,575.22h113.97c25.46,0,45.02,22.54,41.44,47.75l-44.24,311.07-126.99-12.26,15.82-346.55Z"
            />
            <rect
              className="cls-31"
              x="1097"
              y="1003.66"
              width="25.71"
              height="73.19"
            />
            <path
              className="cls-45"
              d="M1105.31,980.32v31.65l147.56-35.21s9.89-16.22,0-34.02l-147.56,37.58Z"
            />
            <path
              className="cls-72"
              d="M1131.53,575.22h94.82c21.18,0,37.46,22.42,34.47,47.48l-36.81,309.35-105.65-12.2,13.17-344.64Z"
            />
            <polygon
              className="cls-4"
              points="917.4 987.84 1105.31 1011.97 1105.31 980.32 919.77 956.58 917.4 987.84"
            />
            <path
              className="cls-72"
              d="M1052.3,913.46s199.78,7.52,200.57,29.27l-147.56,37.58-185.54-23.74,132.53-43.12Z"
            />
            <ellipse
              className="cls-7"
              cx="1157.53"
              cy="741.37"
              rx="73.98"
              ry="151.12"
            />
          </g>
          <g id="NGƯỜI">
            <g id="CỔ">
              <path
                className="cls-80"
                d="M1075.47,577.06l-39.14,21.32c-2.9-.57-5.69-1.55-8.25-3.03l-13.19-35.36-.95-2.55-7.66-20.53,14.96-11.4,24.99-19.06,6.6,13.6.03.05,13.54,27.88,8.03,16.54c.98,4,1.52,8.33,1.04,12.54Z"
              />
              <path
                className="cls-67"
                d="M1052.89,520.04s-.02.04-.03.06c-18.54,31.32-30.84,39.21-38.92,37.34l-7.66-20.53,14.96-11.4,31.59-5.46h.06Z"
              />
              <path
                className="cls-80"
                d="M1075.47,577.06c-.31,2.82-1.08,5.6-2.47,8.18-4.44,8.25-21.97,16.01-36.67,13.14-2.9-.57-5.69-1.55-8.25-3.03-8.72-5.03-14.74-15.78-13.21-35.35h.02s51.51-12.02,51.51-12.02l1.03-.24s4.7,7.48,7,16.78c.98,4,1.52,8.33,1.04,12.54Z"
              />
            </g>
            <g>
              <path
                className="cls-63"
                d="M1001.26,858.74l-136.09,32.7s-28.48,15.3-29.01,51.69c-.53,36.4-3.16,133.98-3.16,133.98h72.79l20.57-89.67,96.53-22.68s64.88-18.99,78.59-88.62l-100.22-17.41Z"
              />
              <path
                className="cls-24"
                d="M1087.77,872.45s-116.04,40.62-126.07,51.16-25.85,17.93-22.68,68.57l-.53,84.92h87.03l12.66-89.14s135.03-29.54,147.16-43.25c12.13-13.71,18.46-25.32,20.57-72.79l-118.15.53Z"
              />
            </g>
            <g id="CÁNH_TAY_TRÁI" data-name="CÁNH TAY TRÁI">
              <polygon
                className="cls-27"
                points="980.61 703 923.38 773.94 875.4 741.99 942.63 651.57 980.61 703"
              />
              <path
                className="cls-20"
                d="M1010.89,665.93c-2.56,5.42-5.66,10.61-8.96,15.93-5.45,8.79-11.3,17.33-17.52,25.59-.74.98-3.19,5.38-4.43,5.46-.8.05-.95-.83-1.48-1.22-1.05-.77-1.94-2.3-2.78-3.3l-19.33-22.97c-9.83-11.68-19.66-23.36-29.5-35.05,0,0,39.56-61.98,54.07-62.51,15.3-.56,29.02,10.38,34.15,24.34,4.28,11.63,3.65,24.6,1.44,36.6-1.13,6.16-3.13,11.75-5.67,17.12Z"
              />
            </g>
            <g id="THÂN">
              <path
                className="cls-19"
                d="M1211.73,883.53s-179.87,7.91-213.63-21.63c0,0-2.64-167.2-27.43-273.75,0,0,15.38-13.93,38.47-25.44,1.86-.92,3.77-1.84,5.73-2.71-.39,15.21,6.8,21.4,13.34,23.9,5.03,1.92,10.6,1.84,15.7.1,21.46-7.29,23.89-26.08,23.52-36.26,2.37.01,4.76.12,7.15.32.92.08,1.83.16,2.73.24,61.38,5.62,88.74,25.98,103.3,87.32,0,0,36.39,135.56,31.12,247.91Z"
              />
              <path
                className="cls-18"
                d="M1077.31,548.3c-5.03,26.66-13.28,42.42-41.23,44.33-22.94,1.57-26.52-19.8-26.94-29.92,1.86-.92,3.77-1.84,5.73-2.71-.39,15.21,6.8,21.4,13.34,23.9,5.03,1.92,10.6,1.84,15.7.1,21.46-7.29,23.89-26.08,23.52-36.26,2.37.01,4.76.12,7.15.32.92.08,1.83.16,2.73.24Z"
              />
            </g>
            <motion.g
              id="head"
              data-name="ĐẦU"
              animate={{
                rotateZ: [0, -1, 0, 1, 0],
                y: [0, -2, 0, -1, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                originX: "50%",
                originY: "70%",
              }}
            >
              <path
                className="cls-15"
                d="M933.35,392.58s-7.38-35.74,11.08-44.97c18.46-9.23-11.08,44.97-11.08,44.97Z"
              />
              <g id="_ĐẦU-2" data-name="ĐẦU">
                <path
                  className="cls-16"
                  d="M1075.64,454.17c-2.93,21.26-6.33,46.29-23.74,66.46-18.5,21.45-53.6,37.42-74.37,28.48-65.54-28.2-56.97-112.35-51.03-142.02,1.63-8.16,4.85-15.24,8.66-21.22,8.9-13.98,22.73-24.08,38.55-29.04,23.89-7.49,71.21-17.42,92.05,12.68,16.85,24.35,13.64,57.41,9.89,84.66Z"
                />
                <path
                  className="cls-14"
                  d="M932.82,378.47s21.63-1.85,28.48,1.32,21.63-1.58,29.54-6.33,57.49,0,62.77,14.77l-2.64,30.59s15.3,20.57,17.41,39.03l20.04-11.08s1.58-48,8.44-63.3c0,0-90.2-112.62-164.04-5.01Z"
                />
                <path
                  className="cls-12"
                  d="M1100.96,376.1l-5.34,10.69-.46.92s-25.59-17.41-41.54.52c-5.28-14.77-54.86-19.51-62.77-14.77-7.91,4.75-22.68,9.5-29.54,6.33-5.62-2.59-22.56-1.47-28.5-.98-.11-.76-.2-1.56-.27-2.4-1.59-17.54,5-50.92,75.93-56.48,22.22-1.74,44.53,3.94,62.63,16.94,11.98,8.6,23.54,21.14,29.87,39.23Z"
                />
                <path
                  className="cls-13"
                  d="M946.57,314.71s-13.98,55.65,18.46,65.93c0,0-69.63,8.7-18.46-65.93Z"
                />
                <path
                  className="cls-17"
                  d="M964.24,308.12l.79,72.53s-54.59-14.24-.79-72.53Z"
                />
                <path
                  className="cls-49"
                  d="M1006.01,306.08s-72.36,9.43-40.98,74.57c0,0,4.83-23.34,17.9-41.87,10.42-14.77,15.56-20.7,23.08-32.7Z"
                />
                <g id="TAI">
                  <path
                    className="cls-50"
                    d="M1079,487.28c-4.03-.47-7.88-1.71-11.27-3.84l-1.19-27.69s29.1-30.63,45.49-7.52c.27.38.54.78.8,1.19,13.65,21.31-12.48,40.37-33.83,37.86Z"
                  />
                  <path
                    className="cls-51"
                    d="M1079,487.28c-.06-.09-.12-.19-.18-.28-5.67-8.95-2.47-19.79,5.24-27.06,8-7.55,18.27-11.85,27.97-11.71.27.38.54.78.8,1.19,13.65,21.31-12.48,40.37-33.83,37.86Z"
                  />
                  <path
                    className="cls-42"
                    d="M1078.05,467.6c4.83-4.08,11.52-5.77,17.75-4.87,2.1.36,4.16,1.12,5.88,2.37-2.14.02-4.07,0-6.01.14-5.76.38-11.84,1.73-17.61,2.37h0Z"
                  />
                </g>
              </g>
              <g id="LÔNG_MÀY" data-name="LÔNG MÀY">
                {/* Right eyebrow - Light ON */}
                <motion.path
                  className="cls-22"
                  d="M984.89,408.65v9.96s26.68-17.61,47.49-1.25c-.34-.27-.51-3.05-.66-3.55-.84-2.78-2.37-5.34-4.46-7.37-5.45-5.31-13.8-6.74-21.09-5.55-3.6.59-7.26,1.69-10.72,2.82-1.38.45-10.56,3.24-10.56,4.94Z"
                  animate={{
                    opacity: isLightOn ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                />
                {/* Right eyebrow - Light OFF */}
                <motion.path
                  className="cls-22"
                  d="M983.86,404.84v13.65s29.47-5.54,47.67,9.69c0,0,2.37-21.96-47.67-23.34Z"
                  animate={{
                    opacity: isLightOn ? 0 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                />
                {/* Left eyebrow - Light ON */}
                <motion.path
                  className="cls-22"
                  d="M962.6,418.5v-10.51c0-1.83-9.6-5.06-11.12-5.56-6.01-2-12.57-2.36-18.76-1.01-1.19.26-2.4.6-3.39,1.31-1.67,1.21-1.98,3.75-2.48,5.64-.35,1.32-.64,2.66-.75,4.02-.04.48.33,3.27.14,3.47,0,0,11.39-12.7,36.35,2.63Z"
                  animate={{
                    opacity: isLightOn ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                />
                {/* Left eyebrow - Light OFF */}
                <motion.path
                  className="cls-22"
                  d="M961.53,420.66v-13.65c-37.4,2.97-36.01,19.99-37.01,19.78,0,0,19.82-9.49,37.01-6.13Z"
                  animate={{
                    opacity: isLightOn ? 0 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                />
              </g>
              <path
                id="MŨI"
                className="cls-52"
                d="M962.3,430.43l-5.14,56.37s2.18,5.14,6.92,2.37,13.65-8.51,13.65-8.51c0,0,2.77-.79-.2-8.51s-12.46-41.74-12.46-41.74h-2.77Z"
              />
              <g id="MẮT_PHẢI" data-name="MẮT PHẢI">
                <g id="LÒNG_TRẮNG_PHẢI" data-name="LÒNG TRẮNG PHẢI">
                  <path
                    className="cls-44"
                    d="M994.29,462.8c-11.06-7.33-8.32-27.99,4.38-32.41,12.33-4.99,26.17,6.51,22.01,19.54-2.97,10.22-16.34,19.07-26.21,12.99l-.19-.12Z"
                  />
                </g>

                <motion.g
                  id="LÒNG_ĐEN_PHẢI"
                  data-name="LÒNG ĐEN PHẢI"
                  style={{ x: eyeSpringX, y: eyeSpringY }}
                >
                  <circle className="cls-5" cx="998.97" cy="454.76" r="8.98" />
                  <circle className="cls-44" cx="993.29" cy="450.7" r="2.71" />
                </motion.g>
              </g>
              <g id="MẮT_TRÁI" data-name="MẮT TRÁI">
                <g id="LOFG_TRẮNG_TRÁI" data-name="LOFG TRẮNG TRÁI">
                  <path
                    className="cls-44"
                    d="M944.9,463.83c11.43-3.3,14.62-21.72,4.95-28.91-9.21-7.57-24.14-1.45-24.07,10.82-.21,9.54,8.87,20.7,18.94,18.14l.19-.05Z"
                  />
                </g>
                <motion.g
                  id="LÒNG_ĐEN_TRÁI"
                  data-name="LÒNG ĐEN TRÁI"
                  style={{ x: eyeSpringX, y: eyeSpringY }}
                >
                  <circle className="cls-5" cx="943.8" cy="454.95" r="8.98" />
                  <circle className="cls-44" cx="938.12" cy="450.88" r="2.71" />
                </motion.g>
              </g>
              <g id="MIỆNG">
                <motion.path
                  className="cls-42"
                  d="M960.66,507.1c16.25-.28,30.94-7.72,44.18-16.46,6.97-4.79,7-4.89,1.39,1.65-11.32,11.72-29.32,20.35-45.57,14.81h0Z"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isLightOn ? 1 : 0 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                />
                <motion.path
                  className="cls-42"
                  d="M950.57,503.01c15.81,6.83,33.95,3.06,50.07-.88,2.36-.66,4.73-1.33,7.16-1.89-2.2,1.14-4.46,2.17-6.72,3.21-10.38,4.22-21.73,6.71-32.97,5.73-6.16-.7-12.64-2.19-17.54-6.17h0Z"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isLightOn ? 0 : 1 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                  }}
                />
              </g>
            </motion.g>
            <motion.g
              id="TAY_TRÁI"
              data-name="TAY TRÁI"
              animate={{
                rotateZ: [0, 1.5, 0, 1, 0],
                y: [0, 0.8, 0, 0.4, 0],
              }}
              transition={{
                duration: 2.7,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.2,
              }}
              style={{
                originX: "80%",
                originY: "15%",
              }}
            >
              <path
                className="cls-54"
                d="M957.66,623.61c-5.53.77-11.36-1.67-16.25-4-1.69-.81-10.26-5.1-14.11-8.31-7.47,16.99-14.94,33.97-22.41,50.96-6.9,15.7-15.28,30.67-22.16,46.38-3.79,8.64-7.33,17.48-9.23,26.76-.95,4.62-1.48,9.34-1.41,14.06.06,4.63,0,9.64,1.35,14.1,2.26,7.52,7.56,13.89,14.55,17.47,12.25,6.28,26.88,2.99,35.39-7.1,15.3-9.25,34.28-150.33,34.28-150.33Z"
              />
              <g>
                <g>
                  <path
                    className="fill-[#0e0e0e] dark:fill-amber-50"
                    d="M994.55,584.03l-74.44-84.49c-1.1-1.25-3.25-1.16-4.82.19-1.56,1.35-1.96,3.47-.88,4.74l73.05,85.71,8.97,5.01c.9.5,2.17-.6,1.8-1.56l-3.69-9.6Z"
                  />
                  <rect
                    className="fill-[#0e0e0e] dark:fill-amber-50"
                    x="997.68"
                    y="593.78"
                    width=".8"
                    height="2.97"
                    rx=".4"
                    ry=".4"
                    transform="translate(-146.04 798.97) rotate(-40.91)"
                  />
                </g>
                <rect
                  className="cls-43"
                  x="986.78"
                  y="572.1"
                  width="1.12"
                  height="14.08"
                  rx=".56"
                  ry=".56"
                  transform="translate(-138.1 788) rotate(-40.91)"
                />
              </g>
              <path
                className="cls-56 "
                d="M927.68,615.04s5.27-39.03,5.8-48.79,2.9-13.19,12.66-20.31c6.45-4.71,14.99-11.38,20.02-15.36,2.23-1.76,5.51-1.12,6.91,1.36l5.15,9.13c.92,1.63,1.35,3.49,1.24,5.35l-.62,10.59s-6.07,6.86-8.44-1.05l-2.64-11.87-12.66,8.7s14.24-1.05,17.93.53c2.57,1.1,9.71,8.06,13.84,12.2,1.99,2,3.09,4.69,3.07,7.51-.04,5.64-.41,14.81-2.41,15.9-2.9,1.58-6.86,2.9-7.65-12.92,0,0-4.75,9.23-4.48,12.4s7.21,10.02-17.76,35.21c0,0-13.63,10.16-29.98-8.57Z"
              />
            </motion.g>
          </g>
          <motion.g
            id="tree_1"
            data-name="tree 1"
            style={{
              x: tree1SpringX,
              y: tree1SpringY,
            }}
          >
            <g>
              <ellipse
                className="cls-75"
                cx="1628.96"
                cy="391.46"
                rx="81.23"
                ry="87.29"
              />
              <ellipse
                className="cls-75"
                cx="1601"
                cy="530.18"
                rx="91.25"
                ry="98.06"
              />
              <ellipse
                className="cls-75"
                cx="1654.8"
                cy="530.18"
                rx="91.25"
                ry="98.06"
              />
            </g>
            <g>
              <polygon
                className="cls-8"
                points="1639.19 658.33 1620.89 658.33 1626.28 399.89 1634.96 399.89 1639.19 658.33"
              />
              <polygon
                className="cls-8"
                points="1634.67 456.92 1626.68 448.93 1662.34 418.48 1665.12 421.25 1634.67 456.92"
              />
              <polygon
                className="cls-8"
                points="1625 523.55 1632.99 515.56 1591.48 479.26 1588.7 482.04 1625 523.55"
              />
              <polygon
                className="cls-8"
                points="1637.67 621.44 1627.29 611.06 1692.33 552.79 1695.95 556.4 1637.67 621.44"
              />
            </g>
          </motion.g>
          <g id="BÚT_TRÊN_BÀN" data-name="BÚT TRÊN BÀN">
            <path
              className="cls-26"
              d="M1325.26,801.9h45.49v3.56h-45.49c-.98,0-1.78-.8-1.78-1.78h0c0-.98.8-1.78,1.78-1.78Z"
            />
            <path
              className="cls-30"
              d="M1453.44,796.17h7.81c4.42,0,8.01,3.59,8.01,8.01h0c0,4.42-3.59,8.01-8.01,8.01h-7.81v-16.02h0Z"
            />
            <path
              className="cls-30"
              d="M1372.24,796.17h61.62v16.02h-61.62c-4.42,0-8.01-3.59-8.01-8.01h0c0-4.42,3.59-8.01,8.01-8.01Z"
            />
            <rect
              className="cls-26"
              x="1390.74"
              y="796.17"
              width="69.63"
              height="16.02"
            />
          </g>
          <path
            className="cls-48"
            d="M390.49,725.16h-8.76c-2.89,0-5.33-2.16-5.68-5.03l-29.77-243.83.66-2.35s.05-.14.16-.39c.61-1.45,3.16-6.44,9.06-6.91.09-.01.18-.02.27-.02l.82,6.21,33.24,252.32Z"
          />
          <g id="BÀN_MÁY_TÍNH" data-name="BÀN MÁY TÍNH">
            <g id="CHÂN_BÀN" data-name="CHÂN BÀN">
              <rect
                className="cls-21"
                x="358.01"
                y="850.56"
                width="43.92"
                height="227.87"
              />
              <rect
                className="cls-70"
                x="358.01"
                y="850.56"
                width="43.92"
                height="37.98"
              />
            </g>
            <g id="CHÂN_BÀN-2" data-name="CHÂN BÀN">
              <rect
                className="cls-21"
                x="476.69"
                y="850.56"
                width="43.92"
                height="227.87"
              />
              <rect
                className="cls-70"
                x="476.69"
                y="850.56"
                width="43.92"
                height="37.98"
              />
            </g>
            <g id="CHÂN_BÀN-3" data-name="CHÂN BÀN">
              <rect
                className="cls-32"
                x="1357.31"
                y="850.56"
                width="43.91"
                height="227.87"
              />
              <rect
                className="cls-70"
                x="1357.31"
                y="850.56"
                width="43.91"
                height="37.98"
              />
            </g>
            <g id="CHÂN_BÀN-4" data-name="CHÂN BÀN">
              <rect
                className="cls-32"
                x="1461.75"
                y="850.56"
                width="43.91"
                height="227.87"
              />
              <rect
                className="cls-70"
                x="1461.75"
                y="850.56"
                width="43.91"
                height="37.98"
              />
            </g>
            <g id="MẶT_BÀN" data-name="MẶT BÀN">
              <polygon
                className="cls-35"
                points="1606.54 825.64 254.76 825.64 390.05 781.73 1471.24 781.73 1606.54 825.64"
              />
              <rect
                className="cls-33"
                x="254.76"
                y="825.64"
                width="1351.78"
                height="30.86"
              />
            </g>
          </g>
          <g id="HỘP_ĐỰNG_BÚT" data-name="HỘP ĐỰNG BÚT">
            <g id="BÚT_ĐEN" data-name="BÚT ĐEN">
              <rect
                className="cls-26"
                x="1396.04"
                y="700.31"
                width="9.02"
                height="84.65"
                transform="translate(158.37 -242.27) rotate(10.48)"
              />
              <path
                className="cls-26"
                d="M1411.04,649.81h2.54c2.36,0,4.28,1.92,4.28,4.28v54.23h-11.1v-54.23c0-2.36,1.92-4.28,4.28-4.28Z"
                transform="translate(147.01 -245.47) rotate(10.48)"
              />
            </g>
            <g id="BÚT_XANH" data-name="BÚT XANH">
              <rect
                className="cls-30"
                x="1380.65"
                y="702.89"
                width="7.32"
                height="68.66"
                transform="translate(-1.65 3.1) rotate(-.13)"
              />
              <path
                className="cls-30"
                d="M1384.19,661.05h0c2.49,0,4.5,2.02,4.5,4.5v42.96h-9.01v-42.96c0-2.49,2.02-4.5,4.5-4.5Z"
                transform="translate(-1.53 3.1) rotate(-.13)"
              />
            </g>
            <g id="BÚT">
              <rect
                className="cls-30"
                x="1359.27"
                y="675.41"
                width="7.32"
                height="68.66"
                transform="translate(-164.25 539.39) rotate(-21.14)"
              />
              <g>
                <path
                  className="cls-30"
                  d="M1351.69,667.23l10.18,26.51c.34,1.23-1.24,2.9-3.62,3.81-2.38.91-4.68.74-5.24-.41l-10.18-26.51,8.87-3.41Z"
                />
                <g>
                  <ellipse
                    className="cls-26"
                    cx="1347.27"
                    cy="668.92"
                    rx="4.75"
                    ry="2.37"
                    transform="translate(-150.27 527.64) rotate(-21.02)"
                  />
                  <path
                    className="cls-30"
                    d="M1361.86,693.62s.03.07.03.12c.34,1.23-1.24,2.9-3.62,3.81-2.38.91-4.68.74-5.24-.41-.02-.03-.04-.07-.05-.11s-.03-.07-.03-.12c-.34-1.22,1.24-2.9,3.62-3.81s4.68-.73,5.24.41c.02.03.04.07.05.11Z"
                  />
                </g>
              </g>
            </g>
            <polygon
              id="HỘP_BÚT"
              data-name="HỘP BÚT"
              className="cls-57"
              points="1411.9 805.2 1357.84 805.2 1347.29 711.84 1422.45 711.84 1411.9 805.2"
            />
          </g>
          <g id="MÁY_TÍNH" data-name="MÁY TÍNH">
            <g>
              <polygon
                className="cls-10"
                points="542.96 790.82 479.07 790.82 479.07 714.48 539.99 714.48 541.57 755.2 542.96 790.82"
              />
              <polygon
                className="cls-74"
                points="541.57 755.2 479.07 758.65 479.07 714.48 539.99 714.48 541.57 755.2"
              />
            </g>
            <path
              className="cls-9"
              d="M694.23,725.16h-312.5c-2.89,0-5.33-2.16-5.68-5.03l-29.77-243.83v-.05c-.14-1.02.19-1.98.82-2.69.67-.79,1.69-1.26,2.83-1.19l4.54.29,2.78.18,300.53,19.1c2.33.15,4.23,1.92,4.56,4.23l31.89,228.99Z"
            />
            <path
              className="cls-9"
              d="M710.49,725.15h-320c-2.96,0-5.45-2.21-5.81-5.14l-30.5-249.73c-.27-2.21,1.53-4.12,3.75-3.97l315.23,20.04c2.39.15,4.34,1.96,4.67,4.33l32.66,234.48Z"
            />
            <polygon
              className="cls-41"
              points="668.16 499.68 368.3 479.88 393.96 715.26 696.65 711.7 668.16 499.68"
            />
            <polygon
              className="cls-71"
              points="379.37 492.54 656.69 509.95 682.01 697.07 403.11 699.44 379.37 492.54"
            />
            <line
              className="cls-2"
              x1="447.42"
              y1="504.8"
              x2="471.55"
              y2="693.51"
            />
            <motion.g
              animate={{
                filter: [
                  "brightness(1) drop-shadow(0 0 8px rgba(94, 198, 171, 0.3))",
                  "brightness(1.02) drop-shadow(0 0 12px rgba(94, 198, 171, 0.4))",
                  "brightness(1) drop-shadow(0 0 8px rgba(94, 198, 171, 0.3))",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <g>
                <rect
                  className="cls-64"
                  x="386.49"
                  y="505.4"
                  width="2.68"
                  height="4.55"
                />
                <rect
                  className="cls-64"
                  x="393.5"
                  y="505.4"
                  width="27"
                  height="4.55"
                />
                <rect
                  className="cls-66"
                  x="394.43"
                  y="514.89"
                  width="3.8"
                  height="4.55"
                />
                <rect
                  className="cls-66"
                  x="404.36"
                  y="514.89"
                  width="38.28"
                  height="4.55"
                />
                <rect
                  className="cls-65"
                  x="394.43"
                  y="524.19"
                  width="3.8"
                  height="4.55"
                />
                <rect
                  className="cls-65"
                  x="400.86"
                  y="524.19"
                  width="28.5"
                  height="4.55"
                />
                <rect
                  className="cls-77"
                  x="394.43"
                  y="532.99"
                  width="3.8"
                  height="4.55"
                />
                <rect
                  className="cls-77"
                  x="400.86"
                  y="532.99"
                  width="28.5"
                  height="4.55"
                />
                <rect
                  className="cls-66"
                  x="403.08"
                  y="560.78"
                  width="3.8"
                  height="4.55"
                />
                <rect
                  className="cls-66"
                  x="409.52"
                  y="560.78"
                  width="28.5"
                  height="4.55"
                />
                <rect
                  className="cls-66"
                  x="398.24"
                  y="568.69"
                  width="3.8"
                  height="4.55"
                />
                <rect
                  className="cls-66"
                  x="404.67"
                  y="568.69"
                  width="15.93"
                  height="4.55"
                />
                <rect
                  className="cls-77"
                  x="401.33"
                  y="614.68"
                  width="3.8"
                  height="4.55"
                />
                <rect
                  className="cls-77"
                  x="407.76"
                  y="614.68"
                  width="15.93"
                  height="4.55"
                />
                <rect
                  className="cls-77"
                  x="406.79"
                  y="623.88"
                  width="3.8"
                  height="4.55"
                />
                <rect
                  className="cls-77"
                  x="413.23"
                  y="623.88"
                  width="30.76"
                  height="4.55"
                />
                <rect
                  className="cls-37"
                  x="416.58"
                  y="661.66"
                  width="3.8"
                  height="4.55"
                />
                <rect
                  className="cls-37"
                  x="423.01"
                  y="661.66"
                  width="30.76"
                  height="4.55"
                />
                <rect
                  className="cls-61"
                  x="416.89"
                  y="669.67"
                  width="3.27"
                  height="4.55"
                />
                <rect
                  className="cls-61"
                  x="422.43"
                  y="669.67"
                  width="26.5"
                  height="4.55"
                />
                <rect
                  className="cls-77"
                  x="416.89"
                  y="679.36"
                  width="3.27"
                  height="4.55"
                />
                <rect
                  className="cls-77"
                  x="422.43"
                  y="679.36"
                  width="15.06"
                  height="4.55"
                />
                <rect
                  className="cls-77"
                  x="439.02"
                  y="679.36"
                  width="15.06"
                  height="4.55"
                />
                <rect
                  className="cls-37"
                  x="412.15"
                  y="633.57"
                  width="3.8"
                  height="4.55"
                />
                <rect
                  className="cls-65"
                  x="412.15"
                  y="642.18"
                  width="3.8"
                  height="4.55"
                />
                <rect
                  className="cls-65"
                  x="418.44"
                  y="642.18"
                  width="4.64"
                  height="4.55"
                />
                <rect
                  className="cls-65"
                  x="428.02"
                  y="642.18"
                  width="29.36"
                  height="4.55"
                />
                <rect
                  className="cls-37"
                  x="418.54"
                  y="651.57"
                  width="29.36"
                  height="4.55"
                />
                <rect
                  className="cls-37"
                  x="441.62"
                  y="633.57"
                  width="6.9"
                  height="4.55"
                />
                <rect
                  className="cls-37"
                  x="418.58"
                  y="633.57"
                  width="18.81"
                  height="4.55"
                />
                <rect
                  className="cls-36"
                  x="394.43"
                  y="542.19"
                  width="3.8"
                  height="4.55"
                />
                <rect
                  className="cls-36"
                  x="400.86"
                  y="542.19"
                  width="11.39"
                  height="4.55"
                />
                <rect
                  className="cls-36"
                  x="414.77"
                  y="542.19"
                  width="26.85"
                  height="4.55"
                />
                <rect
                  className="cls-37"
                  x="400.61"
                  y="579.18"
                  width="4.01"
                  height="4.55"
                />
                <rect
                  className="cls-37"
                  x="407.41"
                  y="579.18"
                  width="12.04"
                  height="4.55"
                />
                <rect
                  className="cls-61"
                  x="400.61"
                  y="587.88"
                  width="4.01"
                  height="4.55"
                />
                <rect
                  className="cls-61"
                  x="407.41"
                  y="587.88"
                  width="40.19"
                  height="4.55"
                />
                <rect
                  className="cls-61"
                  x="407.41"
                  y="596.48"
                  width="40.19"
                  height="4.55"
                />
                <rect
                  className="cls-37"
                  x="407.41"
                  y="605.98"
                  width="16.8"
                  height="4.55"
                />
                <rect
                  className="cls-37"
                  x="428.74"
                  y="605.98"
                  width="16.8"
                  height="4.55"
                />
                <rect
                  className="cls-37"
                  x="422.11"
                  y="579.18"
                  width="28.37"
                  height="4.55"
                />
                <rect
                  className="cls-61"
                  x="404.67"
                  y="551.39"
                  width="26.85"
                  height="4.55"
                />
              </g>
              <rect
                className="cls-37"
                x="465.76"
                y="517.26"
                width="17.17"
                height="4.55"
              />
              <rect
                className="cls-61"
                x="527.58"
                y="517.26"
                width="17.17"
                height="4.55"
              />
              <rect
                className="cls-61"
                x="486.11"
                y="517.26"
                width="38.28"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="468.89"
                y="526.56"
                width="3.8"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="475.32"
                y="526.56"
                width="28.5"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="506.51"
                y="526.56"
                width="13.25"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="523.54"
                y="526.56"
                width="16.68"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="543.6"
                y="526.56"
                width="29.73"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="468.89"
                y="535.36"
                width="3.8"
                height="4.55"
              />
              <rect
                className="cls-64"
                x="475.32"
                y="535.36"
                width="28.5"
                height="4.55"
              />
              <rect
                className="cls-77"
                x="506.51"
                y="535.36"
                width="55.97"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="472.08"
                y="563.15"
                width="9.26"
                height="4.55"
              />
              <rect
                className="cls-61"
                x="538.3"
                y="563.15"
                width="9.26"
                height="4.55"
              />
              <rect
                className="cls-61"
                x="553.14"
                y="563.15"
                width="17.45"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="571.41"
                y="563.15"
                width="30.09"
                height="4.55"
              />
              <rect
                className="cls-61"
                x="483.98"
                y="563.15"
                width="49.93"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="472.7"
                y="571.07"
                width="3.8"
                height="4.55"
              />
              <rect
                className="cls-61"
                x="479.13"
                y="571.07"
                width="28.39"
                height="4.55"
              />
              <rect
                className="cls-61"
                x="513.2"
                y="571.07"
                width="23.72"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="475.79"
                y="617.06"
                width="3.8"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="482.22"
                y="617.06"
                width="15.93"
                height="4.55"
              />
              <rect
                className="cls-66"
                x="501.6"
                y="617.06"
                width="30.66"
                height="4.55"
              />
              <rect
                className="cls-77"
                x="481.25"
                y="626.25"
                width="3.8"
                height="4.55"
              />
              <rect
                className="cls-77"
                x="487.69"
                y="626.25"
                width="55.83"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="491.04"
                y="664.03"
                width="3.8"
                height="4.55"
              />
              <rect
                className="cls-65"
                x="497.47"
                y="664.03"
                width="30.76"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="491.35"
                y="672.04"
                width="3.27"
                height="4.55"
              />
              <rect
                className="cls-65"
                x="496.89"
                y="672.04"
                width="26.5"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="491.35"
                y="681.74"
                width="3.27"
                height="4.55"
              />
              <rect
                className="cls-65"
                x="496.89"
                y="681.74"
                width="15.06"
                height="4.55"
              />
              <rect
                className="cls-65"
                x="513.48"
                y="681.74"
                width="15.06"
                height="4.55"
              />
              <rect
                className="cls-77"
                x="486.61"
                y="635.95"
                width="3.8"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="486.61"
                y="644.55"
                width="3.8"
                height="4.55"
              />
              <rect
                className="cls-61"
                x="492.9"
                y="644.55"
                width="4.64"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="502.48"
                y="644.55"
                width="29.36"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="493"
                y="653.95"
                width="29.36"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="526.79"
                y="653.95"
                width="23.73"
                height="4.55"
              />
              <rect
                className="cls-66"
                x="516.08"
                y="635.95"
                width="18.79"
                height="4.55"
              />
              <rect
                className="cls-77"
                x="493.04"
                y="635.95"
                width="18.81"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="468.89"
                y="544.56"
                width="3.8"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="475.32"
                y="544.56"
                width="11.39"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="489.23"
                y="544.56"
                width="26.85"
                height="4.55"
              />
              <rect
                className="cls-77"
                x="520.83"
                y="544.56"
                width="32.58"
                height="4.55"
              />
              <rect
                className="cls-77"
                x="557.92"
                y="544.56"
                width="24.07"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="475.07"
                y="581.55"
                width="4.01"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="481.87"
                y="581.55"
                width="12.04"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="475.07"
                y="590.25"
                width="4.01"
                height="4.55"
              />
              <rect
                className="cls-66"
                x="481.87"
                y="590.25"
                width="52.58"
                height="4.55"
              />
              <rect
                className="cls-66"
                x="539.02"
                y="590.25"
                width="35.55"
                height="4.55"
              />
              <rect
                className="cls-66"
                x="577.21"
                y="590.25"
                width="60.41"
                height="4.55"
              />
              <rect
                className="cls-77"
                x="481.87"
                y="598.86"
                width="40.19"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="523.77"
                y="598.86"
                width="27.86"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="553.17"
                y="598.86"
                width="21.26"
                height="4.55"
              />
              <rect
                className="cls-77"
                x="577.07"
                y="598.86"
                width="21.26"
                height="4.55"
              />
              <rect
                className="cls-77"
                x="628.18"
                y="598.86"
                width="21.26"
                height="4.55"
              />
              <rect
                className="cls-77"
                x="599.6"
                y="598.86"
                width="15.49"
                height="4.55"
              />
              <rect
                className="cls-77"
                x="617.6"
                y="598.86"
                width="8.76"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="481.87"
                y="608.35"
                width="16.8"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="503.2"
                y="608.35"
                width="16.8"
                height="4.55"
              />
              <rect
                className="cls-37"
                x="496.57"
                y="581.55"
                width="28.37"
                height="4.55"
              />
              <rect
                className="cls-65"
                x="479.13"
                y="553.76"
                width="44.74"
                height="4.55"
              />
            </motion.g>
            <rect
              className="cls-29"
              x="435.81"
              y="788.06"
              width="164.04"
              height="12.66"
            />
            <rect
              className="cls-46"
              x="435.81"
              y="788.06"
              width="72.26"
              height="12.66"
            />
          </g>
          <g id="LAPTOP">
            <g>
              <rect
                className="cls-62"
                x="806.63"
                y="794.12"
                width="168.92"
                height="10.29"
              />
              <path
                className="cls-11"
                d="M817.43,800.19h-228.25c-1.48,0-2.79-.98-3.2-2.4l-53.43-182.69c-.62-2.14.98-4.27,3.2-4.27h222.55c1.46,0,2.75.95,3.18,2.34l57.99,184.25c.43,1.38-.6,2.78-2.04,2.78Z"
              />
              <polygon
                className="cls-11"
                points="533.47 610.82 527.53 616.56 754.2 617.75 759.75 611.02 533.47 610.82"
              />
              <path
                className="cls-47"
                d="M810.52,804.41h-226.62c-1.48,0-2.79-.98-3.2-2.4l-53.43-182.69c-.62-2.14.98-4.27,3.2-4.27h222.55c1.46,0,2.75.95,3.18,2.34l57.5,182.69c.68,2.15-.93,4.34-3.18,4.34Z"
              />
            </g>
            <g>
              <path
                className="cls-81"
                d="M680.48,711.16c-1.88,8.55-10.5,13.92-19.26,11.99-8.75-1.93-14.33-10.42-12.44-18.97,1.88-8.55,10.51-13.91,19.26-11.98.74.16,1.46.37,2.14.62-.96,1.16-1.66,2.56-2.01,4.13-1.17,5.31,2.19,10.56,7.5,11.73,1.78.39,3.55.27,5.16-.26-.03.9-.14,1.82-.35,2.73Z"
              />
              <path
                className="cls-81"
                d="M659.32,695.66h0c-3.03-3.03-3.03-7.95,0-10.98l7.62-7.62h0c3.03,3.03,3.03,7.95,0,10.98l-7.62,7.62Z"
              />
            </g>
          </g>
          <g id="_ĐỰNG_BÚT" data-name="ĐỰNG BÚT">
            <ellipse
              className="cls-76"
              cx="1048.04"
              cy="816.98"
              rx="19.68"
              ry="5.2"
            />
            <polygon
              className="cls-76"
              points="1031.08 799.87 1065.04 799.87 1067.73 816.98 1028.36 816.98 1031.08 799.87"
            />
            <ellipse
              className="cls-76"
              cx="1048.04"
              cy="799.87"
              rx="16.96"
              ry="4.48"
            />
            <ellipse
              className="cls-6"
              cx="1048.04"
              cy="799.87"
              rx="11.38"
              ry="3.01"
            />
          </g>
          <g id="WACOM">
            <path
              className="cls-58"
              d="M1151.99,788.45h150.11c.95,0,1.26,1.28.41,1.71l-50.43,25.59h-161.18c-.58,0-.74-.8-.21-1.02l61.3-26.27Z"
            />
            <rect
              className="cls-6"
              x="1090.47"
              y="811"
              width="161.6"
              height="4.75"
            />
            <polygon
              className="cls-6"
              points="1252.18 811.59 1252.08 815.75 1302.98 789.36 1302.86 785.42 1252.18 811.59"
            />
            <path
              className="cls-69"
              d="M1151.99,784.5h149.92c1,0,1.32,1.34.43,1.79l-49.08,24.9c-.78.39-1.64.6-2.51.6h-159.68c-.62,0-.79-.85-.22-1.09l61.14-26.2Z"
            />
            <polygon
              className="cls-76"
              points="1154.76 787.26 1283.81 787.26 1246.74 805.86 1112.82 805.86 1154.76 787.26"
            />
          </g>
          <path
            id="DÂY"
            className="cls-3"
            d="M1280.03,784.63s-2.9-21.36,20.04-22.15c22.92-.79,18.47,22.11,18.46,22.15-.36,1.85-19.94,14.56-23.6,17.26-2.32,1.71-7.7,4.74-6.2,8.5,1.07,2.67,5.06,2.35,7.38,2.2,8.18-.53,36.13-1.58,36.13-1.58,0,0,8.18.79,6.07,16.35-2.26,16.66-6.8,32.47-4.81,49.46.58,4.97,2.1,10.61,6.63,12.72,3.22,1.5,7.14.68,10.15-1.2,6.27-3.93,10.01-10.73,11.76-17.73"
          />
          <motion.g
            id="tree_2"
            data-name="CÂY"
            style={{
              x: tree2SpringX,
              y: tree2SpringY,
            }}
          >
            <g className="cls-78">
              <g>
                <ellipse
                  className="cls-23"
                  cx="147.49"
                  cy="312.14"
                  rx="94.75"
                  ry="102.46"
                />
                <ellipse
                  className="cls-23"
                  cx="192.99"
                  cy="481.66"
                  rx="107.01"
                  ry="107.8"
                />
                <ellipse
                  className="cls-23"
                  cx="61.25"
                  cy="481.66"
                  rx="107.01"
                  ry="107.8"
                />
                <g>
                  <polygon
                    className="cls-8"
                    points="152.91 617.55 132.07 617.55 138.2 323.22 148.09 323.22 152.91 617.55"
                  />
                  <polygon
                    className="cls-8"
                    points="147.76 388.17 138.66 379.07 179.27 344.39 182.44 347.55 147.76 388.17"
                  />
                  <polygon
                    className="cls-8"
                    points="136.75 464.06 145.85 454.96 98.57 413.62 95.41 416.78 136.75 464.06"
                  />
                  <polygon
                    className="cls-8"
                    points="151.18 575.54 139.35 563.71 213.43 497.35 217.54 501.47 151.18 575.54"
                  />
                </g>
              </g>
            </g>
          </motion.g>
          <motion.g
            id="black_bg"
            data-name="NỀn ĐEN"
            style={{
              x: bgSpringX,
              y: bgSpringY,
              scale: 1.05,
            }}
          >
            <g className="cls-38">
              <g id="NỀN_ĐEN" data-name="NỀN ĐEN">
                <ellipse
                  className="cls-40"
                  cx="-168.33"
                  cy="371.3"
                  rx="258.73"
                  ry="257.78"
                />
                <ellipse
                  className="cls-40"
                  cx="-4.55"
                  cy="875.04"
                  rx="377.41"
                  ry="376.03"
                />
                <ellipse
                  className="cls-40"
                  cx="428.34"
                  cy="1011.03"
                  rx="276.23"
                  ry="275.22"
                />
                <ellipse
                  className="cls-40"
                  cx="697.75"
                  cy="1181.3"
                  rx="276.23"
                  ry="275.22"
                />
                <ellipse
                  className="cls-40"
                  cx="1209.26"
                  cy="1144.65"
                  rx="276.23"
                  ry="275.22"
                />
                <ellipse
                  className="cls-40"
                  cx="1662.63"
                  cy="994.47"
                  rx="289.29"
                  ry="288.23"
                />
                <ellipse
                  className="cls-40"
                  cx="1833.53"
                  cy="740.24"
                  rx="276.23"
                  ry="275.22"
                />
                <ellipse
                  className="cls-40"
                  cx="1997.31"
                  cy="372.48"
                  rx="276.23"
                  ry="275.22"
                />
              </g>
            </g>
          </motion.g>
          <motion.g
            id="green_dots"
            data-name="CHẤM XANH"
            style={{
              x: springX,
              y: springY,
            }}
          >
            <circle className="cls-60" cx="80.3" cy="758.39" r="65.27" />
            <circle className="cls-60" cx="142.6" cy="683.81" r="34.62" />
            <circle className="cls-60" cx="51.62" cy="637.92" r="34.62" />
            <circle className="cls-60" cx="497.46" cy="889.53" r="18" />
            <circle className="cls-60" cx="1626.78" cy="677.75" r="68.64" />
            <circle className="cls-60" cx="1607.53" cy="603.9" r="32.37" />
            <circle className="cls-60" cx="1568.23" cy="723.37" r="35.93" />
            <circle className="cls-60" cx="1500.71" cy="698.32" r="19.45" />
            <circle className="cls-60" cx="1530.38" cy="800.52" r="11.8" />
            <circle className="cls-60" cx="451.97" cy="912.47" r="16.02" />
            <circle className="cls-60" cx="451.18" cy="873.31" r="10.88" />
            <circle className="cls-60" cx="314.3" cy="820.3" r="10.88" />
            <circle className="cls-60" cx="123.22" cy="572.25" r="18" />
          </motion.g>
          <motion.g
            id="TAY_PHẢI"
            data-name="TAY PHẢI"
            animate={{
              rotateZ: [0, -2, 0, -1.5, 0],
              y: [0, 1, 0, 0.5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 0.3,
            }}
            style={{
              originX: "20%",
              originY: "10%",
            }}
          >
            <path
              className="cls-59"
              d="M946.08,762.74s-48.86-17.6-70.62-10.88-41.14,28.48-41.14,33.23,6.33,4.35,10.29-1.58c0,0-5.14,13.25,7.91,6.33,0,0-1.98,9.49,7.12,3.36,0,0,.33,7.98,6.46,3.43s16.88-17.27,16.88-17.27c0,0,11.47,3.56,16.02,1.98,0,0,17.8,21.96,46.88,10.68l.2-29.27Z"
            />
            <path
              className="cls-53"
              d="M1095.95,669.9c-1.78,12.13-13.19,65.41-13.19,65.41l-139.25,25.58,2.37,31.12,164.4-4.63c11.7-.33,22.54-6.43,28.7-16.38,18.3-29.57,27.92-85.27,27.92-85.27l-70.94-15.82Z"
            />
            <path
              className="cls-55"
              d="M1090.14,677.55l79.65,18.73s18.46-69.89,2.11-97.06c-7.36-12.22-20.54-27.55-36.42-25.93-7.79.79-14.66,5.31-17.73,12.43-2.04,4.73-4.11,9.39-5.86,14.24-4.41,12.23-8.05,24.74-11.49,37.27-3.68,13.37-7.14,26.82-10.26,40.33Z"
            />
          </motion.g>
          <motion.g
            id="light_box"
            data-name="BÓNG ĐÈN"
            onClick={() => setIsLightOn(!isLightOn)}
            onMouseEnter={() => setIsLightOn(!isLightOn)}
            onMouseLeave={() => setIsLightOn(!isLightOn)}
            style={{ cursor: "pointer" }}
            animate={{
              filter: isLightOn
                ? "drop-shadow(0 0 20px rgba(254, 249, 195, 0.8)) drop-shadow(0 0 40px rgba(254, 249, 195, 0.4))"
                : "drop-shadow(0 0 0px rgba(254, 249, 195, 0))",
            }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
          >
            <g>
              <motion.path
                initial={{ fill: "#f6c230" }}
                animate={{
                  fill: isLightOn ? "#f6c230" : "#7b7e83",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                d="M1036.57,182.45c0-21-17.03-38.03-38.03-38.03s-38.03,17.03-38.03,38.03c0,7.45,2.15,14.4,5.86,20.27h-.02l.3.44c.48.73.97,1.45,1.49,2.14l11.32,16.25v10.65h38.06v-10.65l10.55-15.15c5.31-6.54,8.5-14.87,8.5-23.95Z"
              />
              <path d="M1018.59,233.26h-40.09l-.1-1.06v-10.31l-11.13-15.98c-.47-.63-.98-1.35-1.51-2.17l-1.45-2.08h.19c-3.31-5.85-5.05-12.45-5.05-19.21,0-21.55,17.54-39.09,39.09-39.09s39.09,17.54,39.09,39.09c0,8.94-3.1,17.69-8.74,24.62l-10.31,14.81v11.38ZM980.53,231.14h35.93v-9.92l10.74-15.42c5.38-6.62,8.31-14.89,8.31-23.35,0-20.38-16.58-36.96-36.96-36.96s-36.96,16.58-36.96,36.96c0,6.99,1.97,13.8,5.7,19.7l.25.4c.53.81,1,1.49,1.47,2.11l11.53,16.56v9.92Z" />
            </g>
            <g>
              <motion.circle
                initial={{ fill: "#f6c230" }}
                animate={{
                  fill: isLightOn ? "#f6c230" : "#7b7e83",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                cx="998.54"
                cy="249.8"
                r="12.71"
              />
              <path d="M998.54,263.57c-7.59,0-13.77-6.18-13.77-13.77s6.18-13.77,13.77-13.77,13.77,6.18,13.77,13.77-6.18,13.77-13.77,13.77ZM998.54,238.15c-6.42,0-11.65,5.22-11.65,11.65s5.22,11.65,11.65,11.65,11.65-5.22,11.65-11.65-5.22-11.65-11.65-11.65Z" />
            </g>
            <path d="M1012.4,187.23c-1.67-1.46-3.16-1.45-4.11-1.18-3.09.86-4.97,5.48-5.82,8.15-.48,1.53-.76,3.08-.9,4.63h-6.81c-.14-1.56-.41-3.11-.9-4.63-.85-2.67-2.73-7.29-5.82-8.16-.95-.26-2.44-.28-4.11,1.18-2.01,1.76-2.17,3.49-1.95,4.63.79,4.05,7.59,7.21,10.75,8.48.09,1.87.02,3.76-.04,5.62-.04,1.25-.09,2.49-.09,3.72v20.48h2.13v-20.48c0-1.21.04-2.42.09-3.65.06-1.67.12-3.37.07-5.07h6.56c-.05,1.7.01,3.4.07,5.08.04,1.22.09,2.44.09,3.65v20.48h2.13v-20.48c0-1.23-.04-2.47-.09-3.72-.06-1.86-.13-3.75-.04-5.62,3.16-1.26,9.96-4.42,10.75-8.48.22-1.14.07-2.87-1.95-4.63ZM984.07,191.46c-.06-.32-.25-1.3,1.26-2.62.76-.66,1.33-.8,1.71-.8.2,0,.35.04.43.06,1.8.5,3.48,3.95,4.37,6.75.32,1.01.54,2.05.68,3.11-3.69-1.6-8-4.16-8.45-6.49ZM1012.26,191.46c-.45,2.33-4.76,4.89-8.45,6.49.14-1.05.36-2.09.68-3.11.89-2.8,2.56-6.25,4.36-6.75.08-.02.23-.06.43-.06.38,0,.96.14,1.71.8,1.51,1.32,1.32,2.3,1.26,2.62Z" />
            <g>
              <rect
                className="cls-68"
                x="977.82"
                y="240.9"
                width="41.44"
                height="10.34"
                rx="5.17"
                ry="5.17"
              />
              <path d="M1014.1,252.3h-31.1c-3.44,0-6.23-2.8-6.23-6.23s2.79-6.23,6.23-6.23h31.1c3.44,0,6.23,2.8,6.23,6.23s-2.79,6.23-6.23,6.23ZM982.99,241.96c-2.26,0-4.1,1.84-4.1,4.1s1.84,4.1,4.1,4.1h31.1c2.26,0,4.1-1.84,4.1-4.1s-1.84-4.1-4.1-4.1h-31.1Z" />
            </g>
            <g>
              <rect
                className="cls-68"
                x="977.82"
                y="230.56"
                width="41.44"
                height="10.34"
                rx="5.17"
                ry="5.17"
              />
              <path d="M1014.1,241.96h-31.1c-3.44,0-6.23-2.79-6.23-6.23s2.79-6.23,6.23-6.23h31.1c3.44,0,6.23,2.79,6.23,6.23s-2.79,6.23-6.23,6.23ZM982.99,231.63c-2.26,0-4.1,1.84-4.1,4.1s1.84,4.1,4.1,4.1h31.1c2.26,0,4.1-1.84,4.1-4.1s-1.84-4.1-4.1-4.1h-31.1Z" />
            </g>
            <motion.g
              animate={{
                opacity: isLightOn ? 1 : 0,
              }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
              }}
            >
              <rect
                className="cls-73"
                x="995.17"
                y="104.76"
                width="6.33"
                height="27.69"
                rx="3.16"
                ry="3.16"
              />
              <rect
                className="cls-73"
                x="948.29"
                y="126.12"
                width="6.33"
                height="27.69"
                rx="3.16"
                ry="3.16"
                transform="translate(179.7 713.78) rotate(-45)"
              />
              <rect
                className="cls-73"
                x="941.56"
                y="212.17"
                width="6.33"
                height="27.69"
                rx="3.16"
                ry="3.16"
                transform="translate(1452.94 1053.85) rotate(-135)"
              />
              <rect
                className="cls-73"
                x="930.88"
                y="170.43"
                width="6.33"
                height="27.69"
                rx="3.16"
                ry="3.16"
                transform="translate(749.77 1118.33) rotate(-90)"
              />
              <rect
                className="cls-73"
                x="1061.83"
                y="170.43"
                width="6.33"
                height="27.69"
                rx="3.16"
                ry="3.16"
                transform="translate(880.72 1249.27) rotate(-90)"
              />
              <rect
                className="cls-73"
                x="1051.15"
                y="212.17"
                width="6.33"
                height="27.69"
                rx="3.16"
                ry="3.16"
                transform="translate(148.98 811.71) rotate(-45)"
              />
              <rect
                className="cls-73"
                x="1045.21"
                y="126.12"
                width="6.33"
                height="27.69"
                rx="3.16"
                ry="3.16"
                transform="translate(1690.72 980.26) rotate(-135)"
              />
              <path
                className="cls-34"
                d="M1026.29,178.14c-1.2,0-2.31-.76-2.7-1.96-4.53-14.05-12.46-14.89-12.79-14.92-1.54-.13-2.72-1.48-2.61-3.02.11-1.54,1.39-2.69,2.95-2.64.49.03,12.04.84,17.85,18.84.48,1.49-.34,3.09-1.83,3.57-.29.09-.58.14-.87.14Z"
              />
            </motion.g>
          </motion.g>
        </g>
      </svg>
    </div>
  );
}

export default SectionHero;
