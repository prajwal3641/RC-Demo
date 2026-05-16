"use client";

import { useState } from "react";

export default function AutoScrollDemo() {
  const [scrolling, setScrolling] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const startAutoScroll = () => {
    if (scrolling || hasPlayed) return;
    setScrolling(true);
    setHasPlayed(true);
    
    // We want to scroll to the very bottom
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    const duration = 7500; // 7.5 seconds (2x speed) for a very fast, energetic recording
    const startTime = performance.now();
    const startY = window.scrollY;

    // We use a linear progression so the 3D car animation plays at a perfectly constant speed,
    // which prevents the "stuck" feeling at the beginning.
    const easeProgress = (t: number) => t;

    // Disable CSS smooth scrolling temporarily so our JS animation works
    document.documentElement.style.scrollBehavior = 'auto';

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentProgress = easeProgress(progress);
      
      window.scrollTo(0, startY + (totalScroll - startY) * currentProgress);

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        setScrolling(false);
        // Restore CSS smooth scrolling
        document.documentElement.style.scrollBehavior = '';
      }
    };

    requestAnimationFrame(animateScroll);
  };

  // Permanently hide the button after it has been clicked once
  if (hasPlayed) return null;

  return (
    <button 
      onClick={startAutoScroll}
      className="fixed bottom-6 right-6 z-[100] bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all shadow-xl"
    >
      ▶ Play Cinematic Demo
    </button>
  );
}
