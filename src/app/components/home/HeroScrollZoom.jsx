"use client";

import { motion } from "framer-motion";
import OpenAppointmentButton from "../OpenAppointmentButton";
import Aurora from "./Aurora";

export default function HeroScrollZoom() {
  return (
    <section id="hero" className="relative w-full flex flex-col items-center justify-center overflow-hidden text-white px-4">
      {/* Aurora Background */}
      <div className="absolute inset-0 -z-10">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={60.5}
          amplitude={6.0}
          speed={0.5}
        />
      </div>

      {/* Hero Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center space-y-6 max-w-3xl mt-40 mb-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold">
          Master Every Stage of Your UX Career.
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Industry leaders with experience at major corporations and a history
          of teaching design and UX at top universities nationwide.
        </p>
        <div className="flex justify-center">
          <OpenAppointmentButton />
        </div>
      </motion.div>
    </section>
  );
}
