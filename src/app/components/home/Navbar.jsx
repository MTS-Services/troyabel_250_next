// 'use client';
// import { useState, useEffect } from 'react';
// import { Button } from '../Button';
// import { OutlineButton } from '../OutlineButton';
// import { motion, AnimatePresence } from 'framer-motion';
// import Aurora from './Aurora';

// const navData = [
//   { id: 1, title: 'Hero' },
//   { id: 2, title: 'Solution' },
//   { id: 3, title: 'How it works' },
//   { id: 4, title: 'Team' },
//   { id: 5, title: 'Pricing' },
// ];

// export const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [active, setActive] = useState('hero');

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPos = window.scrollY + 100;
//       navData.forEach((nav) => {
//         const section = document.getElementById(nav.title.toLowerCase());
//         if (section) {
//           if (
//             scrollPos >= section.offsetTop &&
//             scrollPos < section.offsetTop + section.offsetHeight
//           ) {
//             setActive(nav.title.toLowerCase());
//           }
//         }
//       });
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <>
//       {/* Navbar */}
//       <header className='w-full fixed top-0 left-0 z-50'>
//         <div className='max-w-[1200px] mx-auto px-4 py-4'>
//           <div className='flex items-center justify-between h-[60px] px-6 bg-[#000000] border border-white/15 rounded-lg'>
//             <h2 className='text-[12px] md:text-[16px] lg:text-[20px] font-bold text-white items-center transition-transform duration-500 hover:animate-spin inline-block'>
//               Dr <span>.</span> T
//             </h2>

//             <ul className='hidden md:flex items-center space-x-6 md:space-x-4'>
//               {navData.map((nav) => (
//                 <li key={nav.id}>
//                   <a
//                     href={`#${nav.title.toLowerCase()}`}
//                     className={`text-base font-medium cursor-pointer transition-colors px-3 py-1 rounded-lg scroll-mt-24 ${
//                       active === nav.title.toLowerCase()
//                         ? 'bg-blue-600 text-white shadow-lg'
//                         : 'text-white hover:bg-gray-900'
//                     }`}
//                   >
//                     {nav.title}
//                   </a>
//                 </li>
//               ))}
//             </ul>

//             <div className='hidden md:block'>
//               <Button
//                 className={
//                   'md:text-[12px] md:px-2 md:py-2 lg:px-4 lg:py-3 lg:text-base'
//                 }
//                 text={'Get Started'}
//               />
//             </div>

//             <div className='md:hidden'>
//               <button
//                 onClick={() => setOpen(!open)}
//                 className='text-white focus:outline-none text-2xl'
//               >
//                 {open ? '✖' : '☰'}
//               </button>
//             </div>
//           </div>

//           <AnimatePresence>
//             {open && (
//               <motion.div
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.3 }}
//                 className='md:hidden mt-2 rounded-lg bg-[#000000] border border-white/15 px-6 py-4'
//               >
//                 <ul className='flex flex-col space-y-4'>
//                   {navData.map((nav) => (
//                     <li key={nav.id}>
//                       <a
//                         href={`#${nav.title.toLowerCase()}`}
//                         onClick={() => setOpen(false)}
//                         className={`text-base font-medium cursor-pointer transition-colors px-3 py-1 rounded-lg scroll-mt-20 ${
//                           active === nav.title.toLowerCase()
//                             ? 'bg-blue-600 text-white shadow-lg'
//                             : 'text-white hover:bg-gray-900'
//                         }`}
//                       >
//                         {nav.title}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className='mt-4'>
//                   <Button text={'Get Started'} />
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <div id='hero' className='pt-[80px] scroll-mt-[80px] relative'>
//         {/* Aurora Background */}
//         <Aurora
//           colorStops={['#3A29FF', '#FF94B4', '#FF3232']}
//           blend={0.5}
//           amplitude={1.0}
//           speed={0.5}
//         ></Aurora>

//         <div className='max-w-[1200px] mx-auto text-center md:py-12 px-6 relative z-10'>
//           <h1 className='max-w-[380px] md:max-w-[640px] lg:max-w-[900px] mx-auto text-center my-6 text-white text-4xl md:text-5xl lg:text-6xl font-bold'>
//             Master Every Stage of Your UX Career.
//           </h1>

//           <p className='max-w-[360px] md:max-w-[490px] lg:max-w-[500px] mx-auto text-base md:text-base lg:text-lg font-normal text-white/80'>
//             Industry leaders with experience at major corporations and a history
//             of teaching design and UX at top universities nationwide.
//           </p>

//           <div className='flex justify-center gap-6 my-8'>
//             <OutlineButton OutLine={'See Plans'} />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

//=============================================================//

// 'use client';

// import { useState, useEffect } from 'react';
// import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
// import { IconMenu2, IconX } from '@tabler/icons-react';
// import { Button } from '../Button';
// import { cn } from '@/app/lib/utils';

// const navData = [
//   { id: 1, title: 'Hero', href: '#hero' },
//   { id: 2, title: 'Solution', href: '#solution' },
//   { id: 3, title: 'How it works', href: '#how-it-works' },
//   { id: 4, title: 'Team', href: '#team' },
//   { id: 5, title: 'Pricing', href: '#pricing' },
// ];

// export const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [active, setActive] = useState('hero');

//   const { scrollY } = useScroll();
//   useMotionValueEvent(scrollY, 'change', (latest) => {
//     if (latest > 80) {
//       setIsScrolled(true);
//     } else {
//       setIsScrolled(false);
//     }
//   });

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setActive(entry.target.id);
//           }
//         });
//       },
//       {
//         rootMargin: '-40% 0px -60% 0px',
//       }
//     );

//     const sections = navData.map(({ href }) => document.querySelector(href));
//     sections.forEach((section) => {
//       if (section) observer.observe(section);
//     });

//     return () => {
//       sections.forEach((section) => {
//         if (section) observer.unobserve(section);
//       });
//     };
//   }, []);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!mobileMenuOpen);
//   };

//   return (
//     <div
//       className={cn(
//         'fixed inset-x-0 top-4 z-50 mx-auto transition-all duration-500',
//         isScrolled ? 'max-w-fit px-4' : 'max-w-[1200px] px-8'
//       )}
//     >
//       {/* --- Desktop Navbar --- */}
//       <div
//         className={cn(
//           'relative z-[60] mx-auto hidden flex-row items-center justify-between self-start rounded-full bg-black/50 py-2 transition-all duration-300 lg:flex',
//           isScrolled ? 'px-4' : 'px-8',
//           isScrolled && 'border border-white/15 backdrop-blur-sm'
//         )}
//       >
//         <h2 className='text-[12px] md:text-[16px] lg:text-[20px] font-bold text-white items-center transition-transform duration-500 hover:animate-spin inline-block'>
//           Dr . T
//         </h2>
//         <div className='flex flex-row items-center justify-center space-x-2 text-sm font-medium'>
//           {navData.map((nav) => (
//             <a
//               key={nav.id}
//               href={nav.href}
//               className={cn(
//                 'relative cursor-pointer px-4 py-2 text-white/80 transition-colors hover:text-white',
//                 active === nav.href.substring(1) &&
//                   'rounded-full bg-blue-600 text-white'
//               )}
//             >
//               {nav.title}
//             </a>
//           ))}
//         </div>
//         <div className='pl-4'>
//           <Button text={'Book a call'} />
//         </div>
//       </div>

//       {/* --- Mobile Navbar --- */}
//       <div
//         className={cn(
//           'relative z-50 mx-auto flex w-full flex-col items-center justify-between rounded-2xl bg-black/50 p-2 lg:hidden',
//           isScrolled && 'border border-white/15 backdrop-blur-sm'
//         )}
//       >
//         <div className='flex w-full flex-row items-center justify-between px-2'>
//           <h2 className='text-xl font-bold text-white'>Dr . T</h2>
//           {mobileMenuOpen ? (
//             <IconX className='text-white' onClick={toggleMobileMenu} />
//           ) : (
//             <IconMenu2 className='text-white' onClick={toggleMobileMenu} />
//           )}
//         </div>
//         {mobileMenuOpen && (
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             className='flex w-full flex-col items-start justify-start gap-4 px-2 py-4'
//           >
//             {navData.map((nav) => (
//               <a
//                 key={nav.id}
//                 href={nav.href}
//                 onClick={toggleMobileMenu}
//                 className={cn(
//                   'w-full rounded-md px-3 py-2 text-base font-medium text-white/80 hover:bg-gray-900',
//                   active === nav.href.substring(1) && 'bg-blue-600 text-white'
//                 )}
//               >
//                 {nav.title}
//               </a>
//             ))}
//             <Button text={'Get Started'} className='w-full mt-2' />
//           </motion.div>
//         )}
//       </div>
//     </div>
//   );
// };

'use client';

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { Button } from '../Button';
import { cn } from '@/app/lib/utils';

const navData = [
  { id: 'hero', title: 'Hero', href: '#hero' },
  { id: 'solution', title: 'Solution', href: '#solution' },
  { id: 'how-it-works', title: 'How it works', href: '#how-it-works' },
  { id: 'team', title: 'Team', href: '#team' },
  { id: 'pricing', title: 'Pricing', href: '#pricing' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [active, setActive] = useState('hero');
  const [prevActive, setPrevActive] = useState('hero');

  const [touched, setTouched] = useState(null);
  const blurTimeoutRef = useRef(null);

  const isClickScrolling = useRef(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 80);
  });

  useEffect(() => {
    let scrollTimeout;
    const handleScrollEnd = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isClickScrolling.current = false;
      }, 150);
    };
    window.addEventListener('scroll', handleScrollEnd);

    return () => {
      window.removeEventListener('scroll', handleScrollEnd);
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPrevActive(active);
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -60% 0px' }
    );

    const sections = navData.map(({ href }) => document.querySelector(href));
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });
    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [active]);

  const getNavIndex = (navId) => navData.findIndex(({ id }) => id === navId);

  // Click handler with the new blur logic
  const handleNavClick = (navId) => {
    isClickScrolling.current = true;
    setPrevActive(active);
    setActive(navId);

    // --- NEW: Blur effect logic ---
    setTouched(navId);
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    blurTimeoutRef.current = setTimeout(() => {
      setTouched(null);
    }, 200);
  };

  return (
    <div
      className={cn(
        'fixed inset-x-0 top-4 z-50 mx-auto transition-all duration-500',
        isScrolled
          ? 'max-w-fit px-4 '
          : 'max-w-[1200px] px-8 border border-white/15 rounded-full'
      )}
    >
      {/* --- Desktop Navbar --- */}
      <div
        className={cn(
          'relative z-[60] mx-auto hidden flex-row items-center justify-between self-start rounded-full bg-black/50 py-2 transition-all duration-300 lg:flex',
          isScrolled ? 'px-4' : 'px-8',
          isScrolled && 'border border-white/15 backdrop-blur-sm'
        )}
      >
        <h2 className='text-lg font-bold text-white items-center pr-4'>
          Dr . T
        </h2>

        {/* --- Fluid Animation Section --- */}
        <div className='relative flex flex-row p-1'>
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              className='absolute inset-y-0 my-auto h-9 rounded-full bg-blue-600'
              initial={{ x: `${getNavIndex(prevActive) * 100}%` }}
              animate={{ x: `${getNavIndex(active) * 100}%` }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              style={{ width: `${100 / navData.length}%` }}
            />
          </AnimatePresence>

          {navData.map((nav) => (
            <a
              key={nav.id}
              href={nav.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(nav.id);
                document
                  .querySelector(nav.href)
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className='relative z-10 flex h-9 w-[110px] items-center justify-center text-center text-sm font-bold text-white/80 transition-all duration-300'
            >
              <span
                className={cn(
                  'transition-all duration-300',
                  active === nav.id && 'text-white',
                  // NEW: Apply blur-sm if this tab was just touched
                  touched === nav.id && 'blur-sm'
                )}
              >
                {nav.title}
              </span>
            </a>
          ))}
        </div>
        {/* --- End of Animation Section --- */}

        <div className='pl-4'>
          <Button text={'Book a call'} />
        </div>
      </div>

      {/* --- Mobile Navbar (unchanged) --- */}
      <div
        className={cn(
          'relative z-50 mx-auto flex w-full flex-col items-center justify-between rounded-2xl bg-black/50 p-2 lg:hidden',
          isScrolled && 'border border-white/15 backdrop-blur-sm'
        )}
      >
        <div className='flex w-full flex-row items-center justify-between px-2'>
          <h2 className='text-xl font-bold text-white'>Dr . T</h2>
          {mobileMenuOpen ? (
            <IconX
              className='text-white'
              onClick={() => setMobileMenuOpen(false)}
            />
          ) : (
            <IconMenu2
              className='text-white'
              onClick={() => setMobileMenuOpen(true)}
            />
          )}
        </div>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className='flex w-full flex-col items-start justify-start gap-4 px-2 py-4'
          >
            {navData.map((nav) => (
              <a
                key={nav.id}
                href={nav.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'w-full rounded-md px-3 py-2 text-base font-medium text-white/80 hover:bg-gray-900',
                  active === nav.id && 'bg-blue-600 text-white'
                )}
              >
                {nav.title}
              </a>
            ))}
            <Button text={'Get Started'} className='w-full mt-2' />
          </motion.div>
        )}
      </div>
    </div>
  );
};
