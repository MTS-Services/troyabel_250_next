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
