"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "./Modal";

const FirstModal = ({ isOpen, onClose }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [timezone, setTimezone] = useState(
    "(GMT+06:00) Bangladesh Standard Time"
  );
  const [open, setOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  const modalHandler = () => setIsTimeModalOpen(true);

  const timezones = [
    "(GMT+05:30) India Standard Time",
    "(GMT+06:00) Bangladesh Standard Time",
    "(GMT+07:00) Thailand Standard Time",
    "(GMT+08:00) China Standard Time",
    "(GMT+09:00) Japan Standard Time",
  ];

  const times = [
    "10:30pm",
    "10:45pm",
    "11:00pm",
    "11:15pm",
    "11:30pm",
    "11:45pm",
    "12:00am",
    "12:15am",
    "12:30am",
    "12:45am",
    "01:00am",
    "01:15am",
    "01:30am",
    "01:45am",
    "02:00am",
    "02:15am",
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-start pt-10 sm:pt-16 overflow-auto">
      <div
        className="bg-gray-950 border-2 border-white/15 text-white rounded-2xl p-4 sm:p-6 shadow-xl 
               w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl 
               min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[800px] relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-xl font-bold"
        >
          ✕
        </button>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/100"
              alt="profile"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg"
            />
            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-bold">Dr. Troy Abel</h2>
              <p className="text-gray-400 text-sm">Founder and Lead UX Coach</p>
            </div>
          </div>
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#A63EE7] text-black flex items-center justify-center text-3xl sm:text-5xl font-bold">
            drt
          </div>
        </div>

        {/* Meeting Type */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 px-2 sm:px-6">
          <section className="bg-transparent border border-[#A63EE7] px-4 py-2 rounded-full text-center w-full sm:w-auto">
            <h2 className="text-sm sm:text-base">Consultation (45-minutes)</h2>
          </section>
          <div className="text-gray-300 text-base sm:text-lg">⏱ 45 mins</div>
        </div>

        <div className="grid gap-8 mt-8 sm:gap-10 sm:grid-cols-1 md:grid-cols-3">
          {/* Calendar - 2/3 width on md/lg */}
          <div className="md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <button
                className="p-2 rounded-full hover:bg-gray-800"
                onClick={handlePrevMonth}
              >
                <ChevronLeft />
              </button>
              <h3 className="text-base sm:text-lg font-semibold">
                {monthNames[currentMonth]} {currentYear}
              </h3>
              <button
                className="p-2 rounded-full hover:bg-gray-800"
                onClick={handleNextMonth}
              >
                <ChevronRight />
              </button>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs sm:text-sm font-medium text-gray-400 mb-2">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Days */}
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
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
                      className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg text-xs sm:text-sm
                  ${
                    highlight
                      ? "bg-purple-600 text-white"
                      : "bg-white/15 hover:bg-gray-700"
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
          <div className="flex flex-col items-center">
            <h4 className="text-base sm:text-lg font-semibold mb-4">Monday</h4>
            <div className="grid gap-3 w-full sm:grid-cols-2 md:flex md:flex-col md:h-72 md:overflow-y-auto">
              {times.map((time) => (
                <button
                  key={time}
                  onClick={modalHandler}
                  className="w-full sm:w-auto h-20 sm:h-24 py-3 rounded-lg border border-purple-600 
                         hover:bg-purple-600 hover:text-white transition text-sm sm:text-base"
                >
                  {time}
                </button>
              ))}
              <Modal
                isOpen={isTimeModalOpen}
                setIsEditModalOpen={setIsTimeModalOpen}
              />
            </div>
          </div>
        </div>

        {/* Timezone */}
        <div className="relative mt-6 w-full sm:w-72">
          <div
            className="flex items-center justify-between gap-2 text-sm text-gray-400 border border-gray-600 rounded-lg px-3 py-2 cursor-pointer hover:bg-gray-800"
            onClick={() => setOpen(!open)}
          >
            <span>🌍 {timezone}</span>
            <span className="text-gray-300">{open ? "▲" : "▼"}</span>
          </div>

          {open && (
            <div className="absolute bottom-full mb-2 w-full bg-white border border-gray-600 rounded-lg max-h-40 overflow-y-auto z-10">
              {timezones.map((tz, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setTimezone(tz);
                    setOpen(false);
                  }}
                  className="px-3 py-2 text-neutral-950 hover:bg-purple-600 cursor-pointer text-sm"
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
