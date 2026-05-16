import ScrollyTellingCanvas from "@/components/ScrollyTellingCanvas";
import TextOverlays from "@/components/TextOverlays";

export default function Home() {
  return (
    <main className="relative bg-[#050505]">
      
      {/* The canvas and text overlays are fixed positioned within these components */}
      <ScrollyTellingCanvas />
      <TextOverlays />

      {/* 
        This div creates the scrollable area.
        1200vh gives enough scroll distance to smoothly transition through 240 frames.
      */}
      <div className="h-[1200vh] w-full" />
    </main>
  );
}
