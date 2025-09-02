'use client';
import React, { useState } from 'react';
import { FaRegClock, FaCalendarAlt, FaGlobe } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';

const InfoModal = ({ isOpen, onClose, onOpenThird, formData, setFormData }) => {
  if (!isOpen) return null;
  // Form state

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = () => {
    console.log('Form Data:', formData);
    onOpenThird();
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6'
      onWheel={(e) => e.stopPropagation()}
    >
      <div className='relative bg-white w-full max-w-[1180px] h-full sm:h-[800px] flex flex-col rounded-2xl shadow-lg'>
        {/* Header */}
        <div className='bg-[#A63EE7] text-white px-4 sm:px-6 h-[70px] sm:h-[80px] flex items-center justify-between flex-shrink-0'>
          <h2 className='text-xl sm:text-3xl font-semibold'>
            Consultation (45-minutes)
          </h2>
        </div>

        {/* Middle Scrollable Section */}
        <div className='flex-1 flex flex-col md:flex-row overflow-hidden'>
          {/* Left Section */}
          <div className='md:w-[460px] w-full border-b md:border-b-0 md:border-r border-gray-200 flex flex-col items-center justify-center p-6 sm:p-8 text-center flex-shrink-0'>
            <Image
              src='/image/testimonial/Troy2025headshot.JPG'
              alt='Doctor'
              width={80}
              height={80}
              className='w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4'
            />
            <h2 className='text-lg sm:text-xl font-semibold text-black mb-2'>
              Dr. Troy Abel
            </h2>
            <hr className='w-full border-t border-gray-200 mb-4 sm:mb-6' />
            <div className='flex flex-col gap-4 sm:gap-5 text-[#6D6D6D] text-sm sm:text-base items-start w-full'>
              <div className='flex items-center gap-2 sm:gap-3'>
                <FaCalendarAlt className='text-lg' />
                <span className='text-sm sm:text-lg'>
                  Wednesday, September 3, 2025, 2:00 am
                </span>
              </div>
              <div className='flex items-center gap-2 sm:gap-3'>
                <FaRegClock className='text-lg' />
                <span className='text-sm sm:text-lg'>45 mins</span>
              </div>
              <div className='flex items-center gap-2 sm:gap-3'>
                <FcGoogle className='text-lg' />
                <span className='text-sm sm:text-lg'>Google Meet</span>
              </div>
              <div className='flex items-center gap-2 sm:gap-3'>
                <FaGlobe className='text-lg' />
                <span className='text-sm sm:text-lg'>Asia/Kathmandu</span>
              </div>
            </div>
          </div>

          {/* Right Section (Scrollable Middle) */}
          <div className='flex-1 flex flex-col overflow-hidden'>
            <div className='flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6'>
              {/* Name */}
              <div>
                <label className='block text-[#6D6D6D] font-semibold text-[16px] sm:text-[18px] mb-2'>
                  Your name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-full h-[45px] sm:h-[50px] text-black border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none'
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className='block text-[#6D6D6D] font-semibold text-[16px] sm:text-[18px] mb-2'>
                  Email address <span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full h-[45px] sm:h-[50px] text-black border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none'
                  required
                />
              </div>

              {/* Goal */}
              <div>
                <label className='block text-[#6D6D6D] font-semibold text-[16px] sm:text-[18px] mb-2'>
                  What's the #1 thing you're hoping to get out of our
                  conversation?
                </label>
                <textarea
                  name='goal'
                  value={formData.goal}
                  onChange={handleChange}
                  rows='3'
                  className='w-full text-black border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none'
                ></textarea>
              </div>

              {/* Interest */}
              <div>
                <label className='block text-[#6D6D6D] font-semibold text-[16px] sm:text-[18px] mb-2'>
                  Which area of UX are you most interested in? (e.g., UX/UI
                  Design, UX Research, UX Strategy, I'm still figuring it out!)
                </label>
                <textarea
                  name='interest'
                  value={formData.interest}
                  onChange={handleChange}
                  rows='3'
                  className='w-full text-black border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none'
                ></textarea>
              </div>
            </div>

            {/* Footer */}
            <div className='bg-white border-t border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 flex-shrink-0'>
              <p className='text-sm sm:text-md text-gray-500 text-center sm:text-left'>
                By proceeding, you agree to our{' '}
                <span className='cursor-pointer text-purple-600 underline'>
                  Terms
                </span>{' '}
                and{' '}
                <span className='cursor-pointer text-purple-600 underline'>
                  Privacy Policy
                </span>
                .
              </p>
              <div className='flex items-center gap-4 sm:gap-6'>
                <button
                  onClick={onClose}
                  type='button'
                  className='px-6 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100'
                >
                  Back
                </button>
                <button
                  type='button'
                  onClick={handleConfirm}
                  className='px-6 py-2 rounded-lg bg-[#A63EE7] text-white hover:bg-purple-800'
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
