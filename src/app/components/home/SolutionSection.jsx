"use client";
import { TbRoute } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiBriefcase4Line } from "react-icons/ri";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import { motion } from "framer-motion";
import { SectionTitle } from "../SectionTitle";
import SolutionSectionTwo from "./SolutionSectionTwo";

export default function SolutionSection() {
  const features = [
    {
      id: 1,
      icon: <TbRoute className="text-2xl" />,
      title: "Clarity & Confidence",
      text: "A personalized roadmap that leverages your unique background and turns it into your greatest strength.",
    },
    {
      id: 2,
      icon: <HiOutlineLightBulb className="text-2xl" />,
      title: "A Standout Portfolio",
      text: "Move beyond cookie-cutter projects. We'll build a portfolio that showcases your strategic thinking and design talent, telling a story that captivates hiring managers.",
    },
    {
      id: 3,
      icon: <MdOutlineRecordVoiceOver className="text-2xl" />,
      title: "Interview Mastery",
      text: "Walk into any interview prepared to articulate your design decisions, demonstrate your value, and land the offer.",
    },
    {
      id: 4,
      icon: <RiBriefcase4Line className="text-2xl" />,
      title: "A Career You Love",
      text: "Wake up every day excited to work on meaningful products that impact millions of users.",
    },
  ];

  // Motion variants for left and right animations
  const leftDivVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 70, damping: 20 },
    },
  };

  const rightDivVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 70, damping: 20 },
    },
  };

  return (
    <section
      id="solution"
      className="scroll-mt-[80px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 md:my-14 lg:my-18"
    >
      {/* Section Title */}
      <div className="text-center md:text-left flex flex-col justify-center items-center md:items-start mb-10">
        <SectionTitle
          heading={"Solution"}
          paragraph={
            "Imagine a future where you are not just changing jobs, but transforming your career."
          }
          title={"Your Bridge to a Fulfilling Career in UX"}
        />
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={index % 2 === 0 ? leftDivVariants : rightDivVariants}
            className="rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-[#A63EE7]/40 transition duration-300"
          >
            <div className="flex items-start gap-4">
              <span className="inline-flex items-center justify-center rounded-lg bg-[#A63EE7]/20 text-[#A63EE7] w-12 h-12">
                {feature.icon}
              </span>
              <div>
                <h3 className="text-lg font-medium text-white/90">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-white/70">{feature.text}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Next Section */}
      <SolutionSectionTwo />
    </section>
  );
}
