import React from "react";

export const InteractiveCTA2 = () => {
  const scrollToHero = () => {
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      heroSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex justify-center lg:mb-8 md:mb-6 sm:mb-4 mb-3">
      <div className="bottom-6">
        <button
          onClick={scrollToHero}
          className="flex items-center justify-center w-16 h-16 rounded-full
                     bg-[#A63EE7] text-white font-medium shadow-lg
                     transform hover:scale-110 transition-all duration-300"
        >
          {/* Arrow SVG */}
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
    </div>
  );
};
