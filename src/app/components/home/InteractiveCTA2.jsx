import React, { useEffect, useState, useRef } from "react";

export const InteractiveCTA2 = () => {
  const [isInSection, setIsInSection] = useState(false);
  const sectionRef = useRef(null);

  const scrollToHero = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
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
    <div ref={sectionRef} className="relative w-full lg:pb-20 md:pb-16 sm:pb-12 pb-8">
      {isInSection ? (
        <div className="max-w-7xl mx-auto flex justify-center transition-all duration-500">
          <button
            onClick={scrollToHero}
            className="flex items-center justify-center w-16 h-16 rounded-full
                       bg-[#A63EE7] text-white font-medium shadow-lg
                       transform hover:scale-110 transition-all duration-300"
          >
            <svg
              className="w-6 h-6 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </button>
        </div>
      ) : (
        <button
          onClick={scrollToHero}
          className="fixed bottom-6 right-6 flex items-center justify-center w-16 h-16 rounded-full
                     bg-[#A63EE7] text-white font-medium shadow-lg
                     transform hover:scale-110 transition-all duration-300 z-50"
        >
          <svg
            className="w-6 h-6 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
