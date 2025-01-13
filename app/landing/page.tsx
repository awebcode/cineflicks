import Hero from "./_components/Hero";
import HowCanUseToken from "./_components/HowCanUseToken";
import HowMuchSubscription from "./_components/HowMuchSubscription";
import HowToBuyToken from "./_components/HowToBuyToken";
import Partners from "./_components/Partners";
import Testimonial from "./_components/Testimonial";
import Tokenomicis from "./_components/Tokenomicis";
import WhatItTheCineflix from "./_components/WhatItTheCineflix";

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <WhatItTheCineflix />
      <HowMuchSubscription />
      <HowToBuyToken />
      <HowCanUseToken />
      <Tokenomicis />
      <Partners />
      <Testimonial />
    </div>
  );
};

export default LandingPage;
