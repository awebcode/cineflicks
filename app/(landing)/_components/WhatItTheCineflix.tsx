import Image from "next/image";

const WhatItTheCineflix = () => {
  return (
    <section className=" relative overflow-hidden py-16 ">
      <div className="container relative   z-10">
        <div className="pt-6 flex flex-col lg:flex-row lg:items-start gap-10">
          <div className="basis-fulllg:basis-1/2 mt-14 space-y-6">
            <h2 className="text-3xl xl:text-4xl 2xl:text-5xl d font-bold">
              What is Cineflicks?
            </h2>
            <p className="text-lg lg:text-xl font-normal ">
              <b className="text-[#F2AA4C]">Cineflicks</b> is the world’s first
              incentivised streaming platform, blending entertainment and{" "}
              <b className="text-[#F2AA4C] block">crypto rewards.</b>
            </p>
            <p className="text-lg lg:text-xl  font-normal ">
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
              className="relative z-30 -mt-6 "
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
