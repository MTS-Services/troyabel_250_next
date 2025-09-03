"use client";
import { RiStackLine, RiLightbulbLine, RiComputerLine } from "react-icons/ri";
import { motion } from "framer-motion";

export default function SolutionSectionTwo() {
  const features = [
    {
      id: 1,
      icon: <RiStackLine className="text-xl" />,
      title: "The Alternative to a UX Bootcamp",
      text: "This is a personalized coaching service for individuals looking to pivot into a UX career, framed as a superior alternative to one-size-fits-all bootcamps. It focuses on leveraging the client's unique background to create a custom roadmap. The service provides one-on-one mentorship to build a standout portfolio that is uniquely yours, not a copy of a class assignment, guiding the client through to their final job offer.",
    },
    {
      id: 2,
      icon: <RiLightbulbLine className="text-xl" />,
      title: "Portfolio Polish & Leadership Coaching",
      text: "This service is designed for current UX professionals who want to advance into senior, lead, or manager roles. It provides direct mentorship from an industry insider with experience as a former Design Manager and university professor. The coaching focuses on transforming a client's existing portfolio to demonstrate strategic impact and building the leadership skills necessary for promotion.",
    },
    {
      id: 3,
      icon: <RiComputerLine className="text-xl" />,
      title: "An HCI-Driven Approach to AI",
      text: "This service is for designers who need to master designing for artificial intelligence. It leverages the coach's background as a published researcher with a PhD in Human-Computer Interaction. The curriculum goes beyond surface-level buzzwords to teach the deep principles of how to design intelligent systems that are effective, ethical, and trustworthy.",
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
      className="scroll-mt-[80px] max-w-7xl mx-auto lg:my-12 md:my-10 sm:my-8 my-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
        {features.map((feature, index) => {
          const isLeft = index % 2 === 0;
          const variants = isLeft ? leftDivVariants : rightDivVariants;
          const isLast = index === features.length - 1;

          return (
            <motion.div
              key={feature.id}
              variants={variants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className={`rounded-2xl p-5 bg-white/5 border border-white/10 hover:border-[#A63EE7]/40 transition 
                ${
                  isLast
                    ? "md:col-span-2 md:mx-auto lg:col-span-2 lg:mx-auto"
                    : ""
                }`}
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
