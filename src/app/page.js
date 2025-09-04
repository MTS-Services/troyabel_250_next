'use client';
import { Navbar } from "./components/home/Navbar";
import SolutionSection from "./components/home/SolutionSection";
import HowItWorks from "./components/home/HowItWork";
import PricingSection from "./components/home/Pricing";
import { FAQ } from "./components/home/FAQ";
import { InteractiveCTA2 } from "./components/home/InteractiveCTA2";
import HeroSection from "./components/home/HeroSection";
import { useEffect } from 'react';
import Lenis from 'lenis';
import TeamSection from "./components/home/TeamCard";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,

      wheelMultiplier: 1,

      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <main className=''>
        <SolutionSection />
        <HowItWorks />
        <TeamSection />
        <PricingSection />
        <FAQ />
        <InteractiveCTA2 />
      </main>
    </div>
  );
}
