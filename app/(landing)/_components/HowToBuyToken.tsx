import WalletStepsImage from "@/components/wallet-steps/WalletStepsImage";

const HowToBuyToken = () => {
  return (
    <section className="bg-[#1A1A1A] relative lg:mt-10 py-12 sm:py-16 lg:py-24">
      {/* Waitlist Badge */}
      <span className="bg-[#F2AA4C] text-black px-4 py-2 sm:py-3 rounded-full font-medium text-xs sm:text-base md:text-lg absolute left-1/2 transform -translate-x-1/2 -top-6 sm:-top-8">
        Join Cineflicks Waitlist
      </span>

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight sm:leading-snug lg:leading-normal">
          How to buy <span className="text-[#F2AA4C]">CNF Tokens?</span>
        </h2>

        {/* Wallet Steps Image */}
        <div className="mt-8 md:mt-10 lg:mt-12">
          <WalletStepsImage />
        </div>
      </div>
    </section>
  );
};

export default HowToBuyToken;
