

// "use client";
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { SectionTitle } from "../SectionTitle";

// export default function HowItWorks() {
//   const steps = [
//     {
//       title: "Free Discovery Call",
//       text: "We'll spend 45 minutes discussing your goals, background, and challenges. This is a no-obligation call to ensure we're a perfect fit.",
//     },
//     {
//       title: "The Custom Roadmap",
//       text: "Based on our call, our team will draft a personalized coaching plan—our blueprint for your success —which will include a customized timeline tailored to your needs and availability.",
//     },
//     {
//       title: "Hands-On Coaching",
//       text: "1 sessions with our team of professionals, we'll execute the plan. You'll get actionable feedback, resources, and the accountability you need to build your portfolio and skills.",
//     },
//     {
//       title: "Launch Your New Career",
//       text: "With a powerful portfolio and newfound confidence, you'll start applying and interviewing. Dr, T will be your strategic advisor right through to your final job offer.",
//     },
//   ];

//   return (
//     <section
//       id="how-it-works"
//       className="w-full bg-gradient-to-r from-[#0a0a0a] via-[#1a0f24] to-[#0a0a0a] text-white lg:py-12 md:py-10 sm:py-8 my-6"
//     >
//       <div className="max-w-[1200px] mx-auto px-6 text-center">
//         <SectionTitle title={"A Simple, Proven Path to Success"} />

//         <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
//           {steps.map((step, index) => (
//             <FlipCard key={index} title={step.title} text={step.text} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// function FlipCard({ title, text }) {
//   const [flipped, setFlipped] = useState(false);
//   const [isHoverable, setIsHoverable] = useState(false);

//   useEffect(() => {
//     const checkHover = () => setIsHoverable(window.innerWidth >= 768);
//     checkHover();
//     window.addEventListener("resize", checkHover);
//     return () => window.removeEventListener("resize", checkHover);
//   }, []);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true }}
//       className="w-full h-50 md:h-38"
//     >
//       <div
//         className="w-full h-full relative cursor-pointer"
//         style={{ perspective: "1000px" }}
//         onClick={() => !isHoverable && setFlipped(!flipped)}
//         onMouseEnter={() => isHoverable && setFlipped(true)}
//         onMouseLeave={() => isHoverable && setFlipped(false)}
//       >
//         <div
//           className="relative w-full h-full transition-transform duration-700"
//           style={{
//             transformStyle: "preserve-3d",
//             transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
//           }}
//         >
//           {/* Front */}
//           <div
//             className="absolute w-full h-full top-0 left-0 bg-white/5 border border-purple-500/20 rounded-2xl flex items-center justify-center p-3 overflow-hidden"
//             style={{ backfaceVisibility: "hidden" }}
//           >
//             <div className="relative w-full flex justify-center items-center">
//               <h3 className="text-[20px] font-normal text-white/90">
//                 {title}
//               </h3>

//               {/* Background blur - left top */}
//               <div className="absolute -top-28 -left-12 w-[100px] h-[100px] rounded-full bg-[#b845ff] blur-[65px]"></div>
//             </div>
//           </div>

//           {/* Back */}
//           <div
//             className="absolute w-full h-full top-0 left-0 bg-white/5 border border-purple-500/20 rounded-2xl flex items-center justify-center p-3 overflow-hidden"
//             style={{
//               backfaceVisibility: "hidden",
//               transform: "rotateY(180deg)",
//             }}
//           >
//             <p className="mt-2 text-base text-white/70">{text}</p>

//             {/* Background blur - bottom right */}
//             <div className="absolute -bottom-22 -right-8 w-[100px] h-[100px] rounded-full bg-[#b845ff] blur-[65px]"></div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }



//2nd design


// "use client";
// import { useState } from "react";
// import { motion } from "framer-motion";

// const steps = [
//   {
//     title: "Free Discovery Call",
//     desc: "We'll spend 45 minutes discussing your goals, background, and challenges. This is a no-obligation call to ensure we're a perfect fit. ",
//   },
//   {
//     title: "The Custom Roadmap",
//     desc: "Based on our call, our team will draft a personalized coaching plan—our blueprint for your success —which will include a customized timeline tailored to your needs and availability. ",
//   },
//   {
//     title: "Hands-On Coaching",
//     desc: "Through regular 1:1 sessions with our team of professionals, we'll execute the plan. You'll get actionable feedback, resources, and the accountability you need to build your portfolio and skills.",
//   },
//   {
//     title: "Launch Your New Career",
//     desc: "With a powerful portfolio and newfound confidence, you'll start applying and interviewing. Dr, T will be your strategic advisor right through to your final job offer. ",
//   },
// ];

// export default function HowItWorks() {
//   const [active, setActive] = useState(0);

//   return (
//     <section className="w-full  py-16 text-white">
//       <div className="max-w-5xl mx-auto px-6 text-center">
//         <h2 className="text-3xl sm:text-4xl font-bold mb-10">How It Works</h2>

//         {/* Tabs */}
//         <div className="flex flex-wrap justify-center gap-3 mb-10">
//           {steps.map((step, index) => (
//             <button
//               key={index}
//               onClick={() => setActive(index)}
//               className={`px-5 py-2 rounded-xl border transition-all duration-300 ${
//                 active === index
//                   ? "bg-[#A63EE7] text-white border-[#A63EE7] shadow-lg"
//                   : "bg-transparent border-gray-600 text-gray-300 hover:text-white hover:border-purple-400"
//               }`}
//             >
//               {step.title}
//             </button>
//           ))}
//         </div>

//         {/* Content Animation */}
//        <motion.div
//   key={active}
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.5 }}
//   className="max-w-2xl mx-auto p-8 border border-[#ACADBC] rounded-2xl shadow-lg opacity-80  bg-gradient-to-t from-[#A63EE7]/50 via-black to-[#A63EE7]/50]"
  
// >
//   <h3 className="text-2xl font-semibold mb-4">{steps[active].title}</h3>
//   <p className="text-gray-300">{steps[active].desc}</p>
// </motion.div>

//       </div>
//     </section>
//   );
// }
"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const steps = [
  {
    title: "Free Discovery Call",
    desc: "We'll spend 45 minutes discussing your goals, background, and challenges. This is a no-obligation call to ensure we're a perfect fit.",
  },
  {
    title: "The Custom Roadmap",
    desc: "Based on our call, our team will draft a personalized coaching plan—our blueprint for your success —which will include a customized timeline tailored to your needs and availability.",
  },
  {
    title: "Hands-On Coaching",
    desc: "Through regular 1:1 sessions with our team of professionals, we'll execute the plan. You'll get actionable feedback, resources, and the accountability you need to build your portfolio and skills.",
  },
  {
    title: "Launch Your New Career",
    desc: "With a powerful portfolio and newfound confidence, you'll start applying and interviewing. Dr, T will be your strategic advisor right through to your final job offer.",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState(0);

  // Ref for in-view detection
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" }); 
  // 'once: true' makes animation trigger only once
  // 'margin' lets animation trigger slightly before fully visible

  return (
    <section id="how-it-works" className="w-full py-16 text-white">
      <div
        ref={ref}
        className="max-w-6xl mx-auto px-6 text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl sm:text-4xl font-bold mb-10"
        >
          A Simple, Proven Path to Success
        </motion.h2>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={`px-5 py-2 rounded-xl border transition-all duration-300 font-bold${
                active === index
                  ? "bg-[#A63EE7] text-white border-[#A63EE7] shadow-lg"
                  : "bg-transparent border-[#6D6D6D] text-gray-300 hover:text-white hover:border-purple-400"
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
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="max-w-2xl mx-auto p-6 sm:p-8 border border-[#6D6D6D]/60 rounded-2xl shadow-lg opacity-80 bg-gradient-to-t from-[#A63EE7]/10 via-black to-[#A63EE7]/20"
            >
              <h3 className="text-xl sm:text-2xl font-semibold mb-3">
                {steps[active].title}
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                {steps[active].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

