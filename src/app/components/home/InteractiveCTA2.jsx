import React, { useEffect, useState, useRef } from 'react';

export const InteractiveCTA2 = () => {
  const [isInSection, setIsInSection] = useState(false);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef(null);

  const scrollToHero = () => {
    const heroSection = document.getElementById('hero');
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInSection(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <>
      {/* Section container - always present for intersection observer */}
      <div
        ref={sectionRef}
        className='relative w-full max-w-7xl mx-auto px-4 lg:pb-20 md:pb-16 sm:pb-12 pb-8'
      >
        {/* In-section button with fade and scale animation */}
        <div
          className={`flex justify-center transition-all duration-700 ease-in-out ${
            isInSection && mounted
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
          }`}
        >
          <button
            onClick={scrollToHero}
            className='group flex items-center justify-center md:w-14 sm:w-12 w-10 md:h-14 sm:h-12 h-10 rounded-full
                     bg-gradient-to-r from-[#A63EE7] to-[#8B2FC7] text-white font-medium 
                     shadow-xl shadow-purple-500/25
                     transform hover:scale-125 hover:shadow-2xl hover:shadow-purple-500/40
                     transition-all duration-300 ease-out
                     hover:from-[#B84FF0] hover:to-[#9C40D0]
                     active:scale-105'
          >
            <svg
              className='w-6 h-6 animate-bounce group-hover:animate-pulse transition-all duration-200'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 10l7-7m0 0l7 7m-7-7v18'
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Fixed position button with smooth position animation */}
      <div
        className={`fixed bottom-6 inset-x-0 z-50 px-4 xl:mr-4 lg:mr-36 md:mr-44 mr-[98px]
                   transition-all duration-700 ease-in-out ${
                     !isInSection && mounted
                       ? 'opacity-100 translate-y-0'
                       : 'opacity-0 translate-y-8 pointer-events-none'
                   }`}
      >
        <div className='w-full max-w-7xl mx-auto flex justify-end'>
          <button
            onClick={scrollToHero}
            className='group flex items-center justify-center md:w-14 sm:w-12 w-10 md:h-14 sm:h-12 h-10 rounded-full
                     bg-gradient-to-r from-[#A63EE7] to-[#8B2FC7] text-white font-medium 
                     shadow-xl shadow-purple-500/25
                     transform hover:scale-125 hover:shadow-2xl hover:shadow-purple-500/40
                     transition-all duration-300 ease-out
                     hover:from-[#B84FF0] hover:to-[#9C40D0]
                     active:scale-105
                     backdrop-blur-sm'
          >
            <svg
              className='w-6 h-6 animate-bounce group-hover:animate-pulse transition-all duration-200'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M5 10l7-7m0 0l7 7m-7-7v18'
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};
