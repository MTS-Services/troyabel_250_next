'use client';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import { FaArrowLeft } from 'react-icons/fa';

const FirstModal = ({ isOpen, onClose, onOpenSecond }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null); // <-- new
  const [timezone, setTimezone] = useState(
    '(GMT+06:00) Bangladesh Standard Time'
  );
  const [open, setOpen] = useState(false);

  const times = [
    '10:30pm',
    '10:45pm',
    '11:00pm',
    '11:15pm',
    '11:30pm',
    '11:45pm',
    '12:00am',
    '12:15am',
    '12:30am',
    '12:45am',
    '01:00am',
    '01:15am',
    '01:30am',
    '01:45am',
    '02:00am',
    '02:15am',
  ];

  const timezones = [
    '(GMT+05:30) India Standard Time',
    '(GMT+06:00) Bangladesh Standard Time',
    '(GMT+07:00) Thailand Standard Time',
    '(GMT+08:00) China Standard Time',
    '(GMT+09:00) Japan Standard Time',
  ];

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTimeClick = (time) => {
    setSelectedTime(time);
    console.log(
      'Selected Date:',
      `${currentYear}-${currentMonth + 1}-${selectedDate}`
    );
    console.log('Selected Time:', time);
    if (onOpenSecond) onOpenSecond();
  };

  return (
    <div
      className='fixed mt-14 inset-0 z-50 flex justify-center items-start pt-10 sm:pt-16 bg-black/60'
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        className='bg-gray-950 border-2 border-white/15 text-white rounded-2xl 
               p-4 sm:p-6 shadow-xl w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl
               max-h-[90vh] overflow-y-auto relative'
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 text-gray-300 hover:text-white text-xl sm:text-2xl font-bold'
        >
          ✕
        </button>

        {/* Header */}
        <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-4'>
            <Image
              src='/image/testimonial/Troy2025headshot.JPG'
              alt='Doctor'
              width={80}
              height={80}
              className='w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-2 sm:mb-0'
            />
            <div className='text-center sm:text-left'>
              <h2 className='text-lg sm:text-xl font-bold text-[#ACADBC]'>
                Dr. Troy Abel
              </h2>
              <p className='text-[#6D6D6D] text-sm sm:text-base'>
                Founder and Lead UX Coach
              </p>
            </div>
          </div>
          <div className='w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center text-3xl sm:text-5xl font-bold mt-4 sm:mt-0 lg:mr-16 md:mr-14 sm:mr-12 mr-10'>
            <Image
              src='/image/logo/logophone.png'
              alt='Logo'
              width={80}
              height={80}
              className='w-20 h-20 sm:w-24 sm:h-24 rounded-full'
            />
          </div>
        </div>

        {/* Meeting Type */}
        <div className='mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 px-2 sm:px-6'>
          <section className='bg-transparent border border-[#A63EE7] px-4 py-2 rounded-full text-center w-full sm:w-[300px] md:w-[400px]'>
            <h2 className='text-sm sm:text-base text-[#ACADBC] text-start'>
              Consultation (45-minutes)
            </h2>
          </section>
          <div className='text-[#ACADBC] text-base sm:text-lg mt-2 sm:mt-0 lg:mr-16 md:mr-14 sm:mr-12 mr-10'>
            ⏱ 45 mins
          </div>
        </div>

        {/* Calendar and Time Slots */}
        <div className='grid gap-6 mt-8 sm:gap-8 sm:grid-cols-1 md:grid-cols-3'>
          {/* Calendar */}
          <div className='md:col-span-2 overflow-y-auto max-h-[400px]'>
            <div className='flex justify-between items-center mb-4'>
              <button
                className='p-2 rounded-full hover:bg-gray-800'
                onClick={handlePrevMonth}
              >
                <ChevronLeft />
              </button>
              <h3 className='text-base sm:text-lg font-semibold text-center md:text-left'>
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <button
                className='p-2 rounded-full hover:bg-gray-800'
                onClick={handleNextMonth}
              >
                <ChevronRight />
              </button>
            </div>

            {/* Weekdays */}
            <div className='grid grid-cols-7 gap-1 sm:gap-2 text-center text-xs sm:text-sm font-medium text-gray-400 mb-2'>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>

            {/* Days */}
            <div className='grid grid-cols-7 gap-1 sm:gap-2'>
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                (day) => {
                  const isToday =
                    day === today.getDate() &&
                    currentMonth === today.getMonth() &&
                    currentYear === today.getFullYear();
                  const isSelected = selectedDate === day;
                  const highlight = isSelected || (!selectedDate && isToday);
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg text-xs sm:text-sm transition ${
                        highlight
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/30 hover:bg-gray-700'
                      }`}
                    >
                      {day}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* Time Slots */}
          <div className='flex flex-col items-center md:items-start'>
            <h4 className='text-base sm:text-lg font-semibold mb-4'>Monday</h4>
            <div
              className='flex flex-col w-full max-h-72 overflow-y-auto gap-2 sm:grid sm:grid-cols-2 md:flex md:flex-col'
              onWheel={(e) => e.stopPropagation()}
            >
              {times.map((time) => (
                <button
                  key={time}
                  onClick={() => handleTimeClick(time)}
                  className='w-full sm:w-auto h-20 sm:h-24 py-3 rounded-lg border border-purple-600 
                         hover:bg-purple-600 hover:text-white transition text-sm sm:text-base'
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className='relative mt-10 w-full sm:w-1/2'>
          <h1
            className='inline-flex cursor-pointer items-center justify-between w-full text-[#ACADBC]'
            onClick={() => setOpen(!open)}
          >
            🌍 {timezone}
            {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </h1>

          {open && (
            <div className='absolute top-full mt-2 w-full bg-white border border-gray-600 rounded-lg max-h-40 overflow-y-auto z-50'>
              {timezones.map((tz, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setTimezone(tz);
                    setOpen(false);
                  }}
                  className='px-3 py-2 text-neutral-950 hover:bg-[#ACADBC] cursor-pointer text-sm'
                >
                  {tz}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FirstModal;
