'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionTitle } from '../SectionTitle';
import Modal from './Modal';
import { cn } from '@/app/lib/utils';
import {
  Check,
  Sparkles,
  Layers3,
  BrainCircuit,
  ChevronDown,
} from 'lucide-react';
import { FiArrowRight } from 'react-icons/fi';
import FirstModal from './FirstModal';
import InfoModal from './InfoModal';
import SuccessModal from './SuccessModal';

const pricingPlans = [
  // Your pricingPlans array remains exactly the same...
  {
    title: 'Portfolio Power-Up',
    icon: Sparkles,
    price: 'Starting at $1,800',
    description:
      'For experienced UX professionals (leadership or individual contributors) aiming for a senior, lead, or principal role. This program helps you reframe your existing work to showcase strategic impact and leadership. We will also have the opportunity to create 2-3 new portfolio items.',
    features: [
      '6 x 60-minute sessions',
      'Personalized action plan',
      'Session recordings',
      'Honest actionable feedback',
      'Lifetime e-mail support',
    ],
  },
  {
    title: 'Career Transformation',
    icon: BrainCircuit,
    price: 'Starting at $6,500',
    description:
      "This comprehensive A-to-Z one-to-one service typically takes 3-6 months, depending on your personalized roadmap. It covers everything from skills assessment and building your portfolio from the ground up to interview preparation and negotiation. As a high-touch, high-value program, you'll receive one-on-one training with expert coaches who are leaders in their fields.",
    features: [
      'Personalized action plan',
      'All sessions are recorded for your review',
      'Foundational design education',
      'UX/UI design-focused training',
      'Technical / software tutoring',
      'Conversational design',
      'Designing for prompt engines',
      'AI UX Design',
      'AI UX Strategy',
      'Designing augmented customized user experiences',
      'Agentic agent design',
      'The future of designing with AI',
      'UX Research exercises',
      'Customized portfolio design case studies',
      'Portfolio presentation guidelines',
      'Interviewing coaching',
      'Upon completion of the plan, you’ll continue to have access to our team for 3 months.',
    ],
    isFeatured: true,
  },
  {
    title: 'Single Shots',
    icon: Layers3,
    price: 'Starting at $150',
    description:
      'This laser-focused session is designed to have an immediate impact. Whether you need a final polish on your portfolio before a big application, a mock interview to calm your nerves and sharpen your answers, strategic career advice for your next move, or guidance on UX design leadership challenges, this is your targeted solution for a quick confidence boost.',
    features: [
      '1 x 60-minute session',
      'Personalized action plan',
      'Actionable feedback',
      '1 x 30-minute follow-up session (if necessary)',
      'Session recording',
      'Lifetime e-mail support',
    ],
  },
];

const MAX_VISIBLE_FEATURES = 3;

// --- UPDATED: PricingCard component with centered text ---
const PricingCard = ({ plan, setFirstOpen }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasMoreFeatures = plan.features.length > MAX_VISIBLE_FEATURES;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={cn(
        'flex flex-col p-8 rounded-2xl bg-[#1C1C1E] border border-white/10 transition-transform duration-300 hover:-translate-y-2',
        plan.isFeatured && 'ring-2 ring-[#A63EE7]'
      )}
    >
      {/* --- MODIFIED: Added justify-center to center the header --- */}
      <div className='flex items-center gap-3'>
        <plan.icon className='w-6 h-6 text-[#A63EE7]' />
        <h3 className='text-md font-semibold text-white'>{plan.title}</h3>
      </div>

      {/* --- MODIFIED: Added text-center to center the price --- */}
      <div className='mt-6'>
        <span className='text-3xl font-bold text-white'>{plan.price}</span>
      </div>

      {/* --- MODIFIED: Added text-center to the description --- */}
      <p className='mt-4 h-52 text-base text-gray-400'>{plan.description}</p>

      {/* --- MODIFIED: Added flex justify-center to center the button --- */}
      <div className='my-8 flex justify-center'>
        {/**Button start */}

        <button
          onClick={() => setFirstOpen(true)}
          className='relative flex items-center justify-center gap-2 w-full py-2 rounded-lg
                               border border-[#A63EE7] bg-[#A63EE7] text-white font-medium overflow-hidden
                               transition-all duration-500 ease-out group'
        >
          <span
            className='absolute inset-0 bg-black rounded-lg scale-x-0 origin-left
                                 transition-all duration-700 ease-in-out group-hover:scale-x-100
                                 transform-gpu'
          ></span>
          <span
            className='absolute inset-0 bg-gradient-to-r from-black/80 to-black rounded-lg
                                 scale-x-0 origin-left transition-all duration-800 ease-out
                                 group-hover:scale-x-100 transform-gpu'
          ></span>

          <span className='relative flex items-center gap-2 z-10'>
            <span
              className='flex items-center justify-center transition-all duration-500 ease-out
                                   transform group-hover:-translate-x-4 group-hover:opacity-0'
            ></span>
            <span className='transition-all duration-500 ease-out group-hover:text-white'>
              Book a Free Call
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
        {/**Button End */}
      </div>

      {/* Features List (Intentionally left-aligned for readability) */}
      <hr className='border-white/10' />
      <div className='mt-8'>
        <ul className='space-y-3'>
          {plan.features.slice(0, MAX_VISIBLE_FEATURES).map((feature, idx) => (
            <li key={idx} className='flex items-start gap-3'>
              <Check className='w-5 h-5 text-green-500 shrink-0 mt-1' />
              <span className='text-gray-300'>{feature}</span>
            </li>
          ))}
        </ul>

        <AnimatePresence>
          {isExpanded && hasMoreFeatures && (
            <motion.ul
              className='space-y-4 mt-4'
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {plan.features.slice(MAX_VISIBLE_FEATURES).map((feature, idx) => (
                <li key={idx} className='flex items-start gap-3'>
                  <Check className='w-5 h-5 text-green-500 shrink-0 mt-1' />
                  <span className='text-gray-300'>{feature}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* This spacer div pushes the "See all details" button to the bottom */}
      <div className='flex-grow'></div>

      {/* "See all details" Button */}
      {hasMoreFeatures && (
        <button
          onClick={toggleExpanded}
          className='flex items-center justify-center gap-2 mt-7 cursor-pointer text-sm font-semibold text-[#A63EE7] hover:text-[#A63EE9] transition-colors'
        >
          {isExpanded ? 'See less' : 'See all details'}
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
            <ChevronDown className='w-4 h-4' />
          </motion.div>
        </button>
      )}
    </div>
  );
};

// Main Pricing Section Component (No changes needed here)
const PricingSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [firstOpen, setFirstOpen] = useState(false);
  const [secondOpen, setSecondOpen] = useState(false);
  const [thirdOpen, setThirdOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    goal: '',
    interest: '',
  });
  const [time, setTime] = useState({
    date: '',
    time: '',
    day: '',
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
    // Main Pricing Section
    <>
      <section id='pricing' className='max-w-7xl mx-auto my-16 px-6'>
        <SectionTitle
          paragraph="Choose the plan that's right for you. All plans are flexible and can be customized."
          title='Coaching Plans'
        />

        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-16'>
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} setFirstOpen={setFirstOpen} />
          ))}
        </div>
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      </section>
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
          time={time}
          onClose={() => setFirstOpen(false)}
          onOpenSecond={() => setSecondOpen(true)}
          onClose2={() => setSecondOpen(false)}
          onClose3={() => setThirdOpen(false)}
          formData={formData}
          onReshedule={reschedule}
        />
      </div>
    </>
  );
};

export default PricingSection;
