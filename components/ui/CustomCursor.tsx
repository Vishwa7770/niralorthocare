"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Core coordinates for mouse tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Springs for trailing ring inertia lag
  const springConfig = { stiffness: 320, damping: 28, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // 1. Accessibility preferences
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    
    // 2. Mobile/Touch capability check
    const isTouchDevice = 
      "ontouchstart" in window || 
      navigator.maxTouchPoints > 0 || 
      window.innerWidth <= 1024;
      
    if (isTouchDevice || motionQuery.matches) {
      return;
    }

    // Activate custom cursor mode (hides standard mouse cursor via CSS)
    document.documentElement.classList.add("custom-cursor-active");
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if mouse is hovering over an interactive/clickable element
      const isClickable = 
        target.closest("a") || 
        target.closest("button") || 
        target.closest("input") || 
        target.closest("select") || 
        target.closest("[role='button']") || 
        target.closest(".clickable") || 
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovered(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY, reducedMotion]);

  if (!isVisible || reducedMotion) return null;

  return (
    <>
      {/* 1. Core Solid Center Dot (Moves in sync with mouse coordinate) */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      />

      {/* 2. Trailing Outer Circle (Follows mouse coordinate with spring lag inertia) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-primary/50 pointer-events-none z-[9999] bg-primary/0"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? 44 : 22,
          height: isHovered ? 44 : 22,
          backgroundColor: isHovered ? "rgba(14, 0, 149, 0.08)" : "rgba(14, 0, 149, 0)",
          borderColor: isHovered ? "rgba(14, 0, 149, 0.85)" : "rgba(14, 0, 149, 0.45)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
    </>
  );
};

export default CustomCursor;
