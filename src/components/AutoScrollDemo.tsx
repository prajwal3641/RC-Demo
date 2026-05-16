"use client";

import { useState, useRef, useEffect } from "react";

export default function AutoScrollDemo() {
  const [scrolling, setScrolling] = useState(false);
  const animationFrameId = useRef<number | null>(null);

  const startAutoScroll = () => {
    // Cancel any existing animation if the user clicks it multiple times
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    
    setScrolling(true);
    
    // Disable CSS smooth scrolling temporarily so our JS animation works cleanly
    document.documentElement.style.scrollBehavior = 'auto';

    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const startY = window.scrollY;

    // If the user is already scrolled down, zip back to the top fast but smoothly!
    if (startY > 10) {
      const rewindDuration = 800; // 0.8s fast rewind
      const rewindStartTime = performance.now();
      
      // A sharp easing curve to quickly snap to the top smoothly
      const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

      const animateRewind = (currentTime: number) => {
        const elapsed = currentTime - rewindStartTime;
        const progress = Math.min(elapsed / rewindDuration, 1);
        const easeProgress = easeOutQuart(progress);
        
        window.scrollTo(0, startY * (1 - easeProgress));

        if (progress < 1) {
          animationFrameId.current = requestAnimationFrame(animateRewind);
        } else {
          // Once we hit the top, instantly start the 7.5s cinematic scroll
          startCinematicScroll(totalScroll);
        }
      };
      
      animationFrameId.current = requestAnimationFrame(animateRewind);
    } else {
      // If already at the top, just start immediately
      startCinematicScroll(totalScroll);
    }
  };

  const startCinematicScroll = (totalScroll: number) => {
    const duration = 7500; // 7.5 seconds (2x speed)
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Linear progression for perfectly steady 3D frame rate
      window.scrollTo(0, totalScroll * progress);

      if (progress < 1) {
        animationFrameId.current = requestAnimationFrame(animateScroll);
      } else {
        setScrolling(false);
        document.documentElement.style.scrollBehavior = '';
        animationFrameId.current = null;
      }
    };

    animationFrameId.current = requestAnimationFrame(animateScroll);
  };

  // Safety cleanup if the component unmounts
  useEffect(() => {
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        document.documentElement.style.scrollBehavior = '';
      }
    };
  }, []);

  return (
    <button 
      onClick={startAutoScroll}
      className={`fixed bottom-6 right-6 z-[100] bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-medium transition-all shadow-xl ${
        scrolling ? "opacity-40 hover:opacity-100" : "hover:bg-white/20"
      }`}
    >
      {scrolling ? "⏹ Restart Demo" : "▶ Play Cinematic Demo"}
    </button>
  );
}
