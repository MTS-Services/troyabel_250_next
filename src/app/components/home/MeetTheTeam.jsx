"use client";
import { motion } from "framer-motion";
import Image from "next/image";

// Card component for reusability
function TeamCard({ member }) {
  return (
    <motion.div
      whileHover={{ rotateY: 180 }}
      className="relative h-[420px] w-full [transform-style:preserve-3d]"
    >
      {/* Front */}
      <div className="absolute inset-0 flex flex-col rounded-2xl border border-white/10 bg-white/70 p-6 shadow-md backdrop-blur-md [backface-visibility:hidden] dark:bg-neutral-900/70">
        <div className="flex items-center gap-4">
          <Image
            src={member.image}
            alt={member.name}
            width={80}
            height={80}
            className="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed">{member.front}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {member.badges.map((badge, i) => (
            <li
              key={i}
              className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100"
            >
              {badge}
            </li>
          ))}
        </ul>
      </div>

      {/* Back */}
      <div className="absolute inset-0 rotate-y-180 rounded-2xl border border-white/10 bg-white/90 p-6 text-sm leading-relaxed shadow-md [backface-visibility:hidden] dark:bg-neutral-900/90">
        {member.back ? (
          <p>{member.back}</p>
        ) : (
          <p className="italic text-muted-foreground">Back content coming soon...</p>
        )}
      </div>
    </motion.div>
  );
}

export default function MeetTheTeam() {
  // 👉 Add/remove members here easily
  const teamMembers = [
    {
      name: "Dr. Troy Abel (Dr. T)",
      role: "President & Lead Educator",
      image: "/images/team/dr-troy.jpg", // replace with headshot
      front:
        "Dr. T has worn many hats throughout his career, from being the hiring manager who assesses talent to the professor sharing knowledge with eager minds. His diverse experiences have equipped him with a deep understanding of what it truly takes to excel in UX design, strategy, and research. PhD Human-Computer Interaction, MFA Visual Communication.",
      back:
        "Dr. Abel is a seasoned design leader with over 15 years of experience spanning both academia and industry. As a former design professor at Iowa State University, Virginia Tech, and the University of North Texas, he brings a unique blend of academic rigor and real-world insight to his work. In industry, Dr. T leads high-performing teams that deliver innovative, user-centered solutions with clarity, precision, and purpose.",
      badges: ["Portfolio Strategy", "UX Career Transition", "User Research"],
    },
    {
      name: "Andrew Schall",
      role: "Team Educator",
      image: "/images/team/andrew-schall.jpg",
      front:
        "Andrew Schall is a UX leader, researcher, and strategist with 20+ years of experience driving innovation at organizations including ServiceNow, Mayo Clinic, Citibank, Office Depot, and Southwest Airlines.",
      back:
        "He is the author of The Persona and Journey Map Playbook and co-author of Eye Tracking in User Experience. Andrew is an experienced instructor teaching user experience courses as an adjunct faculty member at the Maryland Institute College of Art (MICA) Design.",
      badges: ["UX Research Expert", "Author", "Education"],
    },
    {
      name: "Cory Lebson",
      role: "Team Educator",
      image: "/images/team/cory-lebson.jpg",
      front:
        "Cory is a principal research consultant and small business owner, leading research projects for a variety of clients across sectors, managing small teams of staff and contractors, and taking care of all business operations.",
      back: null, // content to be supplied later
      badges: [], // badges to be supplied later
    },
  ];

  return (
    <section className="w-full py-16 sm:py-20 lg:py-24 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Meet the Team
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Our educators and mentors bring decades of combined expertise in UX, design, and research.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
