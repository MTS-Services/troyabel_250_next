import React from "react";
import { CiLinkedin } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaThreads } from "react-icons/fa6";

export const Footer = () => {
  const socialIcons = [
    CiLinkedin,
    RiTwitterXFill,
    FaInstagram,
    CiFacebook,
    FaThreads,
  ];

  return (
    <footer className="bg-gradient-to-br from-white/4 via-[#512feb] to-white/4 border-t border-white/10 py-10 px-4 sm:px-4 md:px-4 lg:px-4">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row justify-between gap-10 px-4">
        {/* Left Section */}
        <div className="flex-1 text-left">
          <h2 className="text-2xl md:text-3xl font-semibold flex items-center gap-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25.714"
              height="26.25"
              fill="none"
            >
              <path
                d="M 12.857 6.563 C 12.857 10.187 9.979 13.125 6.429 13.125 L 0 13.125 L 0 6.563 C 0 2.938 2.878 0 6.429 0 C 9.979 0 12.857 2.938 12.857 6.563 Z M 12.857 19.688 C 12.857 16.063 15.735 13.125 19.286 13.125 L 25.714 13.125 L 25.714 19.688 C 25.714 23.312 22.836 26.25 19.286 26.25 C 15.735 26.25 12.857 23.312 12.857 19.688 Z M 0 19.688 C 0 23.312 2.878 26.25 6.429 26.25 L 12.857 26.25 L 12.857 19.688 C 12.857 16.063 9.979 13.125 6.429 13.125 C 2.878 13.125 0 16.063 0 19.688 Z M 25.714 6.563 C 25.714 2.938 22.836 0 19.286 0 L 12.857 0 L 12.857 6.563 C 12.857 10.187 15.735 13.125 19.286 13.125 C 22.836 13.125 25.714 10.187 25.714 6.563 Z"
                fill="rgb(255, 255, 255)"
              />
            </svg>
            Radison
          </h2>
          <p className="mt-3 text-white/70 text-sm md:text-base max-w-xs">
            Your trusted partner in AI solutions, creating smarter systems for
            smarter businesses.
          </p>

          {/* Social Icons */}
          <div className="flex gap-3 mt-4 flex-wrap">
            {socialIcons.map((Icon, i) => (
              <button
                key={i}
                className="text-xl md:text-2xl bg-white/10 hover:bg-white/20 transition rounded-lg p-2 text-white"
              >
                <Icon />
              </button>
            ))}
          </div>
        </div>

        {/* <div className="bg-gradient-to-br from-white/4 via-[#512feb] to-white/4 border-t"></div> */}

        {/* Middle Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-6 sm:gap-0 mt-6 sm:mt-0">
          <div className="sm:w-[45%]">
            <h3 className="font-semibold text-white text-lg">Sections</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">Process</li>
              <li className="hover:text-white cursor-pointer">Services</li>
              <li className="hover:text-white cursor-pointer">Benefits</li>
              <li className="hover:text-white cursor-pointer">Plans</li>
              <li className="hover:text-white cursor-pointer">Contact</li>
            </ul>
          </div>
          <div className="sm:w-[45%] mt-6 sm:mt-0">
            <h3 className="font-semibold text-white text-lg">Pages</h3>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Coming soon</li>
              <li className="hover:text-white cursor-pointer">404</li>
            </ul>
          </div>
        </div>
      </div>

      {/* <div className="border-t border-gray-700 max-w-full"></div> */}
      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-6 pt-6 flex flex-col md:flex-row items-center justify-center md:justify-between text-sm text-white/70 gap-3 text-center">
        <div>Use template</div>
        <div>
          Visioned and Crafted by{" "}
          <span className="text-white">Kanishk Dubey</span>
        </div>
        <div>© All rights reserved</div>
      </div>
    </footer>
  );
};
