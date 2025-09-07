'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const steps = [
  {
    title: 'Free Discovery Call',
    desc: "We'll spend 45 minutes discussing your goals, background, and challenges. This is a no-obligation call to ensure we're a perfect fit.",
  },
  {
    title: 'The Custom Roadmap',
    desc: 'Based on our call, our team will draft a personalized coaching plan—our blueprint for your success —which will include a customized timeline tailored to your needs and availability.',
  },
  {
    title: 'Hands-On Coaching',
    desc: "Through regular 1:1 sessions with our team of professionals, we'll execute the plan. You'll get actionable feedback, resources, and the accountability you need to build your portfolio and skills.",
  },
  {
    title: 'Launch Your New Career',
    desc: "With a powerful portfolio and newfound confidence, you'll start applying and interviewing. Dr, T will be your strategic advisor right through to your final job offer.",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  // Ref for scroll-triggered animations
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id='how-it-works'
      className='w-full py-12 sm:py-16 text-white  min-h-screen items-center text-center flex flex-col justify-center gap-8 md:gap-12'
    >
      <div ref={ref} className='max-w-5xl mx-auto px-4 sm:px-6 text-center'>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='text-3xl sm:text-4xl font-bold mb-8 md:mb-12'
        >
          A Simple, Proven Path to Success
        </motion.h2>

        {/* Tabs */}
        <div className='flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 md:mb-12'>
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`px-4 py-2 sm:px-5 rounded-xl border transition-all duration-300 font-bold text-sm sm:text-base ${
                active === index
                  ? 'bg-[#A63EE7] text-white border-[#A63EE7] shadow-lg'
                  : 'bg-transparent border-[#6D6D6D] text-gray-300 hover:text-white hover:border-purple-400'
              }`}
            >
              {step.title}
            </button>
          ))}
        </div>

        {/* Animated Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          className='relative'
        >
          <AnimatePresence mode='wait'>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className='max-w-2xl mx-auto p-6 sm:p-8 border border-[#6D6D6D]/60 rounded-2xl shadow-lg opacity-80 bg-gradient-to-t from-[#A63EE7]/10 via-black to-[#A63EE7]/20'
            >
              <h3 className='text-xl sm:text-2xl font-semibold mb-3'>
                {steps[active].title}
              </h3>
              <p className='text-gray-300 text-sm sm:text-base'>
                {steps[active].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
