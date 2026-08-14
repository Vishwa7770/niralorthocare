"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Speed the intro video up from its native (slow) pace. 1 = normal, 1.8 = fast.
const PLAYBACK_RATE = 1.8;

interface VideoWelcomeScreenProps {
  onComplete: () => void;
}

export const VideoWelcomeScreen: React.FC<VideoWelcomeScreenProps> = ({ onComplete }) => {
  const [isRendered, setIsRendered] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 1. Session check to show only once per browser session
    const visited = sessionStorage.getItem("niralOrthoIntroShown");
    if (visited === "true") {
      onComplete();
      setIsRendered(false);
      return;
    }

    // 2. Reduced motion detection
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    setShowAnimation(true);

    // If user prefers reduced motion, show a short text fade-in and immediately complete
    if (motionQuery.matches) {
      const timer = setTimeout(() => {
        handleSkip();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    // Video source plays back slowly by default — speed it up to a medium-fast pace.
    video.playbackRate = PLAYBACK_RATE;
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    
    // Reveal text in the final part of the video (approx 3.5 seconds before end)
    if (video.duration && video.currentTime >= video.duration - 3.5) {
      setShowText(true);
    }
  };

  const handleVideoEnded = () => {
    setIsTransitioning(true);
    // Smooth transition delay to match fade-out duration
    setTimeout(() => {
      sessionStorage.setItem("niralOrthoIntroShown", "true");
      onComplete();
      setIsRendered(false);
    }, 1000);
  };

  const handleSkip = () => {
    setIsTransitioning(true);
    // Short delay for skip fade-out transition
    setTimeout(() => {
      sessionStorage.setItem("niralOrthoIntroShown", "true");
      onComplete();
      setIsRendered(false);
    }, 800);
  };

  if (!isRendered || !showAnimation) return null;

  // Render simplified text fade-in if prefers-reduced-motion is true
  if (reducedMotion) {
    return (
      <div className="fixed inset-0 z-50 bg-[#05070F] flex flex-col items-center justify-center text-white text-center px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.2, times: [0, 0.2, 0.8, 1], ease: "easeInOut" }}
          className="space-y-3"
        >
          <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Welcome to</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            NIRAL <span className="text-primary">ORTHO CARE</span>
          </h2>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-[#05070F] flex items-center justify-center overflow-hidden select-none"
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: isTransitioning ? 0 : 1,
          scale: isTransitioning ? 1.02 : 1
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Layer 1: HTML5 Cinematic video background */}
        <video
          ref={videoRef}
          src="/videos/niral-ortho-intro.mp4"
          autoPlay
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnded}
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none [&::-webkit-media-controls]:hidden"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070F]/95 via-transparent to-[#05070F]/95 pointer-events-none z-10" />

        {/* Elegant typography overlay (reveals at final part of video) */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
          <AnimatePresence>
            {showText && (
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-xs sm:text-sm font-bold tracking-[0.2em] text-zinc-300 uppercase"
                >
                  Welcome to
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
                  className="flex flex-col items-center gap-1"
                >
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
                    NIRAL
                  </h2>
                  <span className="text-base sm:text-lg font-bold text-primary tracking-[0.3em] uppercase mt-1 leading-none">
                    ORTHO CARE
                  </span>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoWelcomeScreen;