'use client';
import React, { useState } from 'react';
import { FaRegClock, FaCalendarAlt, FaGlobe } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Image from 'next/image';

const InfoModal = ({ isOpen, onClose, onOpenThird, formData, setFormData }) => {
  if (!isOpen) return null;

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error when typing
    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

const validateForm = () => {
  const newErrors = {};
  
  if (!formData.name?.trim()) newErrors.name = 'This field is required';
  
  if (!formData.email?.trim()) {
    newErrors.email = 'This field is required';
  } else {
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
  }

  if (!formData.goal?.trim()) newErrors.goal = 'This field is required';
  if (!formData.interest?.trim()) newErrors.interest = 'This field is required';

  return newErrors;
};


  const handleConfirm = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // stop here if errors
    }
    console.log('Form Data:', formData);
    onOpenThird();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black sm:p-6 mt-12  "
      onWheel={(e) => e.stopPropagation()}
    >
      <div className="relative bg-white w-full max-w-[1180px] max-h-[90vh] flex flex-col lg:rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-[#A63EE7] text-white px-4 sm:px-6 h-[70px] sm:h-[80px] flex items-center justify-between flex-shrink-0 ">
          <h2 className="text-xl sm:text-3xl font-semibold">
            Consultation (45-minutes)
          </h2>
        </div>

        {/* Middle Scrollable Section */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Left Section */}
          <div className="md:w-[460px] w-full border-b md:border-b-0 md:border-r border-gray-200 flex flex-col items-center justify-center p-6 sm:p-8 flex-shrink-0">
            {/* Top Row: Image + Name */}
            <div className="flex items-center gap-4 mb-4 w-full">
              <Image
                src="/image/testimonial/Troy2025headshot.JPG"
                alt="Doctor"
                width={50}
                height={50}
                className="rounded-full"
              />
              <h2 className="text-lg sm:text-xl font-semibold text-black">
                Dr. Troy Abel
              </h2>
            </div>

            {/* Divider */}
            <hr className="w-full border-t border-gray-200 mb-4 sm:mb-6" />

            {/* Details */}
            <div className="flex flex-col gap-4 sm:gap-5 text-[#6D6D6D] text-sm sm:text-base items-start w-full">
              <div className="flex items-center gap-2 sm:gap-3">
                <FaCalendarAlt className="text-lg" />
                <span className="text-sm sm:text-lg">
                  Wednesday, September 3, 2025, 2:00 am
                </span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <FaRegClock className="text-lg" />
                <span className="text-sm sm:text-lg">45 mins</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <FcGoogle className="text-lg" />
                <span className="text-sm sm:text-lg">Google Meet</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <FaGlobe className="text-lg" />
                <span className="text-sm sm:text-lg">Asia/Kathmandu</span>
              </div>
            </div>
          </div>

          {/* Right Section (Form) */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Name */}
              <div>
                <label className="block text-[#6D6D6D] font-semibold text-[16px] sm:text-[18px] mb-2">
                  Your name <span className="text-red-500 text-lg">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full h-[45px] sm:h-[50px] text-black border ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none`}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-[#6D6D6D] font-semibold text-[16px] sm:text-[18px] mb-2">
                  Email address <span className="text-red-500 text-lg">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full h-[45px] sm:h-[50px] text-black border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none`}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Goal */}
              <div>
                <label className="block text-[#6D6D6D] font-semibold text-[16px] sm:text-[18px] mb-2">
                  What's the #1 thing you're hoping to get out of our
                  conversation?
                </label>
                <textarea
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full text-black border ${
                    errors.goal ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none`}
                ></textarea>
                {errors.goal && (
                  <p className="text-red-500 text-sm mt-1">{errors.goal}</p>
                )}
              </div>

              {/* Interest */}
              <div>
                <label className="block text-[#6D6D6D] font-semibold text-[16px] sm:text-[18px] mb-2">
                  Which area of UX are you most interested in?
                </label>
                <textarea
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  rows="3"
                  className={`w-full text-black border ${
                    errors.interest ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none`}
                ></textarea>
                {errors.interest && (
                  <p className="text-red-500 text-sm mt-1">{errors.interest}</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 flex-shrink-0 rounded-b-lg">
              <p className="text-sm sm:text-md text-gray-500 text-center sm:text-left">
                By proceeding, you agree to our{' '}
                <span className="cursor-pointer text-purple-600 underline">
                  Terms
                </span>{' '}
                and{' '}
                <span className="cursor-pointer text-purple-600 underline">
                  Privacy Policy
                </span>
                .
              </p>
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={onClose}
                  type="button"
                  className="px-6 py-2 border border-gray-400 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleConfirm}
                  className="px-6 py-2 rounded-lg bg-[#A63EE7] text-white hover:bg-purple-800"
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
