import { Button } from "../Button";
import { H2 } from "../HeadingStyle";

export const InteractiveCTA2 = () => {
  return (
    <section className="max-w-7xl mx-auto lg:my-16 md:my-12 my-8 px-4 sm:px-4 md:px-4 lg:px-4">
      <div className="">
        <H2
          className="max-w-[280px] md:max-w-[520px] lg:max-w-[620px] 
                       text-[22px] md:text-[30px] lg:text-[40px] 
                       font-medium text-white text-center mx-auto"
          nameH2={"Ready to Transform Your UX Career?"}
        />
        <p className="lg:max-w-[390px] max-w-[270px]  mx-auto text-center md:text-base text-sm font-normal text-white/80 blur-[0.2px] md:mb-4 md:mt-3 my-3">
          Book a free discovery call and let us guide you through every stage of
          your UX journey.
        </p>
        <div className="flex justify-center mt-5">
          <a href="#hero">
            <Button  id="hero" className={"btn"} text={"Return"} />
          </a>
        </div>
      </div>
    </section>
  );
};
