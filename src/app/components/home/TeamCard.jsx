"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "../SectionTitle";

const teamMembers = [
  {
    name: "Dr. Troy Abel (Dr. T)",
    designation: ["PhD Human-Computer Interaction", "MFA Visual Communication"],
    role: "President & Lead educator",
    front: `Dr. T has worn many hats throughout his career, from being the hiring manager who assesses talent to the professor sharing knowledge with eager minds. His diverse experiences have equipped him with a deep understanding of what it truly takes to excel in UX design, strategy, and research.`,
    back: `Dr. Abel is a seasoned design leader with over 15 years of experience spanning both academia and industry. As a former design professor at Iowa State University, Virginia Tech, and the University of North Texas, he brings a unique blend of academic rigor and real-world insight to his work. His time in higher education was dedicated to shaping the next generation of designers through research-driven teaching and mentorship.
In industry, Dr. T leads high-performing teams that deliver innovative, user-centered solutions with clarity, precision, and purpose. Grounded in research, strategy, and a deep commitment to collaboration, he fosters a culture of growth, creativity, and excellence—consistently driving product innovation and strong business outcomes.
MFA Visual Communication`,
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
    front: `Andrew Schall is a UX leader, researcher, and strategist with 20+ years of experience driving innovation at organizations including ServiceNow, Mayo Clinic, Citibank, Office Depot, and Southwest Airlines. `,
    back: `He is the author of The Persona and Journey Map Playbook and co-author of Eye Tracking in User Experience. Andrew is an experienced instructor teaching user experience courses as an adjunct faculty member at the Maryland Institute College of Art (MICA) Design.`,
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

export default function TeamSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setFlipped((prev) => !prev);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  useEffect(() => {
    if (flipped === false && !isPaused) {
      setCurrentIndex((prev) => (prev + 1) % teamMembers.length);
    }
  }, [flipped, isPaused]);

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  return (
    <section
      id="team"
      className="w-full bg-gradient-to-r from-[#0a0a0a] via-[#1a0f24] to-[#0a0a0a] text-white lg:py-8 md:py-7 sm:py-6 py-5"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <SectionTitle title={"Meet the Team"} />

        <div
          className="flex justify-center"
          onMouseEnter={handlePause}
          onMouseLeave={handleResume}
          onTouchStart={handlePause}
          onTouchEnd={handleResume}
        >
          <TeamCard member={teamMembers[currentIndex]} flipped={flipped} />
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member, flipped }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-[430px] h-[510px]"
    >
      <div className="w-full h-full relative" style={{ perspective: "1000px" }}>
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Front */}
          <div
            className="absolute w-full h-full top-0 left-0 bg-[#A63EE7]/5 border border-white/20 rounded-2xl flex flex-col p-5"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-center lg:gap-6 md:gap-5 sm:gap-4 gap-4">
                <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src={member.headshot}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="my-auto">
                  <h3 className="text-[20px] font-medium text-white/90 w-full h-full rounded-full">
                    {member.name}
                  </h3>
                  <p className="text-[16px] font-medium text-[#ACADBC] mb-2">
                    {member.role}
                  </p>
                </div>
              </div>
            <div className="flex flex-col items-center my-auto">
              <p className="text-base text-white/80 text-center">
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
          </div>

          {/* Back */}
          <div
            className="absolute w-full h-full top-0 left-0 bg-[#A63EE7]/10 border border-white/20 rounded-2xl flex flex-col p-5 overflow-auto"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex flex-col justify-center h-full">
              {/* <div className="flex items-center lg:gap-6 md:gap-5 sm:gap-4 gap-4">
                <div className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src={member.headshot}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="my-auto">
                  <h3 className="text-[20px] font-medium text-white/90 w-full h-full rounded-full">
                    {member.name}
                  </h3>
                  <p className="text-[16px] font-medium text-[#ACADBC] mb-2">
                    {member.role}
                  </p>
                </div>
              </div> */}

              <div className="flex flex-col items-center my-auto py-4">
                <p className="text-base text-white/70">{member.back}</p>
              </div>
            </div>

            {/* Badges */}
            <div className="mt-auto flex gap-2 flex-wrap justify-center">
              {member.badges.map((badge, index) => (
                <span
                  key={index}
                  className={`${badge?.color} px-3 py-1 mt-1 rounded-full text-xs font-medium text-white border border-white/20 shadow-sm`}
                >
                  {badge?.text}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Flip Card Component (hover-to-flip)
// function TeamCard({ member }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.9 }}
//       viewport={{ once: true }}
//       className="w-full h-[434px]"
//     >
//       <div
//         className="w-full h-full relative group"
//         style={{ perspective: "1000px" }} // flip perspective
//       >
//         <div
//           className="relative w-full h-full transition-transform duration-[1200ms] group-hover:[transform:rotateY(180deg)]"
//           style={{ transformStyle: "preserve-3d" }}
//         >
//           {/* Front */}
//           <div
//             className="absolute w-full h-full top-0 left-0 bg-white/10 border border-white/20 rounded-2xl flex flex-col p-5"
//             style={{ backfaceVisibility: "hidden" }}
//           >
//             {/* Uporer content */}
//             <div className="flex flex-col items-center">
//               <img
//                 src={member.headshot}
//                 alt={member.name}
//                 className="w-24 h-24 rounded-full mb-3"
//               />
//               <h3 className="text-[20px] font-medium text-white/90">
//                 {member.name}
//               </h3>
//               <p className="text-[16px] font-medium text-white/90 mb-2">
//                 {member.role}
//               </p>
//               <p className="text-sm text-white/70 text-center">
//                 {member.front}
//               </p>
//             </div>

//             {/* Badges always niche thakbe */}
//             <div className="mt-auto flex gap-2 flex-wrap justify-center pt-4">
//               {member.badges.map((badge, i) => (
//                 <span
//                   key={i}
//                   className="bg-purple-600 text-xs px-2 py-1 mt-1 rounded"
//                 >
//                   {badge}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Back */}
//           <div
//             className="absolute w-full h-full top-0 left-0 bg-[#A63EE7]/10 border border-white/20 rounded-2xl flex flex-col items-center justify-center p-5 overflow-auto"
//             style={{
//               backfaceVisibility: "hidden",
//               transform: "rotateY(180deg)",
//             }}
//           >
//             <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
//             <p className="text-sm text-white/70">{member.back}</p>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }
