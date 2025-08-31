"use client";
import { MdOutlineEmail } from "react-icons/md";
import { BiPhoneCall } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { H2 } from "../HeadingStyle";
import { SectionTitle } from "../SectionTitle";
import { motion } from "framer-motion";

export const Contacts = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    console.log("Form submitted!", name, email, message);
  };

  const leftDivVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 70, damping: 20, delay: 0.2 },
    },
  };

  const rightDivVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 70, damping: 20, delay: 0.2 },
    },
  };

  return (
    <section
      id="contact"
      className="scroll-mt-[80px] max-w-[1200px] mx-auto lg:my-32 md:my-32 my-12 px-4 sm:px-4 md:px-4 lg:px-4"
    >
      <SectionTitle heading={"Contacts"} paragraph={""} title={""} />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 md:gap-8 lg:gap-10">
        {/* Left Div */}
        <motion.div
          className="w-full text-center md:text-left mx-auto md:order-1 order-1"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={leftDivVariants}
        >
          <H2
            className="max-w-[500px] md:max-w-[460px] lg:max-w-[600px] 
               text-[28px] md:text-[40px] lg:text-[50px] 
               font-medium text-white mx-auto md:mx-0"
            nameH2={"Ask whatever you have in your mind"}
          />
          <p
            className="text-base md:text-base lg:text-lg font-normal 
                text-white/80 blur-[0.4px] my-3 mb-8 
                max-w-[533px] mx-auto md:mx-0"
          >
            Whether you have questions or are ready to discuss your business,
            we’re here to help. Reach out today.
          </p>
          <ul className="text-base font-light blur-[0.4px] space-y-2 flex flex-col items-center md:items-start">
            <li className="flex items-center gap-3 text-white/70">
              <MdOutlineEmail className="w-6 h-6" />
              Wadmin@raddision.com
            </li>
            <li className="flex items-center gap-3 text-white/70">
              <BiPhoneCall className="w-6 h-6" />
              (969) 819-8061
            </li>
            <li className="flex items-center gap-3 text-white/70">
              <CiLocationOn className="w-6 h-6" />
              43 Roselle St. New York
            </li>
          </ul>
        </motion.div>

        {/* Right Div */}
        <motion.div
          className="text-[#ffffffb3] md:order-2 order-2 md:px-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={rightDivVariants}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="text-[12px] text-white font-light"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                placeholder="Full Name"
                className="w-full px-3 py-2 mt-[8px] text-white border border-white/5 
               focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
               rounded-md bg-[#FFFFFF0F] outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="text-[12px] text-white font-light"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 mt-[8px] text-white border border-white/5 
               focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
               rounded-md bg-[#FFFFFF0F] outline-none"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="text-[12px] text-white font-light"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Enter your message here..."
                className="w-full px-3 py-2 mt-[8px] text-white border border-white/5 
               focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
               rounded-md bg-[#FFFFFF0F] outline-none"
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-6 py-2 text-white bg-[#512FEB] rounded-md 
              hover:bg-[#313131] transition-colors duration-300"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
