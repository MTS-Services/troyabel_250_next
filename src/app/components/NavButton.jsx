'use client';
import { useState } from 'react';
import FirstModal from './home/FirstModal';
import InfoModal from './home/InfoModal';
import SuccessModal from './home/SuccessModal';
import { HiArrowUpRight } from 'react-icons/hi2';
import { motion } from 'framer-motion';

const NavButton = () => {
    const [firstOpen, setFirstOpen] = useState(false);
      const [secondOpen, setSecondOpen] = useState(false);
      const [thirdOpen, setThirdOpen] = useState(false);
       
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        goal: '',
        interest: '',
      });
      const [time,setTime] = useState({
        date:'',
        time:'',
        day:''
      }); // To store selected date and time
    
      const closeAll = () => {
        setFirstOpen(false);
        setSecondOpen(false);
        setThirdOpen(false);
         setFormData({
        name: '',
        email: '',
        goal: '',
        interest: '',
      }); 
      };
       const reschedule = () => {
        setSecondOpen(false);
        setThirdOpen(false);
        setFirstOpen(true);
        console.log('Reschedule clicked');
      };
     
      
  return (
    <>
    <motion.div layout className='pl-2 pr-2'>
            <button
               onClick={() => setFirstOpen(true)}
              className='flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#A63EE7] text-sm font-medium text-white'
            >
              <motion.div
                layout='position'
                className='flex items-center gap-2 px-4 py-3'
              >
                {!isScrolled && <span>Book a call</span>}
                <HiArrowUpRight />
              </motion.div>
            </button>
          </motion.div>
          <div className='z-50 fixed mt-4'>
        <FirstModal
        time={time}
        setTime={setTime}
         
          isOpen={firstOpen}
          onClose={() => setFirstOpen(false)}
          onOpenSecond={() => setSecondOpen(true)}
        />
        <InfoModal
          isOpen={secondOpen}
          onClose={() => setSecondOpen(false)}
          onOpenThird={() => setThirdOpen(true)}
          formData={formData}
          setFormData={setFormData}
        />
        <SuccessModal
          isOpen={thirdOpen}
          onCloseAll={closeAll}
          time ={time}
          onClose={() => setFirstOpen(false)}
          onOpenSecond={() => setSecondOpen(true)}
          onClose2={() => setSecondOpen(false)}
          onClose3={() => setThirdOpen(false)}
          formData={formData}
          onReshedule={reschedule}
        />
      </div>
      
    </>
  )
}

export default NavButton
