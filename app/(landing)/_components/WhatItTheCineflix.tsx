import Image from "next/image";

const WhatItTheCineflix = () => {
  return (
    <section className=" relative overflow-hidden ">
      <div className="container relative  py-16 z-10">
        <h2 className="text-3xl lg:text-5xl xl:text-6xl font-bold">
          What is Cineflicks?
        </h2>
        <div className="pt-6 flex flex-col lg:flex-row lg:items-start gap-10">
          <div className="basis-full lg:basis-1/2 space-y-6">
            <p className="text-2xl lg:text-3xl font-medium ">
              <b className="text-[#F2AA4C]">Cineflicks</b> is the world’s first
              incentivised streaming platform, blending entertainment and{" "}
              <b className="text-[#F2AA4C] block">crypto rewards.</b>
            </p>
            <p className="text-2xl lg:text-3xl font-medium ">
              <b className="text-[#F2AA4C]">Cineflicks</b> offers a unique
              experience where viewers earn{" "}
              <b className="text-[#F2AA4C]">CNF tokens</b> for every hour
              watched.
            </p>
          </div>
          <div className="relative basis-full lg:basis-1/2">
            <Image
              width={1054}
              height={742}
              className="relative z-30 lg:-mt-20 2xl:-mt-32"
              src="/imgs/home/whatis.png"
              alt="what is cineflicks"
            />
          </div>
        </div>
      </div>

      <Image
        src={"/imgs/home/what_is_cinefilecs_bg.png"}
        alt="what_is_cinefilecs_bg"
        layout="fill"
        className="absolute inset-0 z-0"
      />
    </section>
  );
};

export default WhatItTheCineflix;
