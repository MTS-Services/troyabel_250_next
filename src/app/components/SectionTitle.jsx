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

export const SectionTitle = ({ title, paragraph }) => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
      variants={container}
      className="text-center"
    >
      <motion.div variants={fadeUp}>
        <H3
          className="max-w-[400px] md:max-w-[700px] lg:max-w-[900px] mx-auto text-center lg:mb-3 md:mb-2 sm:mb-2 mb-2 text-[26px] md:text-[32px] lg:text-[40px] text-[#6D6D6D]"
          nameH3={title}
        />
      </motion.div>

      <motion.p
        variants={fadeUp}
        className={`max-w-[380px] md:max-w-[540px] lg:max-w-[540px] mb-6 sm:mb-8 md:mb-10 lg:mb-12 mx-auto text-center text-base font-normal text-white`}
      >
        {paragraph}
      </motion.p>
    </motion.section>
  );
};
