"use client";
import { motion } from "framer-motion";
import { H3 } from "./HeadingStyle";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const SectionTitle = ({ heading, title, paragraph }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={container}
      className="text-center"
    >
      <motion.h2
        variants={fadeUp}
        className="block text-center text-white px-3 py-2 bg-white/5 border border-white/15 rounded-lg blur-[.5px] w-fit mx-auto"
      >
        {heading}
      </motion.h2>

      <motion.div variants={fadeUp}>
        <H3
          className="max-w-[400px] md:max-w-[700px] lg:max-w-[900px] mx-auto text-center lg:mt-6 md:mt-5 sm:mt-4 mt-3 mb-2 text-[26px] md:text-[32px] lg:text-[40px]"
          nameH3={title}
        />
      </motion.div>

      <motion.p
        variants={fadeUp}
        className="max-w-[380px] md:max-w-[500px] lg:max-w-[500px] mb-6 sm:mb-8 md:mb-10 lg:mb-12 mx-auto text-center text-base font-normal text-white/70"
      >
        {paragraph}
      </motion.p>
    </motion.section>
  );
};
