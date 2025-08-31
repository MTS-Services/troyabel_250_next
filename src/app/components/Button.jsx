import { HiArrowUpRight } from "react-icons/hi2";

export const Button = ({ text, className }) => {
  return (
    <button
      className={`flex justify-center items-center gap-2 px-3 py-2 lg:px-4 lg:py-[10px] rounded-lg text-white text-base font-medium bg-[#512FEB] ${className}`}
    >
      {text}
      <span>
        <HiArrowUpRight />
      </span>
    </button>
  );
};
