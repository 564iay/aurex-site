"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { BuySection } from "@/components/sections/buy-section";
import { ColorSection } from "@/components/sections/color-section";
import { EcosystemSection } from "@/components/sections/ecosystem-section";
import { ExplodedSection } from "@/components/sections/exploded-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { HeroSection } from "@/components/sections/hero-section";
import { LifestyleSection } from "@/components/sections/lifestyle-section";
import { MaterialsSection } from "@/components/sections/materials-section";
import { SoundTechSection } from "@/components/sections/sound-tech-section";
import { StorySection } from "@/components/sections/story-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { Navbar } from "@/components/ui/navbar";

const ProductCanvas = dynamic(
  () => import("@/components/three/product-canvas"),
  { ssr: false }
);

const defaultColor = "#141414";

type ScenePhase =
  | "hero"
  | "reveal"
  | "features"
  | "exploded"
  | "sound"
  | "materials"
  | "lifestyle"
  | "colors"
  | "ecosystem"
  | "testimonials"
  | "buy";

export function ExperienceShell() {
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [ready, setReady] = useState(false);
  const [scenePhase, setScenePhase] = useState<ScenePhase>("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const sections = gsap.utils.toArray<HTMLElement>("[data-scene-phase]");
    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => setScenePhase(section.dataset.scenePhase as ScenePhase),
        onEnterBack: () =>
          setScenePhase(section.dataset.scenePhase as ScenePhase)
      })
    );

    let progressTrigger: ScrollTrigger | null = null;
    if (!prefersReducedMotion) {
      progressTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => setScrollProgress(self.progress)
      });
    }

    const loadTimer = window.setTimeout(() => setReady(true), 1400);

    return () => {
      triggers.forEach((trigger) => trigger.kill());
      progressTrigger?.kill();
      window.clearTimeout(loadTimer);
    };
  }, []);

  const scene = useMemo(
    () => (
      <ProductCanvas
        selectedColor={selectedColor}
        scenePhase={scenePhase}
        scrollProgress={scrollProgress}
        luxMode={false}
      />
    ),
    [scenePhase, scrollProgress, selectedColor]
  );

  return (
    <main className="luxury-shell relative min-h-screen bg-transparent">
      <LoadingScreen ready={ready} />
      <AnimatePresence>{ready ? scene : null}</AnimatePresence>
      <CustomCursor />
      <div className="noise" />
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10"
      >
        <HeroSection />
        <StorySection />
        <FeaturesSection />
        <ExplodedSection />
        <SoundTechSection />
        <MaterialsSection />
        <LifestyleSection />
        <ColorSection selectedColor={selectedColor} onColorChange={setSelectedColor} />
        <EcosystemSection />
        <TestimonialsSection />
        <BuySection selectedColor={selectedColor} />
      </motion.div>
    </main>
  );
}
