'use client';
import { useState } from 'react';
import FirstModal from './home/FirstModal';

const OpenAppointmentButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className='px-6 py-3 bg-[#A63EE7]  text-white rounded-lg hover:bg-[#A63EE9]  transition cursor-pointer'
      >
        Book a Free Discovery Call
      </button>

      <FirstModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default OpenAppointmentButton;
