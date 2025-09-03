// 'use client';

// import React, {
//   cloneElement,
//   forwardRef,
//   isValidElement,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   useCallback,
// } from 'react';
// import gsap from 'gsap';
// import { SectionTitle } from '../SectionTitle';
// import { Sparkles, Layers3, BrainCircuit, Clock } from 'lucide-react';
// import Modal from './Modal';
// import { cn } from '@/app/lib/utils'; // Assuming you have this utility file for classnames

// // PricingCard component remains the same
// const PricingCard = forwardRef(({ children, isActive, ...rest }, ref) => (
//   <div
//     ref={ref}
//     {...rest}
//     className={cn(
//       "absolute top-1/2 left-1/2 rounded-xl border border-white/10 bg-black/80 p-6 text-center text-lg font-bold shadow-2xl [transform-style:preserve-3d] [backface-visibility:hidden] cursor-pointer flex items-center justify-center transition-colors duration-300 bg-[url('/image/card/bg.png')] bg-cover",
//       isActive ? 'text-white' : 'text-white'
//     )}
//   >
//     {children}
//   </div>
// ));
// PricingCard.displayName = 'PricingCard';

// // The CardSwap component with the bug fix
// const CardSwap = ({
//   width = 400,
//   height = 300,
//   cardDistance = 50,
//   verticalDistance = 50,
//   delay = 4000,
//   skewAmount = 4,
//   onCardChange,
//   children,
// }) => {
//   const childArr = useMemo(() => React.Children.toArray(children), [children]);
//   const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr]);
//   const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
//   const isAnimating = useRef(false);
//   const intervalRef = useRef();

//   const makeSlot = (i, total) => ({
//     x: i * cardDistance,
//     y: -i * verticalDistance,
//     z: -i * cardDistance * 1.2,
//     zIndex: total - i,
//   });

//   const placeNow = (el, slot) => {
//     gsap.set(el, {
//       x: slot.x,
//       y: slot.y,
//       z: slot.z,
//       xPercent: -50,
//       yPercent: -50,
//       skewY: skewAmount,
//       transformOrigin: 'center center',
//       zIndex: slot.zIndex,
//       force3D: true,
//     });
//   };

//   // --- THIS IS THE FIX ---
//   // We wrap autoSwap in useCallback to ensure it always has the latest onCardChange function.
//   const autoSwap = useCallback(() => {
//     if (isAnimating.current || order.current.length < 2) return;
//     isAnimating.current = true;

//     const [front, ...rest] = order.current;
//     const newOrder = [...rest, front];

//     newOrder.forEach((cardIndex, newPosition) => {
//       const el = refs[cardIndex].current;
//       const slot = makeSlot(newPosition, refs.length);
//       gsap.to(el, {
//         ...slot,
//         duration: 1.2,
//         ease: 'elastic.out(0.6, 0.75)',
//         onComplete: () => {
//           isAnimating.current = false;
//         },
//       });
//     });

//     order.current = newOrder;
//     // This now correctly calls the latest version of setActiveIndex
//     onCardChange?.(newOrder[0]);
//   }, [refs, onCardChange]); // Dependencies for useCallback

//   const promoteCard = (index) => {
//     if (isAnimating.current || order.current[0] === index) return;
//     isAnimating.current = true;
//     clearInterval(intervalRef.current);

//     const newOrder = [index, ...order.current.filter((i) => i !== index)];
//     newOrder.forEach((cardIndex, newPosition) => {
//       const el = refs[cardIndex].current;
//       const slot = makeSlot(newPosition, refs.length);
//       gsap.to(el, {
//         ...slot,
//         duration: 0.8,
//         ease: 'power3.inOut',
//         onComplete: () => {
//           isAnimating.current = false;
//         },
//       });
//     });

//     order.current = newOrder;
//     onCardChange?.(index);
//     intervalRef.current = setInterval(autoSwap, delay);
//   };

//   // The useEffect that sets up the interval is also updated.
//   useEffect(() => {
//     refs.forEach((r, i) => placeNow(r.current, makeSlot(i, refs.length)));
//     intervalRef.current = setInterval(autoSwap, delay);
//     return () => clearInterval(intervalRef.current);
//   }, [refs, delay, autoSwap]); // We add autoSwap as a dependency.

//   // The rest of the component is the same...
//   const [activeCardIndex, setActiveCardIndex] = useState(0);

//   useEffect(() => {
//     setActiveCardIndex(order.current[0]);
//   }, []);

//   const renderedChildren = React.Children.map(children, (child, i) => {
//     const isActive = activeCardIndex === i;
//     return isValidElement(child)
//       ? cloneElement(child, {
//           key: i,
//           ref: refs[i],
//           style: { width, height, ...child.props.style },
//           onClick: () => {
//             promoteCard(i);
//             setActiveCardIndex(i);
//           },
//           isActive: isActive,
//         })
//       : child;
//   });

//   return (
//     <div
//       className='absolute bottom-0 right-0 origin-bottom-right perspective-[1000px] overflow-visible -translate-x-[10%] translate-y-[20%]
//                  md:-translate-x-[5%] md:translate-y-[15%]
//                  lg:-translate-x-[20%] lg:translate-y-[20%]'
//       style={{ width, height }}
//     >
//       {renderedChildren}
//     </div>
//   );
// };

// const items = [
//   {
//     id: 1,
//     label: 'The Career Transformation Accelerator',
//     blurb: [
//       'This all-inclusive package is the fully customized, one-on-one mentorship designed to guide you through every single step of the career change process.',
//     ],
//     blurb2: 'You’ll receive:',
//     points: [
//       'Foundational design education',
//       'UX/UI design-focused training',
//       'Technical / software tutoring',
//       'The future of designing with AI ',
//       'Customized portfolio design case studies',
//       'UX Research exercises',
//       'Portfolio presentation guidelines',
//       'Interviewing coaching',
//     ],
//     price: 'Starting at $6,500',
//     cta: { label: 'Book the Accelerator' },
//     icon: Sparkles,
//   },
//   {
//     id: 2,
//     label: 'Portfolio Level-Up',
//     blurb:
//       'For experienced UX professionals (leadership or individual contributors) aiming for a senior, lead, or principal role. This program helps you reframe your existing work to showcase strategic impact and leadership.',
//     points: ['2-3 customized portfolio design case studies'],
//     price: 'Starting at $1,500',
//     cta: { label: 'Book Portfolio Level-Up' },
//     icon: Layers3,
//   },
//   {
//     id: 3,
//     label: 'Designing with AI Level-Up',
//     blurb:
//       'Master the next wave of user experience. This program is for designers and product teams who need to learn how to design human-centered AI products and features.',
//     points: [
//       'Conversational design',
//       'Designing for prompt engines',
//       'AI UX Design',
//       'AI UX Strategy',
//       'Designing augmented customized user experiences',
//       'Agentic agent design',
//     ],
//     price: 'Starting at $2,500',
//     cta: { label: 'Book AI Level-Up' },
//     icon: BrainCircuit,
//   },
//   {
//     id: 4,
//     label: 'À La Carte Sessions',
//     blurb:
//       'Have a specific UX/UI design challenge? Book hourly sessions with appropriate team members to work on anything you need, from a challenging design problem to level up your portfolio quickly to preparing for a specific interview.',
//     price: 'Flat-rate $200/hour',
//     cta: { label: 'Book a Session' },
//     icon: Clock,
//   },
// ];

// const PricingSection = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);
//   const activeItem = items[activeIndex];

//   return (
//     <section
//       id='pricing'
//       className='max-w-[1200px] mx-auto my-16 px-6 overflow-hidden'
//     >
//       <SectionTitle
//         heading='Product Offerings'
//         paragraph='A simple, effective approach to deliver excellence.'
//         title='Your path to excellence'
//       />
//       <div className='relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px] mt-12'>
//         <div className='space-y-6 order-2 lg:order-1'>
//           <div className='flex items-center gap-4'>
//             <activeItem.icon className='w-8 h-8 text-fuchsia-400 shrink-0' />
//             <h2 className='text-3xl font-bold text-white'>
//               {activeItem.label}
//             </h2>
//           </div>
//           <p className='text-gray-300 text-lg'>{activeItem.blurb}</p>
//           {activeItem.blurb2 && (
//             <p className='text-gray-300 text-lg'>{activeItem.blurb2}</p>
//           )}
//           {activeItem.points && (
//             <ul className='space-y-2 text-gray-200 list-disc list-inside'>
//               {activeItem.points.map((p, idx) => (
//                 <li key={idx}>{p}</li>
//               ))}
//             </ul>
//           )}
//           <p className='text-2xl font-semibold text-fuchsia-300'>
//             {activeItem.price}
//           </p>
//           <button
//             onClick={() => setIsOpen(true)}
//             className='inline-block mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white font-medium text-lg'
//           >
//             {activeItem.cta.label}
//           </button>
//           <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
//         </div>
//         <div className='relative w-full h-[400px] order-1 lg:order-2'>
//           <CardSwap width={380} height={220} onCardChange={setActiveIndex}>
//             {items.map((item) => (
//               <PricingCard key={item.id}>{item.label}</PricingCard>
//             ))}
//           </CardSwap>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PricingSection;

//=================================================//

// 'use client';

// import React, { useState } from 'react';
// import { SectionTitle } from '../SectionTitle';
// import Modal from './Modal';
// import { cn } from '@/app/lib/utils';
// import {
//   Check,
//   ArrowRight,
//   Sparkles,
//   Layers3,
//   BrainCircuit,
//   Clock,
// } from 'lucide-react';

// // Data for the pricing plans
// const pricingPlans = [
//   {
//     title: 'Basic',
//     icon: Sparkles,
//     price: '$480',
//     description:
//       'Essential tools and features for starting your journey with ease.',
//     features: [
//       'Basic workflow automation',
//       'Basic chatbot development',
//       '60 content request',
//       'E-mail support',
//       '1 consultation a month',
//     ],
//     cta: {
//       label: 'Go with this plan',
//       href: '#',
//     },
//   },
//   {
//     title: 'Professional',
//     icon: Layers3,
//     price: '$960',
//     description:
//       'Advanced capabilities designed to meet growing business needs.',
//     features: [
//       'Advance workflow automation',
//       'Advance chatbot development',
//       '150 content request',
//       'E-mail support',
//       '2 consultation a month',
//     ],
//     cta: {
//       label: 'Go with this plan',
//       href: '#',
//     },
//     isFeatured: true, // This will add a highlight to this card
//   },
//   {
//     title: 'Basic',
//     icon: Sparkles,
//     price: '$480',
//     description:
//       'Essential tools and features for starting your journey with ease.',
//     features: [
//       'Basic workflow automation',
//       'Basic chatbot development',
//       '60 content request',
//       'E-mail support',
//       '1 consultation a month',
//     ],
//     cta: {
//       label: 'Go with this plan',
//       href: '#',
//     },
//   },

//   // {
//   //   title: 'Enterprises',
//   //   icon: BrainCircuit,
//   //   price: 'Custom',
//   //   description:
//   //     'Comprehensive solutions tailored for large-scale business success.',
//   //   features: [
//   //     'Custom workflow automation',
//   //     'Custom chatbot development',
//   //     'Unlimited content request',
//   //     '24hr priority support',
//   //     'Unlimited consultation a month',
//   //   ],
//   //   cta: {
//   //     label: 'Schedule a call',
//   //     href: '#', // You can link this to your modal or a contact page
//   //   },
//   // },
// ];

// // Main Pricing Section Component
// const PricingSection = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <section id='pricing' className='max-w-7xl mx-auto my-16 px-6'>
//       <SectionTitle
//         heading='Product Offerings'
//         paragraph='A simple, effective approach to deliver excellence.'
//         title='Your path to excellence'
//       />

//       {/* Grid container for the pricing cards */}
//       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
//         {pricingPlans.map((plan, index) => (
//           <div
//             key={index}
//             className={cn(
//               'flex flex-col p-8 rounded-2xl bg-[#1C1C1E] border border-white/10 transition-transform duration-300 hover:-translate-y-2',
//               plan.isFeatured && 'ring-2 ring-purple-500' // Highlight for the featured plan
//             )}
//           >
//             {/* Card Header */}
//             <div className='flex items-center gap-3'>
//               <plan.icon className='w-6 h-6 text-purple-400' />
//               <h3 className='text-xl font-semibold text-white'>{plan.title}</h3>
//             </div>

//             {/* Price */}
//             <div className='mt-6'>
//               <span className='text-4xl font-bold text-white'>
//                 {plan.price}
//               </span>
//               {plan.title !== 'Enterprises' && (
//                 <span className='text-lg text-gray-400'>/month</span>
//               )}
//             </div>

//             {/* Description */}
//             <p className='mt-4 text-gray-400 text-base min-h-[70px]'>
//               {plan.description}
//             </p>

//             {/* CTA Button */}
//             <button
//               onClick={() => setIsOpen(true)}
//               className='flex items-center justify-center gap-2 mt-8 w-full px-6 py-3 rounded-lg bg-purple-600 text-white font-medium text-base hover:bg-purple-700 transition-colors'
//             >
//               {plan.cta.label}
//               <ArrowRight className='w-4 h-4' />
//             </button>

//             {/* Divider */}
//             <hr className='my-8 border-white/10' />

//             {/* Features List */}
//             <ul className='space-y-4 flex-grow'>
//               {plan.features.map((feature, idx) => (
//                 <li key={idx} className='flex items-center gap-3'>
//                   <Check className='w-5 h-5 text-green-500 shrink-0' />
//                   <span className='text-gray-300'>{feature}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>
//       <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
//     </section>
//   );
// };

// export default PricingSection;

'use client';

import React, { useState } from 'react';
import { SectionTitle } from '../SectionTitle';
import Modal from './Modal';
import { cn } from '@/app/lib/utils';
import {
  Check,
  ArrowRight,
  Sparkles,
  Layers3,
  BrainCircuit,
} from 'lucide-react';
import OpenAppointmentButton from '../OpenAppointmentButton';

// --- UPDATED: Data for the pricing plans with your new content ---
const pricingPlans = [
  {
    title: 'Career Transformation Accelerator',
    icon: Sparkles,
    price: 'Starting at $6,500',
    description:
      'A fully customized, one-on-one mentorship to guide you through every step of the career change process.',
    features: [
      'Foundational design education',
      'UX/UI design-focused training',
      'Technical / software tutoring',
      'The future of designing with AI',
      'Customized portfolio case studies',
      'UX Research exercises',
      'Portfolio presentation guidelines',
      'Interviewing coaching',
    ],
    cta: { label: 'Book the Accelerator' },
  },
  {
    title: 'Designing with AI Level-up',
    icon: BrainCircuit,
    price: 'Starting at $2,500',
    description:
      'Master the next wave of user experience and learn to design human-centered AI products and features.',
    features: [
      'Conversational design',
      'Designing for prompt engines',
      'AI UX Design',
      'AI UX Strategy',
      'Designing augmented user experiences',
      'Agentic agent design',
    ],
    cta: { label: 'Book AI Level-Up' },
    isFeatured: true,
  },
  {
    title: 'Portfolio Level-Up',
    icon: Layers3,
    price: 'Starting at $1,500',
    description:
      'For experienced UX professionals aiming for a senior, lead, or principal role. Reframe your work to show strategic impact.',
    features: ['2-3 customized portfolio design case studies'],
    cta: { label: 'Book Portfolio Level-Up' },
    // This will add a highlight to this card
  },
];

// Main Pricing Section Component
const PricingSection = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id='pricing' className='max-w-7xl mx-auto my-16 px-6'>
      <SectionTitle
        paragraph='A simple, effective approach to deliver excellence.'
        title='PRODUCT OFFERINGS'
      />

      {/* Grid container for the pricing cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16'>
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={cn(
              'flex flex-col p-8 rounded-2xl bg-[#1C1C1E] border border-white/10 transition-transform duration-300 hover:-translate-y-2',
              plan.isFeatured && 'ring-2 ring-purple-500'
            )}
          >
            {/* Card Header */}
            <div className='flex items-center gap-3'>
              <plan.icon className='w-6 h-6 text-purple-400' />
              <h3 className='text-xl font-semibold text-white'>{plan.title}</h3>
            </div>

            {/* Price */}
            <div className='mt-6'>
              <span className='text-4xl font-bold text-white'>
                {plan.price}
              </span>
            </div>

            {/* Description */}
            <p className='mt-4 text-gray-400 text-base min-h-[100px]'>
              {plan.description}
            </p>

            {/* CTA Button */}
            {/* <button
              onClick={() => setIsOpen(true)}
              className='flex items-center justify-center gap-2 mt-auto w-full px-6 py-3 rounded-lg bg-purple-600 text-white font-medium text-base hover:bg-purple-700 transition-colors'
            >
              {plan.cta.label}
              <ArrowRight className='w-4 h-4' />
            </button> */}
            <OpenAppointmentButton />

            {/* Render features only if they exist */}
            {plan.features && plan.features.length > 0 && (
              <>
                <hr className='my-8 border-white/10' />
                <ul className='space-y-4 flex-grow'>
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className='flex items-start gap-3'>
                      <Check className='w-5 h-5 text-green-500 shrink-0 mt-1' />
                      <span className='text-gray-300'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </section>
  );
};

export default PricingSection;
