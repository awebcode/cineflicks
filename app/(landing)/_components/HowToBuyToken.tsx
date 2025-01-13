import { Img } from "@/components/common/Img";

const HowToBuyToken = () => {
  return (
    <section className=" bg-[#190F04] relative  lg:my-10 py-16 lg:py-24">
      <span className="bg-[#F2AA4C] text-black 2xl:text-3xl px-4 py-3 rounded-full font-bold absolute left-1/2 -translate-x-1/2 -top-5">
        Join Cineflicks Waitlist
      </span>
      <div className="container pt-7 pb-4">
        <h2 className="text-3xl text-center lg:text-5xl xl:text-6xl font-bold">
          How to buy <span className="text-[#F2AA4C]">CNF Tokens?</span>
        </h2>
        <Img
          src="/wallet-steps.png"
          width={1311}
          height={1053}
          alt="Steps to connect wallet"
          className="object-contain max-w-full"
        />
      </div>
    </section>
  );
};

export default HowToBuyToken;
