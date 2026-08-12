"use client";

import React from "react";
import { Activity } from "lucide-react";

export const JointVisualFallback: React.FC = () => {
  return (
    <div className="relative w-full aspect-square flex flex-col items-center justify-center bg-gradient-to-br from-primary-light/40 to-bg-secondary dark:from-primary-light/5 dark:to-bg-secondary/10 border border-border-color rounded-2xl overflow-hidden p-6 select-none animate-pulse">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#142DA6_1px,transparent_1px)] [background-size:16px_16px]" />
      
      {/* Dynamic HUD circles */}
      <div className="absolute w-[80%] h-[80%] border border-dashed border-primary/20 dark:border-primary-accent/15 rounded-full animate-spin [animation-duration:40s]" />
      <div className="absolute w-[60%] h-[60%] border border-primary/10 dark:border-primary-accent/10 rounded-full animate-spin [animation-duration:20s] [animation-direction:reverse]" />
      
      {/* Static joint vector */}
      <svg
        className="w-40 h-40 relative z-10 text-primary dark:text-primary-accent"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Upper Bone shaft */}
        <path
          d="M50 15 V38"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          className="opacity-40"
        />
        
        {/* Joint Articulation socket */}
        <circle
          cx="50"
          cy="45"
          r="8"
          stroke="currentColor"
          strokeWidth="4"
          fill="var(--background)"
        />
        
        {/* Joint spacer ring */}
        <circle
          cx="50"
          cy="45"
          r="14"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        
        {/* Lower Bone shaft */}
        <path
          d="M50 52 L50 85"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
        />
        
        {/* Glowing ligaments */}
        <path
          d="M38 35 C42 45 42 50 38 60"
          stroke="#3454D1"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M62 35 C58 45 58 50 62 60"
          stroke="#3454D1"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Status Indicator */}
      <div className="absolute bottom-6 flex items-center gap-2 text-xs font-bold text-primary/70 dark:text-primary-accent/70 tracking-widest uppercase">
        <Activity className="w-3.5 h-3.5 animate-pulse" />
        <span>WebGL Visualizer loading</span>
      </div>
    </div>
  );
};
export default JointVisualFallback;
