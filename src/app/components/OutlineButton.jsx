export const OutlineButton = ({ OutLine, className }) => {
  return (
    <button
      className={`px-6 py-2 bg-white/5 border border-white/15 text-white text-base rounded-lg transition-all duration-300 blur-[.5px] ${className}`}
    >
      {OutLine}
    </button>
  );
};
