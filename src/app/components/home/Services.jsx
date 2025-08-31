"use client";
import Image from "next/image";
import { SectionTitle } from "../SectionTitle";
import { motion } from "framer-motion";

const data = [
  { title: "Business Chatbot", description: "Enhance customer interactions by automating responses with intelligent chatbots, providing seamless service.", image: "/image/services/1.jpg" },
  { title: "Content Creation", description: "Effortlessly generate high-quality, engaging content tailored to your audience using AI-powered tools.", image: "/image/services/2.jpg" },
  { title: "Lead Generation", description: "Strengthen your sales pipeline by identifying, targeting, and attracting high-quality prospects with precision.", image: "/image/services/3.jpg" },
  { title: "Data Insights", description: "Extract actionable insights from complex data sets to drive informed decisions and accelerate business growth.", image: "/image/services/4.jpg" },
  { title: "AI Consulting", description: "Work with our experts to develop personalized AI strategies that streamline operations and deliver impactful results.", image: "/image/services/5.jpg" },
];

export const Services = () => {
  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const getVariants = (row, col) => {
    const commonTransition = { type: "spring", stiffness: 80, damping: 15, duration: 0.6 };

    if (row === 0) {
      // First row
      return col === 0
        ? { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: commonTransition } }
        : { hidden: { opacity: 0, y: 100 }, visible: { opacity: 1, y: 0, transition: commonTransition } }; 
    }

    if (row === 1) {
      // Middle card → right
      return { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0, transition: commonTransition } };
    }

    if (row === 2) {
      // Last row
      return col % 2 === 0
        ? { hidden: { opacity: 0, x: -100 }, visible: { opacity: 1, x: 0, transition: commonTransition } } 
        : { hidden: { opacity: 0, x: 100 }, visible: { opacity: 1, x: 0, transition: commonTransition } };
    }

    return { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: commonTransition } };
  };

  return (
    <section id="services" className="scroll-mt-[80px] max-w-[1200px] mx-auto lg:my-32 md:my-32 my-12 px-4 sm:px-4 md:px-4 lg:px-4">
      <SectionTitle heading="Services" paragraph="Tailored solutions to streamline, innovate, and grow." title="Innovative services for growth" />

      <motion.div className="flex flex-col space-y-6 sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 sm:space-y-0" variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
        {/* First row */}
        {data.slice(0, 2).map((item, index) => (
          <motion.div key={index} className="bg-white/4 border border-[rgba(255,255,255,0.1)] rounded-xl text-white p-6 flex flex-col" variants={getVariants(0, index)}>
            <div className="w-full flex justify-center sm:justify-start mb-4 relative rounded-xl overflow-hidden h-[170px] sm:h-[210px] md:h-[220px] lg:h-[260px]">
              <Image src={item.image} alt={item.title} fill className="object-cover" />
            </div>
            <p className="text-[22px] font-normal mb-2 text-white">{item.title}</p>
            <p className="text-base font-normal text-white/70 blur-[0.5px]">{item.description}</p>
          </motion.div>
        ))}

        {/* Middle card */}
        <motion.div className="md:col-span-2 lg:col-span-1 bg-white/4 border border-[rgba(255,255,255,0.1)] rounded-xl p-6 flex flex-col text-white" variants={getVariants(1, 0)}>
          <div className="w-full flex justify-center sm:justify-start mb-4 relative rounded-xl overflow-hidden  h-[170px] sm:h-[210px] md:h-[220px] lg:h-[260px]">
            <Image src={data[2].image} alt={data[2].title} fill className="object-cover" />
          </div>
          <p className="text-[22px] font-normal mb-2 text-white">{data[2].title}</p>
          <p className="text-base font-normal text-white/70 blur-[0.5px]">{data[2].description}</p>
        </motion.div>

        {/* Last row */}
        <div className="flex flex-col space-y-6 md:col-span-2 lg:col-span-3 md:flex-row lg:flex-row sm:gap-4 md:gap-5 lg:gap-6 sm:space-y-0">
          {data.slice(3).map((item, index) => (
            <motion.div key={index + 3} className="bg-white/4 border border-[rgba(255,255,255,0.1)] flex-1 rounded-xl p-6 flex flex-col text-white" variants={getVariants(2, index)}>
              <div className="w-full flex justify-center sm:justify-start mb-4 relative rounded-xl overflow-hidden h-[180px] sm:h-[220px] md:h-[230px] lg:h-[270px]">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <p className="text-[22px] font-normal mb-2 text-white">{item.title}</p>
              <p className="text-base font-normal text-white/70 blur-[0.5px]">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
