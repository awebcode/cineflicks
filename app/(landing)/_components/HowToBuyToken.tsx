import { Img } from "@/components/common/Img";

const HowToBuyToken = () => {
  return (
    <section className=" bg-[#190F04] relative  lg:my-10 py-16 lg:py-24">
      <span className="bg-[#F2AA4C] text-black  px-4 py-3 rounded-full font-medium absolute left-1/2 -translate-x-1/2 -top-5">
        Join Cineflicks Waitlist
      </span>
      <div className="container pt-1 pb-6">
        <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center">
          How to buy <span className="text-[#F2AA4C]">CNF Tokens?</span>
        </h2>
        <Img
          src="/wallet-steps.png"
          width={1311}
          height={1053}
          alt="Steps to connect wallet"
          className="object-contain max-w-[900px] block mx-auto"
        />
      </div>
    </section>
  );
};

export default HowToBuyToken;
