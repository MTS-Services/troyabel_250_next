// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import {
//   motion,
//   useScroll,
//   useMotionValueEvent,
//   AnimatePresence,
// } from 'framer-motion';
// import { IconMenu2, IconX } from '@tabler/icons-react';
// import { cn } from '@/app/lib/utils';
// import { HiArrowUpRight } from 'react-icons/hi2';
// import FirstModal from './FirstModal';

// const navData = [
//   { id: 'hero', title: 'Hero', href: '#hero' },
//   { id: 'solution', title: 'Solution', href: '#solution' },
//   { id: 'how-it-works', title: 'How it works', href: '#how-it-works' },
//   { id: 'team', title: 'Team', href: '#team' },
//   { id: 'pricing', title: 'Pricing', href: '#pricing' },
// ];

// const menuVariants = {
//   hidden: { opacity: 0, y: -20, transition: { duration: 0.2 } },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
// };

// // --- NEW: Animation variants for the logo morph ---
// const logoVariants = {
//   initial: { opacity: 0, scale: 0.8 },
//   animate: {
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.4, ease: 'easeInOut' },
//   },
//   exit: {
//     opacity: 0,
//     scale: 0.8,
//     transition: { duration: 0.3, ease: 'easeInOut' },
//   },
// };

// export const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [active, setActive] = useState('hero');
//   const [prevActive, setPrevActive] = useState('hero');
//   const isClickScrolling = useRef(false);
//   const [heroHeight, setHeroHeight] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     const heroSection = document.getElementById('hero');
//     if (heroSection) {
//       setHeroHeight(heroSection.offsetHeight);
//     }
//   }, []);

//   const { scrollY } = useScroll();
//   useMotionValueEvent(scrollY, 'change', (latest) => {
//     if (heroHeight > 0) {
//       setIsScrolled(latest > heroHeight - 80);
//     }
//   });

//   useEffect(() => {
//     let scrollTimeout;
//     const handleScrollEnd = () => {
//       clearTimeout(scrollTimeout);
//       scrollTimeout = setTimeout(() => {
//         isClickScrolling.current = false;
//       }, 150);
//     };
//     window.addEventListener('scroll', handleScrollEnd);
//     return () => {
//       window.removeEventListener('scroll', handleScrollEnd);
//     };
//   }, []);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (isClickScrolling.current) return;
//         for (const entry of entries) {
//           if (entry.isIntersecting) {
//             setPrevActive(active);
//             setActive(entry.target.id);
//           }
//         }
//       },
//       { rootMargin: '-40% 0px -60% 0px' }
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
//   }, [active]);

//   const getNavIndex = (navId) => navData.findIndex(({ id }) => id === navId);

//   const handleNavClick = (navId) => {
//     isClickScrolling.current = true;
//     setPrevActive(active);
//     setActive(navId);
//   };

//   return (
//     <>
//       <div
//         className={cn(
//           'fixed inset-x-0 top-4 z-50 mx-auto transition-all duration-500',
//           isScrolled ? 'max-w-fit px-4' : 'max-w-7xl px-8'
//         )}
//       >
//         {/* --- Desktop Navbar --- */}
//         <div
//           className={cn(
//             'relative z-[60] mx-auto hidden flex-row items-center justify-between self-start rounded-lg bg-black/50 py-2 transition-all duration-300 lg:flex',
//             isScrolled ? 'px-4' : 'px-8',
//             // FIXED: Removed the border, kept the backdrop-blur
//             isScrolled && 'backdrop-blur-sm'
//           )}
//         >
//           {/* --- FIXED: Logo morph animation --- */}
//           <div className='w-auto pr-4 h-10 flex items-center'>
//             <AnimatePresence mode='wait' initial={false}>
//               {isScrolled ? (
//                 <motion.img
//                   key='icon'
//                   variants={logoVariants}
//                   initial='initial'
//                   animate='animate'
//                   exit='exit'
//                   src='/image/logo/logophone.png'
//                   alt='logo icon'
//                   className='h-10'
//                 />
//               ) : (
//                 <motion.img
//                   key='full'
//                   variants={logoVariants}
//                   initial='initial'
//                   animate='animate'
//                   exit='exit'
//                   src='/image/logo/logodesktop.png'
//                   alt='full logo'
//                   className='h-8'
//                 />
//               )}
//             </AnimatePresence>
//           </div>

//           {/* --- Fluid Animation Section (FIXED: Blur removed) --- */}
//           <div className='relative flex flex-row p-1'>
//             <AnimatePresence initial={false}>
//               <motion.div
//                 key={active}
//                 className='absolute inset-y-0 my-auto h-9 rounded-lg bg-[#A63EE7]'
//                 initial={{ x: `${getNavIndex(prevActive) * 100}%` }}
//                 animate={{ x: `${getNavIndex(active) * 100}%` }}
//                 transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//                 style={{ width: `${100 / navData.length}%` }}
//               />
//             </AnimatePresence>
//             {navData.map((nav) => (
//               <a
//                 key={nav.id}
//                 href={nav.href}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handleNavClick(nav.id);
//                   document
//                     .querySelector(nav.href)
//                     ?.scrollIntoView({ behavior: 'smooth' });
//                 }}
//                 className='relative z-10 flex h-9 w-[110px] items-center justify-center text-center text-sm font-bold text-white/80 transition-colors duration-300'
//               >
//                 <span className={cn(active === nav.id && 'text-white')}>
//                   {nav.title}
//                 </span>
//               </a>
//             ))}
//           </div>

//           <div className='pl-2'>
//             <button
//               onClick={() => setIsModalOpen(true)}
//               className={cn(
//                 'flex items-center justify-center gap-2 rounded-lg bg-[#A63EE7] text-sm font-medium text-white transition-all duration-300 ease-in-out',
//                 isScrolled ? 'h-10 w-10 p-0' : 'px-6 py-[10px]'
//               )}
//             >
//               <motion.span layout className={cn(isScrolled && 'sr-only')}>
//                 Book a call
//               </motion.span>
//               <HiArrowUpRight />
//             </button>
//           </div>
//         </div>

//         {/* --- Mobile Navbar --- */}
//         <div
//           className={cn(
//             'relative z-50 mx-auto flex w-[95%] max-w-lg flex-col items-center justify-between rounded-lg bg-black/90 p-2 lg:hidden',
//             isScrolled && 'backdrop-blur-sm'
//           )}
//         >
//           <div className='flex h-12 w-full flex-row items-center justify-between px-4'>
//             <div className='h-10 flex items-center'>
//               <AnimatePresence mode='wait' initial={false}>
//                 {isScrolled ? (
//                   <motion.img
//                     key='icon-mobile'
//                     variants={logoVariants}
//                     initial='initial'
//                     animate='animate'
//                     exit='exit'
//                     src='/image/logo/logophone.png'
//                     alt='logo icon'
//                     className='h-10'
//                   />
//                 ) : (
//                   <motion.img
//                     key='full-mobile'
//                     variants={logoVariants}
//                     initial='initial'
//                     animate='animate'
//                     exit='exit'
//                     src='/image/logo/logodesktop.png'
//                     alt='full logo'
//                     className='h-8'
//                   />
//                 )}
//               </AnimatePresence>
//             </div>
//             {mobileMenuOpen ? (
//               <IconX
//                 className='text-white'
//                 onClick={() => setMobileMenuOpen(false)}
//               />
//             ) : (
//               <IconMenu2
//                 className='text-white'
//                 onClick={() => setMobileMenuOpen(true)}
//               />
//             )}
//           </div>
//           <AnimatePresence>
//             {mobileMenuOpen && (
//               <motion.div
//                 variants={menuVariants}
//                 initial='hidden'
//                 animate='visible'
//                 exit='hidden'
//                 className='flex w-full flex-col items-start justify-start gap-4 px-2 py-4'
//               >
//                 {navData.map((nav) => (
//                   <a
//                     key={nav.id}
//                     href={nav.href}
//                     onClick={() => {
//                       setMobileMenuOpen(false);
//                       handleNavClick(nav.id);
//                       document
//                         .querySelector(nav.href)
//                         ?.scrollIntoView({ behavior: 'smooth' });
//                     }}
//                     className={cn(
//                       'w-full rounded-lg px-3 py-2 text-base font-medium text-white/80 hover:bg-neutral-800',
//                       active === nav.id && 'bg-[#A63EE7] text-white'
//                     )}
//                   >
//                     {nav.title}
//                   </a>
//                 ))}
//                 <button
//                   onClick={() => setIsModalOpen(true)}
//                   className='mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#A63EE7] px-3 py-3 text-base font-medium text-white'
//                 >
//                   Book a Call <HiArrowUpRight />
//                 </button>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       <FirstModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </>
//   );
// };

//===============================================================//

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import { IconMenu2, IconX } from '@tabler/icons-react';
import { HiArrowUpRight } from 'react-icons/hi2';

import { cn } from '@/app/lib/utils';
import FirstModal from './FirstModal';

const navData = [
  { id: 'hero', title: 'Hero', href: '#hero' },
  { id: 'solution', title: 'Solution', href: '#solution' },
  { id: 'how-it-works', title: 'How it works', href: '#how-it-works' },
  { id: 'team', title: 'Team', href: '#team' },
  { id: 'pricing', title: 'Pricing', href: '#pricing' },
];

// --- Animation Variants ---
const menuVariants = {
  hidden: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

const logoVariants = {
  initial: { opacity: 0, y: -10, filter: 'blur(2px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: 10,
    filter: 'blur(4px)',
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const useScrollSpy = (navIds, options) => {
  const [active, setActive] = useState(navIds[0] || '');
  const [prevActive, setPrevActive] = useState(navIds[0] || '');
  const isClickScrolling = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (isClickScrolling.current) return;
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const newActiveId = entry.target.id;
          setActive((currentActiveId) => {
            if (newActiveId !== currentActiveId) {
              setPrevActive(currentActiveId);
            }
            return newActiveId;
          });
        }
      }
    }, options);

    const sections = navIds.map((id) => document.getElementById(id));
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [navIds, options]);

  const handleNavClick = useCallback(
    (navId, href) => {
      isClickScrolling.current = true;
      setPrevActive(active);
      setActive(navId);

      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

      // Reset the flag after smooth scroll is likely finished
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 1000);
    },
    [active]
  );

  return { active, prevActive, handleNavClick };
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroHeight, setHeroHeight] = useState(0);

  const { active, prevActive, handleNavClick } = useScrollSpy(
    navData.map((item) => item.id),
    { rootMargin: '-40% 0px -60% 0px' }
  );

  useEffect(() => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      setHeroHeight(heroSection.offsetHeight);
    }
  }, []);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (heroHeight > 0) {
      setIsScrolled(latest > heroHeight - 80);
    }
  });

  const getNavIndex = useCallback(
    (navId) => navData.findIndex(({ id }) => id === navId),
    []
  );
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const toggleMobileMenu = useCallback(
    () => setMobileMenuOpen((prev) => !prev),
    []
  );

  const handleMobileNavClick = useCallback(
    (navId, href) => {
      handleNavClick(navId, href);
      setMobileMenuOpen(false);
    },
    [handleNavClick]
  );

  return (
    <>
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className={cn(
          'fixed inset-x-0 top-4 z-50 mx-auto',
          isScrolled ? 'w-fit' : 'w-full max-w-7xl px-8'
        )}
      >
        {/* --- Desktop Navbar --- */}
        <div
          className={cn(
            'relative z-[60] mx-auto hidden flex-row items-center justify-between self-start rounded-lg bg-black/50 py-2 backdrop-blur-sm lg:flex'
          )}
        >
          <motion.div layout className='flex h-10 w-auto items-center px-4'>
            <AnimatePresence mode='popLayout' initial={false}>
              {isScrolled ? (
                <motion.img
                  key='icon'
                  variants={logoVariants}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  src='/image/logo/logophone.png'
                  alt='logo icon'
                  className='h-10'
                />
              ) : (
                <motion.img
                  key='full'
                  variants={logoVariants}
                  initial='initial'
                  animate='animate'
                  exit='exit'
                  src='/image/logo/logodesktop.png'
                  alt='full logo'
                  className='h-8'
                />
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div layout className='relative flex flex-row p-1'>
            <motion.div
              className='absolute inset-y-0 my-auto h-9 rounded-md bg-[#A63EE7]'
              animate={{ x: `${getNavIndex(active) * 100}%` }}
              initial={{ x: `${getNavIndex(prevActive) * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ width: `${100 / navData.length}%` }}
            />
            {navData.map((nav) => (
              <a
                key={nav.id}
                href={nav.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(nav.id, nav.href);
                }}
                className={cn(
                  'relative z-10 flex h-9 w-[110px] items-center justify-center text-center text-sm font-bold text-white/80 transition-colors duration-300',
                  active === nav.id && 'text-white'
                )}
              >
                {nav.title}
              </a>
            ))}
          </motion.div>

          <motion.div layout className='pl-2 pr-2'>
            <button
              onClick={handleOpenModal}
              className='flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#A63EE7] text-sm font-medium text-white'
            >
              <motion.div
                layout='position'
                className='flex items-center gap-2 px-4 py-3'
              >
                {!isScrolled && <span>Book a call</span>}
                <HiArrowUpRight />
              </motion.div>
            </button>
          </motion.div>
        </div>

        {/* --- Mobile Navbar --- */}
        <div
          className={cn(
            'relative z-50 mx-auto flex w-[95%] max-w-lg flex-col items-center justify-between rounded-lg bg-black/90 p-2 lg:hidden',
            isScrolled && 'backdrop-blur-sm'
          )}
        >
          <div className='flex h-12 w-full flex-row items-center justify-between px-4'>
            <div className='flex h-10 items-center'>
              <AnimatePresence mode='popLayout' initial={false}>
                {isScrolled ? (
                  <motion.img
                    key='icon-mobile'
                    variants={logoVariants}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    src='/image/logo/logophone.png'
                    alt='logo icon'
                    className='h-10'
                  />
                ) : (
                  <motion.img
                    key='full-mobile'
                    variants={logoVariants}
                    initial='initial'
                    animate='animate'
                    exit='exit'
                    src='/image/logo/logodesktop.png'
                    alt='full logo'
                    className='h-8'
                  />
                )}
              </AnimatePresence>
            </div>
            {/* ACCESSIBILITY FIX: Using a proper button for the toggle */}
            <button
              type='button'
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
              className='text-white'
            >
              {mobileMenuOpen ? <IconX /> : <IconMenu2 />}
            </button>
          </div>
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                variants={menuVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
                className='flex w-full flex-col items-start justify-start gap-4 px-2 py-4'
              >
                {navData.map((nav) => (
                  <a
                    key={nav.id}
                    href={nav.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileNavClick(nav.id, nav.href);
                    }}
                    className={cn(
                      'w-full rounded-lg px-3 py-3 text-base font-medium text-white/80 hover:bg-neutral-800',
                      active === nav.id && 'bg-[#A63EE7] text-white'
                    )}
                  >
                    {nav.title}
                  </a>
                ))}
                <button
                  onClick={handleOpenModal}
                  className='mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#A63EE7] px-3 py-3 text-base font-medium text-white'
                >
                  Book a Call <HiArrowUpRight />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <FirstModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};
