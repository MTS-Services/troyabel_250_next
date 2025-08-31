"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "../SectionTitle";

export default function HowItWorks() {
  const steps = [
    {
      title: "Free Discovery Call",
      text: "We'll spend 45 minutes discussing your goals, background, and challenges.",
    },
    {
      title: "The Custom Roadmap",
      text: "Our team will draft a personalized coaching plan with a customized timeline.",
    },
    {
      title: "Hands-On Coaching",
      text: "Regular 1:1 sessions with actionable feedback, resources, and accountability.",
    },
    {
      title: "Launch Your New Career",
      text: "With a powerful portfolio and newfound confidence, you'll start applying and interviewing.",
    },
  ];

  return (
    <section id="how it works" className="w-full bg-gradient-to-r from-[#0a0a0a] via-[#1a0f24] to-[#0a0a0a] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <SectionTitle
          heading={"How it works"}
          paragraph={"Follow these 4 steps to transform your career in UX"}
          title={"A Simple, Proven Path to Success"}
        />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <FlipCard key={index} title={step.title} text={step.text} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FlipCard({ title, text }) {
  const [flipped, setFlipped] = useState(false);
  const [isHoverable, setIsHoverable] = useState(false);

  useEffect(() => {
    const checkHover = () => setIsHoverable(window.innerWidth >= 768);
    checkHover();
    window.addEventListener("resize", checkHover);
    return () => window.removeEventListener("resize", checkHover);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full h-60 md:h-48"
    >
      <div
        className="w-full h-full relative cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={() => !isHoverable && setFlipped(!flipped)}
        onMouseEnter={() => isHoverable && setFlipped(true)}
        onMouseLeave={() => isHoverable && setFlipped(false)}
      >
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute w-full h-full top-0 left-0 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center p-5"
            style={{ backfaceVisibility: "hidden" }}
          >
            <h3 className="text-lg font-medium text-white/90">{title}</h3>
          </div>

          {/* Back */}
          <div
            className="absolute w-full h-full top-0 left-0 bg-[#A63EE7]/10 border border-white/20 rounded-2xl flex items-center justify-center p-5"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <p className="text-sm md:text-base text-white/80">{text}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
