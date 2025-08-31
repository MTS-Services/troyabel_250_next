"use client";
import { motion } from "framer-motion";
import { SectionTitle } from "../SectionTitle";

const teamMembers = [
  {
    name: "Dr. Troy Abel (Dr. T)",
    role: "President & Lead Educator",
    front: `Dr. T has worn many hats throughout his career, from being the hiring manager who assesses talent to the professor sharing knowledge with eager minds. His diverse experiences have equipped him with a deep understanding of what it truly takes to excel in UX design, strategy, and research.`,
    back: `Dr. Abel is a seasoned design leader with over 15 years of experience spanning both academia and industry. As a former design professor at Iowa State University, Virginia Tech, and the University of North Texas, he brings a unique blend of academic rigor and real-world insight to his work.
   
In industry, Dr. T leads high-performing teams that deliver innovative, user-centered solutions with clarity, precision, and purpose. Grounded in research, strategy, and a deep commitment to collaboration, he fosters a culture of growth, creativity, and excellence.`,
    badges: ["Portfolio Strategy", "UX Career Transition", "User Research"],
    headshot: "/image/team/Andrew.png",
  },
  {
    name: "Andrew Schall",
    role: "Team Educator",
    front: `Andrew Schall is a UX leader, researcher, and strategist with 20+ years of experience driving innovation at organizations including ServiceNow, Mayo Clinic, Citibank, Office Depot, and Southwest Airlines.`,
    back: `He is the author of The Persona and Journey Map Playbook and co-author of Eye Tracking in User Experience. Andrew is an experienced instructor teaching user experience courses as an adjunct faculty member at the Maryland Institute College of Art (MICA) Design.`,
    badges: ["UX Research Expert", "Author", "Education"],
    headshot: "/image/team/Cory.png",
  },
  {
    name: "Cory Lebson",
    role: "Team Educator",
    front: `Cory is a principal research consultant and small business owner, leading research projects for a variety of clients across sectors, managing small teams of staff and contractors, and taking care of all business operations.`,
    back: "(TO BE SUPPLIED)",
    badges: ["(TO BE SUPPLIED)"],
    headshot: "/image/team/headshot.jpg",
  },
];

export default function TeamSection() {
  return (
    <section
      id="team"
      className="w-full bg-gradient-to-r from-[#0a0a0a] via-[#1a0f24] to-[#0a0a0a] text-white lg:py-12 md:py-9 sm:py-7 py-5"
    >
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <SectionTitle
          heading={"Team"}
          paragraph={
            "Our experts guide you through UX transformation with experience andstrategy."
          }
          title={"Meet the Team"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Flip Card Component (hover-to-flip)
function TeamCard({ member }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
      className="w-full h-[434px]"
    >
      <div
        className="w-full h-full relative group"
        style={{ perspective: "1000px" }} // flip perspective
      >
        <div
          className="relative w-full h-full transition-transform duration-[1200ms] group-hover:[transform:rotateY(180deg)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div
            className="absolute w-full h-full top-0 left-0 bg-white/10 border border-white/20 rounded-2xl flex flex-col p-5"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Uporer content */}
            <div className="flex flex-col items-center">
              <img
                src={member.headshot}
                alt={member.name}
                className="w-24 h-24 rounded-full mb-3"
              />
              <h3 className="text-[20px] font-medium text-white/90">
                {member.name}
              </h3>
              <p className="text-[16px] font-medium text-white/90 mb-2">
                {member.role}
              </p>
              <p className="text-sm text-white/70 text-center">
                {member.front}
              </p>
            </div>

            {/* Badges always niche thakbe */}
            <div className="mt-auto flex gap-2 flex-wrap justify-center pt-4">
              {member.badges.map((badge, i) => (
                <span
                  key={i}
                  className="bg-purple-600 text-xs px-2 py-1 mt-1 rounded"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute w-full h-full top-0 left-0 bg-[#A63EE7]/10 border border-white/20 rounded-2xl flex flex-col items-center justify-center p-5 overflow-auto"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
            <p className="text-sm text-white/70">{member.back}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
