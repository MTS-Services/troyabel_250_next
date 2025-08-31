"use client";
import { SectionTitle } from "../SectionTitle";
import { PiStackSimple } from "react-icons/pi";
import { GoStack } from "react-icons/go";
import { PiStackPlusLight } from "react-icons/pi";
import { Button } from "../Button";
import { GoCheck } from "react-icons/go";
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 20 },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const data = [
  {
    id: 1,
    icon: PiStackSimple,
    category: "Basic",
    title: "Go with this plan",
    description:
      "Essential tools and features for starting your journey with ease.",
    price: "$480",
    day: "/month",
    features: [
      "Basic workflow automation",
      "Basic chatbot development",
      "60 content requests",
      "E-mail support",
      "1 consultation a month",
    ],
    action: "Go with this plan",
  },
  {
    id: 2,
    icon: GoStack,
    category: "Professional",
    title: "Go with this plan",
    description:
      "Advanced capabilities designed to meet growing business needs.",
    price: "$49",
    day: "/month",
    features: [
      "Advance workflow automation",
      "Advance chatbot development",
      "150 content requests",
      "E-mail support",
      "2 consultations a month",
    ],
    action: "Go with this plan",
  },
  {
    id: 3,
    icon: PiStackPlusLight,
    category: "Enterprise",
    title: "Schedule a call",
    description:
      "Comprehensive solutions tailored for large-scale business success.",
    price: "Custom",
    day: "",
    features: [
      "Custom workflow automation",
      "Custom chatbot development",
      "Unlimited content requests",
      "24hr priority support",
      "Unlimited consultations a month",
    ],
    action: "Schedule a call",
  },
];

export const Plans = () => {
  return (
    <section
      id="plans"
      className="scroll-mt-[80px] max-w-[1200px] mx-auto lg:my-32 md:my-32 my-12 px-4 sm:px-4 md:px-4 lg:px-4"
    >
      <SectionTitle
        heading={"Plans"}
        paragraph={"Transparent pricing designed to fit your requirements."}
        title={"Flexible plans for growth"}
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {data.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              className={`bg-white/4 border border-[rgba(255,255,255,0.1)] rounded-4xl px-5 md:px-6 lg:px-7 py-4 md:py-5 lg:py-6 text-white overflow-hidden ${
                index === 2 ? "md:col-span-2 lg:col-span-1" : "col-span-1"
              }`}
              variants={cardVariants}
            >
              <div className="flex items-center gap-2 relative">
                <Icon className="text-4xl w-10 h-10 text-white p-[6px]" />
                <p className="text-white text-base font-light">
                  <span>{item.category}</span>
                </p>
                <div className="absolute -top-4 -left-4 w-14 h-14 bg-[#512feb] blur-[60px]"></div>
              </div>

              <h2 className="text-[36px] md:text-[44px] lg:text-[50px] font-medium text-white mb-2 mt-[8px]">
                {item.price}
                <span className="text-base text-white font-light">
                  {item.day}
                </span>
              </h2>

              <p
                className={`text-base font-light mb-4 text-white/70 blur-[0.5px] ${
                  index === 2 ? "max-w-full" : "max-w-[280px]"
                }`}
              >
                {item.description}
              </p>

              <Button className={"w-full my-5"} text={item.action} />

              <div className="mb-4 space-y-2 relative">
                {item.features.map((feature, fIndex) => (
                  <div
                    key={fIndex}
                    className="flex items-center gap-2 blur-[0.4px]"
                  >
                    <div className="p-2 bg-white/[12%] rounded-[9px]">
                      <GoCheck className="text-white w-[14px] h-[14px]" />
                    </div>
                    <p className="text-base font-normal">{feature}</p>
                  </div>
                ))}
                <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-[#512feb] blur-[60px]"></div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
