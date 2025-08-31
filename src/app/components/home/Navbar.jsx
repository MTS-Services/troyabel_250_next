"use client";
import { useState, useEffect } from "react";
import { Button } from "../Button";
import { motion, AnimatePresence } from "framer-motion";

const navData = [
  { id: 1, title: "Hero" },
  { id: 2, title: "Solution" },
  { id: 3, title: "How it works" },
  { id: 4, title: "Team" },
  { id: 5, title: "Pricing" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 100;
      navData.forEach((nav) => {
        const section = document.getElementById(nav.title.toLowerCase());
        if (section) {
          if (
            scrollPos >= section.offsetTop &&
            scrollPos < section.offsetTop + section.offsetHeight
          ) {
            setActive(nav.title.toLowerCase());
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Navbar */}
      <header className="w-full fixed top-0 left-0 z-50">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between h-[60px] px-6 bg-[#000000] border border-white/15 rounded-lg">
            <h2 className="text-[12px] md:text-[16px] lg:text-[20px] font-bold text-white items-center transition-transform duration-500 hover:animate-spin inline-block">
              Dr <span>.</span> T
            </h2>

            <ul className="hidden md:flex items-center space-x-6 md:space-x-4">
              {navData.map((nav) => (
                <li key={nav.id}>
                  <a
                    href={`#${nav.title.toLowerCase()}`}
                    className={`text-base font-medium cursor-pointer transition-colors px-3 py-1 rounded-lg scroll-mt-24 ${
                      active === nav.title.toLowerCase()
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-white hover:bg-gray-900"
                    }`}
                  >
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>

            <div className="hidden md:block">
              <Button
                className={
                  "md:text-[12px] md:px-2 md:py-2 lg:px-4 lg:py-3 lg:text-base"
                }
                text={"Get Started"}
              />
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="text-white focus:outline-none text-2xl"
              >
                {open ? "✖" : "☰"}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="md:hidden mt-2 rounded-lg bg-[#000000] border border-white/15 px-6 py-4"
              >
                <ul className="flex flex-col space-y-4">
                  {navData.map((nav) => (
                    <li key={nav.id}>
                      <a
                        href={`#${nav.title.toLowerCase()}`}
                        onClick={() => setOpen(false)}
                        className={`text-base font-medium cursor-pointer transition-colors px-3 py-1 rounded-lg scroll-mt-20 ${
                          active === nav.title.toLowerCase()
                            ? "bg-blue-600 text-white shadow-lg"
                            : "text-white hover:bg-gray-900"
                        }`}
                      >
                        {nav.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <Button text={"Get Started"} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
};
