import ScrollyTellingCanvas from "../../components/ScrollyTellingCanvas";
import RlaarloTextOverlays from "../../components/RlaarloTextOverlays";
import AutoScrollDemo from "../../components/AutoScrollDemo";

export default function RlaarloPage() {
  return (
    <main className="relative bg-[#050505]">
      {/* 3D Image Sequence Canvas */}
      <ScrollyTellingCanvas folderPath="/rlaarlo_frames" />

      {/* Text overlays with Framer Motion scroll tracking */}
      <RlaarloTextOverlays />

      {/* Demo Scroll Automation */}
      <AutoScrollDemo />

      {/* The massive scroll container that dictates the length of the scrollytelling */}
      <div className="h-[1200vh] w-full" />
    </main>
  );
}
