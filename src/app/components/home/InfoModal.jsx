'use client';
import React, { useState } from 'react';
import { FaRegClock, FaCalendarAlt, FaGlobe } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';

const InfoModal = ({ isOpen, onClose, onOpenThird }) => {

  if (!isOpen) return null;
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goal: '',
    interest: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = () => {
    console.log('Form Data:', formData); // <-- Here you get all input values
    setIsOpen2(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center  bg-black/50'
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        className='relative bg-white w-[1180px] h-[800px] flex flex-col rounded-2xl shadow-lg overflow-hidden'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='bg-[#A63EE7] text-white px-6 h-[80px] py-4 flex items-center justify-between'>
          <h2 className='text-3xl font-semibold'>Consultation (45-minutes)</h2>
        </div>

        {/* Body */}
        <div className='flex flex-1 overflow-hidden'>
          {/* Left Section */}
          <div className='w-[460px] border-r mt-16 mb-20 border-gray-200 flex flex-col items-center justify-center p-8 text-center'>
            <Image
              src='/image/testimonial/Troy2025headshot.JPG'
              alt='Doctor'
              width={80}
              height={80}
              className='w-20 h-20 rounded-full mb-4'
            />
            <h2 className='text-xl font-semibold text-black mb-2'>
              Dr. Troy Abel
            </h2>
            <hr className='w-full border-t border-gray-200 mb-6' />
            <div className='flex flex-col gap-5 text-[#6D6D6D] text-sm items-start w-full'>
              <div className='flex items-center gap-3'>
                <FaCalendarAlt className='text-lg' />
                <span className='text-lg'>
                  Wednesday, September 3, 2025, 2:00 am
                </span>
              </div>
              <div className='flex items-center gap-3'>
                <FaRegClock className='text-lg' />
                <span className='text-lg'>45 mins</span>
              </div>
              <div className='flex items-center gap-3'>
                <FcGoogle className='text-lg' />
                <span className='text-lg'>Google Meet</span>
              </div>
              <div className='flex items-center gap-3'>
                <FaGlobe className='text-lg' />
                <span className='text-lg'>Asia/Kathmandu</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className='flex-1 flex flex-col'>
            <div className='flex-1 justify-center items-center overflow-y-auto p-6 space-y-6'>
              {/* Name */}
              <div>
                <label className='block text-[#6D6D6D] font-semibold mt-4 text-[18px] mb-6'>
                  Your name <span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  className='w-[600px] h-[50px] mb-2 text-black border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none'
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className='block mt-2 text-[#6D6D6D] font-semibold text-[18px] mb-4'>
                  Email address <span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-[600px] h-[50px] mt-2 mb-2 text-black border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none'
                  required
                />
              </div>

              {/* Goal */}
              <div>
                <label className='block mt-2 text-[#6D6D6D] font-semibold text-[18px] mb-4'>
                  What's the #1 thing you're hoping to get out of our
                  conversation?
                </label>
                <textarea
                  name='goal'
                  value={formData.goal}
                  onChange={handleChange}
                  rows='3'
                  className='w-[600px] h-[100px] text-black mt-2 border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none'
                ></textarea>
              </div>

              {/* Interest */}
              <div>
                <label className='block text-[#6D6D6D] font-semibold text-[18px] mb-4'>
                  Which area of UX are you most interested in? (e.g., UX/UI
                  Design, UX Research, UX Strategy, I'm still figuring it out!)
                </label>
                <textarea
                  name='interest'
                  value={formData.interest}
                  onChange={handleChange}
                  rows='3'
                  className='w-[600px] h-[100px] border text-black border-gray-300 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-purple-500 focus:outline-none'
                ></textarea>
              </div>
            </div>

            {/* Footer */}
            <div className='flex justify-between items-center bg-white'>
              <p className='text-md text-gray-500 mt-4 px-6'>
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
            </div>

            <div className='p-4 flex justify-end items-center gap-6 mr-12 bg-white'>
              <button
                onClick={onClose}
                type='button'
                className='px-6 py-2 cursor-pointer border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100'
              >
                Back
              </button>
              <button
                type='button'
                onClick={onOpenThird}
                className='px-6 py-2 cursor-pointer rounded-lg bg-purple-700 text-white hover:bg-purple-800'
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
