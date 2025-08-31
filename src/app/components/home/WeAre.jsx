"use client";
import { motion } from "framer-motion";
import { H3 } from "../HeadingStyle";

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" }, // শুরুতে blur
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }, // দ্রুত stagger
};

export const WeAre = () => {
  const h2Text = "Who We Are";
  const h3Text =
    "We are Radison, we help founders like you to automate their day to day business operations with the help of AI";

  return (
    <section className="text-center py-12 px-4">
      {/* H2 remains static */}
      <h2 className="inline-block text-center text-white px-3 py-2 bg-white/5 border border-white/15 rounded-lg w-fit mx-auto">
        {h2Text}
      </h2>

      {/* H3 with faster stagger and initial blur */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        variants={container}
        className="mt-6 mb-2"
      >
        <H3
          className="max-w-[400px] md:max-w-[700px] lg:max-w-[900px] mx-auto text-center text-[26px] md:text-[32px] lg:text-[40px]"
          nameH3={h3Text.split(" ").map((word, index) => (
            <motion.span key={index} variants={fadeUp} className="inline-block mr-1">
              {word}
            </motion.span>
          ))}
        />
      </motion.div>
    </section>
  );
};
