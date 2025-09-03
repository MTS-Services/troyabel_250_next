"use client";
import { useState } from "react";
import { SectionTitle } from "../SectionTitle";

const faqs = [
  {
    question: "What's the difference between your coaching and a UX bootcamp?",
    answer:
      "Bootcamps offer a one-size-fits-all curriculum. My coaching is 100% personalized to you. We leverage your unique background, focus on your specific goals, and build a portfolio that is uniquely yours, not a copy of a class assignment. Additionally, we tap into a broad network of academic and design industry experts.",
  },
  {
    question: "Do I need a design or tech background to succeed?",
    answer:
      "Absolutely not. Some of the best UX professionals come from diverse fields like psychology, teaching, marketing, and customer service. I specialize in helping you translate your existing experience into the language of UX.",
  },
  {
    question: "How long does the process take?",
    answer:
      "The Career Pivot Accelerator program typically takes 3-6 months, depending on your pace and starting point. The goal is not speed, but to build a durable, high-quality foundation for a long-term career.",
  },
  {
    question: "Do you guarantee a job?",
    answer:
      "No one can ethically guarantee a job. However, I guarantee that I will provide you with the exact strategies, tools, and portfolio assets that have successfully launched careers at top companies. Your success is my success, and I am fully invested in your outcome.",
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto lg:my-20 md:my-16 my-12 px-4 sm:px-4 md:px-4 lg:px-4">
      <div className="mx-auto px-4 max-w-[950px]">
        <SectionTitle
          title={"We’re here to help"}
        />

        {/* Accordion */}
        <div className="lg:space-y-6 md:space-y-5 sm:space-y-4 space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white/[3%] px-7 py-5 rounded-[15px]">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left text-white text-base font-medium focus:outline-none blur-[0.3px]"
              >
                {faq.question}
                <svg
                  className={`w-5 h-5 transition-transform duration-500 ease-in-out ${
                    openIndex === index
                      ? "rotate-180 text-gray-500"
                      : "text-gray-500"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Answer */}
              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${
                  openIndex === index
                    ? "max-h-96 opacity-100 mt-3"
                    : "max-h-0 opacity-0"
                }`}
              >
                <li className="text-white/70 blur-[0.5px] text-base leading-relaxed">
                  {faq.answer}
                </li>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
