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
  const [heroHeight, setHeroHeight] = useState(0);

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

  const handleNavClick = (navId) => {
    isClickScrolling.current = true;
    setPrevActive(active);
    setActive(navId);

    setTouched(navId);
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    blurTimeoutRef.current = setTimeout(() => {
      setTouched(null);
    }, 500);
  };

  return (
    <div
      className={cn(
        'fixed inset-x-0 top-4 z-50 mx-auto transition-all duration-500',
        isScrolled ? 'max-w-fit px-4' : 'max-w-[1200px] px-8'
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
        {/* --- THIS IS THE UPDATED DESKTOP LOGO SECTION --- */}
        <div className='w-auto pr-4'>
          <div className='transition-transform duration-500 hover:animate-spin'>
            {isScrolled ? (
              <img
                src='/image/logo/logophone.png'
                alt='logo'
                className='h-10 w-full'
              />
            ) : (
              <img
                src='/image/logo/logodesktop.png'
                alt='logo'
                className='h-8 w-auto'
              />
            )}
          </div>
        </div>

        {/* --- Fluid Animation Section --- */}
        <div className='relative flex flex-row p-1'>
          <AnimatePresence initial={false}>
            <motion.div
              key={active}
              className='absolute inset-y-0 my-auto h-9 rounded-full bg-[#A63EE7]'
              initial={{ x: `${getNavIndex(prevActive) * 100}%` }}
              animate={{ x: `${getNavIndex(active) * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
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
                  touched === nav.id && 'blur-sm'
                )}
              >
                {nav.title}
              </span>
            </a>
          ))}
        </div>

        <div className='pl-4'>
          <Button text={'Book a call'} />
        </div>
      </div>

      {/* --- Mobile Navbar --- */}
      <div
        className={cn(
          'relative z-50 mx-auto flex w-full flex-col items-center justify-between rounded-2xl bg-black/90 p-2 lg:hidden',
          isScrolled && 'border border-white/15 backdrop-blur-sm'
        )}
      >
        <div className='flex w-full flex-row items-center justify-between px-4 gap-4'>
          <div className='transition-transform duration-500 hover:animate-spin'>
            {isScrolled ? (
              <img
                src='/image/logo/logophone.png'
                alt='logo'
                className='h-8 w-full'
              />
            ) : (
              <img
                src='/image/logo/logodesktop.png'
                alt='logo'
                className='h-8 w-auto'
              />
            )}
          </div>
          {/* --- END OF UPDATED SECTION --- */}

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
