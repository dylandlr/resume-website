"use client";
import { Viewport } from "next";
import PortfolioContent from "@/components/PortfolioContent";
import ManifoldBackground from "@/components/manifold-background";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function PortfolioPage() {
  return (
    <div className="relative min-h-screen">
      <ManifoldBackground />
      <PortfolioContent />
    </div>
  );
}
