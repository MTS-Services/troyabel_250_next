// 'use client';
// import React, {
//   Children,
//   cloneElement,
//   forwardRef,
//   isValidElement,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from 'react';
// import gsap from 'gsap';
// import { SectionTitle } from '../SectionTitle';
// import { Sparkles, Layers3, BrainCircuit, Clock } from 'lucide-react';
// import Modal from './Modal';

// // Pricing Card Wrapper
// export const PricingCard = forwardRef(({ customClass, ...rest }, ref) => (
//   <div
//     ref={ref}
//     {...rest}
//     className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black/90
//     [transform-style:preserve-2d] [will-change:transform] [backface-visibility:hidden] shadow-xl
//     ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
//   />
// ));
// PricingCard.displayName = 'PricingCard';

// // Helper Functions
// const makeSlot = (i, distX, distY, total) => ({
//   x: i * distX,
//   y: -i * distY,
//   z: -i * distX * 1.5,
//   zIndex: total - i,
// });

// const placeNow = (el, slot, skew) =>
//   gsap.set(el, {
//     x: slot.x,
//     y: slot.y,
//     z: slot.z,
//     xPercent: -50,
//     yPercent: -50,
//     skewY: skew,
//     transformOrigin: 'center center',
//     zIndex: slot.zIndex,
//     force3D: true,
//   });

// // Card Swap Animation
// const CardSwap = ({
//   width = 400,
//   height = 300,
//   cardDistance = 60,
//   verticalDistance = 70,
//   delay = 5000,
//   skewAmount = 6,
//   easing = 'elastic',
//   children,
//   onCardChange,
//   triggerIndex,
// }) => {
//   const config =
//     easing === 'elastic'
//       ? {
//           ease: 'elastic.out(0.6,0.9)',
//           durDrop: 2,
//           durMove: 2,
//           durReturn: 2,
//           promoteOverlap: 0.9,
//           returnDelay: 0.05,
//         }
//       : {
//           ease: 'power1.inOut',
//           durDrop: 0.8,
//           durMove: 0.8,
//           durReturn: 0.8,
//           promoteOverlap: 0.45,
//           returnDelay: 0.2,
//         };

//   const childArr = useMemo(() => Children.toArray(children), [children]);
//   const refs = useMemo(
//     () => childArr.map(() => React.createRef()),
//     [childArr.length]
//   );

//   const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
//   const tlRef = useRef(null);
//   const intervalRef = useRef();

//   useEffect(() => {
//     if (triggerIndex != null) {
//       if (order.current[0] !== triggerIndex) {
//         order.current = [
//           triggerIndex,
//           ...order.current.filter((i) => i !== triggerIndex),
//         ];
//         onCardChange?.(triggerIndex);

//         refs.forEach((r, i) =>
//           placeNow(
//             r.current,
//             makeSlot(i, cardDistance, verticalDistance, refs.length),
//             skewAmount
//           )
//         );
//       }
//     }
//   }, [triggerIndex]);

//   // auto swap effect
//   useEffect(() => {
//     const total = refs.length;
//     refs.forEach((r, i) =>
//       placeNow(
//         r.current,
//         makeSlot(i, cardDistance, verticalDistance, total),
//         skewAmount
//       )
//     );

//     const swap = () => {
//       if (order.current.length < 2) return;

//       const [front, ...rest] = order.current;
//       const elFront = refs[front].current;
//       const tl = gsap.timeline();
//       tlRef.current = tl;

//       tl.to(elFront, {
//         y: '+=500',
//         duration: config.durDrop,
//         ease: config.ease,
//       });

//       tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
//       rest.forEach((idx, i) => {
//         const el = refs[idx].current;
//         const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
//         tl.set(el, { zIndex: slot.zIndex }, 'promote');
//         tl.to(
//           el,
//           {
//             x: slot.x,
//             y: slot.y,
//             z: slot.z,
//             duration: config.durMove,
//             ease: config.ease,
//           },
//           `promote+=${i * 0.15}`
//         );
//       });

//       const backSlot = makeSlot(
//         refs.length - 1,
//         cardDistance,
//         verticalDistance,
//         refs.length
//       );
//       tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
//       tl.call(
//         () => gsap.set(elFront, { zIndex: backSlot.zIndex }),
//         undefined,
//         'return'
//       );
//       tl.set(elFront, { x: backSlot.x, z: backSlot.z }, 'return');
//       tl.to(
//         elFront,
//         { y: backSlot.y, duration: config.durReturn, ease: config.ease },
//         'return'
//       );

//       tl.call(() => {
//         order.current = [...rest, front];
//         onCardChange?.(rest[0]);
//       });
//     };

//     intervalRef.current = window.setInterval(swap, delay);

//     return () => clearInterval(intervalRef.current);
//   }, [cardDistance, verticalDistance, delay, skewAmount, easing, refs]);

//   const rendered = childArr.map((child, i) =>
//     isValidElement(child)
//       ? cloneElement(child, {
//           key: i,
//           ref: refs[i],
//           style: { width, height, ...(child.props.style ?? {}) },
//         })
//       : child
//   );

//   return (
//     <div
//       className='absolute transform translate-x-[5%] translate-y-[20%]
//       origin-bottom-right perspective-[900px] overflow-visible'
//       style={{ width, height }}
//     >
//       {rendered}
//     </div>
//   );
// };

// //  Data
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
//     cta: { label: 'Book the Accelerator', href: '#book-accelerator' },
//     icon: Sparkles,
//   },
//   {
//     id: 2,
//     label: 'Portfolio Level-Up',
//     blurb:
//       'For experienced UX professionals (leadership or individual contributors) aiming for a senior, lead, or principal role. This program helps you reframe your existing work to showcase strategic impact and leadership.',
//     points: ['2-3 customized portfolio design case studies'],
//     price: 'Starting at $1,500',
//     cta: { label: 'Book Portfolio Level-Up', href: '#book-portfolio' },
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
//     cta: { label: 'Book AI Level-Up', href: '#book-ai' },
//     icon: BrainCircuit,
//   },
//   {
//     id: 4,
//     label: 'À La Carte Sessions',
//     blurb:
//       'Have a specific UX/UI design challenge? Book hourly sessions with appropriate team members to work on anything you need, from a challenging design problem to level up your portfolio quickly to preparing for a specific interview.',
//     price: 'Flat-rate $200/hour',
//     cta: { label: 'Book a Session', href: '#book-alacarte' },
//     icon: Clock,
//   },
// ];

// //  Full Section
// const PricingSection = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [triggerIndex, setTriggerIndex] = useState(null);
//   const activeItem = items[activeIndex];
//   const [isOpen, setIsOpen] = useState(false);

//   const modalHandler = () => {
//     setIsOpen(true);
//   };

//   return (
//     <section
//       id='pricing'
//       className='max-w-[1200px] mx-auto my-16 px-4 sm:px-6 md:px-8 lg:px-12'
//     >
//       <SectionTitle
//         heading='Pricing'
//         paragraph='A simple, effective approach to deliver excellence.'
//         title='Your path to excellence'
//       />

//       <div className='relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[450px] my-auto'>
//         {/* Left Side */}
//         <div className='space-y-6 col-span-1 order-2 lg:order-1 mt-6 sm:mt-8 md:mt-0 lg:mt-0'>
//           <div className='flex items-center gap-3'>
//             <activeItem.icon className='w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-fuchsia-400' />
//             <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-white'>
//               {activeItem.label}
//             </h2>
//           </div>

//           <p className='text-gray-300 text-sm sm:text-base md:text-lg'>
//             {activeItem.blurb}
//           </p>
//           <p className='text-gray-300 text-sm sm:text-base md:text-lg'>
//             {activeItem.blurb2}
//           </p>

//           <ul className='space-y-2 text-gray-200 text-sm sm:text-base md:text-base list-disc list-inside'>
//             {activeItem.points?.map((p, idx) => (
//               <li key={idx}>{p}</li>
//             ))}
//           </ul>

//           <p className='text-lg sm:text-xl md:text-2xl font-semibold text-fuchsia-300'>
//             {activeItem.price}
//           </p>

//           <button
//             onClick={modalHandler}
//             className='inline-block mt-3 px-4 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white font-medium text-sm sm:text-base md:text-lg'
//           >
//             {activeItem.cta.label}
//           </button>

//           <Modal isOpen={isOpen} setIsEditModalOpen={setIsOpen} />
//         </div>

//         {/* Right Side Cards */}
//         <div className='relative flex justify-center items-center order-1 lg:order-2 w-full sm:max-w-[250px] md:max-w-[300px] lg:max-w-[400px] h-[220px] sm:h-[240px] md:h-[260px] lg:h-[300px] mt-10 sm:mt-12 md:mt-0 mb-12 sm:mb-12 md:mb-0 lg:mb-0'>
//           <CardSwap
//             width={220}
//             height={220}
//             cardDistance={40}
//             verticalDistance={40}
//             onCardChange={setActiveIndex}
//             triggerIndex={triggerIndex}
//           >
//             {items.map((item, idx) => (
//               <PricingCard
//                 key={item.id}
//                 onMouseEnter={() => setTriggerIndex(idx)}
//               >
//                 <div className='text-white p-4 sm:p-5 md:p-6 text-center text-sm sm:text-base md:text-lg'>
//                   {item.label}
//                 </div>
//               </PricingCard>
//             ))}
//           </CardSwap>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default PricingSection;

//==================================================//

'use client';

import React, {
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from 'react';
import gsap from 'gsap';
import { SectionTitle } from '../SectionTitle';
import { Sparkles, Layers3, BrainCircuit, Clock } from 'lucide-react';
import Modal from './Modal';
import { cn } from '@/app/lib/utils'; // Assuming you have this utility file for classnames

// PricingCard component remains the same
const PricingCard = forwardRef(({ children, isActive, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={cn(
      "absolute top-1/2 left-1/2 rounded-xl border border-white/10 bg-black/80 p-6 text-center text-lg font-bold shadow-2xl [transform-style:preserve-3d] [backface-visibility:hidden] cursor-pointer flex items-center justify-center transition-colors duration-300 bg-[url('/image/card/bg.png')] bg-cover",
      isActive ? 'text-white' : 'text-white'
    )}
  >
    {children}
  </div>
));
PricingCard.displayName = 'PricingCard';

// The CardSwap component with the bug fix
const CardSwap = ({
  width = 400,
  height = 300,
  cardDistance = 50,
  verticalDistance = 50,
  delay = 4000,
  skewAmount = 4,
  onCardChange,
  children,
}) => {
  const childArr = useMemo(() => React.Children.toArray(children), [children]);
  const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr]);
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const isAnimating = useRef(false);
  const intervalRef = useRef();

  const makeSlot = (i, total) => ({
    x: i * cardDistance,
    y: -i * verticalDistance,
    z: -i * cardDistance * 1.2,
    zIndex: total - i,
  });

  const placeNow = (el, slot) => {
    gsap.set(el, {
      x: slot.x,
      y: slot.y,
      z: slot.z,
      xPercent: -50,
      yPercent: -50,
      skewY: skewAmount,
      transformOrigin: 'center center',
      zIndex: slot.zIndex,
      force3D: true,
    });
  };

  // --- THIS IS THE FIX ---
  // We wrap autoSwap in useCallback to ensure it always has the latest onCardChange function.
  const autoSwap = useCallback(() => {
    if (isAnimating.current || order.current.length < 2) return;
    isAnimating.current = true;

    const [front, ...rest] = order.current;
    const newOrder = [...rest, front];

    newOrder.forEach((cardIndex, newPosition) => {
      const el = refs[cardIndex].current;
      const slot = makeSlot(newPosition, refs.length);
      gsap.to(el, {
        ...slot,
        duration: 1.2,
        ease: 'elastic.out(0.6, 0.75)',
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    });

    order.current = newOrder;
    // This now correctly calls the latest version of setActiveIndex
    onCardChange?.(newOrder[0]);
  }, [refs, onCardChange]); // Dependencies for useCallback

  const promoteCard = (index) => {
    if (isAnimating.current || order.current[0] === index) return;
    isAnimating.current = true;
    clearInterval(intervalRef.current);

    const newOrder = [index, ...order.current.filter((i) => i !== index)];
    newOrder.forEach((cardIndex, newPosition) => {
      const el = refs[cardIndex].current;
      const slot = makeSlot(newPosition, refs.length);
      gsap.to(el, {
        ...slot,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    });

    order.current = newOrder;
    onCardChange?.(index);
    intervalRef.current = setInterval(autoSwap, delay);
  };

  // The useEffect that sets up the interval is also updated.
  useEffect(() => {
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, refs.length)));
    intervalRef.current = setInterval(autoSwap, delay);
    return () => clearInterval(intervalRef.current);
  }, [refs, delay, autoSwap]); // We add autoSwap as a dependency.

  // The rest of the component is the same...
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    setActiveCardIndex(order.current[0]);
  }, []);

  const renderedChildren = React.Children.map(children, (child, i) => {
    const isActive = activeCardIndex === i;
    return isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...child.props.style },
          onClick: () => {
            promoteCard(i);
            setActiveCardIndex(i);
          },
          isActive: isActive,
        })
      : child;
  });

  return (
    <div
      className='absolute bottom-0 right-0 origin-bottom-right perspective-[1000px] overflow-visible -translate-x-[10%] translate-y-[20%]
                 md:-translate-x-[5%] md:translate-y-[15%]
                 lg:-translate-x-[20%] lg:translate-y-[20%]'
      style={{ width, height }}
    >
      {renderedChildren}
    </div>
  );
};

const items = [
  {
    id: 1,
    label: 'The Career Transformation Accelerator',
    blurb: [
      'This all-inclusive package is the fully customized, one-on-one mentorship designed to guide you through every single step of the career change process.',
    ],
    blurb2: 'You’ll receive:',
    points: [
      'Foundational design education',
      'UX/UI design-focused training',
      'Technical / software tutoring',
      'The future of designing with AI ',
      'Customized portfolio design case studies',
      'UX Research exercises',
      'Portfolio presentation guidelines',
      'Interviewing coaching',
    ],
    price: 'Starting at $6,500',
    cta: { label: 'Book the Accelerator' },
    icon: Sparkles,
  },
  {
    id: 2,
    label: 'Portfolio Level-Up',
    blurb:
      'For experienced UX professionals (leadership or individual contributors) aiming for a senior, lead, or principal role. This program helps you reframe your existing work to showcase strategic impact and leadership.',
    points: ['2-3 customized portfolio design case studies'],
    price: 'Starting at $1,500',
    cta: { label: 'Book Portfolio Level-Up' },
    icon: Layers3,
  },
  {
    id: 3,
    label: 'Designing with AI Level-Up',
    blurb:
      'Master the next wave of user experience. This program is for designers and product teams who need to learn how to design human-centered AI products and features.',
    points: [
      'Conversational design',
      'Designing for prompt engines',
      'AI UX Design',
      'AI UX Strategy',
      'Designing augmented customized user experiences',
      'Agentic agent design',
    ],
    price: 'Starting at $2,500',
    cta: { label: 'Book AI Level-Up' },
    icon: BrainCircuit,
  },
  {
    id: 4,
    label: 'À La Carte Sessions',
    blurb:
      'Have a specific UX/UI design challenge? Book hourly sessions with appropriate team members to work on anything you need, from a challenging design problem to level up your portfolio quickly to preparing for a specific interview.',
    price: 'Flat-rate $200/hour',
    cta: { label: 'Book a Session' },
    icon: Clock,
  },
];

const PricingSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const activeItem = items[activeIndex];

  return (
    <section
      id='pricing'
      className='max-w-[1200px] mx-auto my-16 px-6 overflow-hidden'
    >
      <SectionTitle
        heading='Product Offerings'
        paragraph='A simple, effective approach to deliver excellence.'
        title='Your path to excellence'
      />
      <div className='relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px] mt-12'>
        <div className='space-y-6 order-2 lg:order-1'>
          <div className='flex items-center gap-4'>
            <activeItem.icon className='w-8 h-8 text-fuchsia-400 shrink-0' />
            <h2 className='text-3xl font-bold text-white'>
              {activeItem.label}
            </h2>
          </div>
          <p className='text-gray-300 text-lg'>{activeItem.blurb}</p>
          {activeItem.blurb2 && (
            <p className='text-gray-300 text-lg'>{activeItem.blurb2}</p>
          )}
          {activeItem.points && (
            <ul className='space-y-2 text-gray-200 list-disc list-inside'>
              {activeItem.points.map((p, idx) => (
                <li key={idx}>{p}</li>
              ))}
            </ul>
          )}
          <p className='text-2xl font-semibold text-fuchsia-300'>
            {activeItem.price}
          </p>
          <button
            onClick={() => setIsOpen(true)}
            className='inline-block mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white font-medium text-lg'
          >
            {activeItem.cta.label}
          </button>
          <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
        <div className='relative w-full h-[400px] order-1 lg:order-2'>
          <CardSwap width={380} height={220} onCardChange={setActiveIndex}>
            {items.map((item) => (
              <PricingCard key={item.id}>{item.label}</PricingCard>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
