export const H1 = ({nameH1, className}) => {
  return <h1 className={`sm:text-[35px] md:text-[48px] lg:text-[60px] font-medium text-white ${className}`}>{nameH1}</h1>;
};

export const H2 = ({nameH2, className}) => {
  return <h2 className={`sm:text-[36px] md:text-[44px] lg:text=[50px] font-medium text-white ${className}`}>{nameH2}</h2>;
};

export const H3 = ({nameH3, className}) => {
  return <h3 className={`sm:text-[26px] md:text-[34px] lg:text-[40px] font-medium text-white ${className}`}>{nameH3}</h3>;
};

export const H4 = ({nameH4, className}) => {
  return <h4 className={`sm:text-[18px] md:text-[23px] lg:text-[28px] font-medium text-white ${className}`}>{nameH4}</h4>;
};
