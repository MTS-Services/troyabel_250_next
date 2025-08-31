"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import DarkVeil from "./DarkVeil";
import OpenAppointmentButton from "../OpenAppointmentButton";

export default function LenisPage() {
  // Setup Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll();

  // Define the scroll range for the animation
  const animationStart = 0.15;
  const animationEndHero = 0.5; // End point for the first section's animation

  // New start and end points for the second section's animation
  const animationStartNewSection = 0.3;
  const animationEndNewSection = 0.8;

  // Animation for the primary hero content (image, h6, button, p)
  const othersScale = useTransform(
    scrollYProgress,
    [animationStart, animationEndHero],
    [1, 0.6]
  );
  const othersOpacity = useTransform(
    scrollYProgress,
    [animationStart, animationEndHero],
    [1, 0]
  );

  // Animation for the main heading (h2)
  const h2Scale = useTransform(
    scrollYProgress,
    [animationStart, (animationStart + animationEndHero) / 2, animationEndHero],
    [1, 1.8, 1.8]
  );
  const h2Opacity = useTransform(
    scrollYProgress,
    [animationStart, animationEndHero],
    [1, 0]
  );

  // Animation for the new section that fades in
  const newSectionScale = useTransform(
    scrollYProgress,
    [animationStartNewSection, animationEndNewSection],
    [0.8, 1]
  );
  const newSectionOpacity = useTransform(
    scrollYProgress,
    [animationStartNewSection, animationEndNewSection],
    [0, 1]
  );

  return (
    <div id="hero" className="">
      <div className="relative">
        <div className="sticky inset-0 z-0 h-screen w-full">
          <DarkVeil />
        </div>
        <div className="relative h-[400vh] w-full -mt-[100vh]">
          {/* DarkVeil component added as a background */}

          <div className="sticky top-0 z-10 mx-auto flex h-screen w-full max-w-4xl flex-col items-center justify-center gap-6 px-4">
            <motion.div
              style={{ scale: othersScale, opacity: othersOpacity }}
              className="flex w-full max-w-4xl flex-col items-center justify-center gap-6"
            >
              {/* step 2 text (main heading) */}
              <motion.h2
                style={{ scale: h2Scale, opacity: h2Opacity }}
                className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-center text-5xl font-medium text-transparent lg:text-6xl"
              >
                Master Every Stage of Your UX Career.
              </motion.h2>
              {/* step 3 text (subtitle) */}
              <h6 className="text-center text-xl text-white/70">
                Industry leaders with experience at major corporations and a
                history of teaching design and UX at top universities
                nationwide.
              </h6>
              {/* step 4 button */}
              <div className="">
                <OpenAppointmentButton />
              </div>
            </motion.div>

            {/* This is the new section that will "replace" the old one. */}
            <motion.div
              style={{
                scale: newSectionScale,
                opacity: newSectionOpacity,
              }}
              className="absolute flex flex-col items-center justify-center gap-6"
            >
              <h6 className="text-center text-base text-white/70">
                Forget one-size-fits-all bootcamps. Our team provides
                individualized coaching to build a unique portfolio that gets
                you hired and strategic mentoring to help you level up into a
                senior role.
              </h6>
            </motion.div>
          </div>

          {/* Scroll space to enable the animation */}
          <div className="h-[300vh]"></div>
        </div>
      </div>
    </div>
  );
}
