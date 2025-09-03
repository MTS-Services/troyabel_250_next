"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SectionTitle } from "../SectionTitle";

// Team Members Data
const teamMembers = [
  {
    name: "Dr. Troy Abel (Dr. T)",
    designation: ["PhD Human-Computer Interaction", "MFA Visual Communication"],
    role: "President & Lead educator",
    front: `Dr. T has worn many hats throughout his career, from being the hiring manager who assesses talent to the professor sharing knowledge with eager minds. His diverse experiences have equipped him with a deep understanding of what it truly takes to excel in UX design, strategy, and research.`,
    back: `Dr. Abel is a seasoned design leader with over 15 years of experience spanning both academia and industry. As a former design professor at Iowa State University, Virginia Tech, and the University of North Texas, he brings a unique blend of academic rigor and real-world insight to his work. His time in higher education was dedicated to shaping the next generation of designers through research-driven teaching and mentorship. In industry, Dr. T leads high-performing teams that deliver innovative, user-centered solutions with clarity, precision, and purpose. Grounded in research, strategy, and a deep commitment to collaboration, he fosters a culture of growth, creativity, and excellence—consistently driving product innovation and strong business outcomes.`,
    badges: [
      { text: "Portfolio Strategy", color: "bg-purple-800" },
      { text: "UX Career Transition", color: "bg-blue-800" },
      { text: "User Research", color: "bg-pink-800" },
    ],
    headshot: "/image/team/headshot.jpg",
  },
  {
    name: "Andrew Schall",
    role: "Team educator",
    front: `Andrew Schall is a UX leader, researcher, and strategist with 20+ years of experience driving innovation at organizations including ServiceNow, Mayo Clinic, Citibank, Office Depot, and Southwest Airlines.`,
    back: `He is the author of The Persona and Journey Map Playbook and co-author of Eye Tracking in User Experience. Andrew is an experienced instructor teaching user experience courses as an adjunct faculty member at the Maryland Institute College of Art (MICA) Design.`,
    badges: [
      { text: "UX Research Expert", color: "bg-purple-800" },
      { text: "Author", color: "bg-blue-800" },
      { text: "Education", color: "bg-pink-800" },
    ],
    headshot: "/image/team/Andrew.png",
  },
  {
    name: "Cory Lebson",
    role: "Team educator",
    front: `Cory is a principal research consultant and small business owner, leading research projects for a variety of clients across sectors, managing small teams of staff and contractors, and taking care of all business operations. I’m most excited by qualitative, real-time research, especially when it involves in-person interactions with actual or representative users.`,
    back: `(TO BE SUPPLIED)`,
    badges: ["(TO BE SUPPLIED)"],
    headshot: "/image/team/Cory.png",
  },
];

// Custom Carousel Arrows
const PrevArrow = ({ onClick }) => (
  <button
    className="slick-prev absolute left-2 top-1/2 -translate-y-1/2 z-50 text-white text-2xl"
    onClick={onClick}
  >
    &#10094;
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="slick-next absolute right-2 top-1/2 -translate-y-1/2 z-50 text-white text-2xl"
    onClick={onClick}
  >
    &#10095;
  </button>
);

export default function TeamSection() {
  const [flipped, setFlipped] = useState(false);
  const flipTimer = useRef(null);

  useEffect(() => {
    flipTimer.current = setTimeout(() => setFlipped((prev) => !prev), 3000);
    return () => clearTimeout(flipTimer.current);
  }, [flipped]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section
      id="team"
      className="w-full bg-gradient-to-r from-[#0a0a0a] via-[#1a0f24] to-[#0a0a0a] text-white lg:py-8 md:py-7 sm:py-6 py-5"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <SectionTitle title={"Meet the Team"} />

        <Slider {...settings}>
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="px-[10px] sm:px-3" // sm up → 12px, below 640px → 40px
            >
              <TeamCard member={member} flipped={flipped} />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

function TeamCard({ member, flipped }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="md:w-[430px] sm:w-[400px] w-[360px] md:h-[510px] sm:-h-[450px] h-[640px] mx-auto mb-6"
    >
      <div className="w-full h-full relative" style={{ perspective: "1000px" }}>
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Front */}
          <div
            className="absolute w-full h-full top-0 left-0 bg-[#A63EE7]/5 border border-white/20 rounded-2xl flex flex-col p-5"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={member.headshot}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="my-auto">
                <h3 className="text-[20px] font-normal text-white/90">
                  {member.name}
                </h3>
                <p className="text-[16px] font-normal text-[#ACADBC] mb-2">
                  {member.role}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center my-auto">
              <p className="w-full block text-left px-2 sm:px-4 text-base text-white/80 font-normal">
                {member.front}
              </p>
              {Array.isArray(member?.designation) &&
                member.designation.length > 0 && (
                  <div className="mt-4">
                    <ul className="space-y-1 text-sm text-gray-200 list-disc list-inside text-left">
                      {member.designation.map((deg, idx) => (
                        <li key={idx}>{deg}</li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            <div className="mt-auto flex gap-2 flex-wrap justify-center">
              {member.badges.map((badge, index) => (
                <span
                  key={index}
                  className={`${
                    badge?.color || "bg-gray-700"
                  } px-3 py-1 mt-1 rounded-full text-xs font-normal text-white border border-white/20 shadow-sm`}
                >
                  {badge?.text || badge}
                </span>
              ))}
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute w-full h-full top-0 left-0 bg-[#A63EE7]/10 border border-white/20 rounded-2xl flex flex-col p-5 overflow-auto"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex flex-col justify-center h-full overflow-hidden">
              <div className="flex flex-col items-center my-auto py-4">
                <p className="w-full block text-left px-2 sm:px-4 text-base text-white/70">
                  {member.back}
                </p>
              </div>
            </div>
            <div className="mt-auto flex gap-2 flex-wrap justify-center">
              {member.badges.map((badge, index) => (
                <span
                  key={index}
                  className={`${
                    badge?.color || "bg-gray-700"
                  } px-3 py-1 mt-1 rounded-full text-xs font-medium text-white border border-white/20 shadow-sm`}
                >
                  {badge?.text || badge}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
