import { Img } from "@/components/common/Img";

const Tokenomicis = () => {
  return (
    <section className="relative py-10 xl:py-20">
      <div className="container pt-7 pb-4">
        <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center">
          <span className="text-[#F2AA4C]">Tokenomics </span>Breakdown
        </h2>
        <div>
          <Img
            className="block mx-auto mt-10 xl:mt-16"
            src="/tokenomise.png"
            alt="tokenomise breakdown"
            width={1627}
            height={823}
          />
        </div>

        <div className="py-16 xl:py-24 space-y-4">
          <h3 className="text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center">
            What Can I Do with MY{" "}
            <span className="text-[#F2AA4C]">$CNF ? </span>
          </h3>
          <h4 className="text-base xl:text-2xl  text-center font-medium text-[#F2AA4C] capitalize">
            they are yours to do as you wish!
          </h4>
          <p className="text-sm lg:text-xl text-center font-medium mx-auto max-w-[800px]">
            There will be many opportunities to use your tokens within the{" "}
            <span className="text-[#F2AA4C]">Cineflicks</span> ecosystem, but
            once you own them, they are yours to use, sell, trade, keep, stake.
            The choice is yours!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Tokenomicis;
