"use client";
import {
  HiCheck,
  HiMiniArrowTrendingDown,
  HiMiniArrowTrendingUp,
} from "react-icons/hi2";
import { SectionTitle } from "../SectionTitle";
import { motion } from "framer-motion";

const data = [
  {
    id: 1,
    icon: HiMiniArrowTrendingDown,
    title: "Cost reduction",
    description:
      "Optimize business processes and streamline operations to significantly minimize costs and maximize overall efficiency.",
  },
  {
    id: 2,
    icon: HiCheck,
    title: "Improved outcomes",
    description:
      "Leverage powerful data-driven insights and innovative strategies to enhance business performance and achieve superior outcomes.",
  },
  {
    id: 3,
    icon: HiMiniArrowTrendingUp,
    title: "Increased productivity",
    description:
      "Enhance group performance and output by automating redundant tasks, refining processes, and speeding up business functions.",
  },
];

// Parent container animation (stagger effect)
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Each card animation
const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const Benefits = () => {
  return (
    <section
      id="benefits"
      className="scroll-mt-[80px] max-w-[1200px] lg:my-32 md:my-32 my-12 mx-auto px-4 sm:px-4 md:px-4 lg:px-4"
    >
      <SectionTitle
        heading={"Benefits"}
        paragraph={"Discover the key benefits of partnering with us."}
        title={"Maximize efficiency and impact"}
      />

      {/* Parent Motion Div */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6"
      >
        {data.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              variants={cardVariant}
              className="col-span-1 rounded-4xl p-4 md:p-5 lg:p-6 text-white border border-white/10 relative overflow-hidden"
            >
              <div className="absolute -top-4 -right-4 w-[90px] h-[90px] rounded-full bg-[#512feb] blur-[65px]"></div>

              <div className="w-10 h-10 rounded-xl bg-white/[8%]">
                <Icon className="text-4xl w-10 h-10 text-white mb-2 p-[6px] mx-auto" />
              </div>
              <p className="text-xl md:text-[22px] lg:text-[22px] font-semibold my-3">
                {item.title}
              </p>
              <p className="text-base font-normal text-white/70 blur-[0.5px] max-w-[410px]">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
