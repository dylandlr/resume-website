"use client";
import { Viewport } from "next";
import PortfolioContent from "@/components/PortfolioContent";
// import StarField from "@/components/star-field-react";
import ManifoldBackground from "@/components/manifold-background";
import Chat from "@/components/Chat";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen">
      <ManifoldBackground />
      {/* <StarField /> */}
      <PortfolioContent />
      <Chat />
    </div>
  );
}
