import React from "react";
import { BsDot } from "react-icons/bs";
import { FiArrowUp } from "react-icons/fi";

const BackToTopButton = () => {
  // Scroll to top function
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={backToTop}
        className="relative flex items-center justify-center gap-2 px-6 py-2 rounded-full
                   border border-[#A63EE7] bg-[#A63EE7] text-white font-medium overflow-hidden
                   transition-all duration-500 ease-out group"
      >
        {/* Background hover effects */}
        <span className="absolute inset-0 bg-black rounded-full scale-x-0 origin-left
                         transition-all duration-700 ease-in-out group-hover:scale-x-100
                         transform-gpu"></span>
        <span className="absolute inset-0 bg-gradient-to-r from-black/80 to-black rounded-full
                         scale-x-0 origin-left transition-all duration-800 ease-out
                         group-hover:scale-x-100 transform-gpu"></span>

        {/* Content */}
        <span className="relative flex items-center gap-2 z-10">
          <span className="flex items-center justify-center transition-all duration-500 ease-out
                           transform group-hover:-translate-x-4 group-hover:opacity-0">
            <BsDot size={20} />
          </span>
          <span className="transition-all duration-500 ease-out group-hover:text-white">
            Back to Top
          </span>
          <span className="flex items-center justify-center transition-all duration-500 ease-out
                           transform opacity-0 translate-x-4 group-hover:translate-x-0
                           group-hover:opacity-100 group-hover:text-white">
            <FiArrowUp size={18} />
          </span>
        </span>
      </button>
    </div>
  );
};

export default BackToTopButton;
