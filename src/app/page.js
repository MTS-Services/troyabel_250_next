'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { Navbar } from './components/home/Navbar';
import SolutionSection from './components/home/SolutionSection';
import HowItWorks from './components/home/HowItWork';
import TeamSection from './components/home/TeamCard';
import PricingSection from './components/home/Pricing';
import { FAQ } from './components/home/FAQ';
import { InteractiveCTA2 } from './components/home/InteractiveCTA2';
import Hero from './components/home/Hero';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.2,
      easing: (t) => t * (2 - t),
      smooth: true,
      direction: 'vertical',
      wheelMultiplier: 0.2,
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
      {/* <Navbar /> */}
      {/* <Hero /> */}
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
