"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function TextOverlays() {
  const { scrollYProgress } = useScroll();

  // Section 1: 0 - 15%
  // Visible immediately, fades out at 10-15%
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.15], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.1, 0.15], [0, 0, -40]);

  // Section 2: 15 - 40%
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [40, 0, 0, -40]);

  // Section 3: 40 - 65%
  const opacity3 = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.4, 0.45, 0.6, 0.65], [40, 0, 0, -40]);

  // Section 4: 65 - 85%
  const opacity4 = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], [0, 1, 1, 0]);
  const y4 = useTransform(scrollYProgress, [0.65, 0.7, 0.8, 0.85], [40, 0, 0, -40]);

  // Section 5: 85 - 100%
  const opacity5 = useTransform(scrollYProgress, [0.85, 0.9, 1], [0, 1, 1]);
  const y5 = useTransform(scrollYProgress, [0.85, 0.9, 1], [40, 0, 0]);

  const pointerEvents1 = useTransform(opacity1, (val) => val > 0.5 ? "auto" : "none");
  const pointerEvents5 = useTransform(opacity5, (val) => val > 0.5 ? "auto" : "none");

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      
      {/* Section 1 */}
      <motion.div
        style={{ opacity: opacity1, y: y1, pointerEvents: pointerEvents1 }}
        className="absolute inset-0 flex flex-col justify-center items-start text-left px-[8%] md:pl-[12%]"
      >
        <div className="relative max-w-lg mt-[10vh]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-black/70 blur-[80px] -z-10 rounded-full pointer-events-none" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-700 bg-clip-text text-transparent mb-6">
            1/18 Scale 4WD<br />Rock Crawler.
          </h1>
          <p className="text-2xl md:text-3xl text-zinc-400 font-medium tracking-tight leading-snug">
            Ready to run.<br />Engineered for enthusiasts.
          </p>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-70"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <span className="text-sm font-semibold text-zinc-400 tracking-[0.2em] uppercase">Scroll to explore</span>
          <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        style={{ opacity: opacity2, y: y2 }}
        className="absolute inset-0 flex flex-col justify-center items-end text-right px-[8%] md:pr-[12%]"
      >
        <div className="relative max-w-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-black/70 blur-[80px] -z-10 rounded-full pointer-events-none" />
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-700 bg-clip-text text-transparent mb-8">
            Uncompromising<br />Power.
          </h2>
          <div className="flex flex-col items-end gap-3">
            {["Dual Speed Transmission", 
              "Powerful 132S Brushed Motor", 
              "Maximum Speed: Approx. 8 km/h"].map((feature, i) => (
                <div key={i} className="border border-white/10 bg-black/40 backdrop-blur-md rounded-full px-6 py-3 text-lg md:text-xl font-medium text-zinc-300 tracking-tight">
                  {feature}
                </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        style={{ opacity: opacity3, y: y3 }}
        className="absolute inset-0 flex flex-col justify-center items-start text-left px-[8%] md:pl-[12%]"
      >
        <div className="relative max-w-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-black/70 blur-[80px] -z-10 rounded-full pointer-events-none" />
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-700 bg-clip-text text-transparent mb-8">
            Precision<br />Control.
          </h2>
          <div className="flex flex-col items-start gap-3">
            {["2.4GHz Remote Control System", 
              "Control Range: ≥50 meters", 
              "9g 3-Wire Servo Steering"].map((feature, i) => (
                <div key={i} className="border border-white/10 bg-black/40 backdrop-blur-md rounded-full px-6 py-3 text-lg md:text-xl font-medium text-zinc-300 tracking-tight">
                  {feature}
                </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Section 4 */}
      <motion.div
        style={{ opacity: opacity4, y: y4 }}
        className="absolute inset-0 flex flex-col justify-center items-end text-right px-[8%] md:pr-[12%]"
      >
        <div className="relative max-w-md">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] bg-black/70 blur-[80px] -z-10 rounded-full pointer-events-none" />
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-700 bg-clip-text text-transparent mb-8">
            Built to<br />Endure.
          </h2>
          <div className="flex flex-col items-end gap-3">
            {["Durable Metal & Plastic Build", 
              "7.4V 380mAh Lithium Battery"].map((feature, i) => (
                <div key={i} className="border border-white/10 bg-black/40 backdrop-blur-md rounded-full px-6 py-3 text-lg md:text-xl font-medium text-zinc-300 tracking-tight">
                  {feature}
                </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Section 5 */}
      <motion.div
        style={{ opacity: opacity5, y: y5, pointerEvents: pointerEvents5 }}
        className="absolute inset-0 flex flex-col justify-center items-start text-left px-[8%] md:pl-[12%]"
      >
        <div className="relative max-w-lg">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-black/70 blur-[80px] -z-10 rounded-full pointer-events-none" />
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.05] bg-gradient-to-br from-zinc-100 via-zinc-400 to-zinc-700 bg-clip-text text-transparent mb-6">
            Ready to Run.
          </h1>
          <p className="text-2xl md:text-3xl text-zinc-400 font-medium tracking-tight mb-12">
            Experience the ultimate 1/18 scale 4WD Rock Crawler today.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
            <a href="#" className="bg-gradient-to-r from-zinc-200 to-zinc-400 text-black px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 shadow-[0_0_24px_rgba(255,255,255,0.2)]">
              Buy Now
            </a>
            <a href="#" className="text-zinc-300 font-medium text-lg flex items-center gap-2 hover:text-white transition-colors">
              See full specs <span className="text-xl">&rsaquo;</span>
            </a>
          </div>
        </div>
      </motion.div>

    </div>
  );
}
