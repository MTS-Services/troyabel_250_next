'use client';
import { motion } from 'framer-motion';
import { H3 } from './HeadingStyle';

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const SectionTitle = ({ title, paragraph }) => {
  return (
    <motion.section
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.35 }}
      variants={container}
      className='text-center px-4 sm:px-6 lg:px-8'
    >
      <motion.div variants={fadeUp}>
        <H3
          className='w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[400px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[900px] 
                     mx-auto text-center mb-3 sm:mb-4 md:mb-5 lg:mb-6
                     text-[20px] xs:text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] xl:text-[36px] 2xl:text-[40px] 
                     leading-tight sm:leading-tight md:leading-tight lg:leading-tight xl:leading-tight
                     text-[#6D6D6D]'
          nameH3={title}
        />
      </motion.div>

      <motion.p
        variants={fadeUp}
        className='w-full max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[450px] lg:max-w-[500px] xl:max-w-[550px]
                   mx-auto text-center 
                   mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-14
                   text-sm xs:text-sm sm:text-base md:text-base lg:text-lg xl:text-lg
                   leading-relaxed sm:leading-relaxed md:leading-relaxed lg:leading-relaxed
                   font-normal text-white px-2 sm:px-0'
      >
        {paragraph}
      </motion.p>
    </motion.section>
  );
};
