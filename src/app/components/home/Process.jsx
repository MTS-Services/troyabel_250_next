"use client";
import Image from "next/image";
import { SectionTitle } from "../SectionTitle";
import { motion } from "framer-motion";

const data = [
  {
    id: 1,
    title: "Discovery & Analysis",
    description:
      "We dive deep into your needs, exploring ideas and defining strategies for long-term success.",
    image: "/image/process/1.jpg",
  },
  {
    id: 2,
    title: "Development & Test",
    description:
      "We craft tailored solutions for your goals and rigorously test them for top-notch reliability.",
    image: "/image/process/2.jpg",
  },
  {
    id: 3,
    title: "Launch & Maintain",
    description:
      "We deploy your solution seamlessly and ensure its continued performance with ongoing care.",
    image: "/image/process/3.jpg",
  },
];

export const Process = () => {
  const getVariants = (index) => {
    if (index === 0) {
      return {
        hidden: { opacity: 0, x: -100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { type: "spring", stiffness: 70, damping: 20 },
        },
      };
    } else if (index === 2) {
      return {
        hidden: { opacity: 0, x: 100 },
        visible: {
          opacity: 1,
          x: 0,
          transition: { type: "spring", stiffness: 70, damping: 20 },
        },
      };
    } else {
      return {
        hidden: { opacity: 0, y: 50 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 70, damping: 20 },
        },
      };
    }
  };

  return (
    <section
      id="process"
      className="scroll-mt-[80px] max-w-[1200px] mx-auto lg:my-32 md:my-32 my-12 px-4 sm:px-4 md:px-4 lg:px-4"
    >
      <SectionTitle
        heading={"Process"}
        paragraph={"A simple, effective approach to deliver excellence."}
        title={"Your path to excellence"}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <motion.div
            key={item.id}
            className="col-span-1 text-white p-4 md:p-5 lg:p-6 bg-white/4 border border-[rgba(255,255,255,0.1)] rounded-xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={getVariants(index)}
          >
            <div className="relative w-full h-[180px] rounded-lg mb-4 overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-[22px] font-normal mb-2 text-white">
                {item.title}
              </p>
              <p className="text-base font-normal text-white/70 blur-[0.5px]">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
