'use client';

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useTransform } from 'framer-motion';
import DarkVeil from './DarkVeil';
import OpenAppointmentButton from '../OpenAppointmentButton';

export default function LenisPage() {
  // Setup Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll();

  // --- UPDATED ANIMATION RANGES FOR TWO SECTIONS ---

  // Section 1: Fades out between 0% and 25% of scroll
  const firstSection_Start = 0;
  const firstSection_End = 0.25;

  // Section 2: Fades in and out between 20% and 50% of scroll
  const secondSection_Start = 0.2;
  const secondSection_End = 0.5;

  // --- ANIMATION LOGIC ---

  // Animation for Section 1
  const firstSection_Opacity = useTransform(
    scrollYProgress,
    [firstSection_Start, firstSection_End],
    [1, 0]
  );
  const firstSection_Scale = useTransform(
    scrollYProgress,
    [firstSection_Start, firstSection_End],
    [1, 0.8]
  );
  const firstHeading_Scale = useTransform(
    scrollYProgress,
    [firstSection_Start, firstSection_End],
    [1, 1.8] // Expands as it fades
  );

  // Animation for Section 2
  const secondSection_Opacity = useTransform(
    scrollYProgress,
    [secondSection_Start, 0.3, 0.4, secondSection_End], // Fades in, stays, then fades out
    [0, 1, 1, 0]
  );
  const secondSection_Scale = useTransform(
    scrollYProgress,
    [secondSection_Start, 0.3, 0.4, secondSection_End],
    [0.8, 1, 1, 0.8]
  );

  return (
    <div id='hero'>
      <div className='relative'>
        <div className='sticky inset-0 z-0 h-screen w-full'>
          <DarkVeil />
        </div>
        {/* UPDATED: Reduced scroll container height for the two animations */}
        <div className='relative h-[300vh] w-full -mt-[100vh]'>
          <div className='sticky top-0 z-10 mx-auto flex h-screen w-full max-w-4xl flex-col items-center justify-center gap-6 px-4'>
            {/* --- Section 1 Content --- */}
            <motion.div
              style={{
                scale: firstSection_Scale,
                opacity: firstSection_Opacity,
              }}
              className='absolute flex w-full max-w-4xl flex-col items-center justify-center gap-6'
            >
              <motion.h2
                style={{ scale: firstHeading_Scale }}
                className='bg-gradient-to-r from-white leading-tight to-slate-400 bg-clip-text text-center text-5xl font-medium text-transparent lg:text-6xl'
              >
                Master Every Stage of Your
                <span className='text-[#A63EE7]'> UX Career.</span>
              </motion.h2>
              <h6 className='text-center text-xl text-white/70'>
                Industry leaders with experience at major corporations and a
                history of teaching design and UX at top universities
                nationwide.
              </h6>
              <div className=''>
                <OpenAppointmentButton />
              </div>
            </motion.div>

            {/* --- Section 2 Content --- */}
            <motion.div
              style={{
                scale: secondSection_Scale,
                opacity: secondSection_Opacity,
              }}
              className='absolute flex flex-col items-center justify-center gap-6'
            >
              <h2 className='bg-gradient-to-r from-white leading-tight to-slate-400 bg-clip-text text-center text-4xl font-medium text-transparent lg:text-5xl'>
                “User Experience Bootcamps :
                <span className='text-[#A63EE7]'> A Dead-End</span>”
              </h2>
              <h6 className='text-center text-base text-white/70 max-w-2xl'>
                “The collision of higher-ed bloat, Silicon Valley's appetite for
                disruption, and corporate-scale training led to thousands of
                largely unemployable UX designers” – Jon Kolko
              </h6>
              <div className=''>
                <OpenAppointmentButton />
              </div>
            </motion.div>

            {/* --- Section 3 has been completely removed --- */}
          </div>
        </div>
      </div>
    </div>
  );
}
