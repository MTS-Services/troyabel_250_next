"use client";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Layers3, BrainCircuit, Clock } from "lucide-react";

// Optional: If you use Next.js Link, swap <a> for <Link>.
export default function ProgramsPricing() {
  const items = [
    {
      id: 1,
      label: "The Career Transformation Accelerator",
      blurb:
        "A fully customized, one‑on‑one mentorship guiding you through every step of a career change into UX/UI design.",
      points: [
        "Foundational design education",
        "UX/UI design‑focused training",
        "Technical / software tutoring",
        "The future of designing with AI",
        "Customized portfolio design case studies",
        "UX Research exercises",
        "Portfolio presentation guidelines",
        "Interview coaching",
      ],
      price: "Starting at $6,500",
      note: "Variable rate depending on current background and skills",
      cta: { label: "Book the Accelerator", href: "#book-accelerator" },
      icon: Sparkles,
      accent: "from-fuchsia-500/20 to-indigo-500/20",
    },
    {
      id: 2,
      label: "Portfolio Level‑Up",
      blurb:
        "For experienced UX pros (ICs or leaders) targeting senior, lead, or principal roles. Reframe your work to spotlight strategic impact and leadership.",
      points: ["2–3 customized portfolio design case studies"],
      price: "Starting at $1,500",
      cta: { label: "Book Portfolio Level‑Up", href: "#book-portfolio" },
      icon: Layers3,
      accent: "from-emerald-500/20 to-teal-500/20",
    },
    {
      id: 3,
      label: "Designing with AI Level‑Up",
      blurb:
        "Master the next wave of UX. Learn to design human‑centered AI products, features, and systems.",
      points: [
        "Conversational design",
        "Designing for prompt engines",
        "AI UX Design",
        "AI UX Strategy",
        "Designing augmented customized user experiences",
        "Agentic agent design",
      ],
      price: "Starting at $2,500",
      cta: { label: "Book AI Level‑Up", href: "#book-ai" },
      icon: BrainCircuit,
      accent: "from-amber-500/20 to-rose-500/20",
    },
    {
      id: 4,
      label: "À La Carte Sessions",
      blurb:
        "Have a specific UX/UI challenge? Book hourly sessions to tackle a tricky problem, level up a portfolio fast, or prep for an interview.",
      points: ["Flat‑rate $200/hour"],
      price: "Flat‑rate $200/hour",
      cta: { label: "Book a Session", href: "#book-alacarte" },
      icon: Clock,
      accent: "from-sky-500/20 to-cyan-500/20",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const item = {
    hidden: { y: 18, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 90, damping: 14 } },
  };

  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 text-white">
      {/* Subtle background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/0 dark:from-transparent" />
        <div className="absolute -top-32 right-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.18),transparent_60%)] blur-2xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-16">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Programs & Pricing
          </h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Choose a path that fits your goals—from a full career transition to targeted, high‑impact sessions.
          </p>
        </div>

        <motion.ul
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {items.map((pkg) => (
            <motion.li key={pkg.id} variants={item} className="group">
              <article
                className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/60 p-6 shadow-sm backdrop-blur-md transition hover:shadow-lg dark:border-white/10 dark:bg-neutral-900/60"
              >
                {/* Accent strip */}
                <div className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${pkg.accent}`} />

                <div className="flex items-start gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/80 p-2 shadow-sm backdrop-blur dark:bg-neutral-900/80">
                    <pkg.icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-semibold leading-tight sm:text-2xl">
                      {pkg.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {pkg.blurb}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 space-y-2.5 text-sm">
                  {pkg.points.map((pt, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 flex-none rounded-full bg-foreground/70" />
                      <span className="opacity-90">{pt}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-semibold">{pkg.price}</p>
                    {pkg.note && (
                      <p className="text-xs text-muted-foreground">{pkg.note}</p>
                    )}
                  </div>

                  <a
                    href={pkg.cta.href}
                    className="group/cta inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-foreground px-4 py-2 text-sm font-medium text-background shadow transition hover:translate-y-[-1px] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-foreground/30"
                  >
                    {pkg.cta.label}
                    <ArrowRight className="h-4 w-4 transition group-hover/cta:translate-x-0.5" />
                  </a>
                </div>
              </article>
            </motion.li>
          ))}

          {/* Featured card spanning 2 cols on XL for visual balance */}
          <motion.li variants={item} className="xl:col-span-3">
            <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600 via-violet-600 to-fuchsia-600 p-6 text-white shadow-md">
              <div className="absolute inset-0 bg-[radial-gradient(1200px_400px_at_90%_-10%,rgba(255,255,255,0.25),transparent)]" />
              <div className="relative flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Not sure where to start?
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm/relaxed opacity-90">
                    Book a quick discovery call and we’ll help you choose the right path.
                  </p>
                </div>
                <a
                  href="#book-discovery"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold text-neutral-900 shadow hover:bg-white"
                >
                  Book a Discovery Call
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          </motion.li>
        </motion.ul>
      </div>
    </section>
  );
}
