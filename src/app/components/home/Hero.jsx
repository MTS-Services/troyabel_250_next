"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Dual-Quote HERO
 * - Two animated intro slides that auto-rotate (configurable)
 * - Exact texts provided by the user
 * - CTA: "Book a Free Discovery Call"
 * - Background variants: "aurora" (default) | "dark-veil"
 * - Copy/paste into any Next.js/React project. TailwindCSS required.
 */
export default function Hero({
  variant = "aurora", // "aurora" | "dark-veil"
  autoCycle = true,
  cycleMs = 5500,
}) {
  const slides = [
    {
      id: "ux-career",
      // Heading
      title: "Master Every Stage of Your UX Career.",
      // Bulleted copy
      bullets: [
        "Industry leaders with experience at major corporations and a history of teaching design and UX at top universities nationwide.",
        "Forget one-size-fits-all bootcamps. Our team provides individualized coaching to build a unique portfolio that gets you hired and strategic mentoring to help you level up into a senior role.",
      ],
      cta: {
        label: "Book a Free Discovery Call",
        href: "#discovery-call",
      },
    },
    {
      id: "kolko-quote",
      title: "\"User Experience Bootcamps: A Dead-End\"",
      quote:
        "\"The collision of higher-ed bloat, Silicon Valley's appetite for disruption, and corporate-scale training led to thousands of largely unemployable UX designers\" – Jon Kolko",
      cta: {
        label: "Book a Free Discovery Call",
        href: "#discovery-call",
      },
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!autoCycle) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, cycleMs);
    return () => clearInterval(id);
  }, [autoCycle, cycleMs, slides.length]);

  const active = slides[index];

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background layer */}
      {variant === "aurora" ? <AuroraBG /> : <DarkVeilBG />}

      {/* Content container */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        {/* Progress dots */}
        <div className="mb-6 flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-8 bg-white/90" : "w-3 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Slide wrapper */}
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid items-center gap-10 lg:grid-cols-12"
          >
            {/* Copy */}
            <div className="lg:col-span-7">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.45 }}
                className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
              >
                {active.title}
              </motion.h1>

              {active.bullets ? (
                <ul className="mt-6 space-y-3 text-base/7 text-white/80 sm:text-lg/8">
                  {active.bullets.map((b, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.08, duration: 0.4 }}
                      className="flex gap-3"
                    >
                      <span className="mt-2 inline-block size-1.5 shrink-0 rounded-full bg-white/60" />
                      <span>{b}</span>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <motion.blockquote
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.4 }}
                  className="mt-6 text-pretty text-lg/8 text-white/80 sm:text-xl/9"
                >
                  {active.quote}
                </motion.blockquote>
              )}

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.45 }}
                className="mt-8 flex items-center gap-4"
              >
                <a
                  href={active.cta.href}
                  className="group inline-flex items-center gap-2 rounded-2xl bg-white/95 px-5 py-3 text-sm font-medium text-gray-900 shadow-lg shadow-black/10 ring-1 ring-black/5 backdrop-blur transition hover:bg-white"
                >
                  {active.cta.label}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </a>

                {/* Secondary action (optional) */}
                <button
                  onClick={() => setIndex((index + 1) % slides.length)}
                  className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-medium text-white/90 ring-1 ring-white/15 backdrop-blur transition hover:bg-white/15"
                >
                  Next
                </button>
              </motion.div>
            </div>

            {/* Visual / decorative side */}
            <div className="lg:col-span-5">
              <VisualPanel variant={variant} which={active.id} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* top gradient veil for readability */}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-gradient-to-b from-black/40 via-black/20 to-black/20" />
    </section>
  );
}

function VisualPanel({ variant, which }) {
  return (
    <div className="relative aspect-[5/4] w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-1 backdrop-blur">
      <div className="absolute inset-0 rounded-[22px] bg-gradient-to-br from-white/10 to-white/0" />
      {/* Slot with subtle motion shapes */}
      <motion.div
        key={which + variant}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <FloatingShapes />
      </motion.div>
    </div>
  );
}

function FloatingShapes() {
  const base = "absolute rounded-full blur-2xl opacity-70";
  return (
    <div className="absolute inset-0">
      <motion.div
        className={`${base} left-[-10%] top-[-10%] h-56 w-56 bg-white/20`}
        animate={{ y: [0, -10, 0], x: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${base} right-[-10%] bottom-[-10%] h-72 w-72 bg-white/10`}
        animate={{ y: [0, 12, 0], x: [0, -16, 0] }}
        transition={{ duration: 9.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className={`${base} left-[20%] top-[40%] h-44 w-44 bg-white/10`}
        animate={{ y: [0, -8, 0], x: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/** Aurora background inspired by reactbits.dev/backgrounds/aurora */
function AuroraBG() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[#0b0f1a]" />
      {/* aurora ribbons */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-16 top-10 h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#64ffd6]/30 via-[#64ffd6]/10 to-transparent blur-3xl"
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-10%] top-[-10%] h-[65vh] w-[55vw] rounded-full from-[#88a0ff]/30 via-[#88a0ff]/10 to-transparent blur-3xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]"
          animate={{ y: [0, 25, 0], rotate: [0, -8, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[10%] bottom-[-15%] h-[50vh] w-[50vw] rounded-full from-[#ff76e1]/25 via-[#ff76e1]/10 to-transparent blur-3xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))]"
          animate={{ y: [0, -15, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      {/* subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:36px_36px] opacity-20" />
    </div>
  );
}

/** Dark Veil background inspired by reactbits.dev/backgrounds/dark-veil */
function DarkVeilBG() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(255,255,255,0.15),transparent),radial-gradient(50%_60%_at_80%_100%,rgba(255,255,255,0.12),transparent),radial-gradient(50%_60%_at_0%_100%,rgba(255,255,255,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,10,15,0),rgba(10,10,15,0.6),rgba(10,10,15,0))]" />
      {/* dim noise */}
      <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.25)_1px,transparent_1px)] [background-size:24px_24px]" />
    </div>
  );
}
