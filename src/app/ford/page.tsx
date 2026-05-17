import ScrollyTellingCanvas from "../../components/ScrollyTellingCanvas";
import FordTextOverlays from "../../components/FordTextOverlays";
import AutoScrollDemo from "../../components/AutoScrollDemo";

export default function FordPage() {
  return (
    <main className="relative bg-[#050505]">
      {/* 3D Image Sequence Canvas */}
      <ScrollyTellingCanvas folderPath="/ford_frames" />

      {/* Text overlays with Framer Motion scroll tracking */}
      <FordTextOverlays />

      {/* Demo Scroll Automation */}
      <AutoScrollDemo />

      {/* The massive scroll container that dictates the length of the scrollytelling */}
      <div className="h-[1200vh] w-full" />
    </main>
  );
}
