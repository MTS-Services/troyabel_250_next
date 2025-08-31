"use client";
import { SectionTitle } from "../SectionTitle";
import { motion } from "framer-motion";

const data = [
  {
    id: 1,
    image: "/image/testimonial/Andrew.png",
    name: "Dean Watson",
    role: "Managing director",
    company: "Farmland",
    review:
      "Radison transformed our workflow with incredible AI solutions. Their expertise truly exceeded all expectations!",
  },
  {
    id: 2,
    image: "/image/testimonial/Cory.png",
    name: "Emily Zhang",
    role: "CEO",
    company: "Futuresync",
    review:
      "Radison provided game-changing insights that helped us optimize processes and scale operations fast.",
  },
  {
    id: 3,
    image: "/image/testimonial/JimSpohrer.png",
    name: "James Carter",
    role: "Marketing director",
    company: "Innolystic",
    review:
      "Radison’s AI tools revolutionized how we work, saving time and driving our productivity forward.",
  },
  {
    id: 4,
    image: "/image/testimonial/Troy2025headshot.JPG",
    name: "Liam Walker",
    role: "Product manager",
    company: "Brightpath",
    review:
      "Working with Radison has been seamless. Their solutions are both innovative and highly effective.",
  },
  {
    id: 5,
    image: "/image/testimonial/Cory.png",
    name: "Miguel Torres",
    role: "IT consultant",
    company: "Alphaedge",
    review:
      "Thanks to Radison, we’ve achieved incredible growth by automating tasks and improving accuracy.",
  },
  {
    id: 6,
    image: "/image/testimonial/Andrew.png",
    name: "Priya Sharma",
    role: "Founder",
    company: "NexGen",
    review:
      "The team at Radison delivered outstanding results, improving our efficiency beyond what we imagined!",
  },
];

export const Testimonials = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 20 } },
  };

  return (
    <section className="max-w-[1200px] mx-auto lg:my-32 md:my-32 my-12 px-4 sm:px-4 md:px-4 lg:px-4">
      <SectionTitle
        heading={"Testimonials"}
        paragraph={"Discover how we’ve driven growth and innovation."}
        title={"Trusted by satisfied clients"}
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {data.map((item) => (
          <motion.div
            key={item.id}
            className="bg-[rgba(49,48,48,0.06)] border border-[rgba(255,255,255,0.1)] rounded-4xl px-4 md:px-5 lg:px-6 py-4 md:py-5 lg:py-6 text-white overflow-hidden"
            variants={cardVariants}
          >
            <div className="relative w-full mb-4">
              <p className="text-white/70 font-normal text-base blur-[0.5px]">"{item.review}"</p>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#512feb] blur-[56px]"></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 mt-4">
              <div className="w-12 h-12 flex-shrink-0 p-1 rounded-xl bg-white/20 blur-[0.1px]">
                <img className="w-full h-full rounded-xl object-cover" src={item.image} alt={item.name} />
              </div>

              <div className="mt-2 md:mt-0">
                <p className="text-lg text-white font-normal">{item.name}</p>
                <p className="text-white/70 font-light text-base flex items-center gap-1 blur-[0.5px]">
                  {item.role} : <span>{item.company}</span>
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
