"use client";
import { TbRoute } from "react-icons/tb";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiBriefcase4Line } from "react-icons/ri";
import { MdOutlineRecordVoiceOver } from "react-icons/md";
import { motion } from "framer-motion";
import { SectionTitle } from "../SectionTitle";

export default function SolutionSection() {
  const features = [
    {
      icon: <TbRoute className="text-xl" />,
      title: "Clarity & Confidence",
      text: "A personalized roadmap that leverages your unique background and turns it into your greatest strength.",
    },
    {
      icon: <HiOutlineLightBulb className="text-xl" />,
      title: "A Standout Portfolio",
      text: "Move beyond cookie-cutter projects. We'll build a portfolio that showcases your strategic thinking and design talent, telling a story that captivates hiring managers.",
    },
    {
      icon: <MdOutlineRecordVoiceOver className="text-xl" />,
      title: "Interview Mastery",
      text: "Walk into any interview prepared to articulate your design decisions, demonstrate your value, and land the offer.",
    },
    {
      icon: <RiBriefcase4Line className="text-xl" />,
      title: "A Career You Love",
      text: "Wake up every day excited to work on meaningful products that impact millions of users.",
    },
  ];

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
      className="scroll-mt-[80px] max-w-[1200px] mx-auto lg:my-24 md:my-16 my-12 px-4 sm:px-4 md:px-4 lg:px-4"
    >
      {/* Eyebrow + Title */}
      <div className="text-center flex flex-col justify-center items-center md:text-left">
        <SectionTitle
          heading={"Solution"}
          paragraph={
            "Imagine a future where you are not just changing jobs, but transforming your career."
          }
          title={"Your Bridge to a Fulfilling Career in UX"}
        />
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
        {features.map((feature, index) => {
          const isLeft = index % 2 === 0; // even index = left, odd = right
          const variants = isLeft ? leftDivVariants : rightDivVariants;

          return (
            <motion.div
              key={index}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="rounded-2xl p-5 bg-white/5 border border-white/10 hover:border-[#A63EE7]/40 transition"
            >
              <div className="flex items-start gap-3">
                <span className="mt-1 inline-flex max-w-12 max-h-12 items-center justify-center rounded-lg bg-[#A63EE7]/20 text-[#A63EE7]">
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
          );
        })}
      </div>
    </section>
  );
}
