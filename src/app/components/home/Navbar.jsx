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
const logoVariants = {
  initial: { opacity: 0, y: -10, filter: 'blur(4px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: 10,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

// --- NEW: Animation variant for the mobile dropdown menu ---
const mobileMenuVariant = {
  hidden: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

// --- Custom Hooks (No changes needed here) ---
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
      setTimeout(() => {
        isClickScrolling.current = false;
      }, 1000);
    },
    [active]
  );

  return { active, prevActive, handleNavClick };
};

// --- Main Navbar Component ---
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

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const getNavIndex = useCallback(
    (navId) => navData.findIndex(({ id }) => id === navId),
    []
  );
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
  const handleOpenModal = useCallback(() => {
    setMobileMenuOpen(false);
    setIsModalOpen(true);
  }, []);
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
      {/* --- Desktop Navbar (Hidden on mobile) --- */}
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        className={cn(
          'fixed inset-x-0 top-4 z-50 mx-auto hidden lg:block',
          isScrolled ? 'w-fit' : 'w-full max-w-7xl px-8'
        )}
      >
        <div className='relative z-[60] mx-auto flex flex-row items-center justify-between self-start rounded-lg bg-black/50 py-2 backdrop-blur-sm'>
          {/* Desktop Logo */}
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

          {/* Desktop Nav Links */}
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

          {/* Desktop "Book a call" button */}
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
      </motion.div>

      {/* --- Mobile Navbar (FIXED & ANIMATED) --- */}
      <div
        className={cn(
          'fixed inset-x-0 top-0 z-50 max-w-7xl px-4 pt-4 block lg:hidden'
        )}
      >
        <div
          className={cn(
            'relative mx-auto w-full rounded-lg bg-black/90',
            isScrolled && 'backdrop-blur-sm'
          )}
        >
          <div className='flex h-16 w-full flex-row items-center justify-between px-4'>
            {/* Mobile Logo */}
            <div className='flex h-10 items-center'>
              <img
                src={
                  isScrolled
                    ? '/image/logo/logodesktop.png'
                    : '/image/logo/logodesktop.png'
                }
                alt={isScrolled ? 'logo icon' : 'full logo'}
                className={cn(
                  'transition-all duration-300',
                  isScrolled ? 'h-10' : 'h-8'
                )}
              />
            </div>
            {/* Mobile Menu Toggle Button */}
            <button
              type='button'
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              onClick={toggleMobileMenu}
              className='text-white z-20'
            >
              {mobileMenuOpen ? <IconX /> : <IconMenu2 />}
            </button>
          </div>

          {/* --- FIX: Mobile Menu Dropdown with Animation --- */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                variants={mobileMenuVariant}
                initial='hidden'
                animate='visible'
                exit='hidden'
                className='flex w-full flex-col items-start justify-start gap-4 px-4 pb-6 pt-2'
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
                      'w-auto rounded-lg px-3 py-3 text-base font-medium text-white/80 hover:bg-neutral-800',
                      active === nav.id && 'bg-[#A63EE7] text-white'
                    )}
                  >
                    {nav.title}
                  </a>
                ))}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className='mt-4 flex w-full items-center justify-center gap-2 bg-[#A63EE7] rounded-lg px-3 py-3 text-base font-medium text-white'
                >
                  Book a Call <HiArrowUpRight />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <FirstModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  );
};
