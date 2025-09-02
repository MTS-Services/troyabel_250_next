// "use client";

// import { useEffect } from "react";
// import Lenis from "@studio-freight/lenis";
// import { motion, useScroll, useTransform } from "framer-motion";
// import DarkVeil from "./DarkVeil";
// import OpenAppointmentButton from "../OpenAppointmentButton";

// export default function LenisPage() {
//   // Setup Lenis smooth scroll
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.5,
//       smooth: true,
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }
//     requestAnimationFrame(raf);

//     return () => lenis.destroy();
//   }, []);

//   const { scrollYProgress } = useScroll();

//   // Define the scroll range for the animation
//   const animationStart = 0.15;
//   const animationEndHero = 0.5; // End point for the first section's animation

//   // New start and end points for the second section's animation
//   const animationStartNewSection = 0.3;
//   const animationEndNewSection = 0.8;

//   // Animation for the primary hero content (image, h6, button, p)
//   const othersScale = useTransform(
//     scrollYProgress,
//     [animationStart, animationEndHero],
//     [1, 0.6]
//   );
//   const othersOpacity = useTransform(
//     scrollYProgress,
//     [animationStart, animationEndHero],
//     [1, 0]
//   );

//   // Animation for the main heading (h2)
//   const h2Scale = useTransform(
//     scrollYProgress,
//     [animationStart, (animationStart + animationEndHero) / 2, animationEndHero],
//     [1, 1.8, 1.8]
//   );
//   const h2Opacity = useTransform(
//     scrollYProgress,
//     [animationStart, animationEndHero],
//     [1, 0]
//   );

//   // Animation for the new section that fades in
//   const newSectionScale = useTransform(
//     scrollYProgress,
//     [animationStartNewSection, animationEndNewSection],
//     [0.8, 1]
//   );
//   const newSectionOpacity = useTransform(
//     scrollYProgress,
//     [animationStartNewSection, animationEndNewSection],
//     [0, 1]
//   );

//   return (
//     <div id="hero" className="">
//       <div className="relative">
//         <div className="sticky inset-0 z-0 h-screen w-full">
//           <DarkVeil />
//         </div>
//         <div className="relative h-[400vh] w-full -mt-[100vh]">
//           {/* DarkVeil component added as a background */}

//           <div className="sticky top-0 z-10 mx-auto flex h-screen w-full max-w-4xl flex-col items-center justify-center gap-6 px-4">
//             <motion.div
//               style={{ scale: othersScale, opacity: othersOpacity }}
//               className="flex w-full max-w-4xl flex-col items-center justify-center gap-6"
//             >
//               {/* step 2 text (main heading) */}
//               <motion.h2
//                 style={{ scale: h2Scale, opacity: h2Opacity }}
//                 className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-center text-5xl font-medium text-transparent lg:text-6xl"
//               >
//                 Master Every Stage of Your UX Career.
//               </motion.h2>
//               {/* step 3 text (subtitle) */}
//               <h6 className="text-center text-xl text-white/70">
//                 Industry leaders with experience at major corporations and a
//                 history of teaching design and UX at top universities
//                 nationwide.
//               </h6>
//               {/* step 4 button */}
//               <div className="">
//                 <OpenAppointmentButton />
//               </div>
//             </motion.div>

//             {/* This is the new section that will "replace" the old one. */}
//             <motion.div
//               style={{
//                 scale: newSectionScale,
//                 opacity: newSectionOpacity,
//               }}
//               className="absolute flex flex-col items-center justify-center gap-6"
//             >
//               <h6 className="text-center text-base text-white/70">
//                 Forget one-size-fits-all bootcamps. Our team provides
//                 individualized coaching to build a unique portfolio that gets
//                 you hired and strategic mentoring to help you level up into a
//                 senior role.
//               </h6>
//             </motion.div>
//           </div>

//           {/* Scroll space to enable the animation */}
//           <div className="h-[300vh]"></div>
//         </div>
//       </div>
//     </div>
//   );
// }

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

  // --- UPDATED ANIMATION RANGES FOR THREE SECTIONS ---

  // Section 1: "Master Every Stage..."
  const firstSection_Start = 0.1;
  const firstSection_End = 0.3;

  // Section 2: "Forget one-size-fits-all..."
  const secondSection_Start = 0.25;
  const secondSection_End = 0.55;

  // Section 3: "User Experience Bootcamps..." (Your new content)
  const thirdSection_Start = 0.5;
  const thirdSection_End = 0.8;

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

  // UPDATED: Animation for Section 2 (now fades in AND out)
  const secondSection_Opacity = useTransform(
    scrollYProgress,
    [secondSection_Start, 0.4, 0.5, secondSection_End],
    [0, 1, 1, 0] // Fades in, stays, then fades out
  );
  const secondSection_Scale = useTransform(
    scrollYProgress,
    [secondSection_Start, 0.4, 0.5, secondSection_End],
    [0.8, 1, 1, 0.8]
  );

  // NEW: Animation for Section 3
  const thirdSection_Opacity = useTransform(
    scrollYProgress,
    [thirdSection_Start, thirdSection_End],
    [0, 1]
  );
  const thirdSection_Scale = useTransform(
    scrollYProgress,
    [thirdSection_Start, thirdSection_End],
    [0.8, 1]
  );

  return (
    <div id='hero'>
      <div className='relative'>
        <div className='sticky inset-0 z-0 h-screen w-full'>
          <DarkVeil />
        </div>
        {/* UPDATED: Increased scroll container height for the third animation */}
        <div className='relative h-[500vh] w-full -mt-[100vh]'>
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
                className='bg-gradient-to-r from-white to-slate-400 bg-clip-text text-center text-5xl font-medium text-transparent lg:text-6xl'
              >
                Master Every Stage of Your UX Career.
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
              <h2 className='bg-gradient-to-r from-white to-slate-400 bg-clip-text text-center text-4xl font-medium text-transparent lg:text-5xl'>
                “User Experience Bootcamps: A Dead-End”
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

            {/* --- NEW: Section 3 Content --- */}
            <motion.div
              style={{
                scale: thirdSection_Scale,
                opacity: thirdSection_Opacity,
              }}
              className='absolute flex flex-col items-center justify-center gap-6'
            >
              <h2 className='bg-gradient-to-r from-white to-slate-400 bg-clip-text text-center text-4xl font-medium text-transparent lg:text-5xl'>
                “User Experience Bootcamps: A Dead-End”
              </h2>
              <p className='text-center text-lg text-white/70 max-w-3xl italic'>
                “The collision of higher-ed bloat, Silicon Valley's appetite for
                disruption, and corporate-scale training led to thousands of
                largely unemployable UX designers”
                <span className='not-italic'> – Jon Kolko</span>
              </p>
              <div className=''>
                <OpenAppointmentButton />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
 