"use client";
import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { SectionTitle } from "../SectionTitle";
import { Sparkles, Layers3, BrainCircuit, Clock } from "lucide-react";
import Modal from "./Modal";

// Pricing Card Wrapper
export const PricingCard = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black/90 
    [transform-style:preserve-2d] [will-change:transform] [backface-visibility:hidden] shadow-xl
    ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
  />
));
PricingCard.displayName = "PricingCard";

// Helper Functions
const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

// Card Swap Animation
const CardSwap = ({
  width = 400,
  height = 300,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  skewAmount = 6,
  easing = "elastic",
  children,
  onCardChange,
  triggerIndex,
}) => {
  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6,0.9)",
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut",
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef();

  useEffect(() => {
    if (triggerIndex != null) {
      if (order.current[0] !== triggerIndex) {
        order.current = [
          triggerIndex,
          ...order.current.filter((i) => i !== triggerIndex),
        ];
        onCardChange?.(triggerIndex);

        refs.forEach((r, i) =>
          placeNow(
            r.current,
            makeSlot(i, cardDistance, verticalDistance, refs.length),
            skewAmount
          )
        );
      }
    }
  }, [triggerIndex]);

  // auto swap effect
  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) =>
      placeNow(
        r.current,
        makeSlot(i, cardDistance, verticalDistance, total),
        skewAmount
      )
    );

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => gsap.set(elFront, { zIndex: backSlot.zIndex }),
        undefined,
        "return"
      );
      tl.set(elFront, { x: backSlot.x, z: backSlot.z }, "return");
      tl.to(
        elFront,
        { y: backSlot.y, duration: config.durReturn, ease: config.ease },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
        onCardChange?.(rest[0]);
      });
    };

    intervalRef.current = window.setInterval(swap, delay);

    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, skewAmount, easing, refs]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
        })
      : child
  );

 

  return (
    <div
      className="absolute transform translate-x-[5%] translate-y-[20%] 
      origin-bottom-right perspective-[900px] overflow-visible"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

//  Data
const items = [
  {
    id: 1,
    label: "The Career Transformation Accelerator",
    blurb: "A fully customized mentorship into UX/UI design.",
    points: ["Foundational design education", "UX/UI design-focused training"],
    price: "Starting at $6,500",
    cta: { label: "Book the Accelerator", href: "#book-accelerator" },
    icon: Sparkles,
  },
  {
    id: 2,
    label: "Portfolio Level-Up",
    blurb: "For experienced UX pros targeting senior or lead roles.",
    points: ["2–3 customized portfolio design case studies"],
    price: "Starting at $1,500",
    cta: { label: "Book Portfolio Level-Up", href: "#book-portfolio" },
    icon: Layers3,
  },
  {
    id: 3,
    label: "Designing with AI Level-Up",
    blurb: "Master the next wave of UX with AI systems.",
    points: ["Conversational design", "Designing for prompt engines"],
    price: "Starting at $2,500",
    cta: { label: "Book AI Level-Up", href: "#book-ai" },
    icon: BrainCircuit,
  },
  {
    id: 4,
    label: "À La Carte Sessions",
    blurb: "Book hourly sessions for a UX/UI challenge.",
    points: ["Flat-rate $200/hour"],
    price: "$200/hour",
    cta: { label: "Book a Session", href: "#book-alacarte" },
    icon: Clock,
  },
];

//  Full Section
const PricingSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [triggerIndex, setTriggerIndex] = useState(null);
  const activeItem = items[activeIndex];
   const [isOpen, setIsOpen] = useState(false);

  const modalHandler = () => {
    setIsOpen(true);
  };

  return (
    <section
      id="pricing"
      className="max-w-[1200px] mx-auto my-16 px-4 sm:px-4 md:px-4 lg:px-4"
    >
      <SectionTitle
        heading="Product Offerings"
        paragraph="A simple, effective approach to deliver excellence."
        title="Your path to excellence"
      />

      <div className="relative grid lg:grid-cols-2 grid-cols-1 gap-12 items-center min-h-[450px] my-auto">
        {/* Left Side */}
        <div className="space-y-6 col-span-1 order-2 lg:order-1 sm:mt-0 md:mt-0 lg:mt-0 mt-3">
          <div className="flex items-center gap-3">
            <activeItem.icon className="w-8 h-8 text-fuchsia-400" />
            <h2 className="text-2xl font-bold text-white">
              {activeItem.label}
            </h2>
          </div>
          <p className="text-gray-300">{activeItem.blurb}</p>
          <ul className="space-y-2 text-gray-200 list-disc list-inside">
            {activeItem.points?.map((p, idx) => (
              <li key={idx}>{p}</li>
            ))}
          </ul>
          <p className="text-lg font-semibold text-fuchsia-300">
            {activeItem.price}
          </p>

          <button
            onClick={modalHandler}
          className="inline-block mt-3 px-4 py-2 rounded-lg bg-gradient-to-r from-fuchsia-600 to-indigo-600 text-white font-medium">
            {activeItem.cta.label}
          </button>
          <Modal isOpen={isOpen} setIsEditModalOpen={setIsOpen}/>
        </div>

        {/* Right Side Cards */}
        <div className="relative flex justify-center items-center order-1 lg:order-2 mt-36 sm:mt-46 md:mt-46 lg:mt-0 mb-36 sm:mb-0 md:mb-0 lg:mb-0 w-full sm:max-w-[250px] md:max-w-[300px] lg:max-w-[400px] h-[220px] sm:h-[220px] md:h-[250px] lg:h-[300px]">
          <CardSwap
            width={220}
            height={220}
            cardDistance={40}
            verticalDistance={40}
            onCardChange={setActiveIndex}
            triggerIndex={triggerIndex}
          >
            {items.map((item, idx) => (
              <PricingCard
                key={item.id}
                onMouseEnter={() => setTriggerIndex(idx)}
              >
                <div className="text-white p-4 md:p-6 text-center">
                  {item.label}
                </div>
              </PricingCard>
            ))}
          </CardSwap>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
