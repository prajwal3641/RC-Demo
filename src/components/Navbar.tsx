"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  const { scrollY } = useScroll();

  // Fade in the navbar background after 50px of scroll
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.7]);
  const borderOpacity = useTransform(scrollY, [0, 50], [0, 0.08]);
  const blurFilter = useTransform(scrollY, [0, 50], ["blur(0px)", "blur(12px)"]);

  return (
    <motion.nav
      style={{
        backgroundColor: useTransform(bgOpacity, (op) => `rgba(10, 10, 12, ${op})`),
        borderBottomColor: useTransform(borderOpacity, (op) => `rgba(255, 255, 255, ${op})`),
        backdropFilter: blurFilter,
        WebkitBackdropFilter: blurFilter,
      }}
      className="fixed top-0 left-0 w-full z-[100] border-b border-transparent py-4"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[1.1rem] font-semibold tracking-tight text-white/90 hover:text-white transition-colors">
            RC Crawler
          </Link>
          <div className="w-px h-4 bg-white/20" />
          <Link href="/ford" className="text-[1.1rem] font-semibold tracking-tight text-white/50 hover:text-white transition-colors">
            Ford F-150
          </Link>
        </div>
        
        <div className="hidden md:flex gap-8">
          {["Overview", "Engineering", "Performance", "Specs", "Buy"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[0.85rem] font-medium text-white/60 hover:text-white/90 transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#"
          className="bg-gradient-to-br from-[#0050FF] to-[#00D6FF] text-white px-4 py-2 rounded-full text-[0.85rem] font-semibold transition-transform hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(0,214,255,0.3)]"
        >
          Experience the RC SUV
        </a>
      </div>
    </motion.nav>
  );
}
