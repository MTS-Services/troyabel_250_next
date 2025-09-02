import React from 'react';
import { BsDot } from 'react-icons/bs';
import { FiArrowRight } from 'react-icons/fi';

const HoverButtonTwo = () => {
  return (
    <button
      className='relative flex items-center justify-center gap-2 px-6 py-2 rounded-full
                 border border-[#A63EE7] bg-[#A63EE7] text-white font-medium overflow-hidden
                 transition-all duration-500 ease-out group'
    >
      <span
        className='absolute inset-0 bg-black rounded-full scale-x-0 origin-left
                   transition-all duration-700 ease-in-out group-hover:scale-x-100
                   transform-gpu'
      ></span>
      <span
        className='absolute inset-0 bg-gradient-to-r from-black/80 to-black rounded-full
                   scale-x-0 origin-left transition-all duration-800 ease-out
                   group-hover:scale-x-100 transform-gpu'
      ></span>

      <span className='relative flex items-center gap-2 z-10'>
        <span
          className='flex items-center justify-center transition-all duration-500 ease-out
                     transform group-hover:-translate-x-4 group-hover:opacity-0'
        >
          <BsDot size={20} />
        </span>
        <span className='transition-all duration-500 ease-out group-hover:text-white'>
          CTA BOOKING
        </span>
        <span
          className='flex items-center justify-center transition-all duration-500 ease-out
                     transform opacity-0 translate-x-4 group-hover:translate-x-0
                     group-hover:opacity-100 group-hover:text-white'
        >
          <FiArrowRight size={18} />
        </span>
      </span>
    </button>
  );
};

export default HoverButtonTwo;
