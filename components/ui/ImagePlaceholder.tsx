"use client";

import React from "react";
import { Image as ImageIcon, User, HeartPulse, ShieldAlert, Award } from "lucide-react";

interface ImagePlaceholderProps {
  text: string;
  className?: string;
  iconType?: "image" | "doctor" | "hospital" | "facility" | "achievement";
  aspectRatio?: string;
}

export const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  text,
  className = "",
  iconType = "image",
  aspectRatio = "aspect-video"
}) => {
  const getIcon = () => {
    switch (iconType) {
      case "doctor":
        return <User className="w-12 h-12 text-primary/40 dark:text-primary-accent/40" />;
      case "hospital":
      case "facility":
        return <HeartPulse className="w-12 h-12 text-primary/40 dark:text-primary-accent/40" />;
      case "achievement":
        return <Award className="w-12 h-12 text-primary/40 dark:text-primary-accent/40" />;
      default:
        return <ImageIcon className="w-12 h-12 text-primary/40 dark:text-primary-accent/40" />;
    }
  };

  return (
    <div
      className={`relative w-full ${aspectRatio} flex flex-col items-center justify-center bg-gradient-to-br from-primary-light to-bg-secondary dark:from-primary-light/10 dark:to-bg-secondary/20 border border-dashed border-primary/20 dark:border-primary-accent/20 rounded-xl overflow-hidden ${className}`}
    >
      {/* Decorative medical styling */}
      <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-primary/30 rounded-tl"></div>
      <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-primary/30 rounded-tr"></div>
      <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-primary/30 rounded-bl"></div>
      <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-primary/30 rounded-br"></div>
      
      <div className="flex flex-col items-center gap-3 px-4 text-center">
        <div className="p-3 bg-white dark:bg-bg-secondary rounded-full shadow-sm">
          {getIcon()}
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-primary/60 dark:text-primary-accent/60">
          Placeholder Asset
        </p>
        <p className="text-sm font-medium text-text-secondary max-w-xs leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};
