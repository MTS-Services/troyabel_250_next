'use client';
import { useState } from 'react';
import FirstModal from './home/FirstModal';
import InfoModal from './home/InfoModal';
import SuccessModal from './home/SuccessModal';

const OpenAppointmentButton = () => {
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);
  
  const closeAll = () => {
    setFirstOpen(false);
    setSecondOpen(false);
    setThirdOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setFirstOpen(true)}
        className='px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition'
      >
        Book a Free Discovery Call
      </button>

      <div className='z-50 fixed mt-4'>
        <FirstModal
          isOpen={firstOpen}
          onClose={() => setFirstOpen(false)}
          onOpenSecond={() => setSecondOpen(true)}
        />
        <InfoModal
          isOpen={secondOpen}
          onClose={() => setSecondOpen(false)}
          onOpenThird={() => setThirdOpen(true)}
        />
        <SuccessModal isOpen={thirdOpen} onCloseAll={closeAll} />
      </div>
    </>
  );
};

export default OpenAppointmentButton;
