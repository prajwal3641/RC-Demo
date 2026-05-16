"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export default function ScrollyTellingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const frameCount = 240;
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const { scrollYProgress } = useScroll();

  // Preload Images
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, "0");
      img.src = `/frames/ezgif-frame-${frameNum}.jpg`;

      img.onload = () => {
        setImagesLoaded((prev) => prev + 1);
      };
      images.push(img);
    }
    imagesRef.current = images;

    // Handle Window Resize
    const handleResize = () => {
      renderFrame(currentFrameIndex.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentFrameIndex = useRef(0);

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Make canvas fill screen coordinates
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const img = imagesRef.current[index];
    if (img && img.complete) {
      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
      } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        offsetY = 0;
        offsetX = (canvas.width - drawWidth) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      currentFrameIndex.current = index;
    }
  };

  // Initially render the first frame when loaded
  useEffect(() => {
    if (imagesLoaded === frameCount) {
      renderFrame(0);
    }
  }, [imagesLoaded]);

  // Hook into Framer Motion scroll progress
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (imagesLoaded !== frameCount) return;
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(latest * frameCount)
    );
    // Use requestAnimationFrame to ensure we don't draw more often than the screen refreshes
    requestAnimationFrame(() => renderFrame(frameIndex));
  });

  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none">
      {/* Loading Overlay */}
      <div
        className={`absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] transition-opacity duration-500 ${
          imagesLoaded === frameCount ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="w-10 h-10 border-4 border-white/10 border-t-[#00D6FF] rounded-full animate-spin mb-4"></div>
        <p className="text-white/60 font-medium">Loading Experience...</p>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover bg-[#050505]"
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] rounded-full bg-[radial-gradient(circle,rgba(0,80,255,0.08)_0%,rgba(5,5,5,0)_70%)] pointer-events-none -z-10 mix-blend-screen" />
    </div>
  );
}
